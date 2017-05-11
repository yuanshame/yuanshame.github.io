define(["jquery"],function($){
	var Zoom={
	    jqzoom : $('.jqzoom'),
		zimg : $('.zimg'),
		filter : $('.filter'),
		bimg : $('.bigbox .bimg'),
		simg : $('.list-h li img'),
	
		init:function(){
			var _this=this;
			_this.move();
			_this.btn();
		
		},
		move:function(){
			var ol=$('.jqzoom').offset().left;
			var ot=$('.jqzoom').offset().top;
			$('.jqzoom').mouseenter(function(){
					$('.filter').css({"display":"block"});
					$('.bigbox').css({"display":"block"});
					$('.jqzoom').on('mousemove',function(e){
						var l=e.pageX-ol-87.5;
						var t=e.pageY-ot-87.5;
						//边界处理
						l = l < 0 ? 0: (l > 175 ? 175 : l);
						t = t < 0 ? 0: (t > 175 ? 175 : t);
						//更改滤镜位置
						$('.filter').css({
							'left':l,
							'top':t
						});
						
						//更改大图位置
						$('.bimg').css({
							left:-2*l,
							top:-2*t
						});
						//鼠标经过显示滤镜和大图盒子
				
				}).mouseleave(function(){
					$('.filter').css({"display":"none"});
					$('.bigbox').css({"display":"none"});
				});
			});
		},
		btn:function(){
			$('.list-h li').on('mouseover','img',function(e){
			
				var _this=this;
				var src=$(this).attr("src");
				var bsrc=$(this).attr("bimg");
				
				$('.zimg').attr({"src":src});
				$('.bimg').attr({"src":bsrc});
				
				$('.list-h li img').removeClass('active')
				$(this).addClass('active');
			});
			var index = 0;
			$('.next').click(function(){
				index++;
				
				if(index > $('.list-h li img').length - 4){
					index = $('.list-h li img').length - 4;
					return;
				}
				$('.list-h').stop()
				.animate({
					'left': -index*61
				});
				});
				
	
			$('.prev').click(function(){
				index--;
				if(index < 0){
					index = 0;
					return;
				}
				$('.list-h').stop()
				.animate({
					'left': -index*61
				});
			});
		}	
		
		







	}
	Zoom.init();
})



