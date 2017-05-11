/**
	处理图表
*/

define(['jquery'],function($){
	// 导航滑动洗标自动
		 $('.navMian-list .navlist').mouseenter(function(e){
		 		var onleft = noffset(this);
		 		var onwidth = $(this).find('a').width();
		 		$('.navMian-list .onBg')
		 		.stop(true)
		 		.animate({
		 			left:onleft,
		 			width:onwidth

		 		});
		 });
		 $('.navMian-list .navlist').mouseleave(function(e){	 		
		 		$('.navMian-list .onBg')
		 		.stop(true)
		 		.animate({
		 			left:0,
		 			width:32

		 		});
		 });
		 function noffset(elem){
		 	return elem.offsetLeft;
		 }
		 // 二级导航菜单
		 $('.menuBox .nav-list li').mouseenter(function(){
			 	var biao = $(this).index();
			 	$('.menu-con .sub-pannel')
			 	.eq(biao)
			 	.show()
			 	.stop(true)
			 	.animate({
			 		'opacity': 0.98,
			 		'left':180
			 	},300)
			 	.siblings()
			 	.hide()
			 	.stop()
			 	.animate({
			 		'opacity': 0.5,
			 		'left':170
			 	})
		    })
		    $('.menuBox').mouseleave(function(){

			 	$('.menu-con .sub-pannel')
			 	.hide()
			 	.stop()
			 	.animate({
			 		'opacity': 0.5,
			 		'left':170
			 	})
		     })
		 // 新用户蒙层
		 $('.winClose').click(function(){
		 	$('.newUser').fadeOut();
		 	$('.scratchMask').fadeOut();
		 })

		
});
