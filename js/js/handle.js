/**

*/

define(['jquery','cookie'],function($){
		var lilength = $('.mygou1 .noneCon li').length*24;
			console.log(lilength)
		$('.btnHide').click(function(){
			$('.adTop').fadeOut(400);
		});
		// 登录与免费注册
		//读取cookie，判断用户是否登录，填充信息
		var userinfo = $.cookie('userinfo');
		
		//如果有用户信息
		if(userinfo){
			//将json字符串转化为json对象
			userinfo = JSON.parse(userinfo);
			//用户处于登录状态,更改信息
			if(userinfo.login_status){
				$('.user_information').html( userinfo.account + '，<a href="javascript:;" class="logout">退出</a>' );
			}else{
				$('.user_information').html( userinfo.account + '，<a href="login.html" style="margin-right:5px">请登录</a>,<a href="register.html">免费注册</a>' );
			}
		}
		console.log(userinfo);
		//退出
		$('.logout').click(function(){
			var info = {
				account: userinfo.account,
				login_status: 0
			};
			$.cookie('userinfo',JSON.stringify(info),{expires: 365,path: '/'});
			location.href = "login.html";
		});
		// 我的麦乐购
		$('.souRight .mygou1').mouseenter(function(){
			$('.mygou1 .noneCon')
			.css({
				'display':'block',
				'border' :'1px solid #ccc',
				'border-top':'none'
			})
			.stop(true).animate({'height':lilength},500);
			$(this).css({
				'border-bottom':'none',
				'border':'1px solid #ccc',
				'background': '#fff'
			});
		});
		$('.souRight .mygou1').mouseleave(function(){
			$('.mygou1 .noneCon')
			.stop(true)
			.animate({
				'height':'0'
		    },300,function(){
		    	$(this).css(
		    	{
		    		'display':'none'
		    	});
		    	$('.souRight .mygou1').css({

				
				'border':'1px solid #f5f5f5',
				'border-bottom':'1px solid #eee',
				'background': '#f5f5f5',
				'top':'-1'

			});
		    });
			
			
		});
		// 手机麦乐购
		
		$('.souRight .mygou2').mouseenter(function(){
			$('.mygou2 .noneCon')
			.css({
				'display':'block'
			})
			.stop(true).animate({'height':'140'},500);
			$(this).css({
				'border-bottom':'none',
				'border':'1px solid #ccc',
				'background': '#fff'
			});
		});
		$('.souRight .mygou2').mouseleave(function(){
			$('.mygou2 .noneCon')
			.stop(true)
			.animate({
				'height':'0'
		    },300,function(){
		    	$(this).css(
		    	{
		    		'display':'none'
		    	});
		    	$('.souRight .mygou2').css({

				
				'border':'1px solid #f5f5f5',
				'border-bottom':'1px solid #eee',
				'background': '#f5f5f5',
				'top':'-1'

			});
		    });
			
			
		});
		
});