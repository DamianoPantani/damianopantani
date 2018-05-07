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
		var hash = 'more-info-' + Math.random().toString(36).substring(7),
			collapsible = $(this),
			collapseButton = $(this).parent().find('.collapse-button');

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

function replaceDeleteButtons(){
	$.each($('.comment .deleteoper'), function() {
		var src = $(this).attr('href'),
			username = $($($(this).parents('.comment')[0]).find('.commavatar').next()[0]).text();
		$(this).removeAttr('href').attr('onclick', 'confirmCommentDeletion(\''+src+'\', \''+username+'\')');
	});
}

function confirmCommentDeletion(src, username) {
	return swal({
        html: 'Czy na pewno chcesz usunąć komentarz od <strong>'+username+'</strong>?',
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: '#DA6868',
        confirmButtonText: 'Usuń komentarz',
        cancelButtonText: "Anuluj"
    }).then(
	function() {
		window.location = src;
	}, function(dismiss) {
		// do nothing
	});
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
	var chars = form.content.value.length,
		maxChars = 4000;
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
	var $this = $(this),
		max = $this.text().replace(' km/h', ''),
		unit = $this.text().indexOf(' km/h') !== -1 ? ' km/h' : '';
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

function parseMaxKmFrom(chartText){
	var ending = chartText.indexOf('|1:|sty'),
		starting = chartText.indexOf('|',ending-5)+1;
	return chartText.substring(starting, ending);
}

function parseChartDataFrom(chartText){
	var starting = chartText.indexOf('&chd=')+5,
		ending = chartText.indexOf('&chxr');
	return chartText.substring(starting, ending);
}

function parseYearsFromUrl(chartText){
		var starting = chartText.indexOf('&chdl=')+6,
		ending = chartText.indexOf('&chbh');
	return chartText.substring(starting, ending).split('|');
}

function toHighchartsSeries(data, maxKm){
	return data.map(function(dataString){
		return Array.from(dataString).map(function(character){
			var charCode = character.charCodeAt(0);
			charCode += (charCode < 58) ? 5 : (charCode < 91) ? -65 : -70;
			return charCode/62*maxKm;
		});
	});
}

function normalizeChartToStyle(){
	var chartText = $('#yearly-chart textarea').text(),
		url = chartText.substring(chartText.indexOf('http://chart'), chartText.indexOf('" width="400"'))
		maxKm = parseMaxKmFrom(url),
		data = toHighchartsSeries(parseChartDataFrom(url).substr(2).split(','), maxKm),
		series = [];
		
	parseYearsFromUrl(url).forEach(function(year, id){
		series.push({
			name: year,
			data: data[id],
			lineWidth: id+1,
			tooltip: {
				pointFormatter: function(){
					var value = Math.round(this.y/10) * 10;
					return '<span style="color:'+ this.color +'">\u25CF</span> '+ this.series.name +': <b>'+value+' km</b><br/>';
				}
			},
			marker: {
				enabled: false
			}
		});
	});

	$('#yearly-chart textarea').detach();
	Highcharts.chart('yearly-chart', {
		colors: ['#c2ede7','#8ce2da','#53ccc0','#299b90'],
		credits: {
			enabled: false
		},
		title: {
			text: 'Przejechane kilometry w ostatnich 4-ch latach'
		},
		legend: {
			useHTML: true,
			labelFormatter: function(){
				var total = 0;
				this.options.data.forEach(function(value){total += value;});
				return this.name + ' <small>('+Math.floor(total)+' km)</small>';
			}
		},
		xAxis: {
			categories: ['Styczeń', 'Luty', 'Marzec', 'Kwiecień', 'Maj', 'Czerwiec', 'Lipiec', 'Sierpień', 'Wrzesień', 'Październik', 'Listopad', 'Grudzień']
		},
		yAxis: {
			gridLineColor: '#f2f2f2',
			title: {
				text: 'Km'
			}
		},
		tooltip: {
			shared: 	true,
			crosshairs:	true,
		},
		series: series
	});
	
}

function replaceCommentsButton(){
	$('.addcommform .button').replaceWith('<button type="submit" class="button"><span>Komentuj</span><span class="fa fa-comment"></span></button>');
}

function replaceCategoryTableWithInfoLabel(){
	var activitiesCount = $('.categoryArchSummary .flabel:contains("Liczba aktywności")')
	.parent().children('.value').text(),
		activitiesLabel = activitiesCount === '1' ? 'aktywność' : 'aktywności',
		averageActivityLabel = activitiesCount === '1' ? '' : ', średnio <strong>'+$('.categoryArchSummary .flabel:contains("Średnio na aktywność")')
	.parent().children('.value').text().replace(/i.*m/, '')+'</strong></div></div>',
		text = $('.categoryArchHeader').html(),
		totalDistanceLabel = '<strong>'+$('.categoryArchSummary .flabel:contains("Dystans całkowity")')
	.parent().children('.value').text().replace(/\(.*$/,"")+'</strong>';

	$('.categoryArchSummary').detach();
	$('.categoryArchHeader').addClass('wow flipInX')
	.html('<i class="fa fa-info-circle"></i><div class="inline">'+text+'<div><strong>'+activitiesCount+'</strong> '+activitiesLabel+', '+totalDistanceLabel+averageActivityLabel)
	.find('h2').append('.');
}

function changeSearchResultsForm(){
	$(".search-box input").attr("placeholder", "Szukaj...");
	var searchText = $('.well.mainwell h2').text(),
		foundEntriesCount = $('.well.mainwell b').text(),
		newClass = 'alert-info',
		newContent = 'Wyniki wyszukiwania dla <strong class="inline">'+searchText+'</strong> '+
					 '<div class="inline">Znalezionych wpisów: <strong>'+foundEntriesCount+'</strong></div>';
	if (foundEntriesCount.indexOf('Wpisz') != -1){
		newContent = 'Szukana fraza jest za krótka.';
		newClass = 'alert-warning no-results';
	} else if (foundEntriesCount === ''){
		newContent = 'Brak wyników wyszukiwania dla frazy <strong>'+searchText+'</strong>';
		newClass = 'alert-warning no-results';
	}
	$('.well.mainwell').removeClass('well mainwell').addClass('alert '+newClass).html('<div class="wow flipInX"><i class="fa fa-search"></i><div class="inline">'+newContent+'</div></div>');
}

function swapCommentsOrder(){
	var comments = $(".comments-box .comment"),
		swappedComments = comments.get().reverse();
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
