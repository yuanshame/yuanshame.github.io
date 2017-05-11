/*
 -- Author: WJ
 -- Date: 2014-04-20
 -- LastDate:2014-07-29 
 -- Note: HTML5版
*/

/* 公共变量  */

var carTimer=null;
var appTimer=null;
var myTimer=null;
var isHidden = true;       //是否有消失效果 true 有消失效果 false 没有消失效果
var hidden_msec = 1000;   //隐藏间隔毫秒数 越大渗入越慢
var show_msec = 1000;     //显示间隔毫秒数  越大渗入越慢
var step_time = 5000;   //显示时间
var po_now=0;
var Timer=null;
var hbTimer=null;
var topicTimer=null;
var temp=null;
var n=0;
var m=0;
var anum=1;
var ulBoxNum=0;
var hotGoodsTimer=null;
var rightNavTimer=null;
/*以下是首页JS交互，不同交互之间有两行空行  */

if(getCookie('hideAd') == 'none'){
    $('.adTop').css('display','none');
}else{
    $('.adTop').css('display','block');
}

function hideAd(){//页面最顶层广告的隐藏
	var adTop=getByClass('adTop')[0];
	var x=adTop.getElementsByTagName('span')[0];
	adTop.style.display="none";	
	setCookie('hideAd','none',1)
};

$(function(){//首页我的麦乐购
	$('.myMgo').mouseenter(function(ev){
		var ev = ev || window.event;
		var a = this, b = ev.relatedTarget;
	
		myTimer=setTimeout(function(){
			$('.myMgo ul').fadeIn();
			$('header .top').css('zIndex',-1);
			$('.myMgo').css('zIndex',999);
			$('.myMgo ul').css('border','1px solid #ccc');
			$('.myMgo ul').css('borderTop','none');
			$('.myMgo').css('border','1px solid #ccc');
			$('.myMgo').css('borderBottom','none');
			$('.myMgo').css('backgroundColor','#fff');
		},500);	
	});
	$('.myMgo').mouseleave(function(ev){
		var ev = ev || window.event;
		var a = this, b = ev.relatedTarget;
		clearTimeout(myTimer);
		if( !elContains(a,b) && a!=b ){
			$('.myMgo ul').css('display','none');
			$('header .top').css('zIndex',0);
			$('.myMgo').css('zIndex',0);
			$('.myMgo').css('border','none');
			$('.myMgo').css('backgroundColor','#f6f6f6');
		}
	});
});

$(function(){//搜索下拉框
	$('.search .txt').focus(function(){
		$('.search .matchList').css('display','block');
	});
	$('.search .txt').blur(function(){	
		$('.search .matchList').css('display','none');
	});
});

$(function(){//购物车
	$('.shopCar').mouseenter(function(ev){
		var ev = ev || window.event;
		var a = this, b = ev.relatedTarget;
		carTimer=setTimeout(function(){
			$('.carCon').css('zIndex',99)
			$('.carCon').fadeIn();
		},500);	
	});
	$('.shopCar').mouseleave(function(ev){
		var ev = ev || window.event;
		var a = this, b = ev.relatedTarget;
		clearTimeout(carTimer)
		if( !elContains(a,b) && a!=b ){
			$('.carCon').fadeOut();
		}
	});
});
$(function(){//手机下单
	$('.app').mouseenter(function(ev){
		var ev = ev || window.event;
		var a = this, b = ev.relatedTarget;
	
		appTimer=setTimeout(function(){
			$('.code').fadeIn();
			$('.code').css("zIndex",9999)
			$('.shopCar').css("zIndex",-111)
		},500);
	});
	$('.app').mouseleave(function(ev){
		var ev = ev || window.event;
		var a = this, b = ev.relatedTarget;
		clearTimeout(appTimer)
		if( !elContains(a,b) && a!=b ){
			$('.code').fadeOut(function(){
				$('.code').css("zIndex",33)
				$('.shopCar').css("zIndex",0)
			});
		}
	});
});
$(function(){//总导航

    function setMouseHover($curr,$nav){
        $nav.siblings().find('div:first[data-backgroundColor]').each(function(){
            var $that = $(this);  
            $that.css("backgroundColor",$that.attr("data-backgroundColor")).siblings('.navInfo').hide();
            setMouseOut($that);
        });
        //temp = $curr.css("backgroundColor");
        if(!$curr.attr("data-backgroundColor")){
            $curr.attr("data-backgroundColor",$curr.css("backgroundColor"));
        }

        $curr.siblings('.navInfo').show();
            
        //$('.navInfo').eq($this.index()).css("display","block");
		$curr.css("backgroundColor","#fff");
		$curr.css("border","1px solid #000000");
		$curr.css("borderRight","1px solid #fff");
		$curr.css("position","relative");
		$curr.css("height","44px");	
		$curr.css("zIndex","99");
        
		if($nav.index()==0){
			$curr.css("borderTop",null);
			$curr.css("height","44px");
		}
        _displayOriginalImg($nav);  
    }

    function setMouseOut($curr){
        $curr.siblings('.navInfo').hide();
        //$('.navInfo').eq($this.index()).css("display","none");
        $curr.css("backgroundColor",$curr.attr("data-backgroundColor"));
		$curr.css("border",0);
		$curr.css("position",null);
		$curr.css("height","46px");
		$curr.css("zIndex",-1);
    }

    //首页导航菜单延迟 xxx 毫秒响应 by sunrui 2015-02-03
    var hoverNavTimer,navDuration = 300;
    $(".navUl li").hover(function(){
        var $this = $(this);
        var $curr = $this.find('div').eq(0);

        hoverNavTimer = setTimeout(function(){

            setMouseHover($curr,$this);

        },navDuration);

    },function(){
        var $this = $(this);
        var $curr = $this.find('div').eq(0);

        clearTimeout(hoverNavTimer);
        setMouseOut($curr);

    });
});

if($('.overBox1').find('div').height()>425){
		$('.arrTop').css('display','block');
		$('.arrBot').css('display','block');
}else{
		$('.arrTop').css('display','none');
		$('.arrBot').css('display','none');		
}

$('.assList p').mouseover(function(){
	var temp=$(this).index()-1;	
	var tempBox=$(this).parent().parent().siblings('.listDiv').find('.overBox ');
	tempBox.css('display','none');
	tempBox.eq(temp).css('display','block');
	
	if(tempBox.eq(temp).css('display')=='block'){
		var t=tempBox.eq(temp).find('.overBox1');
		if(t.find('div').height()>425){
			$(t).siblings('.arrTop').css('display','block');
			$(t).siblings('.arrBot').css('display','block');
		}else{
			$(t).siblings('.arrTop').css('display','none');
			$(t).siblings('.arrBot').css('display','none');		
			
		}
	}
	$(this).parent().find('a').css('backgroundColor','#eeeff2');
	$(this).parent().find('a').css('color','#444');
	$(this).css('backgroundColor','#e1e1e1')
	$(this).find('a').css('backgroundColor','#e1e1e1');	
	$(this).find('a').css('color','#000');
	$(this).parent().find('.indIcon').css('top', $(this).index()*30-17);
   
    _displayOriginalImg(tempBox.eq(temp));
  
});

$(function(){//F层横向导航
	$('.tabTit li').mouseover(function(){
		var n=$(this).index();
		$(this).siblings().removeClass('on');
		$(this).addClass('on');
		$(this).parent().parent().next().children().css('display','none');
		$(this).parent().parent().next().children().eq(n).css('display','block');
    
        _displayOriginalImg($(this).parent().parent().next().children().eq(n));
    
	});
});

$('.arrTop').click(function(){	//F1层nav ↑	
	var temp=$(this).next().children('div').css('top');	
	var n=parseInt($(this).next().attr('number'));	
	if( parseInt($(this).next().children('div').css('top'))<= -($(this).next().children('div').height()-445) ){
		$(this).next().children('div').css('top', -temp);
				
	}else{		
		if(!$(this).next().children('div').is(":animated")){
			n=n+1;			
			$(this).next().children('div').animate({top:-100*n});	
			$(this).next().attr('number',n);
		}else{
			return;
		}
	}	
});
$('.arrBot').click(function(){	//F1层nav  ↓
	var temp=$(this).prev().children('div').css('top');
	var n=parseInt($(this).prev().attr('number'));
	if($(this).prev().children('div').css('top')>="0px"){
		$(this).prev().children('div').css('top',0);		
	}else{
		if(!$(this).prev().children('div').is(":animated")){
			n=n-1;
			$(this).prev().children('div').animate({top:-100*n});
			$(this).prev().attr('number',n);
		}else{
			return;
		}
	}
});

var tipicContTimer=null;
$('.tipicCont li').mouseover(function(ev){//首页热门专题
	var ev = ev || window.event;
	var a = this, b = ev.relatedTarget;	
	var This=this;
	tipicContTimer=setTimeout(function(){
		if( !elContains(a,b) && a!=b ){
			$(This).find('.label').animate({bottom:0});
		}		
	},300);		
});
$('.tipicCont li').mouseout(function(ev){
	var ev = ev || window.event;
	var a = this, b = ev.relatedTarget;	
	clearTimeout(tipicContTimer);
	if( !elContains(a,b) && a!=b ){
		$(this).find('.label').animate({bottom:-120});
	}	
});

var myOrderBoxTimer=null;
$('.myOrderBox .scList').mouseover(function(ev){//我的收藏页面
	var This=this;
			$(This).find('.scBtnDiv').show();
	
});
$('.myOrderBox .scList').mouseout(function(ev){
	var This=this;
		$(this).find('.scBtnDiv').hide();
		
});



function allhover(){
	if($('.indexLeftNav').css('display')=='none'){
		$('.indexLeftNav').css('display','block');
        $(".allh em").addClass("up");
	}	
};
function allhout(ev){		
	$('.indexLeftNav').css('display','none');	
    $(".allh em").removeClass("up");
};

$('.rightNav li').mouseover(function(){//首页右侧浮动层

	var This=this;
	rightNavTimer=setTimeout(function(){		
 
		if( $(This).index()!==4){
			
			$(This).find('div').fadeIn();	
		}		
	},500);

});
$('.rightNav li').mouseout(function(ev){//首页右侧浮动层
	var ev = ev || window.event;
	var a = this, b = ev.relatedTarget;	
	clearTimeout(rightNavTimer);
	if( !elContains(a,b) && a!=b ){
		$(this).find('div').fadeOut();	
	}
});

if(isIe6()&&$('.rightNav')){
	$('.rightNav').css('position','absolute');	
	$('.rightNav').css('top',$(window).height()+$(window).scrollTop()-$('.rightNav').height()-30)
}
window.onresize=window.onscroll=function(){	
    if($('.topSignMain').size()>0)
    {
	var temp=$('.topSignMain').offset().left+$('.topSignMain').width();	
	if(isIe6()){
		$('.rightNav').css('position','absolute');	
		$('.rightNav').css('top',$(window).height()+$(window).scrollTop()-$('.rightNav').height()-30)
	}
    }
 
};
 $(document).ready(function () {
	 $("#saleAdvisory").find('div').fadeIn();
});

$('.result li').mouseover(function(){//搜索结果鼠标滑过样式
	$(this).css('borderColor','#d2d2d2');
	$(this).css('borderBottomColor','#cb1e00');
});
$('.result li').mouseout(function(){
	$(this).css('borderColor','#fff');
});

$('.cycleRed .cycleList li').mouseover(function(){//周期购列表red鼠标滑过样式
	$(this).css('borderColor','#ffbfbf');
	$(this).css('borderBottomColor','#ffbfbf');
});
$('.cycleRed .cycleList li').mouseout(function(){
	$(this).css('borderColor','#fff');
});
$('.cycleBlue .cycleList li').mouseover(function(){//周期购列表Blue鼠标滑过样式
	$(this).css('borderColor','#65c5ff');
	$(this).css('borderBottomColor','#65c5ff');
});
$('.cycleBlue .cycleList li').mouseout(function(){
	$(this).css('borderColor','#fff');
});
$('.cycleGreen .cycleList li').mouseover(function(){//周期购列表Green鼠标滑过样式
	$(this).css('borderColor','#d2e292');
	$(this).css('borderBottomColor','#d2e292');
});
$('.cycleGreen .cycleList li').mouseout(function(){
	$(this).css('borderColor','#fff');
});
$('.cycleOrange .cycleList li').mouseover(function(){//周期购列表Orange鼠标滑过样式
	$(this).css('borderColor','#ffaa86');
	$(this).css('borderBottomColor','#ffaa86');
});
$('.cycleOrange .cycleList li').mouseout(function(){
	$(this).css('borderColor','#fff');
});

$('.sClik').click(function(){// 商品列表页左侧的“+”“-”点击
	if($('.navBox').eq($(this).index('.sClik')).css('display')=='block'){
		$('.navBox').eq($(this).index('.sClik')).css('display','none');
		$(this).css('backgroundPosition','0 -16px');
	}else{
		$('.navBox').eq($(this).index('.sClik')).css('display','block');
		$(this).css('backgroundPosition','0 0');		
	}
});

$('.hotSale').click(function(){//热卖商品与热评商品切换 
	var temp=$(this).index();
	for(var j=0;j<$('.hotSale').length;j++){
		$('.hotSale').eq(j).removeClass('on');
		$('.hotInfoBox').eq(j).css('display','none');
	}
	$(this).addClass('on');	
	$('.hotInfoBox').eq(temp).css('display','block');
});

$(function(){//商品列表页热卖商品轮播图
          function init(){		  
              $(".recList .arrowRight").trigger('click'); 		   
          }
          var w=225;
	      var l=0;	  
	      var len=$(".goodsBox ul li").length*2; 
	
   	      $(".goodsBox ul").append($(".goodsBox ul").html()).css({'width':len*w, 'left': -len*w/2});   

  		  if($(".goodsBox ul li").length>8) {
              hotGoodsTimer=setInterval(init,8000);	
	          
  
	          $(".goodsBox ul li").hover(function(){
		           clearInterval(hotGoodsTimer);
		          },function(){
			          hotGoodsTimer=setInterval(init,8000);
	         });
  
	         $(".recList .arrowLeft").click(function(){
		         if($(window).width()<=1190){
			         l=parseInt($(".goodsBox ul").css("left"))+w*3; 	
		         }else{
			        l=parseInt($(".goodsBox ul").css("left"))+w*4; 	
		         }
		        showCurrent(l); 
	         });
	         $(".recList .arrowRight").click(function(){
		         if($(window).width()<=1190){
			         l=parseInt($(".goodsBox ul").css("left"))-w*3;  
		         }else{
	    	        l=parseInt($(".goodsBox ul").css("left"))-w*4;  
		         }
	            showCurrent(l);
	         });
	         function showCurrent(l){    
		        if($(".goodsBox ul").is(':animated')){ 
			        return;
		         }
		         if($(window).width()<=1190){		 

			         $(".goodsBox ul").animate({"left":l},500,function(){
				         if(l>=0){ 			 
					         $(".goodsBox ul").css("left",-len*w/2);   			   
				         }else if(l<=-(len-3)*w){				 		 		   
					         $(".goodsBox ul").css('left',0); 
				         }
			         }); 		 
		         }else{
			         $(".goodsBox ul").animate({"left":l},500,function(){
				         if(l>=0){ 			 
					         $(".goodsBox ul").css("left",-len*w/2);   			   
				         }else if(l<=-(len-4)*w){				 		 		   
					         $(".goodsBox ul").css('left',0); 
				         }
			         }); 	  
		         }
	         }

     }
});	

$('#brandMore').click(function(){//更多品牌的展开与收缩
	if(!$('.morea').hasClass('zhankai')){
		$('.disCountry').css('display','none')
		$('.morea').css('display','block')
		$('#brandMore').html('收缩品牌&nbsp;&nbsp;&and;');
		$('.morea').addClass('zhankai');
			
	}else{
		$('.disCountry').css('display','block')
		$('.morea').css('display','none')
		$('#brandMore').html('更多品牌&nbsp;&nbsp;&or;');
		$('.morea').removeClass('zhankai');	
	}
});

$('.result ul').css('height','100%')

/* 商品详情页  */
$('.spec-list ul li img').mouseover( function(){//商品小图鼠标滑过切换大图内容
	$('.spec-list ul li img').removeClass('imgHover');
	$(this).addClass('imgHover');
	$('.imgZoom img').attr('src',$(this).attr('src'));	
	$('.bigImgZoom img').attr('src',$(this).attr('src'));	
});

$('#imgZoom').mouseover(function(){//放大镜
	$('#magnifier').css('display','block');
	$('#bigImgZoom').css('display','block');
	
	var oImgZoom=document.getElementById('imgZoom');
	var oMagnifier=document.getElementById('magnifier');
	var oBigImgZoom=document.getElementById('bigImgZoom');
	var oImg=oBigImgZoom.getElementsByTagName('img')[0];

	$('#imgZoom').mousemove( function(ev){
		var ev = ev || window.event;	
		var L=ev.clientX-oImgZoom.offsetWidth-oMagnifier.offsetWidth+185;
		var T=ev.clientY-oImgZoom.offsetTop-oMagnifier.offsetHeight-150;
		//if( isIe7() || isIe8()){
		//	var L=ev.clientX-oImgZoom.offsetLeft-oMagnifier.offsetWidth-50;
		//	var T=ev.clientY-oImgZoom.offsetTop-oMagnifier.offsetHeight-50;
//		}
	//	if( isIe6()){
	//		var L=ev.clientX-oImgZoom.offsetLeft-oMagnifier.offsetWidth-100;
	//		var T=ev.clientY-oImgZoom.offsetTop-oMagnifier.offsetHeight-50;
	//	}	
		if(L<0){
			L=0
		}else if(L>oImgZoom.offsetWidth-oMagnifier.offsetWidth){
			L=oImgZoom.offsetWidth-oMagnifier.offsetWidth;
		}
		
		if(T<0){
			T=0
		}else if(T>oImgZoom.offsetHeight-oMagnifier.offsetHeight){
			T=oImgZoom.offsetHeight-oMagnifier.offsetHeight;
		}
		
		oMagnifier.style.left=L+"px";
		oMagnifier.style.top=T+"px";
		
		var scaleX = L/(oImgZoom.offsetWidth - oMagnifier.offsetWidth);
		var scaleY = T/(oImgZoom.offsetHeight - oMagnifier.offsetHeight);
		
		oImg.style.left = - scaleX * (oImg.offsetWidth - oBigImgZoom.offsetWidth) + 'px';
		oImg.style.top = - scaleY * (oImg.offsetHeight - oBigImgZoom.offsetHeight) + 'px';
		
	});	
});
$('#imgZoom').mouseout(function(){//鼠标离开放大镜的效果
	$('#magnifier').css('display','none');
	$('#bigImgZoom').css('display','none');
});

$('.al').click(function(){//购买数量
	if(anum==1){
		anum=1;
	}else{
		anum--;
	}
	$('.textNum').attr('value',anum);	
});
$('.ar').click(function(){	
	anum++;
	$('.textNum').attr('value',anum);	
});

$('.spec-list .arrowLeft').click(function(){//点击切换下方小图效果 单向
	if(ulBoxNum>$('.ulBox>ul>li').length-6){
		ulBoxNum=$('.ulBox>ul>li').length-6
	}else{
		ulBoxNum++;
		$('.ulBox ul').animate({left:-64*ulBoxNum},300);
	}
});
$('.spec-list .arrowRight').click(function(){	
	if(ulBoxNum<=0){
		ulBoxNum=0
	}else{
		ulBoxNum--;		
		$('.ulBox ul').animate({left:-64*ulBoxNum},300);
	}
});

$('.srWrite').click(function(){//关闭评论框
	$('.plDivWrite').css('display','none');	
});


$('.srAsk').click(function(){//关闭咨询框
	$('.plDivAsk').css('display','none');	
});

var comPhotoTimer=null;
$('.comPhoto a').click(function(){//评价晒图
	var temp=$(this).find('img').attr('src');
	$('.comPhoto a').removeClass('hover');
	$(this).addClass('hover');
	$(this).parent().find('span').css('display','block');
	$(this).parent().find('span').find('img')
});

//庞军伟 2014-12-18 根据Task-1304 陆佳建议详情页和列表页晒图图片都改为单击显示隐藏。
//开始-----------------
$('.comPhoto a').mouseout(function(ev){
	comPhotoTimer=setTimeout(function(){
		$('.bigView').css('display','none');		
	},800);
});
$('.comPhoto a').mouseover(function(){
	clearTimeout(comPhotoTimer);
});
$('.bigView').mouseover(function(){
	clearTimeout(comPhotoTimer);
});
$('.bigView').click(function(){
	$('.bigView').css('display','none');
});
//结束------------------


$('.carDiv .close').click(function(){//关闭购物车和一听试购浮层
	$('.carDiv').css('display','none');	
	$('#bgMask').css('display','none');	
});
$('.arriveTellFloat .close').click(function(){//关闭购物车和一听试购浮层
	$('.arriveTellDiv').css('display','none');	
	$('#bgMask').css('display','none');	
});
$('.arriveTell').click(function(){//点击到货通知
	$('.arriveTellDiv').css('display','block');
	$('#bgMask').css('display','block');
	$('#bgMask').css('height',$(document).height());	
});

$('.sureOrder input').eq(0).click(function(){//点击继续浏览
	$('.arriveTellDiv').css('display','none');	
	$('#bgMask').css('display','none');		
});
$('.orderSucess3 input').click(function(){//订阅成功点击确认关闭
	$('.orderSucess').css('display','none');
	$('#bgMask').css('display','none');	
});
$('.addCarDiv').css('left', ($(window).width()/2-235));
$('.addCarDiv').css('top', ($(window).height()/2-$('.addCarDiv').height()/2));
$('.arriveTellFloat').css('left', ($(window).width()/2-235));
$('.arriveTellFloat').css('top', ($(window).height()/2-$('.addCarDiv').height()/2));
$(window).resize(function(){//这几行代码都是居中设置
	$('.carDiv').css('left', ($(window).width()/2-235));
	$('.arriveTellFloat').css('left', ($(window).width()/2-235));
	if(isIe6()){
		$('.carDiv').css('position','absolute');
		$('.carDiv').css('top', ($(window).height()/2-$('.addCarDiv').height()/2)+$(window).scrollTop());
		$('.arriveTellFloat').css('position','absolute');
		$('.arriveTellFloat').css('top', ($(window).height()/2-$('.addCarDiv').height()/2)+$(window).scrollTop());
	}else{		
		$('.carDiv').css('top', ($(window).height()/2-$('.addCarDiv').height()/2));
		$('.arriveTellFloat').css('top', ($(window).height()/2-$('.addCarDiv').height()/2));
	}
});
$(window).scroll(function(){
	$('.carDiv').css('left', ($(window).width()/2-235));
	$('.arriveTellDiv').css('left', ($(window).width()/2-235));
	if(isIe6()){
		$('.carDiv').css('position','absolute');
		$('.carDiv').css('top', ($(window).height()/2-$('.addCarDiv').height()/2)+$(window).scrollTop());
		$('.arriveTellFloat').css('position','absolute');	
		$('.arriveTellFloat').css('top', ($(window).height()/2-$('.addCarDiv').height()/2)+$(window).scrollTop());	
	}else{
		$('.carDiv').css('top', ($(window).height()/2-$('.addCarDiv').height()/2));
		$('.arriveTellFloat').css('top', ($(window).height()/2-$('.addCarDiv').height()/2));
	}
});

<!-- 以下是公共函数  -->
function setCookie(key,value,times){	
	var oDate = new Date();
	oDate.setDate( oDate.getDate() + times );	
	document.cookie = key +'='+ value +';expires=' + oDate.toUTCString();	
}
function getCookie(key){
	var a = document.cookie.split('; ');
	for(var i=0;i<a.length;i++){
		var b = a[i].split('=');
		
		if( b[0] == key ){
			return b[1];
		}		
	}
}
function delCookie(key){
	setCookie(key,'',-1);
}


function elContains(a, b){  //判断两个元素是否是嵌套关系
	return a.contains ? a != b && a.contains(b) : !!(a.compareDocumentPosition(b) & 16);
};

function getStyle ( obj, attr ){
	return obj.currentStyle?obj.currentStyle[attr]:getComputedStyle(obj)[attr];
};

function isIe6(){
	var str = window.navigator.userAgent.toLowerCase();
	if(str.indexOf('msie 6')!=-1)return true;
	return false;	
}
function isIe7(){
	var str = window.navigator.userAgent.toLowerCase();
	if(str.indexOf('msie 7')!=-1)return true;
	return false;	
}
function isIe8(){
	var str = window.navigator.userAgent.toLowerCase();
	if(str.indexOf('msie 8')!=-1)return true;
	return false;	
}

function getByClass(sClass,parent){
	var aEles = (parent||document).getElementsByTagName('*');
	var arr = [];	
	for(var i=0; i<aEles.length; i++){		
		var aClass = aEles[i].className.split(' ');		
		for(var j=0; j<aClass.length; j++){			
			if( aClass[j] === sClass){					
				arr.push( aEles[i] );					
			}			
		}		
	}
	return arr;
}

//显示原始图片
function _displayOriginalImg(areaBox){
    areaBox.find('img').each(
          function(){
              if($(this).attr("original") != null)
		        $(this).attr("src",$(this).attr("original"));
     });
}

$(function(){/*限时抢页面*/
	$('.div_1').hover(function(){
		$(this).addClass('div_2');  
	},function(){
		$(this).removeClass('div_2'); 
	   }
	);
	
	
	$('.divbox').hover(function(){
		$(this).addClass('divOver');  
		},function(){
			$(this).removeClass('divOver'); 
		}
	);
});

$(function(){/*  评价页面   */
	$('.comTit ul li').click(function(){
		if($(this).index()!==2){
			$('.comTit ul li').removeClass('hover');
			$(this).addClass('hover');
		}
		if($(this).index()==0){
			$('.commentBoxAll').css('display','block');
			$('.commentBoxShare').css('display','none');
		}else if($(this).index()==1){
			$('.commentBoxAll').css('display','none');
			$('.commentBoxShare').css('display','block');		
		}	
	});
});


$(function(){//分页
	$('.page a').hover(function(){
		if(!$(this).hasClass('none')){
			$(this).addClass('has');
		}
	},function(){
		$(this).removeClass('has');
	});
});

/* 2014-07-07   新增卖场   BY WJ   */
/* 2014-12-28   增加显示16个图片   BY 庞军伟   */
$(function(){/* 热卖进行时及一周预告  */
	$('.exhibition').children('div').click(function(){
		$('.exhibition').children('div').removeClass('on');
		$(this).addClass('on');
		$('.exhibitionCon').children('div').css('display','none');
		$('.exhibitionCon').children('div').eq($(this).index()).css('display','block');
	});	
});

$(function(){/* 鼠标移入预售显示开卖提醒输入框  */
	$('.herald').mouseenter(function(){
		$(this).find('.heraldClock').css('display','block');
	});	
	$('.herald').mouseleave(function(){
		$('.heraldClock').css('display','none');
	});
});

$(function(){/* 特卖首页轮播图  */
	var salesTimer=null;
	var stepTime=8000;
	var fadeTime=1000;
	var curNum=0;
	var Str='';
	$('.sField').append("<a href='javascript:;' class='sArrowL'></a><a href='javascript:;'  class='sArrowR'></a>");
	for(var i=0; i<$('.sFieldUl li').length;i++){
		Str+="<li></li>";
	}
	$('.sfDot').append(Str);
	$('.sfDot li').eq(0).addClass('on');
	$('.sFieldUl li').css('display','none');
	$('.sFieldUl li').eq(0).fadeIn();
	
	
	function bannerPic(){
		$('.sFieldUl li').eq(curNum).fadeOut();
		if(curNum>=$('.sFieldUl li').length-1){
			curNum=0;
		}else{
			curNum++;		
		}
		$('.sFieldUl li').eq(curNum).fadeIn();
		$('.sfDot li').removeClass('on');
		$('.sfDot li').eq(curNum).addClass('on');
	}
	
	salesTimer=setInterval(bannerPic,stepTime);
	
	$('.sfDot li').bind('mouseover',function(){
		clearInterval(salesTimer);	
		clearTimeout(salesTimer);
		var This=this;
		salesTimer=setTimeout(function(){
			$('.sFieldUl li').eq(curNum).fadeOut();
			curNum=$(This).index();		
			$('.sFieldUl li').eq(curNum).fadeIn();
			$('.sfDot li').removeClass('on');
			$('.sfDot li').eq(curNum).addClass('on');				
		},500);
	});
	$('.sfDot li').bind('mouseout',function(){
		clearTimeout(salesTimer);
		salesTimer=setInterval(bannerPic,stepTime);
	});
	
	$('.sFieldUl li').bind('mouseover',function(){
		clearInterval(salesTimer);	
	});
	$('.sField').bind('mouseenter',function(){
		clearInterval(salesTimer);	
		$('.sField a.sArrowL').fadeIn();
		$('.sField a.sArrowR').fadeIn();
	});
	$('.sField').bind('mouseleave',function(){
		salesTimer=setInterval(bannerPic,stepTime);
		$('.sField a.sArrowL').fadeOut();
		$('.sField a.sArrowR').fadeOut();
	});
	
	$('.sField .sArrowL').bind('click',function(){
		clearInterval(salesTimer);
		$('.sFieldUl li').eq(curNum).fadeOut(fadeTime);
		if(curNum<=0){
			curNum=$('.sFieldUl li').length-1;
		}else{
			curNum=curNum-1;
		}
		$('.sFieldUl li').eq(curNum).fadeIn(fadeTime);
		$('.sfDot li').removeClass('on');
		$('.sfDot li').eq(curNum).addClass('on');				
	});
	$('.sField .sArrowR').bind('click',function(){		
		clearInterval(salesTimer);
		$('.sFieldUl li').eq(curNum).fadeOut(fadeTime);
		if(curNum>=$('.sFieldUl li').length-1){
			curNum=0;
		}else{
			curNum=curNum+1;
		}
		$('.sFieldUl li').eq(curNum).fadeIn(fadeTime);
		$('.sfDot li').removeClass('on');
		$('.sfDot li').eq(curNum).addClass('on');	
	});
	
});

/*  2014-07-08  特卖列表页   */
$(function(){
	$('.sfRange').find('.sfClassify').mouseenter(function(){
		$(this).css({
			backgroundColor:"#919191",	
			border:"1px solid #6f6f6f"
		});
		$(this).find('.sfName').css({
			color:"#fff"
		});	
		$('.sfAll').css('display','block');			
	});	
	$('.sfRange').find('.sfClassify').mouseleave(function(){
		$(this).css({
			backgroundColor:"#f2f2f2",	
			border:"1px solid #dbdbdb"
		});	
		$(this).find('.sfName').css({
			color:"#666666"	
		});	
		$('.sfAll').css('display','none');	
	});	
	
	$('.sfAllTit').click(function(){
		$(this).toggleClass('allOn');
		if($(this).hasClass('allOn')){
			$('.sfAllInfoMore').slideDown();
		}else{
			$('.sfAllInfoMore').slideUp();
		}		
	});
});

$('.l-Close').click(function(){//关闭对联广告
	$('#lovexin12,#lovexin14').css('display','none');	
});



/*

//  对联广告位
lastScrollY=0;
function heartBeat(){
var diffY;
if (document.documentElement && document.documentElement.scrollTop)
    diffY = document.documentElement.scrollTop;
else if (document.body)
    diffY = document.body.scrollTop
else
   // {Netscape stuff}
   
//alert(diffY);
percent=.1*(diffY-lastScrollY);
if(percent>0)percent=Math.ceil(percent);
else percent=Math.floor(percent);
document.getElementById("lovexin12").style.top=parseInt(document.getElementById("lovexin12").style.top)+percent+"px";
document.getElementById("lovexin14").style.top=parseInt(document.getElementById("lovexin12").style.top)+percent+"px";

lastScrollY=lastScrollY+percent;
//alert(lastScrollY);
}

window.setInterval("heartBeat()",1);

*/


//详情放大镜效果2015-02-10
$(function(){
       if($("#spec-n1").length>0){
		   $("#spec-n1").jqueryzoom({
				xzoom:400,
				yzoom:400,
				offset:10,
				position:"right",
				preload:1,
				lens:1
			});
			$("#spec-list").jdMarquee({
				deriction:"left",
				width:350,
				height:56,
				step:2,
				speed:4,
				delay:10,
				control:true,
				_front:"#spec-right",
				_back:"#spec-left"
			});
			
			$('#spec-list ul li img').mouseover( function(){//商品小图鼠标滑过切换大图内容
			$('#spec-list ul li img').removeClass('imgHover');
			$(this).addClass('imgHover');
			$("#spec-list img").bind("mouseover",function(){
			    
			    if(typeof(CloseVideo) !="undefined")
			    {
			        CloseVideo(this);
			    }
				var src=$(this).attr("src");
				$("#spec-n1 img").eq(0).attr({
					src:src.replace("\/n5\/","\/n1\/"),
					jqimg:src.replace("\/n5\/","\/n0\/")
				});
			});

		});	
		}			
	})


	//我的特权轮播
$(function () {

	var w = 80;
	var l = 0;
	var len = $(".ccav ul li").length;
	
	if(len % 2 >0){
		len = len + 1;
	}

	$(".ccav ul").append($(".ccav ul").html()).css({ 'width': len * w / 2, 'left': 0 });

	//  自动播放/8秒
	//	hotGoodsTimer = setInterval(init, 8000);
	//	function init() {
	//		$(".myCont .arrRight").trigger('click');
	//	}
	//
	//	$(".ccav ul li").hover(function () {
	//		clearInterval(hotGoodsTimer);
	//	}, function () {
	//		hotGoodsTimer = setInterval(init, 8000);
	//	});

	$(".myCont .arrLeft").click(function () {
		l = parseInt($(".ccav ul").css("left")) + w * 1;
		if(l == w*1){
			//说明是第一列
			return;
		}
		showCurrent(l);
	});
	
	$(".myCont .arrRight").click(function () {
		l = parseInt($(".ccav ul").css("left")) - w * 1;
		if(l == -parseInt(len/3)*w){
			return;
		}
		showCurrent(l);
	});

	function showCurrent(l) {

		if ($(".ccav ul").is(':animated')) {
			return;
		}
		
		$(".ccav ul").animate({ "left": l }, 500, function () {
			if (l > 0) {
				$(".ccav ul").css("left", -len * w / 4);
			} else if (l <= -(len - 6) * w) {
				$(".ccav ul").css('left', 0);
			}
		});
	}
});

	//mouseover 显示或隐藏左右标签
$(function(){

	$(".ccav ul li, .myCont .arrLeft, .myCont .arrRight").mouseover(function(){
		$(".myCont .arrLeft").show();
		$(".myCont .arrRight").show();
		
		//左右无内容时隐藏
		//		var l = parseInt($(".ccav ul").css("left"));
		//		if(l == 0)
		//		{
		//			$(".myCont .arrLeft").hide();
		//		}
		//		
		//		var w = 80;
		//		var len = $(".ccav ul li").length;
		//		
		//		if(len % 2 >0){
		//			len = len + 1;
		//		}
		//		
		//		if(l == -parseInt(len/6)*w + 1*w || len <= 12)
		//		{
		//			$(".myCont .arrRight").hide();
		//		}
		
		
		var len = $(".ccav ul li").length;
		
		if(len % 2 >0){
			len = len + 1;
		}

		if(len <= 12)
		{
			$(".myCont .arrLeft").hide();
			$(".myCont .arrRight").hide();
		}
	});


	$(".ccav ul li, .myCont .arrLeft, .myCont .arrRight").mouseout(function(){
		$(".myCont .arrLeft").hide();
		$(".myCont .arrRight").hide();
	});
	
});

/*  解决IE678 css3兼容性  */
$(function() {
    if (window.PIE) {
        $('.headBox p span img, .growDiv .striPoint li, .mdMallTop .mdMallL p.p2 img, .productInfo .goodsPay .userBox p span img').each(function() {
            PIE.attach(this);
        });
    }
});

/*  2015-04-08  购物车优化  */

//优惠券
$(function(){
	$(".saleBox").click(function(){
		$(".saleBoxMain").show();
		$(".saleBox em").addClass("down");
	});
	
	$(".clo").click(function(){
		$(".saleBoxMain").hide();
		$(".saleBox em").removeClass("down");
	});
	
	});
	

$(function(){
	//新人送豪礼商品列表
	$(".tabListSettle td.listTd li").mouseover(function(ev){
		var This=this;
		$(This).find(".btn").show();	
	});
	
	$(".tabListSettle td.listTd li").mouseout(function(ev){
		var This=this;
		$(This).find(".btn").hide();
		
	});
	
	//低价换购
		$(".listLow .lowCont li").mouseover(function(ev){
		var This=this;
		$(This).find(".btn").show();
		$(This).find(".divR p.pPrice").hide();	
	});
	
	$(".listLow .lowCont li").mouseout(function(ev){
		var This=this;
		$(This).find(".btn").hide();
		$(This).find(".divR p.pPrice").show();	
	});
	
	//列表页显示隐藏按钮
	
		$(".result li").mouseover(function(ev){
		var This=this;
		$(This).find(".btn").show();		
		
	});
	
	$(".result li").mouseout(function(ev){
		var This=this;
		$(This).find(".btn").hide();
		
	});
	//周期购列表页显示隐藏按钮
	
		$(".cycleList li").mouseover(function(ev){
		var This=this;
		$(This).find(".btn").show();		
		
	});
	
	$(".cycleList li").mouseout(function(ev){
		var This=this;
		$(This).find(".btn").hide();
		
	});


	});

//低价换购、最近浏览过选项卡
window.onload=function()  
{ 
if(document.getElementById("lowNav"))
{
  var tag=document.getElementById("lowNav").children; 
  var content=document.getElementById("lowCont").children;  
  content[0].style.display = "block"; 
  var len= tag.length; 
  for(var i=0; i<len; i++)  
    { 
    tag[i].index=i; 
    tag[i].onclick = function()  

        {     

               for(var n=0; n<len; n++)

               {
                  tag[n].className="navLi";
                  content[n].style.display="none"; 
                }   //首先将全部的div隐藏
            tag[this.index].className = "navLi hover"; 
            content[this.index].style.display = "block"; 
      } 
   }
}
}

	//低价换购商品轮播
$(function () {

	var w = 240;
	var l = 0;
	var len = $("#cont1 li").length;	
	
	if(len < 8 ){
		$("#cont1 ul").css({ 'width': 960 , 'height':180 });
	}else{
		$("#cont1 ul").css({ 'width': len * w / 2 });
		if(len%2!==0){
		$("#cont1 ul").css({ 'width': len * w / 2 + 120 });
		}
	}
		

	$("#cont1 .arrL").click(function () {
		l = parseInt($("#cont1 ul").css("left")) + w * 1;
		if(l == w*1){
			//说明是第一列
			return;
		}
		showCurrent(l);
	});
	
	$("#cont1 .arrR").click(function () {
         l = parseInt($("#cont1 ul").css("left")) - w * 1;
		 if(l == -parseInt((len-7)/2+1) * w ){
			 return;
		}
		    showCurrent(l);			
	});
	
	
	function showCurrent(l) {

		if ($("#cont1 ul").is(':animated')) {
			return;
		}
		
		$("#cont1 ul").animate({ "left": l }, 500, function () {
			//if (l > 0) {
//				$("#cont1 ul").css("left", -len * w / 4);
//			}
//			 else if (l <= -(len - 4) * w) {
//				$("#cont1 ul").css('left', 0);
//			}
		});
	}
	
});
	//mouseover 显示或隐藏左右标签
$(function(){

	$("#cont1 ul, #cont1 .arrR, #cont1 .arrL").mouseover(function(){
		$("#cont1 .arrR").show();
		$("#cont1 .arrL").show();
		
		
		var len = $("#cont1 li").length;
		

		if(len <= 8)
		{
			$("#cont1 .arrR").hide();
			$("#cont1 .arrL").hide();
		}
	});

});


////感兴趣商品轮播
//$(function () {
//
//	var w = 240;
//	var l = 0;
//	var len = $("#cont2 li").length;	
//
//	$("#cont2 ul").css({ 'width': len * w / 2, 'left': 0 });
//
//	$("#cont2 .arrL").click(function () {
//		l = parseInt($("#cont2 ul").css("left")) + w * 1;
//		if(l == w*1){
//			//说明是第一列
//			return;
//		}
//		showCurrent(l);
//	});
//	
//	$("#cont2 .arrR").click(function () {
//		l = parseInt($("#cont2 ul").css("left")) - w * 1;
//		if(l == -parseInt(len/4)*w){
//			return;
//		}
//		showCurrent(l);
//	});
//
//	function showCurrent(l) {
//
//		if ($("#cont2 ul").is(':animated')) {
//			return;
//		}
//		
//		$("#cont2 ul").animate({ "left": l }, 500, function () {
//			if (l > 0) {
//				$("#cont2 ul").css("left", -len * w / 4);
//			} else if (l <= -(len - 8) * w) {
//				$("#cont2 ul").css('left', 0);
//			}
//		});
//	}
//});
//	//mouseover 显示或隐藏左右标签
//$(function(){
//
//	$("#cont2 ul, #cont2 .arrR, #cont2 .arrL").mouseover(function(){
//		$("#cont2 .arrR").show();
//		$("#cont2 .arrL").show();
//		
//		
//		var len = $("#cont2 li").length;
//		
//
//		if(len <= 8)
//		{
//			$("#cont2 .arrR").hide();
//			$("#cont2 .arrL").hide();
//		}
//	});
//
//});
//
//
//浏览过商品轮播
$(function () {

	var w = 240;
	var l = 0;
	var len = $("#cont3 li").length;	

	$("#cont3 ul").css({ 'width': len * w / 2, 'left': 0 });

	$("#cont3 .arrL").click(function () {
		l = parseInt($("#cont3 ul").css("left")) + w * 1;
		if(l == w*1){
			//说明是第一列
			return;
		}
		showCurrent(l);
	});
	
	$("#cont3 .arrR").click(function () {
		l = parseInt($("#cont3 ul").css("left")) - w * 1;
		if(l == -parseInt(len/4)*w){
			return;
		}
		showCurrent(l);
	});

	function showCurrent(l) {

		if ($("#cont3 ul").is(':animated')) {
			return;
		}
		
		$("#cont3 ul").animate({ "left": l }, 500, function () {
			if (l > 0) {
				$("#cont3 ul").css("left", -len * w / 4);
			} else if (l <= -(len - 8) * w) {
				$("#cont3 ul").css('left', 0);
			}
		});
	}
});
	//mouseover 显示或隐藏左右标签
$(function(){

	$("#cont3 ul, #cont3 .arrR, #cont3 .arrL").mouseover(function(){
		$("#cont3 .arrR").show();
		$("#cont3 .arrL").show();
		
		
		var len = $("#cont3 li").length;
		

		if(len <= 8)
		{
			$("#cont3 .arrR").hide();
			$("#cont3 .arrL").hide();
		}
	});

});

//#cont4轮播
$(function () {

	var w = 240;
	var l = 0;
	var len = $("#cont4 li").length;	

	$("#cont4 ul").css({ 'width': len * w / 2, 'left': 0 });

	$("#cont4 .arrL").click(function () {
		l = parseInt($("#cont4 ul").css("left")) + w * 1;
		if(l == w*1){
			//说明是第一列
			return;
		}
		showCurrent(l);
	});
	
	$("#cont4 .arrR").click(function () {
		l = parseInt($("#cont4 ul").css("left")) - w * 1;
		if(l == -parseInt(len/4)*w){
			return;
		}
		showCurrent(l);
	});

	function showCurrent(l) {

		if ($("#cont4 ul").is(':animated')) {
			return;
		}
		
		$("#cont4 ul").animate({ "left": l }, 500, function () {
			if (l > 0) {
				$("#cont4 ul").css("left", -len * w / 4);
			} else if (l <= -(len - 8) * w) {
				$("#cont4 ul").css('left', 0);
			}
		});
	}
});
	//mouseover 显示或隐藏左右标签
$(function(){

	$("#cont4 ul, #cont4 .arrR, #cont4 .arrL").mouseover(function(){
		$("#cont4 .arrR").show();
		$("#cont4 .arrL").show();
		
		
		var len = $("#cont3 li").length;
		

		if(len <= 8)
		{
			$("#cont4 .arrR").hide();
			$("#cont4 .arrL").hide();
		}
	});

});



// 2015-04-18服饰列表增加缩略图优化

$(function(){
	$(".aBox a").mouseover(function(ev){
		var This=this;
		var Img=$(This).find("img").attr("src2");
        var Url=$(This).find("img").attr("url");
		$(This).addClass("hover");	
		$(This).find("i").show();
		$(This).parent("div").parent("div").parent("div").parent("li").find(".pica img").attr("src",Img);
        $(This).parent("div").parent("div").parent("div").parent("li").find(".pica").attr("href",Url);
        $(This).parent("div").parent("div").parent("div").parent("li").find(".aLi").attr("href",Url);
	});
	
	$(".aBox a").mouseout(function(ev){
		var This=this;
		$(This).removeClass("hover");
		$(This).find("i").hide();
		
	});

});


//2015-04-18服饰列表增加缩略图左右滚动
/*$(function () {

	var w = 42;
	var l = 0;
	var len = $(".aBox a").length;	

	$(".aBox").append($(".aBox a").html()).css({ 'width': len * w, 'left': 0 });

	$(".dressList .arrL").click(function () {
		l = parseInt($(".aBox").css("left")) + w * 1;
		if(l == w*1){
			//说明是第一列
			return;
		}
		showCurrent(l);
	});
	
	$(".dressList .arrR").click(function () {
		l = parseInt($(".aBox").css("left")) - w * 1;
		if(l == -parseInt(len/2)*w){
			return;
		}
		showCurrent(l);
	});

	function showCurrent(l) {

		if ($(".aBox").is(':animated')) {
			return;
		}
		
		$(".aBox").animate({ "left": l }, 500, function () {
			if (l > 0) {
				$(".aBox").css("left", -len * w / 2);
			} else if (l <= -(len - 2) * w) {
				$(".aBox").css('left', 0);
			}
		});
	}
});

$(function () {	//显示或隐藏左右标签

		$(".arrR").show();
		$(".arrL").show();
				
		var len = $(".aBox a").length;

		if(len <= 4)
		{
			$(".arrR").hide();
			$(".arrL").hide();
		}

});*/

//2015-04-18服饰列表增加缩略图左右滚动针对每个LI
$(function () {

	var w = 46;
	var l = 0;
	var lens = 0;	

	$(".dressList").each(function(index) {
		
		$(this).find(".aBox").css({"width":$(this).find(".aBox a").length * w,"left": 0});
		if($(this).find(".aBox a").length <= 4)
		{
			$(this).find(".arrL").hide();
			$(this).find(".arrR").hide();
		}
     });
	 
	$(".dressList .arrL").each(function(index) {
		  
		  $(this).click(function(){
			lens = $(this).parent().find(".aBox a").length;	
			l = parseInt($(this).parent().find(".aBox").css("left"))+ w * 1;
			if(l > 0){
				return;
			} 
			showCurrent(l,$(this).parent(),lens);
		 });
    });
	
	$(".dressList .arrR").each(function(index) {
         $(this).click(function(){
			lens = $(this).parent().find(".aBox a").length;	
			l = parseInt($(this).parent().find(".aBox").css("left")) - w * 1;
			var tempcount= Math.abs(parseInt($(this).parent().find(".aBox").css("left"))/w)+4;

            if(tempcount >= lens){
				return;
			}
			showCurrent(l,$(this).parent(),lens);
		 });
    });
	
	function showCurrent(l,index,len) {

		if ($(index).find(".aBox").is(':animated')) {
			return;
		}
		
		$(index).find(".aBox").animate({ "left": l }, 500, function () {
			if (l > 0) {
				$(index).find(".aBox").css("left", -len * w / 2);
			} else if (l <= -(len - 2) * w) {
				$(index).find(".aBox").css('left', 0);
			}
		});
	}
	
});


 //除首页的隐藏分类图标 
//$(function(){ 
//	$(".all").mouseover(function(){
//		$(".allh em").addClass("up");
//	});
//	
//	$(".all").mouseout(function(){
//		$(".allh em").removeClass("up");
//	});
//	
//	}); 



//详情页-商品详情导航

$(function(){
	$('.xqRightNav').find('.a1').click(function(){
		var targetId=$(this).attr('tab');
		$('.xqRightNav').find('.a1').removeClass('hover');
		$(this).addClass('hover');		
		$(document).scrollTop($('#'+targetId).offset().top);
	});		
});

$(function(){
	$(window).scroll(function(){
    if($('.xqRightNav').offset())
    {	
		if($(document).scrollTop()>=$('.xqRightNav').offset().top){
			  if( $.browser.msie && (($.browser.version == "6.0")||($.browser.version == "7.0")||($.browser.version == "8.0")) ){
				  $('.xqRightNav ul').css('position','static');
				  $('.xqRightNav ul').css('top',$(document).scrollTop());										
				  $('.xqRightNav ul').css('zIndex',999);
				  
			  }else{
				  $('.xqRightNav ul').css('position','fixed');
				  $('.xqRightNav ul').css('top',60);
				  $('.xqRightNav ul').css('zIndex',999);
			  }			
		}else{
			$('.xqRightNav ul').css('position','static');
			$('.xqRightNav ul').css('top',0);
			$('.xqRightNav ul').css('zIndex',999);
				
		};
		
		if($(document).scrollTop()>=$('.hotZone').offset().top-330){
		//导航到详情底部消失	
			$('.xqRightNav ul').css('position','static');
			$('.xqRightNav ul').css('top',0);
			$('.xqRightNav ul').css('zIndex',999);
			
			};
		
		
if($(document).scrollTop()>$('#xq1').offset().top){
			$('.xqRightNav').find('.a1').removeClass('hover');
			$('.xqF1').addClass('hover');	
		};
		
		if($(document).scrollTop()>$('#xq2').offset().top-1){
			$('.xqRightNav').find('.a1').removeClass('hover');
			$('.xqF2').addClass('hover');	
		};
		
		if($(document).scrollTop()>$('#xq3').offset().top-1){
			$('.xqRightNav').find('.a1').removeClass('hover');
			$('.xqF3').addClass('hover');		
		};
		
		if($(document).scrollTop()>$('xq4').offset().top-1){
			$('.xqRightNav').find('.a1').removeClass('hover');
			$('.xqF4').addClass('hover');	
		};
		
		if($(document).scrollTop()>$('#xq5').offset().top-1){
			$('.xqRightNav').find('.a1').removeClass('hover');
			$('.xq5').addClass('hover');	
		};
		
		if($(document).scrollTop()>$('#xq6').offset().top-1){
			$('.xqRightNav').find('.a1').removeClass('hover');
			$('.xqF6').addClass('hover');	
		};
		
		if($(document).scrollTop()>$('#xq7').offset().top-1){
			$('.xqRightNav').find('.a1').removeClass('hover');
			$('.xqF7').addClass('hover');	
		};
        }
	});

});


	//我的优惠券页面优化
  if(document.getElementById("quanTit"))
  {
      var tag=document.getElementById("quanTit").children; 
      var content=document.getElementById("quanCont").children; 
      content[0].style.display = "block"; //默认显示第一个标签的内容 
      var len= tag.length; 
      for(var i=0; i<len; i++)   //无论点击谁都能实现当前显示，其余隐藏
        { 
        tag[i].index=i; 
        tag[i].onclick = function()    

            {     

                   for(var n=0; n<len; n++)

                   {
                      tag[n].className="titDiv";
                      content[n].style.display="none"; 
                    }   //首先将全部的div隐藏
                tag[this.index].className = "titDiv hover"; 
                content[this.index].style.display = "block"; 
          } 
       }
   }
   
   
   
   //搜索列表页增加轮播图 20150611 -lr
   $(document).ready(function() {
    var t = false;
    var str = '';
    var speed = 500;
    var screenW = window.innerWidth
	if( screenW >= 1190){
		var w = 1190
 		}
		else{
			var w = 990
			}
			
    var n = $('#actor li').length;
    var numWidth = n * 30;
    var _left = (w - (numWidth)) / 2;
    var c = 0;
	
    $('#actor').width(w * n);
    $('#actor li').each(function(i) {
        str += '<span></span>'
    });
    $('#numInner').width(numWidth).html(str);
    $('#imgPlay .num').css('left', _left);
    $('#numInner').css('left', _left + 13);
    $('#numInner span:first').addClass('on');
    function cur(ele, currentClass) {
        ele = $(ele) ? $(ele) : ele;
        ele.addClass(currentClass).siblings().removeClass(currentClass)
    }
	
	$('#imgPlay').mouseleave( function(){
		 $("#imgPlay .next").fadeOut();
		 $("#imgPlay .prev").fadeOut();
		 });	
		 
	 $('#imgPlay').mouseenter( function(){
		 $("#imgPlay .next").fadeIn();
		 $("#imgPlay .prev").fadeIn();
		 });
 
	
	if($("#actor li").length <= 1)
		{
			$("#imgPlay .next").hide();
			$("#imgPlay .prev").hide();
		}
	
	
    $('#imgPlay .next').click(function() {
        slide(1)
    });
    $('#imgPlay .prev').click(function() {
        slide( - 1)
    });
    function slide(j) {
        if ($('#actor').is(':animated') == false) {
            c += j;
            if (c != -1 && c != n) {
                $('#actor').animate({
                    'marginLeft': -c * w + 'px'
                },
                speed)
            } else if (c == -1) {
                c = n - 1;
                $("#actor").css({
                    "marginLeft": -(w * (c - 1)) + "px"
                });
                $("#actor").animate({
                    "marginLeft": -(w * c) + "px"
                },
                speed)
            } else if (c == n) {
                c = 0;
                $("#actor").css({
                    "marginLeft": -w + "px"
                });
                $("#actor").animate({
                    "marginLeft": 0 + "px"
                },
                speed)
            }
            cur($('#numInner span').eq(c), 'on')
        }
    }
	
	
	
    $('#numInner span').click(function() {
        c = $(this).index();
        fade(c);
        cur($('#numInner span').eq(c), 'on')
    });
    function fade(i) {
        if ($('#actor').css('marginLeft') != -i * w + 'px') {
            $('#actor').css('marginLeft', -i * w + 'px');
            $('#actor').fadeOut(0, 
            function() {
                $('#actor').fadeIn(500)
            })
        }
    }
    function start() {
        t = setInterval(function() {
            slide(1)
        },
        3000)
    }
    function stopt() {
        if (t) clearInterval(t)
    }
    $("#imgPlay").hover(function() {
        stopt()
    },
    function() {
        start()
    });
    start()
});


  <!--妈妈说选项卡广告位-->
  
  if(document.getElementById("xqMomSayTab"))
  {  
      var tag=document.getElementById("xqMomSayTab").children; 
      var content=document.getElementById("xqCont").children; 
      content[0].style.display = "block"; 
      var len= tag.length; 
      for(var i=0; i<len; i++)   
        { 
        tag[i].index=i;
        tag[i].onclick = function()     

            {     

                   for(var n=0; n<len; n++)

                   {
                 
                      content[n].style.display="none"; 
                    }   
            
                content[this.index].style.display = "block"; 
          } 
       }
   }

$(function(){
	var detaile_timer = null
	/*特卖列表页-818大促.html 满减详情 效果*/
	function detail_play(){
		$(".getP-m").slideUp(200,function(){
			$(".getP span").stop().removeClass("hoverBor")
		});
	}
	$("#getDetail").hover(function(){
		$(".getP-m").css({width:$(this).outerWidth()-2})
		clearTimeout(detaile_timer)
		$(".getP-m").stop().slideDown(300);
		$(".getP span").addClass("hoverBor")
	},function(){
		detaile_timer = setTimeout(function(){
			$(".getP-m").stop().slideUp(300,function(){
				 $(".getP span").removeClass("hoverBor")
			});
		},100)
	})
	$(".getP-m").hover(function(){
		clearTimeout(detaile_timer)
	},function(){
		detaile_timer = setTimeout(detail_play,100)
	})

	
	
	
	/*自营满减 购物车列表*/
	$(".addrel").each(function(){
		var detaile_timer2 = null
		var This = this;
		function detail_out(){
			$(".fullcut",This).slideUp(100,function(){
				$(".addfullCut",This).stop().removeClass("hoverBor")
			});
		}
		$(".fullCutDetail",This).hover(function(){
			clearTimeout(detaile_timer2)
			$(".fullcut",This).css({height:"auto",width:$(this).outerWidth()-2})
			$(".fullcut",This).stop().slideDown(100);
			$(".addfullCut",This).addClass("hoverBor");
		},function(){
			detaile_timer2 = setTimeout(detail_out,100)
		})
		$(".fullcut",This).hover(function(){
			clearTimeout(detaile_timer2)
		},function(){
			detaile_timer2 = setTimeout(detail_out,100)
		})
	})
})

//报错页面无头伟页
if($(".errorBox").length>0){
	$(".errorBox").css({minHeight:742,height:$(window).height()})
	$(window).bind("resize",function(){
		$(".errorBox").css({height:$(window).height()})
	})
}
if($(".errorInfoBtn").length>0){
	$(".errorInfoBtn").toggle(function(){
		var This = this;
		 $(".errorCon").stop().slideUp(100,function(){
		 	$(This).html("打开错误信息")
		 });
	},function(){
		var This = this;
		 $(".errorCon").slideDown(100,function(){
		 	$(This).html("关闭错误信息")
		 });
	})
}
//2015-6-29 liteng
/*
 * 
 参数  [tip = 滚动的宽度（tip*li的宽度）]  
 	 [few = 滚动到最后一个 最少剩余几个] 
 	 [cycle = （默认false不循环） （如果设置为true 循环切换）]
 	 [autoPlay = 设置是否自动播放 true or false]
	 [prev=向上一个切换按钮] [next=向下一个切换按钮] 
	 [box = 所有的方法都在每个box内执行互不干扰] 
	 [scrollbox = 滚动的元素] 
	 [updown = 上下切换模式]
*
*/
function silder(json) {
	$(json['box']).each(function() {
		if(json["cycle"]){
			if($(json["scrollbox"],this).children().length/json["tip"]<=2){
			  $(json["scrollbox"],this).html($(json["scrollbox"],this).html()+$(json["scrollbox"],this).html()+$(json["scrollbox"],this).html())
			}
		}
		this.litm = 1;
		var This = this,few = json['few']||json['tip'];
		this.num = 0;
		var box = $(json['scrollbox'], This);
		var mr = oMargin("margin-right");
		var ml = oMargin("margin-left");
		var mt = oMargin("margin-top");
		var mb = oMargin("margin-bottom");
		this.count = parseInt(box.children().length/json["tip"])
		//左右滚动
		var w = parseInt(box.children().first().outerWidth()) + ml + mr;
		var h = parseInt(box.children().first().outerHeight()) + mt + mb;
		if(json["updown"]){
			//判断是否上下切换
			w = h;
		  var attr = "height";
		}else{
		  var attr = "width";
		}
		var scroll = json['scroll'] || json['tip'] * w;
		var maxStyle = box.children().length * w;
		box.css(attr, maxStyle);
		//加载按钮事件
		$(json['prev'], This).css("cursor","pointer");
		$(json['next'], This).css("cursor","pointer");
		leftRight($(json['prev'], This), box, this.num, 1);
		leftRight($(json['next'], This), box, this.num, -1);
		if(json["cycle"]){
			if(This.num==0){
				for(var i=0;i<json["tip"];i++){
				   box.children().eq(0).before(box.children().last());
				}
				$(box).css("left",-scroll);
				This.num--
			}
		}
		function leftRight(btn, box, num, dir) {
			$(json['count'], This).html(This.count/3);
			$(json['litm'], This).html(This.litm);
			var onoff = true;
			btn.on("click", function(event) {
				event.stopPropagation();
				var th = this
				if(!onoff){return false;}
				onoff = false;
				
				//page 
				This.litm++;
				if(This.litm >This.count/3){
					This.litm = 1
				}
				$(json["litm"]).html(This.litm)
				
				dir < 0 ? This.num-- : This.num++;
				This.num > 0 ? This.num = 0 : This.num;
				var count = Math.ceil(-(box.children().length-(few-json['tip']))/ json['tip'])
				if (This.num <= Math.floor(-(box.children().length-(few-json['tip'])) / json['tip'])) {
					if ((box.children().length-(few-json['tip'])) % json['tip'] != 0) {
						This.num = count;
					} else {
						This.num = count + 1;
					}
				}
				if(json["updown"]){
					if (maxStyle + This.num * scroll < few * w) {
						box.stop().animate({
							top: -maxStyle + few * w
						}, json["speed"]||400, "linear",function(){
							onoff = true;
							nocycle(btn,This,This.num);
						});
					} else {
						box.stop().animate({
							top: This.num * scroll
						}, json["speed"]||400, "linear",function(){
							This.num = iscycle(this,This.num)
							onoff = true
						});
						nocycle(btn,This,This.num)
					}
				}else{
					if (maxStyle + This.num * scroll <= few * w && !json["cycle"]) {
						box.animate({
							left: -maxStyle + few * w
						}, json["speed"]||400, "linear",function(){
							onoff = true
						});
						nocycle(btn,This,This.num)
					} else {
						if(json['cycle']){
							if($(th).hasClass("next")){
								This.num=This.num==-1?-2:This.num;
							}else{
								This.num=This.num==-1?0:This.num;
							}
						}
						box.animate({
							left: This.num * scroll
						}, json["speed"]||400, "linear",function(){
							This.num = iscycle(this,This.num)
							onoff = true;
						});
						nocycle(btn,This,This.num)
					}
				}
			})
		}
		//执行循环事件
		function iscycle(This,tnum){
			if(json["cycle"]){
				//循环切换
				if(tnum==0){
					for(var i=0;i<json['tip'];i++){
						box.children().eq(0).before(box.children().last());
					}
					$(This).css("left",-scroll);
				}
				if(tnum>=(-box.children().length)/few&&tnum<0){
					for(var i=0;i<json['tip'];i++){
						box.children().last().after(box.children().first());
					}
					$(This).css("left",-scroll);
					tnum++
				}
			}
			return tnum
		}
		//非循环时给按钮添加末位置样式
		function nocycle(btn,This,tnum){
			if(!json["cycle"]){
				//非循环时 给相应按钮添加不可点击样式
				tnum==0?btn.addClass("end"):$(json['prev'], This).removeClass("end");
				tnum == -Math.ceil((box.children().length-few)/json['tip'])?btn.addClass("end"):$(json['next'], This).removeClass("end");
			}
			return tnum
		}
		function oMargin(attr) {
			return parseInt(box.children().first().css(attr));
		}
	})
	//是否自动播放
	if(json["autoPlay"]){
		mysilderTime(json["box"],json["next"],json["interVal"]||3000)
	}
}


//自动播放左右切换
function mysilderTime(obj,btn,tim){
	$(obj).each(function(index){
		var This = this;
		index= setInterval(autoPlayTab,tim);
		function autoPlayTab(){
			$(btn,This)[0].click();
		}
		$(this).hover(function(){
			clearInterval(index)
		},function(){
			index = setInterval(autoPlayTab,tim)	
		})
	})
}

function slideLr(){
	$(".slideLr").each(function() {
            if($(this).hasClass("_isload")){return;}
			var This = this;
			var content = $(".slideCon", this);
			var list = $(".slideCon .slideList", this);
			var prev = $(".prev", this);
			var next = $(".next", this);
			var initNum = 0;
			content.css({
				width: list.width() * list.length
			});
            if(content.width()>0){$(this).addClass("_isload");}
			prev.addClass("disabled");
			prev.bind("click", function() {
				around(-1, this);
			});
			next.bind("click", function() {
				around(1, this);
			});
			function around(n, o) {
				if (!$(o).hasClass("disabled") && !$(o).hasClass("executing")&&list.length>4) {
					$(o).addClass("executing");
					n > 0 ? initNum++ : initNum--;
					var val = -content.parent().width() * initNum;
					content.animate({
						left: val
					}, function() {
						$(o).removeClass("executing");
						if (parseInt(content.css("left")) <= -parseInt(content.width() - content.parent().width())) {
							next.addClass("disabled");
						} else {
							next.removeClass("disabled");
						}
						if (parseInt(content.css("left")) >= 0) {
							prev.addClass("disabled");
						} else {
							prev.removeClass("disabled");
						}
					});
				}
			}
		});
}		
