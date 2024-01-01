;(function () {
    'use strict';

    function debounce(func, wait, immediate) {
        var timeout;
        return function() {
            var context = this, args = arguments;
            var later = function() {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            var callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    };

	var fullHeight = function() {

		$('.js-fullheight').css('height', $(window).height());
		$(window).resize(function(){
			$('.js-fullheight').css('height', $(window).height());
		});

	};

	var burgerMenu = function() {
		$('.js-colorlib-nav-toggle').on('click', function(event) {
			event.preventDefault();
			var scrollWidth = window.innerWidth - document.documentElement.clientWidth;
			var $body = $('body');
			
			if($body.hasClass('menu-show')) {
				$body.removeClass('menu-show');
				$body.addClass('menu-hide');
				$body.css('padding-right', '0');
				$('#colorlib-main-nav > .js-colorlib-nav-toggle').removeClass('show');

			} else {
				$body.removeClass('menu-hide');
				$body.addClass('menu-show');
				$body.css('padding-right', scrollWidth + 'px');
				$('#colorlib-main-nav > .js-colorlib-nav-toggle').addClass('show');
			}
		});
	};
	

	// var burgerMenu = function() {

	// 	$('.js-colorlib-nav-toggle').on('click', function(event) {
	// 		event.preventDefault();
	// 		var $this = $(this);
	// 		if( $('body').hasClass('menu-show') ) {
	// 			$('body').removeClass('menu-show');
	// 			$('#colorlib-main-nav > .js-colorlib-nav-toggle').removeClass('show');
	// 		} else {
	// 			$('body').addClass('menu-show');
	// 			setTimeout(function(){
	// 				$('#colorlib-main-nav > .js-colorlib-nav-toggle').addClass('show');
	// 			}, 900);
	// 		}
	// 	})
	// };

	// var burgerMenu = function() {
	// 	$('.js-colorlib-nav-toggle').on('click', function(event) {
	// 		event.preventDefault();
	// 		var scrollWidth = window.innerWidth - document.documentElement.clientWidth;
	// 		var $body = $('body');
			
	// 		if($body.hasClass('menu-show')) {
	// 			$body.removeClass('menu-show');
	// 			$body.css('padding-right', '0');
	// 		} else {
	// 			$body.addClass('menu-show');
	// 			$body.css('padding-right', scrollWidth + 'px');
	// 		}
	// 	});
	// };
	

	// Animations
	var contentWayPoint = debounce(function() {
		var i = 0;
		$('.animate-box').waypoint(function(direction) {
			if(direction === 'down' && !$(this.element).hasClass('animated')) {
				i++;
	

				$(this.element).addClass('item-animate');
				setTimeout(function(){

					$('body .animate-box.item-animate').each(function(k){
						var el = $(this);
						setTimeout( function () {
							var effect = el.data('animate-effect');
							if ( effect === 'fadeIn') {
								el.addClass('fadeIn animated');
							} else {
								el.addClass('fadeInUp animated');
							}

							el.removeClass('item-animate');
						},  k * 200, 'easeInOutExpo' );
					});
					
				}, 100);
				
			}

		} , { offset: '	85%' } );
	}, 100); 

	var counter = function() {
		$('.js-counter').countTo({
			 formatter: function (value, options) {
	      return value.toFixed(options.decimals);
	    },
		});
	};

	var counterWayPoint = function() {
		if ($('#colorlib-counter').length > 0 ) {
			$('#colorlib-counter').waypoint( function( direction ) {
										
				if( direction === 'down' && !$(this.element).hasClass('animated') ) {
					setTimeout( counter , 400);					
					$(this.element).addClass('animated');
				}
			} , { offset: '95%' } );
		}
	};

	// TxtRotate Script
    var TxtRotate = function(el, toRotate, period) {
		this.toRotate = toRotate;
		this.el = el;
		this.loopNum = 0;
		this.period = parseInt(period, 10) || 2000;
		this.txt = '';
		this.tick();
		this.isDeleting = false;
	};
	  
	TxtRotate.prototype.tick = function() {
		var i = this.loopNum % this.toRotate.length;
		var fullTxt = this.toRotate[i];
	  
		if (this.isDeleting) {
		  this.txt = fullTxt.substring(0, this.txt.length - 1);
		} else {
		  this.txt = fullTxt.substring(0, this.txt.length + 1);
		}
	  
		this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';
	  
		var that = this;
		var delta = 300 - Math.random() * 100;
	  
		if (this.isDeleting) { delta /= 2; }
	  
		if (!this.isDeleting && this.txt === fullTxt) {
		  delta = this.period;
		  this.isDeleting = true;
		} else if (this.isDeleting && this.txt === '') {
		  this.isDeleting = false;
		  this.loopNum++;
		  delta = 500;
		}
	  
		setTimeout(function() {
		  that.tick();
		}, delta);
	};
	  
	window.onload = function() {
		var elements = document.getElementsByClassName('txt-rotate');
		for (var i = 0; i < elements.length; i++) {
			var toRotate = elements[i].getAttribute('data-rotate');
			var period = elements[i].getAttribute('data-period');
			if (toRotate && period) {
				new TxtRotate(elements[i], JSON.parse(toRotate), period);
			}    	
		}
		var css = document.createElement("style");
		css.type = "text/css";
		css.innerHTML = ".txt-rotate > .wrap {font-size: 40px; color: rgba(0, 0, 0, 0.8); font-family: Playfair Display, Georgia, serif; border-right: 0.08em solid #666; padding-top: 0; padding-bottom: 0}";
		document.body.appendChild(css);
	};

	// Owl Carousel
	var owlCarouselFeatureSlide = function() {
		var owl = $('.owl-carousel1');
		owl.owlCarousel({
			animateOut: 'fadeOut',
		   animateIn: 'fadeIn',
		   autoplay: true,
		   loop:true,
		   margin:0,
		   nav:true,
		   dots: false,
		   autoHeight: true,
		   responsive:{
		      0:{
		         items:1
		      },
		      600:{
		         items:2
		      },
		      1000:{
		         items:3
		      }
		   },
		   navText: [
		      "<i class='icon-arrow-left3 owl-direction'></i>",
		      "<i class='icon-arrow-right3 owl-direction'></i>"
	     	]
		});
		var owl2 = $('.owl-carousel');
		owl2.owlCarousel({
			animateOut: 'fadeOut',
		   animateIn: 'fadeIn',
		   autoplay: true,
		   loop:true,
		   margin:0,
		   nav:false,
		   dots: true,
		   autoHeight: true,
		   items: 1,
		   navText: [
		      "<i class='icon-arrow-left3 owl-direction'></i>",
		      "<i class='icon-arrow-right3 owl-direction'></i>"
	     	]
		});
		var owl3 = $('.owl-carousel3');
		owl3.owlCarousel({
			animateOut: 'fadeOut',
		   animateIn: 'fadeIn',
		   autoplay: true,
		   loop:true,
		   margin:0,
		   nav:false,
		   dots: false,
		   autoHeight: true,
		   items: 1,
		   navText: [
		      "<i class='icon-arrow-left3 owl-direction'></i>",
		      "<i class='icon-arrow-right3 owl-direction'></i>"
	     	]
		});	
	};


	// Document on load.
	$(function(){
		fullHeight();
		burgerMenu();
		counterWayPoint();
		contentWayPoint();
		owlCarouselFeatureSlide();
	});


}());

function debounce(func, wait, immediate) {
    var timeout;
    return function() {
        var context = this, args = arguments;
        var later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
};
