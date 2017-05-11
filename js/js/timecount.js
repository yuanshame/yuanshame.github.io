/**
整点抢
*/

define(['jquery'],function($){
	var timeCount = $('.timeCount');
	function  Timecount(timeCount){
			this.mathCon = timeCount.find('.timer em');
			/*this.dateStart = timeCount.find('.timer').attr('data-start');*/
			this.dateEnd = timeCount.find('.timer').attr('data-end');
			
			this.timer = null;
			var that = this;
			this.init = function(){
				this.timer=setInterval(function(){
			            var end = new Date(that.dateEnd);
			           
	                    var now = new Date();
						var num = end - now; 
						 console.log(num)//剩余的毫秒数
						var h = parseInt( num/1000/60/60 );
						var m = parseInt( num/1000/60%60 );
						var s = parseInt( num/1000%60 );
						var hm = parseInt( num/100%10);
						h = h < 10 ?'0'+h:''+h;
						m = m < 10 ?'0'+m:''+m;
						s = s < 10 ?'0'+s:''+s;
				        //console.log(h,m,s);
					    that.mathCon.eq(0).html(h[0]);
				        that.mathCon.eq(1).html(h[1]);
				        that.mathCon.eq(2).html(m[0]);
				        that.mathCon.eq(3).html(m[1]);
				        that.mathCon.eq(4).html(s[0]);
				        that.mathCon.eq(5).html(s[1]);
				        that.mathCon.eq(6).html(hm);
				        if(num<=0){
				        	clearInterval(that.timer);
				        	that.mathCon.html('0');

				        }
				},100)
						
			};
	}
	var timect0 = new Timecount(timeCount);

    timect0.init();
})