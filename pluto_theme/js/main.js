
jQuery(function($) {

	//Initiat WOW JS
	new WOW().init();

    // one page navigation 
    $('.main-navigation').onePageNav({
            currentClass: 'current'
    });

    // Countdown
	$('.counter').bind('inview', function(event, visible, visiblePartX, visiblePartY) {
		if (visible) {
			$(this).find('.timer').each(function () {
				var $this = $(this);
				$({ Counter: 0 }).animate({ Counter: $this.text() }, {
					duration: 2000,
					easing: 'swing',
					step: function () {
						$this.text(this.Counter.toFixed(2));
					}
				});
			});
			$(this).unbind('inview');
		}
	});

	$.ripple(".btn, .menu-wrap li", {
		opacity: 0.6,
		duration: 0.5,
		multi: true
	});
	
	(function() {

		var bodyEl = document.body,
			content = document.querySelector( '.contents' ),
			openbtn = document.getElementById( 'open-button' ),
			closebtn = document.getElementById( 'close-button' ),
			isOpen = false;

		function initEvents() {
			openbtn.addEventListener( 'click', toggleMenu );
			if( closebtn ) {
				closebtn.addEventListener( 'click', toggleMenu );
			}

			// close the menu element if the target it´s not the menu element or one of its descendants..
			content.addEventListener( 'click', function(ev) {
				var target = ev.target;
				if( isOpen && target !== openbtn ) {
					toggleMenu();
				}
			} );
		}

		function toggleMenu() {
			if( isOpen ) {
				classie.remove( bodyEl, 'show-menu' );
			}
			else {
				classie.add( bodyEl, 'show-menu' );
			}
			isOpen = !isOpen;
		}

		initEvents();

	})();

});
