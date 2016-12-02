
jQuery(function($) {

	new WOW().init();

    $('.main-navigation').onePageNav({
            currentClass: 'current'
    });

	$('.counter').bind('inview', function(event, visible, visiblePartX, visiblePartY) {
		if (visible) {
			$(this).find('.timer').each(function () {
				var $this = $(this);
				$({ Counter: 0 }).animate({ Counter: $this.text() }, {
					duration: 2000,
					easing: 'swing',
					step: function () {
						$this.text(this.Counter.toFixed(1));
					}
				});
			});
			$(this).unbind('inview');
		}
	});

	$.ripple(".btn, .menu-wrap li", {
		duration: 0.5,
		multi: true
	});
	
	(function() {

		var bodyEl = document.body,
			content = document.querySelector( '.heading' ),
			openbtn = document.getElementById( 'open-button' ),
			closebtn = document.getElementById( 'close-button' ),
			isOpen = false;

		openbtn.addEventListener( 'click', toggleMenu );
		closebtn.addEventListener( 'click', toggleMenu );

		content.addEventListener( 'click', function(ev) {
			var target = ev.target;
			if( isOpen && target !== openbtn ) {
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

});
