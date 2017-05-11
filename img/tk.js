//"http://cm.g.doubleclick.net/pixel?google_nid=behe&google_cm",
//"http://c.x.cn.miaozhen.com/cm.gif?dspid=11163",
//"http://cm.vamaker.com/store/pixel?vamaker_dspid=14385081",
(function(){
var V=window,
	J=document,
	x="location",
	urls = [
                //"http://cm.g.doubleclick.net/pixel?google_nid=behe&google_cm",
                "http://cms.tanx.com/t.gif?tanx_nid=34016883&tanx_cm",
                "http://c.x.cn.miaozhen.com/cm.gif?dspid=11163",
                //"http://cc.xtgreat.com/cm.gif?dspid=11163",
				"http://cm.miaozhen.atm.youku.com/cm.gif?dspid=11114",
                "http://cm.pos.baidu.com/pixel?dspid=6770363&ext_data=",
                //"http://cm.qtmojo.com/pixel?allyes_dspid=176&allyes_cm&extra=",
                //"http://cm.vamaker.com/pixel?vamaker_dspid=14385081&vamaker_cm",
                "http://cm.mediav.com/?mvdid=106"
                //"http://cm.api.baifendian.com/Mapping.do?bfd_nid=behe",
                //"http://cm.fastapi.net/?dspid=100008&&gethuid=1",
				//"http://cm.e.qq.com/cm.fcg?a=620222&j=37867&time="
            ],
	Pd = function(a) {
        var c = "http://rtb.behe.com/tracker/t.gif?si=",
        d = new Image(1, 1);
        d.src = c + a;
        d.onload = function() {
            d.onload = null;           
        }
    },
	Ps = function(a) {
        d = new Image(1, 1);
        d.src = a;
        d.onload = function() {
            d.onload = null;           
        	}
		},
	parm=function(){
		var b=V._hdspq;
		for(var s=0;s<b.length;s++){
			var rs=Math.random();
			var u=top.location.href;
			var c=b[s][1]+"&turl="+escape(u)+"&r="+rs;
			
			 Pd(c);
			
			}
		},
	__H=function (name,value,expires,domain){
		var expires = new Date();
		expires.setTime(expires.getTime() + 7*24*60*60*1000);
		document.cookie=name+"="+escape(value)+((expires)?";expires="+expires.toGMTString():"")+((domain)?";domain="+domain:"");
	},
	__I=function (name){
		var arr=document.cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)"));		
		if(arr!=null)return unescape(arr[2]);		
		return null;
	};
	(function(){
		if(typeof V._hdspq.OBJ =="undefined"){
			setTimeout(function(){
			    parm();	
				
				V._hdspq.OBJ=true;
			},1000);
		}
	 })();
})();