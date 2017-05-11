require(['../config'],function(){
	require(['jquery','cookie'],function(){
		$('input').focus(function(){
			$(this).css({
				'border-color':'blue'
			})
		}).blur(function(){
			$(this).css({
				'border-color':'rgb(222,222,222)'
			});
		});
		$('#userLogin').click(function(){
			var account = $('#user').val();
			var psw = $('#pass').val();
			if (account == '') {
		
				$('#user').focus().next().html("用户名不能为空");
				console.log($('.usersname-err'));
				return;
			}
			if( account != '' && psw ==''){
		
				$('#pass').focus().next().html("密码不能为空");;
				
				return;
			}
			$.ajax({
				type:'post',
				url:'http://10.9.151.199/PC-Project-Admin/login.php',
				data:{
					account:account,
					password:psw

				},
				dataType:'jsonp',
				success:function(result){
					console.log(result);
					if (result.status) {
						alert('登陆成功');
						var userinfo = {
							account:account,
							login_status:1
						};
						$.cookie('userinfo',JSON.stringify(userinfo),{expires:365,path:'/'});
						location.href = "index.html";
					}else{
						alert('登陆失败');
					}
				}
			});

		});
	});
});
	/*var isLogin = true ;
	$('#user').onblur(function(){
		if ($('#user').val() != "") {
			$('.usersname-err').html("");
		}
	});
	$('#psw').onblur(function(){
		if ($('#psw').val() != "") {
			$('.psw-err').html("");
		}
	});
	$('#code').onblur(function(){
		if ($('#code').val() != "") {
			$('.code-err').html("");
		}else{
			$.get('/user/CheckVerfyCode.do?code='+$("#code").val(),function(data){
				if (data == "ok") {
					$(".code-err").html("");
				}else{
					isLogin = false;
					$("#code-err").html("验证码有误，请重新输入");
					return false;
				}
			})
		}
	});
	var flushRegVCode = function(){
		var Vcode = Math.random()
		document.getElementById("Reg_img_verifyCoe").src="verifyImg.aspx?=" + Vcode;
}
var submitVaild = function(){
	if(('#user').val() == ""){
		$('.usename-err').html('请输入账号');
		$('#user').focus();
		$('.psw-err').html("");
		$('.code-err').html("");
		return false;	
	}
	return true;
}
$(.btn).click(function(){
	 submitVaild();
});
  

function FnonlyNum(obj){
	var re = /^\d+$/;
	if(!re.test(obj.val())){
		obj.val('');
	}
}
FnonlyNum($('#user'));
FnonlyNum($('#pwd'));
FnonlyNum($('#code'));

*/