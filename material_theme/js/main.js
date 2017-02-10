
jQuery(function($) {
var wowTime = new Date();
new WOW({
	live: false,
	callback: function(box) {
		var wowCallback = new Date();
		if(box.classList.contains('counter')){
			$(box).find('.timer').each(initCounter);
			$(this).unbind('inview');
		}
		console.log('WOW CALLBACK: '+(new Date()-wowCallback)+'ms');
	}
}).init();
console.log('WOW INIT TIME: '+(new Date()-wowTime)+'ms');

var counterTime = new Date();
function initCounter() {
	var $this = $(this);
	$({ Counter: 0 }).animate({ Counter: $this.text().replace(' km/h', '') }, {
		duration: 3000,
		easing: 'swing',
		step: function () {
			$this.text(this.Counter.toFixed(1));
		}
	});
}
console.log('COUNTER INIT TIME: '+(new Date()-counterTime)+'ms');

var navTime = new Date();
$('.main-navigation').onePageNav({
	currentClass: 'current'
});
console.log('NAV INIT TIME: '+(new Date()-navTime)+'ms');

var ripTime = new Date();
$.ripple(".btn, .menu-wrap a, .itemCategories a, .pager a", {
	duration: 0.4
});
console.log('RIPPLE INIT TIME: '+(new Date()-ripTime)+'ms');

(function() {
	var menuTime = new Date();
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
		var toggleTime = new Date();
		if(isOpen) {bodyEl.classList.remove('show-menu');}
		else {bodyEl.classList.add('show-menu');}
		isOpen = !isOpen;
		console.log('MENU TOGGLE TIME: '+(new Date()-toggleTime)+'ms');
	}
	console.log('MENU INIT TIME: '+(new Date()-menuTime)+'ms');
})();

/* Smooth scroll to element */
$(function() {
	var smoothTime = new Date();
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
	console.log('SCROLL INIT TIME: '+(new Date()-smoothTime)+'ms');
});

$(document).ready(function() {
	var tooltipTime = new Date();
	$('[data-toggle="tooltip"]').tooltip();
	console.log('TOOLTIP INIT TIME: '+(new Date()-tooltipTime)+'ms');
});

});

var newEmoTime = new Date();
var emoticons = new Emoticons();
console.log('EMO OBJECT INIT TIME: '+(new Date()-newEmoTime)+'ms');

function confL(message) {
	return window.confirm(message);
}

function hideGPSTracksOnMainPage(){
	var hidingGPSTIME = new Date();
	$('iframe.hidden').detach();
	$('button:contains("Pokaż trasę GPS")').detach();
	console.log('HIDING GPS TIME: '+(new Date()-hidingGPSTIME)+'ms');
}

function hideCommentsLinkIfZero(){
	var hiddingComm = new Date();
	$.each($('.comments-count'), function() {
		var commentsCount = $(this).find('a').text().replace('Komentarze: ', '');
		if (commentsCount === '0') {
			$(this).detach();
		}
	});
	console.log('HIDING COMMENT LINK TIME: '+(new Date()-hiddingComm)+'ms');
}

function replaceCommentsButton(){
	var time = new Date();
	$('.addcommform .button').replaceWith('<button type="submit" class="button"><span>Komentuj</span><span class="fa fa-comment"></span></button>');
	console.log('REPLACING BUTTON TIME: '+(new Date()-time)+'ms');
}

function replaceCategoryTableWithInfoLabel(){
	var time = new Date();
	var activitiesCount = $('.categoryArchSummary .flabel:contains("Liczba aktywności")')
	.parent().children('.value').text();
	var averageActivity = $('.categoryArchSummary .flabel:contains("Średnio na aktywność")')
	.parent().children('.value').text().replace(/i.*m/, '');
	$('.categoryArchSummary').detach();
	var text = $('.categoryArchHeader').html();
	$('.categoryArchHeader').addClass('wow flipInX')
	.html('<i class="fa fa-info-circle"></i><div class="inline">'+text+'<div><strong>'+activitiesCount+'</strong> aktywności, średnio <strong>'+averageActivity+'</strong></div></div>')
	.find('h2').append('.');
	console.log('REPLACING CAT TABLE TIME: '+(new Date()-time)+'ms');
}

function changeSearchResultsForm(){
	var time = new Date();
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
		newClass = 'alert-warning';
	}
	$('.well.mainwell').removeClass('well mainwell').addClass('alert '+newClass).html('<div class="wow flipInX"><i class="fa fa-search"></i><div class="inline">'+newContent+'</div></div>');
	console.log('REPLACING SEARCH RESULTS TIME: '+(new Date()-time)+'ms');
}

function swapCommentsOrder(){
	var time = new Date();
	var comments = $(".comments-box .comment");
	var swappedComments = comments.get().reverse();
	swappedComments.forEach(function(comment, i){
		$(comments[i]).replaceWith($(comment).clone());
	});
	console.log('SWAPPING COMM TIME: '+(new Date()-time)+'ms');
}

function addEmoticonsToComments(){
	var time = new Date();
	emoticons.replace({selector: '.comment-text'});
	console.log('EMOS IN COMMENTS TIME: '+(new Date()-time)+'ms');
}

function addEmoticonsToTripText(){
	var time = new Date();
	emoticons.replace({selector: '.trip-text'});
	console.log('EMOS IN TRIP TIME: '+(new Date()-time)+'ms');
}

function wrapPagerWithSectionElement(){
	var time = new Date();
	$('.pager').wrap('<section id="pager"></section>');
	console.log('PAGER WRAP TIME: '+(new Date()-time)+'ms');
}
