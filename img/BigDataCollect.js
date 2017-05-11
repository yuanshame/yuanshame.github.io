function comgoucctv() {
    this._uid = 0;
    this._refferUrl = document.referrer;
    this._refferHost = "";
    this._gid = 0;
    this._storeType = 0;
    this._storeId = 0;
    this._sid = null;
    this._pid = 0;
    this._currurl = document.location.href;
    this._currurlHost = document.location.host;
    this._eid = 0;
    this._gprice = 0.00;
    this._oid = 0;
    this._currtotal = 0.00;
    this._cookiename = "comgoucollectcid";
    this._cookieuid = "M6goDataCollectPid";
    this._rootdomain = document.domain.split('.').slice(-2).join('.');
    this._returnreffer = "";
    this._returncurrurl = "";
    this._reffercookiename = "_reffercookiename";
    this._currurlcookiename = '_currurlcookiename';
    this._origin = "";
    this.ishttps = 'https:' == document.location.protocol ? true : false;
}

comgoucctv.prototype = {
    sk: function (name, value) {
        try {
            var nowDate = new Date();
            nowDate.setMonth(nowDate.getMonth() + 12);
            document.cookie = name + "=" + value + ";expires=" + nowDate.toGMTString() + ";Path=/;domain=" + this._rootdomain;
        } catch (e) {
            //e.message
        }
    },
    gk: function (name) {
        try {
            var cookievalue = document.cookie;
            var startposition = cookievalue.indexOf("" + name + "=");
            if (startposition == -1) {
                cookievalue = null;
            } else {
                startposition = cookievalue.indexOf("=", startposition) + 1;
                var endposition = cookievalue.indexOf(";", startposition);
                if (endposition == -1) {
                    endposition = cookievalue.length;
                }
                cookievalue = unescape(cookievalue.substring(startposition, endposition));
            }
            return cookievalue;
        } catch (e) {
            return null;
        }
    },
    dk: function (name) {
        try {
            var nowDate = new Date();
            nowDate.setTime(nowDate.getTime() - 10000);
            document.cookie = name + "=v;expires=" + nowDate.toGMTString();
        } catch (e) {
            //e.message
        }
    },
    nc: function () {
        try {
            var chars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
            var res = "";
            for (var i = 0; i < 20; i++) {
                var id = Math.ceil(Math.random() * 35);
                res += chars[id];
            }
            return res;
        } catch (e) {
            return Math.random() * 24;
        }
    },
    sm: function () {
        try {

            this._uid = this.gk(this._cookieuid);
            if (this._uid == "" || this._uid == null) {
                this._uid = 0;
            }
            if (this._refferUrl != "" && this._refferUrl != null) {
                var parser = document.createElement('a');
                parser.href = this._refferUrl;
                this._refferHost = parser.host;
            }
            this._sid = this.gk(this._cookiename);
            if (this._sid == "" || this._sid == null) {
                this._sid = this.nc();
                this.sk(this._cookiename, this._sid);
            }
            if (this._currurl.toLowerCase().indexOf("/mycart.do") > -1) {
                this._pid = -100;
            }

            var currentUrl = this._currurl.toLowerCase();
            if (countChildString(currentUrl, "m.gou.com") > 0 ||
                countChildString(currentUrl, "m.m6go.com") > 0 ||
                countChildString(currentUrl, "mm.gou.com") > 0 ||
                countChildString(currentUrl, "mm.m6go.com") > 0
                ) {
                this._eid = 5;
            }
            else if (countChildString(currentUrl, "o2o.gou.com") > 0) {
                this._eid = 6;
            }

            this._returnreffer = this.gk(this._reffercookiename);
            var myReg1 = new RegExp('(\.((gou)|(m6go))\.com){1}');

            var currIsCps = (this._currurl.indexOf("?cps=")>-1) ? true : false;
            if (this._refferUrl == null || this._refferUrl=="") 
            {
                if (currIsCps)
                {
                    this._returncurrurl=this.gk(this._currurlcookiename);
                    if (this._returncurrurl != null && this._returncurrurl!="")
                    {
                        this._returnreffer = this.gk(this._reffercookiename);
                    }
                    else
                    {
                        this._returncurrurl = "";
                        this._returnreffer = "";
                        this.sk(this._reffercookiename, escape(this._returnreffer));
                        this.sk(this._currurlcookiename, escape(this._returncurrurl));
                    }
                }
                else
                {
                    this._returnreffer = this._refferUrl;
                    this.sk(this._reffercookiename, escape(this._returnreffer));

                    this._returncurrurl = this._currurl;
                    this.sk(this._currurlcookiename, escape(this._returncurrurl));
                }
            }
            else
            {
                var isfromSite = myReg1.test(this._refferUrl);
                if (isfromSite==false) 
                {
                    this._returnreffer = this._refferUrl;
                    this.sk(this._reffercookiename, escape(this._returnreffer));

                    this._returncurrurl = this._currurl;
                    this.sk(this._currurlcookiename, escape(this._returncurrurl));
                    
                }
                else
                {
                    this._returnreffer = this.gk(this._reffercookiename);
                    this._returncurrurl = this.gk(this._currurlcookiename);

                }

            }
            var isInSite = myReg1.test(this._returnreffer);
            if (isInSite == true) {
                this._returnreffer = "";
                this._returncurrurl = "";
            }

            var currIsGgkCps = (this._currurl.indexOf("?cps=guaguaka") > -1) ? true : false;
            if (currIsGgkCps)
            {
                this._returnreffer = "";
                this._returncurrurl = this._currurl;
                this.sk(this._reffercookiename, escape(this._returnreffer));
                this.sk(this._currurlcookiename, escape(this._returncurrurl));
          
            }
            var currIsPcsmCps = (this._currurl.indexOf("?cps=saomabypc") > -1) ? true : false;
            if (currIsPcsmCps) {
                this._returnreffer = "";
                this._returncurrurl = "";
                this.sk(this._reffercookiename, escape(this._returnreffer));
                this.sk(this._currurlcookiename, escape(this._returncurrurl));

            }

            var myReg = new RegExp('(m{1,2}\.((gou)|(m6go))\.com){1}');
            if (myReg.test(currentUrl)) {
                this._eid = 5;
                return;
            }
            myReg.compile('(event\.((gou)|(m6go))\.com\/m\/){1}');
            if (myReg.test(currentUrl)) {
                this._eid = 5;
                return;
            }

            myReg.compile('(o2o\.gou\.com){1}');
            if (myReg.test(currentUrl)) {
                this._eid = 6;
                return;
            }

            myReg.compile('(appweb\.((gou)|(m6go))\.com){1}');
            if (myReg.test(currentUrl)) {
                var tempx = document.getElementById("ElementIDEqupimentTypexxx");
                if (tempx != null && tempx.value != null) {
                    this._eid = tempx.value;//1,3
                }
                return;
            }

            myReg.compile('(clientweb\.((gou)|(m6go))\.com){1}');
            if (myReg.test(currentUrl)) {
                this._eid = 2;
                return;
            }

        } catch (e) {
            //e.message
        }
    },
    ra: function () {
        try {
            if (this._pid > 0) {
                var values = '{"position":"' + this._pid + '","positionNo":"0","productId":"0","price":"0.00"}';
                jQuery.cookie("productHrefLink", values, {
                    path: '/',
                    domain: this._rootdomain
                });

            }
            this.yh();

        } catch (c) {
            this.g();
        }

    },
    yh: function yh() {
        try {
            // if ( "utf-8") {
            var c = document.createElement("script");
            c.type = "text/javascript";
            c.async = !0;
            c.charset = "utf-8";
            c.src = this.gl();
            var d = document.getElementsByTagName("script")[0];
            d.parentNode && d.parentNode.insertBefore(c, d);
            //}
            //else
            //    h.write(n("%3Cscript src='" + this.gl() + "' charset='utf-8' type='text/javascript'%3E%3C/script%3E"))
        }
        catch (e) {
            this.g();
        }
    },
    g: function g() {
        try {

            (new Image).src = this.gl();
        }
        catch (d) { }
    },
    gl: function gl() {
        var c = [];
        var a = "http://collect.gou.com/api/collect?";
        if (this.ishttps) {
            a = "https://collect.gou.com/api/collect?";
        }
        c.push("UserId=" + this._uid);
        c.push("RefferUrl=" + (this._refferUrl == "" ? "" : encodeURIComponent(this._refferUrl)));
        c.push("RefferHost=" + this._refferHost);
        c.push("GoodsId=" + this._gid);
        c.push("StoreType=" + this._storeType);
        c.push("StoreId=" + this._storeId);
        c.push("SessionId=" + this._sid);
        c.push("CurrUrl=" + this._currurl);
        c.push("CurrHost=" + this._currurlHost);
        c.push("PositionId=" + this._pid);
        c.push("EquipmentId=" + this._eid);
        c.push("CurrGoodsPrice=" + this._gprice);
        c.push("CurrOrderId=" + this._oid);
        c.push("CurrTotal=" + this._currtotal);

        c.push("rnd=" + Math.floor(2147483648 * Math.random()));
        var sre = a + c.join("&");
        return sre;

    },

    rt: function rt() {
        try {
            this.yt();
        } catch (e) {
            this.gtf();
        }
    },
    yt: function yt() {
        try {
            // if ( "utf-8") {
            var c = document.createElement("script");
            c.type = "text/javascript";
            c.async = !0;
            c.charset = "utf-8";
            c.src = this.gt();
            var d = document.getElementsByTagName("script")[0];
            d.parentNode && d.parentNode.insertBefore(c, d);
            //}
            //else
            //    h.write(n("%3Cscript src='" + this.gt() + "' charset='utf-8' type='text/javascript'%3E%3C/script%3E"))
        }
        catch (e) {
            this.gtf();
        }
    },
    gtf: function gtf() {
        try {
            (new Image).src = this.gt();
        }
        catch (d) { }
    },
    gt: function gt() {
        var c = [];

        var a = "http://collect.gou.com/api/TransferApi?";
        if (this.ishttps)
        {
            a = "https://collect.gou.com/api/TransferApi?";
        }

        var firstCurrUrl = this._returncurrurl;
        var cps="";
        if (firstCurrUrl != null && firstCurrUrl != "" )
        {
            var cpsIndex = firstCurrUrl.indexOf("?cps=");
            cps = (cpsIndex>-1==true)? firstCurrUrl.substring(cpsIndex+5):"";
        }
        else {
            var cpsIndexCurr = this._currurl.indexOf("?cps=");
            cps = (cpsIndexCurr > -1 == true) ? this._currurl.substring(cpsIndexCurr + 5) : "";
        }
        c.push("UserId=" + this._uid);
        c.push("FirstCurrentUrl=" + escape(this._returncurrurl));
        c.push("RefferUrl=" + escape(this._returnreffer));
        c.push("CurrUrl=" + escape(this._currurl));
        c.push("Cps=" + cps);
        c.push("SessionId=" + this._sid);
        c.push("Origin=" + this._origin);
        c.push("rnd=" + Math.floor(2147483648 * Math.random()));

        var sre = a + c.join("&");
        return sre;

    }

}

try {
    var m = new comgoucctv;
    m.sm();
    m.ra();
    if (m._currurl != null && m._currurl) {
        var CurrentUrl = m._currurl.toLowerCase();
        if (countChildString(CurrentUrl, ".com/home/app.do") > 0 ||
            countChildString(CurrentUrl, ".com/topic/minus") > 0 ||
            (countChildString(CurrentUrl, ".com/app") > 0 && countChildString(CurrentUrl, ".com/app_index") <= 0)
            ) {
            m._origin = "2";
            m.rt();
        }
        if (countChildString(CurrentUrl, ".com/download/index") > 0)
        {
            m._origin = (CurrentUrl.indexOf("www.") > -1) == true ? "2" : "3";
            m.rt();
        }
    }
} catch (e) {
    // alert("out call throw error:" + e.toString());
}

function HitsPosition(PositionId, GoodsId, StoreType, StoreId) {
    HitsPosition_up(PositionId, GoodsId, StoreType, StoreId, 0, 0, 0);
}


function HitsPosition_up(PositionId, GoodsId, StoreType, StoreId, CurrGoodsPrice, CurrOrderId, CurrTotal) {
    try {
        var m = new comgoucctv;
        m.sm();
        m._pid = PositionId;
        m._gid = GoodsId;
        m._storeType = StoreType;
        m._storeId = StoreId;
        m._gprice = CurrGoodsPrice;
        m._oid = CurrOrderId;
        m._currtotal = CurrTotal;
        m.ra();
    } catch (e) {
        //e.message
    }
}

function countChildString(mainStr, subStr) {
    var count = 0;
    var offset = 0;
    do {
        offset = mainStr.indexOf(subStr, offset);
        if (offset != -1) {
            count++;
            offset += subStr.length;
        }
    }
    while (offset != -1)
    return count;
}
function opratetransfers(origin) {
    var m = new comgoucctv;
    m._origin = origin;
    m.sm();
    m.rt();
}
