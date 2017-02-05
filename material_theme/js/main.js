jQuery(function($) {

	new WOW({
		offset: 100,
		live: false,
		callback: function(box) {
			box = $(box);
			if(box.hasClass('counter')){
				box.find('.timer').each(initCounter);
				$(this).unbind('inview');
			}
		}
	}).init();

	function initCounter() {
		var $this = $(this);
		$({ Counter: 0 }).animate({ Counter: $this.text().replace(' km/h', '') }, {
			duration: 2000,
			easing: 'swing',
			step: function () {
				$this.text(this.Counter.toFixed(1));
			}
		});
	}
	
    $('.main-navigation').onePageNav({
        currentClass: 'current'
    });

	$.ripple(".btn, .menu-wrap li, .itemCategories a, .pager a", {
		duration: 0.4
	});
	
	/* Menu toggle */
	(function() {
		var bodyEl = document.body,
			content = document.querySelector('.header-area'),
			openBtn = document.getElementById('open-button'),
			openIcn = document.getElementById('#open-button'),
			closeBtn = document.getElementById('close-button'),
			isOpen = false;

		openBtn.addEventListener('click', toggleMenu);
		closeBtn.addEventListener('click', toggleMenu);
		content.addEventListener('click', function(ev) {
			var target = ev.target;
			if(isOpen && target !== openBtn && target !== openIcn) {
				toggleMenu();
			}
		} );
		
		function toggleMenu() {
			if( isOpen ) {
				bodyEl.classList.remove('show-menu');
			}
			else {
				bodyEl.classList.add('show-menu');
			}
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
			}, 1000);
			return false;
		  }
		}
	  });
	});

	$(document).ready(function() {
		$('[data-toggle="tooltip"]').tooltip();
	});

});

function confL(message) {
    return window.confirm(message);
}

function hideGPSTracksOnMainPage(){
    $('iframe.hidden').detach();
    $('button:contains("Pokaż trasę GPS")').detach();
}

function hideCommentsLinkIfZero(){
    $.each($('.comments-count'), function() {
        var commentsCount = $(this).find('a').text().replace('Komentarze: ', '');
        if (commentsCount === '0') {
            $(this).detach();
        }
    });
}

function replaceCommentsButton(){
    $('.addcommform .button').replaceWith('<a type="submit" class="button"><span>Komentuj</span><span class="fa fa-comment"></span></a>');
}

function replaceCategoryTableWithInfoLabel(){
    var activitiesCount = $('.categoryArchSummary .flabel:contains("Liczba aktywności")')
    .parent().children('.value').text();
    var averageActivity = $('.categoryArchSummary .flabel:contains("Średnio na aktywność")')
    .parent().children('.value').text().replace(/i.*m/, '');
    $('.categoryArchSummary').detach();
	var text = $('.categoryArchHeader').html();
    $('.categoryArchHeader').addClass('wow flipInX')
	.html('<i class="fa fa-info-circle"></i><div class="inline">'+text+'<div><strong>'+activitiesCount+'</strong> aktywności, średnio <strong>'+averageActivity+'</strong></div></div>')
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
        newClass = 'alert-warning';
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

function addEmoticonsToComments(){
	new Emoticons().replace({selector: '.comment-text'});
}
