/*$(window).on('beforeunload', function(){
	$(window).scrollTop(0);
});*/

$(function() {

    // Read the article
// https://css-tricks.com/polylion

    var tmax_opts = {
        delay: 0.1,
        repeat: -1,
        repeatDelay: 0.5,
        yoyo: true
    };

    var tmax_tl           = new TimelineMax(tmax_opts),
        polylion_shapes   = $('svg.polylion > g path'),
        polylion_stagger  = 0.00475,
        polylion_duration = 1.5;

    var polylion_staggerFrom = {
        scale: 0,
        opacity: 0,
        transformOrigin: 'center center',
    };

    var polylion_staggerTo = {
        opacity: 1,
        scale: 1,
        ease: Elastic.easeInOut
    };

    tmax_tl.staggerFromTo(polylion_shapes, polylion_duration, polylion_staggerFrom, polylion_staggerTo, polylion_stagger, 0);

});

function init(m,mb){
	$('.menu__bg').css({ 'height': '0px', 'opacity': '0', 'left': '0px'});
	$('.menu__bottom-line').css({ 'transform': 'matrix(0, 0, 0, 1, 0, 117)'});
	$('.menu__content-wrap').css({ 'height': '0px'});
	
	$('#menu-btn').click(function() {
		if(!$(".menu__container").hasClass('ooo') ) {
			
			$('.header-container').attr('id','ro');
			$('.menu__container').addClass('ooo');
			$('.fade-in').addClass('fff');
			$('body').addClass('has-active-menu');
			var h=$('.menu__container').height();
			$('.menu__bg').stop(true,false).animate({'height': h+'px', 'opacity': '1', 'left': '0px'}, 400);
			
			var h1=$('.menu__wrapper').height(), wi=$(window).height(), p=wi-h1, t=Math.ceil(p/2)-1, z=20;
			if(t<115){
				t=115;
				z=20;
			}	
			if(wi>600){
				z=40;
			}	
			$('.menu__content').stop(true,false).animate({'height': (h1+(2*t))+'px','padding-top':t+'px','padding-bottom':t+'px'}, 400);	
			$('.menu__logo__list').stop(true,false).animate({'bottom': z+'px'}, 200);
			
			$('.menu__content-wrap').stop(true,false).animate({'height':h+'px'}, 400, function(){
				if($('body').attr('yes')=='0'){
					$('.menu li, .menu, .menu__group li, .menu__logo__list').each(function(i) {
						var row = $(this);
						setTimeout(function(){row.toggleClass('in-view');},300*i);
					});
					$('body').attr('yes','1');
				}
			});
			
			
			$(window).resize(function(e) {
				if($(".menu__container").hasClass('ooo') ) {
					var h=$('.menu__container').height();
					$('.menu__bg').stop(true,false).animate({'height': h+'px', 'opacity': '1', 'left': '0px'}, 0);
					$('.menu__content-wrap').stop(true,false).animate({'height': h+'px'}, 0);
					var h1=$('.menu__wrapper').height(), wi=$(window).height(), p=wi-h1, t=Math.ceil(p/2)-1, z=20;
					if(t<115){
						t=115;
						z=20;
					}
					if(wi>600){
						z=40;
					}	
					$('.menu__content').stop(true,false).animate({'height': (h1+(2*t))+'px','padding-top':t+'px','padding-bottom':t+'px'}, 400);	
					$('.menu__logo__list').stop(true,false).animate({'bottom': z+'px'}, 200);
				}
			});
			
		}else{
			
			$('.fade-in').removeClass("fff");
			$('.header-container').removeAttr('id');
			$('body').removeClass('has-active-menu');
			
			$('.menu__bg').stop(true,false).animate({'height': '0px', 'opacity': '1', 'left': '0px'}, 400);
			$('.menu__content-wrap').stop(true,false).animate({'height': '0px'}, 400, function(){$('.menu__container').removeClass("ooo");});			
			
		}
	});
	
	$('#menu-btn-close').click(function() {
		$('.fade-in').removeClass("fff");
		$('.header-container').removeAttr('id');
		$('body').removeClass('has-active-menu');
		
		$('.menu__bg').stop(true,false).animate({'height': '0px', 'opacity': '1', 'left': '0px'}, 400);
		$('.menu__content-wrap').stop(true,false).animate({'height': '0px'}, 400, function(){$('.menu__container').removeClass("ooo");});
	});
	
}

function loadhome(b){
	if(load1==1 && load2==1){
		if(msieversion()){
			$('.loader').css({opacity: 0.0, visibility: "hidden"}).animate({opacity: 1.0},200);
			$('.o-wrapper').css({opacity: 0.0, visibility: "visible"}).animate({opacity: 1.0},200);
		}else{
            setTimeout(function(){
                $('.loader').addClass('fade-out');
                $('.o-wrapper').addClass('fade-in');
            }, 3000);

		}
		loadBanner(1,1,0);
		scrollToTop();
		init(1,0);
		
		loadCarousel('services-slider',1);
		AOS.init({
			easing: 'ease-in-out-sine'
		});
	}
}
function loadpages(m,s,b,mb){
	if(load3==1 && load4==1){
		if(msieversion()) {
            $('.loader').css({opacity: 0.0, visibility: "hidden"}).animate({opacity: 1.0}, 200);
            $('.o-wrapper').css({opacity: 0.0, visibility: "visible"}).animate({opacity: 1.0}, 200);
        }else{


			$('.loader').addClass('fade-out');
			$('.o-wrapper').addClass('fade-in');

		}
		loadBanner(s,m,mb);
		scrollToTop();
		init(m,mb);
		if(m==4 && mb==2){
			loadCarousel('projects-slider',m);
		}
		if(m==2){
			loadCarousel('about-slider',m);
		}
		AOS.init({
			easing: 'ease-in-out-sine'
		});
	}
}
function loadBanner(t,m,mb){
	if(t>0){
		$('#pager article').removeAttr('id');
		$('#pager article').eq(0).attr('id','activeSlide');
		var cycle=$('.banner-slideshow ul').cycle({
			fx: 'fade',
			slideResize: 0,
			timeout: 3000,
			speed: 3000,
			fastOnEvent: 1500,
			pause: 1,
			prev: '#prev',
			next: '#next',
			onPrevNextEvent: function(isNext, slideNum) {
				$('#pager article').removeAttr('id');
				$('#pager article').eq(slideNum).attr('id','activeSlide');
			},
			after: function(currSlideElement, nextSlideElement, options, forwardFlag) {
				/*var index = nextSlideElement.id;
				$('#pager article').removeAttr('id');
				$('#pager article').eq(index).attr('id','activeSlide');*/
				var index = nextSlideElement.id;
				$('#pager article').removeAttr('id');
				$('#pager article').eq(index).attr('id','activeSlide');
			}
		});

		if(isMobileDev()){
			$('#pager').swipe( {
				//Generic swipe handler for all directions
				swipe:function(event, direction, distance, duration, fingerCount, fingerData) {
					if(direction=='left'){
						$('#prev').click();

					}else{
					if(direction=='right'){
						$('#next').click();
					}else{
						return false;
					}
					}
				},
				allowPageScroll: "vertical",
				//Default is 75px, set to 0 for demo so any distance triggers swipe
			   threshold:0
			});
		}
		$('.banner-slideshow ul').swipe( {
			//Generic swipe handler for all directions
			swipe:function(event, direction, distance, duration, fingerCount, fingerData) {
				if(direction=='left'){
					$('#prev').click();

				}else{
				if(direction=='right'){
					$('#next').click();
				}else{
					return false;
				}
				}
			},
			allowPageScroll: "vertical",
			//Default is 75px, set to 0 for demo so any distance triggers swipe
		   threshold:0
		});


		$('#pager article a').hover(function(e) {
			e.preventDefault();
			var index=$(this).parent().index();
			if(index>0){
				$('#pager article').eq(index-1).find('img').attr('id','move-image-100');
			}
		},function(e) {
			e.preventDefault();
			var index=$(this).parent().index();
			if(index>0){
				$('#pager article').eq(index-1).find('img').removeAttr('id');
			}

        });
		//$('#pager').jqDock();

		$('#pager article a').click(function (event) {
			var index=$(this).parent().index();
			$('.banner-slideshow ul').cycle(index);
			$('#pager article').removeAttr('id');
			$('#pager article').eq(index).attr('id','activeSlide');
			return false;
		});

		$.fn.fullscreen = function () {
			if(m==1){
				var viewportHeight = $(window).height();
			}else{
				var viewportHeight = 500;
			}
			var viewportWidth = $(window).width();
			$(this).css({
				'height': viewportHeight,
				'width': viewportWidth
			});
		};
		$.fn.stopfullscreen = function () {
			var viewportHeight = 500;

			var viewportWidth = $(window).width();
			$(this).css({
				'height': viewportHeight,
				'width': viewportWidth
			});
		};
		if($(window).width()>1100){$(".banner-slideshow, .banner-slideshow li").fullscreen();}else{$(".banner-slideshow, .banner-slideshow li").stopfullscreen();}
		$(window).resize(function () {
			if($(window).width()>1100){$(".banner-slideshow, .banner-slideshow li").fullscreen();}else{$(".banner-slideshow, .banner-slideshow li").stopfullscreen();}
		});
		$(window).trigger('resize');
	}
}
function loadCarousel(id,m){
	var owl1 = $("#"+id), i=1,j=1,k=1,nav=true;

	switch(m){
		case 1:
			if(isMobileDev()){
				i=1; j=1; k=1;
				$('.services__content .item').attr('id','active');
			}else{
				i=1; j=2; k=3;
			}
			break;
		case 2: i=1; j=2; k=3; break;
		case 4: i=1; j=2; k=2; nav=false; break;
	}

	owl1.owlCarousel({
		nav:nav,
		navText : ["",""],
		items:k,
		autoWidth:false,
		dots: false,
		responsive:{
			0:{
				items:i,
				slideBy: i
			},
			600:{
				items:i,
				slideBy: i
			},
			771:{
				items:j,
				slideBy: j
			},
			922:{
				items:k,
				slideBy: k
			},
			1285:{
				items:k,
				slideBy: k
			}
		}
	});

	if(m==1){
		var owl = $("#works-container");
		owl.owlCarousel({
			loop:true,
			autoplay:true,
			autoplayTimeout:3000,
			autoplayHoverPause:true,
			nav:false,
			navText: ["", ""],
			//slideBy: 4,
			dots: false,
			margin:30,
			//autoWidth:true,
			responsive:{
				0:{
					items:1,
					slideBy: 1
				},
				650:{
					items:2,
					slideBy: 2
				},
				922:{
					items:3,
					slideBy: 3
				}
			}
		});
		var myTimeOut;
		$('.services__content .owl-carousel .owl-item').hover(function(e) {

			if($(this).find('.item').attr("id") != 'active') {
				var myindex =  $(this).index(), myindex1, myindex2;
				myindex=parseInt(myindex)+1;
				switch(myindex){
					case 1: myindex1=2; myindex2=3; break;
					case 2: myindex1=1; myindex2=3; break;
					case 3: myindex1=1; myindex2=2; break;
				}
				if(myindex!=1){ clearTimeout(myTimeOut); $('.services__content .owl-carousel .item').removeAttr('id'); }
				myTimeOut=setTimeout(function(){
					$('.services__content .owl-carousel .item').removeAttr('id');
					$('.services__content .owl-carousel .owl-item:nth-child('+myindex+') .item').attr('id','active');
					$('.services__background:nth-child('+myindex+')').attr('id','active');
					setTimeout(function(){$('.services__background:nth-child('+myindex1+'), .services__background:nth-child('+myindex2+')').removeAttr('id');},100);
				},1000);
			}

		},function(){
			clearTimeout(myTimeOut);
			var myindex =  $(this).index();
			myindex=parseInt(myindex)+1;
			$('.services__content .owl-carousel .item').removeAttr('id');
			if(myindex!=1){
				/*$('.services__background:nth-child(1)').attr('id','active');
				$('.services__content .owl-carousel .owl-item:nth-child(1) .item').attr('id','active');*/

				$('.services__content .owl-carousel .item').removeAttr('id');
				//$('.services__content .owl-carousel .owl-item:nth-child(1) .item').attr('id','active');
				$('.services__background:nth-child(1)').attr('id','active');
				setTimeout(function(){$('.services__background:nth-child(2), .services__background:nth-child(3)').removeAttr('id');},100);

			}
		});

	}
}
function loadMore(){
	$.ajax({
		url: test+"loadmoreClients/" + $(".row-group article:last").attr("id"),
		success: function(html){
			if($(html).filter('#finish').val()!=1){
				$(".row-group").append(html);
			}else{
				$(".row-group").append(html);
				$('#loadmorebutton').hide();
				$('#loadmorebutton').replaceWith('<div id="loadmorebutton"><a href="javascript:void(0)"><?php echo getstring(63);?></a></div>');
			}
		}
	});
}
function getGallery(i,pos){
	$("#lightgallery_"+i).lightGallery({thumbnail:false, download:false});
	$("#lightgallery_"+i+" a")[pos].click();
}

function scrollToTop(){
	var amountScrolled = 300;

	$(window).scroll(function() {
		if ( $(window).scrollTop() > amountScrolled ) {
			$('#back-top').removeClass('bounceOut').addClass('bounceIn');
		} else {
			$('#back-top').removeClass('bounceIn').addClass('bounceOut');
		}
	});
	$('a.back-to-top').click(function() {
		$('html, body').animate({
			scrollTop: 0
		}, 700, function () {
			$('#back-top').removeClass('bounceIn').addClass('bounceOut');
    	});
		return false;
	});
}
function fixHeight(elem,wid){
    if($(window).width()>wid){
		var maxHeight = 0;
		$(elem).css('height','auto');
		$(elem).each(function(){
		   if ($(this).height() > maxHeight) { maxHeight = $(this).height(); }
		});
		$(elem).height(maxHeight);
	}else{
		$(elem).height('auto');
	}
	$(window).resize(function() {
		if($(window).width()>wid){
			var maxHeight = 0;
			$(elem).css('height','auto');
			$(elem).each(function(){
			   if ($(this).height() > maxHeight) { maxHeight = $(this).height(); }
			});
			$(elem).height(maxHeight);
		}else{
			$(elem).height('auto');
		}
	});
}
function refreshCaptcha() {
	var img = document.images['captchaimg'];
	img.src = test1+"cap/"+(Math.floor(Math.random() * 90000) + 10000);
}
function msieversion() {
        var ua = window.navigator.userAgent;
        var msie = ua.indexOf("MSIE ");

        if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)){      // If Internet Explorer, return version number
			return true;
		}else{                 // If another browser, return 0
			return false;
		}
   return false;
}
function isMobileDev(){ 
    if ( (navigator.userAgent.indexOf('Android') != -1) ||      
		 (navigator.userAgent.indexOf('BlackBerry') != -1) || 
		 (navigator.userAgent.indexOf('iPhone') != -1) || 
		 (navigator.userAgent.indexOf('iPod') != -1) || 
		 (navigator.userAgent.indexOf('Nokia') != -1) || 
		 (navigator.userAgent.indexOf('LG') != -1) || 
		 (navigator.userAgent.indexOf('Samsung') != -1) || 
		 (navigator.userAgent.indexOf('Sony') != -1) || 
		 (navigator.userAgent.indexOf('PlayBook') != -1) || 
		 (navigator.userAgent.indexOf('SonyEricsson') != -1) || 
		 (navigator.userAgent.indexOf('SIE-') != -1) || 
		 (navigator.userAgent.indexOf('Motorola') != -1) || 
		 (navigator.userAgent.indexOf('iPad') != -1)) {
		
		return true;
	}else{
		return false;
	}
}
function isEmail(str) {
return (str.indexOf("@") > 0);
}
function resizeIframe(obj) {
	obj.style.height = obj.contentWindow.document.body.scrollHeight + 'px';
	$(window).resize(function () {
		obj.style.height = obj.contentWindow.document.body.scrollHeight + 'px';
	});
}
function fbs_click(u,t,d,i) {
	window.open('http://www.facebook.com/sharer.php?s=100&p[title]='+encodeURIComponent(t)+'&p[summary]='+encodeURIComponent(d)+'&p[url]='+encodeURIComponent(u)+'&p[images][0]='+encodeURIComponent(i)+'','sharer','toolbar=0,status=0,width=580,height=325');
	return false;
}
function twit_click(u,t) {
	window.open('http://twitter.com/home?status=Check '+encodeURIComponent(t)+' on Karianet website '+encodeURIComponent(u)+'&t='+encodeURIComponent(t),'sharer','toolbar=0,status=0,width=626,height=436');
	return false;
}
function gplus_click(u) {
	window.open('https://plus.google.com/share?url='+encodeURIComponent(u),'share','toolbar=0,status=0,width=626,height=436');
	return false;
}