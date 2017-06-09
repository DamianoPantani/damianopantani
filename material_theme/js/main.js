jQuery(function($) {

$.ripple(".btn, .menu-wrap a, .itemCategories a, .pager a, #close-button", {
	duration: 0.4
});

new WOW({
	live: false,
	callback: function(box) {
		if(box.classList.contains('counter')){
			$(box).find('.timer').each(initCounter);
			$(this).unbind('inview');
		}
	}
}).init();

(function() {
	var bodyEl = document.body,
		openBtn = document.getElementById('open-button'),
		closeBtn = document.getElementById('close-button'),
		content = document.getElementById('home'),
		isOpen = false;

	openBtn.addEventListener('click', toggleMenu);
	closeBtn.addEventListener('click', toggleMenu);
	content.addEventListener('click', function(ev) {
		var target = ev.target;
		if(isOpen && target !== openBtn && target !== openBtn) {
			toggleMenu();
		}
	});

	function toggleMenu() {
		if(isOpen) {bodyEl.classList.remove('show-menu');}
		else {bodyEl.classList.add('show-menu');}
		isOpen = !isOpen;
	}
})();

/* Smooth scroll to element */
$(function() {
  $('a[href*="#"]:not([href="#"])').click(function() {
	if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
	  var target = $(this.hash);
	  target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
	  if (target.length) {
		$('html,body').animate({
		  scrollTop: target.offset().top
		}, 1500);
		return false;
	  }
	}
  });
});

$(document).ready(function() {
	$('[data-toggle="tooltip"]').tooltip();
});

});

function setCollapseButtonsUniqueId(){
	$.each($('.collapse'), function() {
		var hash = 'more-info-' + Math.random().toString(36).substring(7);
		var collapsible = $(this);
		var collapseButton = $(this).parent().find('.collapse-button');

		collapsible.attr('id', hash);
		collapseButton.attr('data-toggle', 'collapse');
		collapseButton.attr('data-target', '#'+hash);

		collapseButton.click(function(){
			collapsible.collapse('toggle');
		});
		collapsible.on("hide.bs.collapse", function(){
			collapseButton.html('<h5>Więcej danych<i class="fa fa-chevron-circle-down"></i></h5>');
		});
		collapsible.on("show.bs.collapse", function(){
			collapseButton.html('<h5>Mniej danych<i class="fa fa-chevron-circle-up"></i></h5>');
		});

	});
}

var emoticons = new Emoticons();

function mm(){/*mock*/}

function confL(message) {
	return window.confirm(message);
}

function checkbform(form) {
	if (typeof(form.autor) !== 'undefined' && form.autor.value === '') {
		showError('Wpisz swoje imię lub zaloguj się');
		return false;
	}
	if (form.ascode && form.ascode.value === '') {
		showError('Wpisz słowo antyspamowe');
		return false;
	}
	if (form.content.value === '') {
		showError('Wpisz jakąś treść');
		return false;
	}
	var chars = form.content.value.length;
	var maxChars = 4000;
	if (chars > maxChars) {
		var difference = chars - maxChars;
		showError('Treść komentarza nie może być dłuższa niż 4000 znaków. Skróć go co najmniej o '+difference+' znaków.');
		return false;
	}
	return true;
}

function showError(message){
	swal({
		title: '',
		text: message,
		type: 'error',
		confirmButtonColor: '#DA6868'
	});
}

function initAffix(){
	$(".sticky-navigation").affix({
		offset: {
			top: $("#home").outerHeight(true)
		}
	});
}

function initCounter() {
	var $this = $(this);
	var max = $this.text().replace(' km/h', '');
	var unit = $this.text().indexOf(' km/h') !== -1 ? ' km/h' : '';
	$({ Counter: 0 }).animate({Counter: max}, {
		duration: 2000,
		easing: 'swing',
		step: function () {
			$this.text(this.Counter.toFixed(1)+unit);
		},
		always: function(a,b,c,d) {
			$this.text(max+unit);
		}
	});
}

function hideGPSTracksOnMainPage(){
	$('iframe.hidden').detach();
	$('button:contains("Pokaż trasę GPS")').detach();
	$('iframe[src*=routes]').wrap('<div class="gps-wrapper"></div>');
}

function hideCommentsLinkIfZero(){
	$.each($('.comments-count'), function() {
		var commentsCount = $(this).find('a').text().replace('Komentarze: ', '');
		if (commentsCount === '0') {
			$(this).detach();
		}
	});
}

function hideArchiveCommentsCountIfZero(){
	$.each($('.category-meta>i:last-child'), function() {
		var commentsCount = $(this).text();
		if (commentsCount === '0') {
			$(this).text('');
		}
	});
}

function replaceUrlParam(url, paramName, paramValue){
    var pattern = new RegExp('\\b('+paramName+'=).*?(&|$)')
    if(url.search(pattern)>=0){
        return url.replace(pattern,'$1' + paramValue + '$2');
    }
    return url + (url.indexOf('?')>0 ? '&' : '?') + paramName + '=' + paramValue ;
}

function parseMaxKmFromUrl(url){
	var ending = url.indexOf('|1:|sty');
	var starting = url.indexOf('|',ending-5)+1;
	return url.substring(starting, ending);
}

function normalizeChartToStyle(){
	var chart = $('#globimg');
	var url = chart.attr('src');

	var maxKm = parseMaxKmFromUrl(url);
	var interval = 500;
	var ticksPercentage = (100 * interval / maxKm).toFixed(2);

	url = replaceUrlParam(url, 'chs', '1000x300'); // chart size - max 300k pixels
	url = replaceUrlParam(url, 'chg', '9.09,'+ticksPercentage+',0.1,0.8'); // markers tick - x step in %, y step in %, dash length, space length
	url = replaceUrlParam(url, 'chf', 'c,ls,90,ffffff,'+ticksPercentage/100+',fcfcfc,'+ticksPercentage/100); // stripped background color (centered, linear horizontal, color, tick)
	url = replaceUrlParam(url, 'chco', 'c2ede7,8ce2da,53ccc0,299b90'); // series colors
	url = replaceUrlParam(url, 'chm', 'o,c2ede7,0,-1,2,-1|o,8ce2da,1,-1,2,-1|o,53ccc0,2,-1,3,-1|o,299b90,3,-1,5,-1'); // point markers (type, color, serieId, all points, size, zIndex)
	url = replaceUrlParam(url, 'chls', '1,1,1|1,1,0|2,1,0|4,2,0'); // series style - thickness, dash length, space length
	url = replaceUrlParam(url, 'chdlp', 'b'); // legend position - b means below
	url = replaceUrlParam(url, 'chdls', '000000,14'); // legend items style (color, size)
	//url = replaceUrlParam(url, 'chtt', 'Pokonany+Dystans'); // chart title
	//url = replaceUrlParam(url, 'chts', '000000,20,c'); // title style (color, size, centered)
	url = replaceUrlParam(url, 'chxr', '0,0,'+maxKm+','+interval); // y axis data config, (axisId, min, max, interval)
	url = replaceUrlParam(url, 'chxl', '1:|sty|lut|mar|kwi|maj|cze|lip|sie|wrz|paź|lis|gru'); // x axis labels

	chart.attr('src', url);
	chart.removeAttr('onmousemove');
	chart.removeAttr('onmouseup');
	chart.removeAttr('onmousedown');

	$('#yearly-chart').find('script').detach();
}

function replaceCommentsButton(){
	$('.addcommform .button').replaceWith('<button type="submit" class="button"><span>Komentuj</span><span class="fa fa-comment"></span></button>');
}

function replaceCategoryTableWithInfoLabel(){
	var activitiesCount = $('.categoryArchSummary .flabel:contains("Liczba aktywności")')
	.parent().children('.value').text();
	var activitiesLabel = activitiesCount === '1' ? 'aktywność,' : 'aktywności, średnio';
	var averageActivity = $('.categoryArchSummary .flabel:contains("Średnio na aktywność")')
	.parent().children('.value').text().replace(/i.*m/, '');
	$('.categoryArchSummary').detach();
	var text = $('.categoryArchHeader').html();
	$('.categoryArchHeader').addClass('wow flipInX')
	.html('<i class="fa fa-info-circle"></i><div class="inline">'+text+'<div><strong>'+activitiesCount+'</strong> '+activitiesLabel+' <strong>'+averageActivity+'</strong></div></div>')
	.find('h2').append('.');
}

function changeSearchResultsForm(){
	$(".search-box input").attr("placeholder", "Szukaj...");
	var searchText = $('.well.mainwell h2').text();
	var foundEntriesCount = $('.well.mainwell b').text();
	var newClass = 'alert-info';
	var newContent = 'Wyniki wyszukiwania dla <strong class="inline">'+searchText+'</strong> '+
					 '<div class="inline">Znalezionych wpisów: <strong>'+foundEntriesCount+'</strong></div>';
	if (foundEntriesCount.indexOf('Wpisz') != -1){
		newContent = 'Szukana fraza jest za krótka.';
		newClass = 'alert-warning';
	} else if (foundEntriesCount === ''){
		newContent = 'Brak wyników wyszukiwania dla frazy <strong>'+searchText+'</strong>';
		newClass = 'alert-warning no-results';
	}
	$('.well.mainwell').removeClass('well mainwell').addClass('alert '+newClass).html('<div class="wow flipInX"><i class="fa fa-search"></i><div class="inline">'+newContent+'</div></div>');
}

function swapCommentsOrder(){
	var comments = $(".comments-box .comment");
	var swappedComments = comments.get().reverse();
	swappedComments.forEach(function(comment, i){
		$(comments[i]).replaceWith($(comment).clone());
	});
}

function getHighResolutionCommentAvatar(){
	$.each($('.commavatar img'), function() {
		var miniImgSrc = $(this).attr('src');
		$(this).attr('src', miniImgSrc.replace('_mini', ''));
	});
}

function addDefaultAvatarsToGuestComments(){
	var newAvatar = '<div class="commavatar"><img src="http://res.cloudinary.com/dsiwno2d6/image/upload/v1491924329/noav_oaznyj.gif"></div>';
	$.each($('.comment b'), function() {
		var username = $(this).text();
		$(this)[0].outerHTML = newAvatar + '<strong>'+username+'</strong>';
	});
}

function addEmoticonsToComments(){
	emoticons.replace({selector: '.comment-text'});
}

function addEmoticonsToTripText(){
	emoticons.replace({selector: '.trip-text'});
}

function wrapPagerWithSectionElement(){
	$('.pager').wrap('<section id="pager"></section>');
}
