define(['jquery'],function($){
		var banner = {
			btn:$('.pic-opera .marketBtn li'),
			mPic:$('.menu-content .market-silde'),
			picSlide:$('.pic-slide'),
			timer:null,
			now:0,
			next:0,
			init:function(){
				this.mPic.eq(0).show();
				this.btn.eq(0).css({top:-8});
				this.autoSwitch();
				this.picBtn();
			},
			autoSwitch:function(){
				var _this = this;
				this.timer = setInterval(function(){			
					_this.next++;
					_this.next %= _this.mPic.length;
					_this.switch();
				},3000);
			},
			picBtn:function(){ 
				var _this =this;
				this.btn.mouseenter(function(){
					clearInterval(_this.timer);
					$(this)
					.stop()
					.animate({
						top:-8
					})
					.siblings()
					.stop()
					.animate({
						top:0
					});

					_this.mPic
					.eq($(this).index())
					.stop()
					.fadeIn(1000)
					.siblings()
					.stop()
					.fadeOut(1000);

					_this.next = $(this).index();
					_this.now = $(this).index()-1;
				}).mouseleave(function(){
					_this.autoSwitch();
				})
			},
			switch:function(){
				var _this =this;

				this.btn
				.eq(_this.next)
				.stop()
					.animate({
						top:-8
					},1000)
					.siblings()
					.stop()
					.animate({
						top:0
					},1000);

				var color = this.mPic.eq(this.next).find('img').attr('data-bg');
				this.mPic.eq(this.next).parents('.pic-slide').stop().animate({'background':color},1000);

				this.mPic.eq(this.now)
				.stop()
				.fadeOut(1000,function(){
					_this.mPic.eq(_this.now)
					.find('img')
				    .removeClass('banner');
				})
				
				this.mPic.eq(this.next)
				.stop()
				.fadeIn(1000,function(){
					_this.now = _this.next;
				})
				.find('img')
				.addClass('banner');


					
			}

		}

	
     banner.init();
	

   
})
