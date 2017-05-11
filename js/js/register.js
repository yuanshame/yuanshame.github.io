require(['../config'],function(){
	require(['jquery'],function($){
		$('input').focus(function(){
			$(this).css({
				'border-color':'blue'
			})
		}).blur(function(){
			$(this).css({
				'border-color':'rgb(222,222,222)'
			});
		});
		// event.preventDefault();
		// 注册处理
		var  regStatus = {
			phone:false,
			psw:false,
			repsw:false,
			check:false

		}
		var phoneInput = $('#reguser'),
			pswInput = $('#regpass'),
			rePsw=$('#re_pass'),
			regBtn=$('.regbtn'),
			checktrue= $('.checkbox');
		var regPhone = /^1[3578]\d{9}/;
		phoneInput.on('blur',function(){
			var phone = phoneInput.val();
			regStatus.phone = true;
			if (!regPhone.test(phone)) {
				$('.phone-err').html('您输入的手机号码格式错误，请重新输入!');
				regStatus.phone = false;
				return;
			}/*else{
				$('.phone-err').html('可以使用');
			}*/
			$.ajax({
				url:'http://10.9.151.199/PC-Project-Admin/checkAccount.php',
				data:{
					account:phone
				},
				dataType: 'jsonp',
				success:function(result){
					if (result.status) {
						$('.phone-err').html('用户名可用');
					}else{
						$('.phone-err').html('用户名存在');
						regStatus.phone =  false;
					}
				}
			})
		});
		var regPsw = /^[\w!@#$%^*_+]{6,16}$/;
		pswInput.on('input',function(){
			var psw = pswInput.val();
			regStatus.psw = true;
			if (!regPsw.test(psw)) {
				$('.pwd-err').html('密码不合法（6-16）位数字字母组合');
				regStatus.psw = false;
				return;
			}else{
				$('.pwd-err').html('密码可用');
			}

		});
		rePsw.on('blur',function(){
			var psw = pswInput.val();
			var reword = rePsw.val();
			regStatus.repsw = true;
			if (psw != reword) {
				$('.repwd-err').html('两次密码不一样');
				regStatus.repsw = false;
				return;
			}
		});
		checktrue.prop('checked',true)
		regStatus.check = checktrue.prop('checked');

		checktrue.click(function(){
	    regStatus.check = checktrue.prop('checked');
        
		if (!regStatus.check) {
			regBtn.css({
				"background":"#ccc"	
			});
	
				return;
		}else{
			regBtn.css({
				"background":"red"	
			});
		}
		});
		regBtn.click(function(){
			for(var i in regStatus){
				console.log(regStatus[i]);
				if(!regStatus[i]){
					alert('部分数据不合法');
					return;
				}
			}
			$.ajax({
				type:'post',
				url: 'http://10.9.151.199/PC-Project-Admin/register.php',
				data:{
					account:phoneInput.val(),
					password:pswInput.val()
				},
				dataType:"jsonp",
				success:function(result){
					if (result.status) {
						location.href="http://localhost:8080/login.html";
					}else{
						alert('注册失败');
					}
				}
			});
		});
		


	})
})