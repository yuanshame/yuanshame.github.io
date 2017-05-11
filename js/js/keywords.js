

define(['jquery'],function($){
var input = $("#search_key");
console.log(input);
console.log(input.val());
var keyword = $(".keyword");
var btn = $(".sub");

// 点击跳转
    keyword.hide();
	btn.click(function(e){
		e.stopPropagation();
		var value = input.val();
		console.log(value);
		window.location.href = 'http://www.baidu.com/s?wd='+value;
	});
	input.on( 'input',function(){
		keyword.show();
		index = -1;
		jsonp();
	});
	function jsonp(){
		var value = input.val();
		var script = document.createElement('script');
		script.src = 'http://suggestion.baidu.com/su?wd='+value+'&cb=getDate';
		document.body.appendChild(script);
		script.onload = function(){
			script.remove();
		}
	}
	window.getDate = function(data){
		console.log(data);
		var value = input.val();
		console.log
		var con = "";
		for(var i in data.s){
			var das = data.s[i].substr(value.length);
			con += `
			<li>${value}${das}</li>`;
		}
		keyword.html(con);
		}

       
        keyword.on('click','.keyword li',function(){
        	var concon = '';
        		concon += $(this).html();
        		console.log(this);
        		console.log(concon);
        		input.val(concon);

        	
        	keyword.hide();
 
        });
       	keyword.show();
       	document.onclick = function(){
       		keyword.hide();
       		}
       	input.on('bluer',function(){
       		keyword.hide();
       	});
       	input.click(function(e){
       		e.stopPropagation();
       	});

       	var index = -1;
       	document.onkeydown = function(e){
       		e = e || e.event;
       		var li = document.querySelectorAll('.keyword li');
       		var code = e.keyCode || e.which;
       		console.log(code);
       		// 按上键
       		if (li.length > 0 && code == 38) {
       			index--
       			if ( index < 0) {
       				index = li.length;
       			}
       			for (var i = 0; i < li.length; i++) {
       				li[i].style['background-color'] = "#fff";
       			}
       			li[index].style['background-color'] = "#ccc";
       			console.log(li[index].innerHTML);

       			input.val(li[index].innerHTML); 
       		}
       		// 按下键
       		if (li.length > 0 && code == 40) {
       			index++
       			if (index >= li.length ) {
       				index = - 1 ;
       			}
       			for (var i = 0; i < li.length; i++) {
       				li[i].style['background-color'] = "#fff";
       			}
       			li[index].style['background-color'] = "#ccc"; 
       			input.val(li[index].innerHTML);  
       		}
       		// 按Enter键页面跳转
       		var zval = input.val();
       		console.log(zval);
       		if (zval.length != 0 && code == 13) {
		    window.location.href = 'http://www.baidu.com/s?wd='+input.val();	
       	 	}
       	}


});	
