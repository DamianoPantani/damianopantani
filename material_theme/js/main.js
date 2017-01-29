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
		$({ Counter: 0 }).animate({ Counter: $this.text() }, {
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

	$.ripple(".btn, .button, .menu-wrap li, .itemCategories a, .pager a", {
		duration: 0.4
	});
	
	/* Menu toggle */
	(function() {
		var bodyEl = document.body,
			content = document.querySelector( '.header-area' ),
			openBtn = document.getElementById( 'open-button' ),
			openIcn = document.querySelectorAll( '#open-button i' )[0],
			closeBtn = document.getElementById( 'close-button' ),
			isOpen = false;

		openBtn.addEventListener( 'click', toggleMenu );
		closeBtn.addEventListener( 'click', toggleMenu );
		content.addEventListener( 'click', function(ev) {
			var target = ev.target;
			if( isOpen && target !== openBtn && target !== openIcn ) {
				toggleMenu();
			}
		} );
		
		function toggleMenu() {
			if( isOpen ) {
				bodyEl.classList.remove('show-menu' );
			}
			else {
				bodyEl.classList.add('show-menu');
			}
			isOpen = !isOpen;
		}

	})();
	
	/* Smooth scroll to element */
	$(function() {
	  $('a[href*=#]:not([href=#])').click(function() {
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
