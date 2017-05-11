//function ShowCart(yuming) {
//    if (!yuming) {
//        yuming = "";
//    }

//    $.getJSON(yuming + "/Order/Cart_Json.do?jsoncallback=?", function (data) {
//        $("#gopay").html(data.Content);
//        alert(data.Content)
//        GetQuantity(yuming);
//    });
//}
function ShowCart(yuming) {
    //alert(yuming)
    if (!yuming) {
        yuming = "";
    }

    $.getJSON(yuming + "/Order/Cart_JsonX.do?jsoncallback=?", function (data) {

        $(".shopcar").html(data.Content);
        //        alert(data.Content)

        $(".cart-order-list .order-box").each(function () {
            $(this).children().last().addClass("last");
        })
        GetQuantity(yuming);
    });
}

//function GetQuantity(yuming) {
//    if (!yuming) {
//        yuming = "";
//    }

//    var url = yuming + "/Order/GetQuantityOnly_NP.do?jsoncallback=?&r=" + Math.random;

//    $.getJSON(url, function (res) {

//        if (res) {
//            var GQ = document.getElementById("GQuantity");
//            var GQTwo = document.getElementById("GQuantitytwo");
//            if (GQTwo != null) {
//                GQTwo.innerHTML = res.Gou;
//            }
//            GQ.innerHTML = res.Gou;
//            $("#GSubTotal").html(res.SubTotal);
//            if (res.NoPay > 0) {
//                $("#NoPayQuantity").html("(<b>" + res.NoPay + "</b>)");
//                $("#NoPayQuantity").attr("title", "你还有" + res.NoPay + "个订单未付款");
//            }
//            else {
//                $("#NoPayQuantity").html("");
//                $("#NoPayQuantity").attr("title", "");
//            }
//        }
//    });
//}


function GetQuantity(yuming) {
    //    alert(1245)
    if (!yuming) {
        yuming = "";
    }

    var url = yuming + "/Order/GetQuantityOnly_NP.do?jsoncallback=?&r=" + Math.random;

    $.getJSON(url, function (res) {

        if (res) {
            var GQ = document.getElementById("GQuantity");
            var GQTwo = document.getElementById("GQuantitytwo");
            if (GQTwo != null) {
                GQTwo.innerHTML = res.Gou;
            }

            GQ.innerHTML = res.Gou;
            $("#GSubTotal").html(res.SubTotal);

        }
    });
}

function changeAmount(yuming, itemid, amount) {
    if (!yuming) {
        yuming = "";
    }

    if (itemid > 0 && amount >= 0 && amount < 10000) {
        if (amount == 0)
            if (confirm('您确定不购买该商品？') == false) {
                return;
            }
        var param = "ItemId=" + itemid + "&Amount=" + amount;

        $.getScript(yuming + "/Order/ChangeAmount_NP.do?" + param, function (data) {
            if (data < 0) {
                if (data.substring(0, 3) == -82) {
                    alert("此商品单品限购 " + data.substring(3) + " 件！");
                }
                else if (data.substring(0, 3) == -81) {
                    alert("此商品库存不足，仅剩 " + data.substring(3) + " 件！");
                }
                else {
                    alert("该商品库存数量不足，请输入更小商品数量值！");
                }
            }
            else {

                //VerifyCoupon(); 2015-3-17 庞军伟 注释掉该行代码。
                ShowCart(yuming);
                GetQuantity(yuming);

                //删除商品时刷新当前页面 保税区优化时的需求。By JunFu.wang
                location.reload();
            }
        });
    }
    else {
        alert("请输入1-9999的商品数量！");
    }
}


var gotoCheckoutCount = 0;

function gotoCheckout(yuming) {

    var myDate = new Date();
    var mytime = myDate.toLocaleTimeString();
    if (!yuming) {
        yuming = "";
    }

    var GQ = parseInt($("#GQuantity").html());

    if (GQ > 0) {
        if (yuming != "") {
            window.location = yuming + "/Order/MyCart.do?t=" + mytime;
        }
        else {
            window.location = yuming + "/Order/MyCart.do?type=1&t=" + mytime;
        }
    }
    else {
        $.getJSON(yuming + "/Order/GetQuantity_NP.do?jsoncallback=?&t=" + mytime, function (data) {
            var q = data;
            GQ = parseInt(q.Gou);

            if (GQ > 0) {

                window.location = yuming + "/Order/MyCart.do?type=1&t=" + mytime;
            }
            else {
                alerts.onLayer({
                    type: "default",
                    doubleLayer: {
                        zindex: [100011, 100012],
                        mask: "#subMask"
                    },
                    opa: .5,
                    txt: "您的购物车里没有商品，请继续购物！",
                    divAddClass: ["subtitle"],
                    okval: "确定",
                    ok: function (c) {
                        c();
                    },
                });
                //alert("您的购物车里没有商品，请继续购物！");
            }
        });
    }
}


//大陆仓储和直邮订单
function gotoCheckout2() {
    var GQ = parseInt($("#subGoodsCount_span").html());

    if (GQ > 0) {
        var myDate = new Date();
        var mytime = myDate.toLocaleTimeString();
        $.getJSON("/order/check_cuxiao.do?type=0&time=" + mytime, {},
            function (json) {
                closeLoginWin();
                //                alert(json.isCanBuy + "--" + json.isdel + "--" + json.goodsFlag + "--" + json.lastminuteState + "--" + json.baoshuiJudge)
                if (json.isCanBuy) {

                    //正常
                }
                else {

                    alert(json.cantGoodName);
                    return;
                }

                if (json.isdel) {
                    alert("购物车里的部分换购商品，不符合订单换购规则已经自动删除了");
                    window.location.href = "/Order/CheckOut.do?transportType=0&t=" + mytime + "";
                    return;
                }

                //                if (json.goodsFlag) {
                //                    alert("您的购物车中有无货商品，请您修改购物车后下单！");
                //                    window.location.href = "/Order/mycart.do?t=" + mytime;
                //                    return;
                //                }

                //                if (json.lastminuteState == 1 || json.lastminuteState == 2) {
                //                    alert("您的购物车中的限时抢购商品已抢光或已结束，请您修改购物车后下单！");
                //                    window.location.href = "/Order/mycart.do?t=" + mytime;
                //                    return;
                //                }

                if (json.baoshuiJudge) {
                    alert(json.baoshuiJudge);
                    window.location.href = "/Order/mycart.do?t=" + mytime;
                    return;
                }

                window.location.href = "/Order/CheckOut.do?transportType=0&t=" + mytime + "";
            }
        );
    }
    else {
        alerts.onLayer({
            type: "default",
            doubleLayer: {
                zindex: [100011, 100012],
                mask: "#subMask"
            },
            opa: .5,
            txt: "您的购物车里没有商品，请继续购物！",
            divAddClass: ["subtitle"],
            okval: "确定",
            ok: function (c) {
                c();
            },
        });
        //alert("您的购物车里没有商品，请继续购物！");
    }
}



//保税区订单
function gotoCheckOutb() {
    var GQ = parseInt($("#bssubGoodsCount_span").html());
    if (GQ > 0) {
        var myDate = new Date();
        var mytime = myDate.toLocaleTimeString();

        $.post("/Order/checkBs.do?time=" + mytime, {}, function (data) {
            if (data < 0) {
                alert('该商品库存数量不足，请输入更小商品数量值！');
                return;
            }
            else if (data == 12) {
                alert('根据国家海关总署规定，个人单次购买保税区商品价值不可超过1000元人民币，给您带来的困扰深表歉意。');
                return;
            }
            else {
                window.location.href = "/Order/CheckOut.do?transportType=2&t=" + mytime + "";
            }
        });
    }
    else {
        alert("您的保税区购物车里没有商品，请继续购物！");
        return;
    }
}

function closeLoginWin() {
    $(".scratchMask").css("display", "none");
    $(".winRegister").css("display", "none");
}

function gotoCheckLogin() {
    var torf = $('#IsBtn').val();
    if (torf == "false") {
        return;
    }
    jQuery.ajax({
        url: "/user/checkUserIsLogin_NP.do"
        , type: "post"
        , cache: false
		, dataType: "json"
		, success: function (data) {

		    if (data.Error == "1") {
		        jQuery.get("/User/IncWindowsLogin.do?backurl=" + window.location.href, function (result) {
		            if (!$(".winRegister").length) {
		                $("body").append(result);
		            }

		            $(".scratchMask").css("display", "block");
		            $(".scratchMask").css("height", $(document).height());

		            //弹层显示并居中
		            $(".winRegister").css("display", "block");

		            //弹层的关闭
		            $(".winClose").click(function () {
		                closeLoginWin();
		            });
		        });
		    }
		    else if (data.Error == "0") {
		        closeLoginWin();
		        gotoCheckout2();
		    }
		    else {
		        closeLoginWin();

		        window.location.href = window.location.host;
		    }

		}
        , error: function (xhr, sts, error) {
            if (error != "") {
                alert(error);
            }
            else {
                alerts.onLayer({
                    type: "default",
                    doubleLayer: {
                        zindex: [100011, 100012],
                        mask: "#subMask"
                    },
                    opa: .5,
                    txt: "您已经点击去结算，请不要重复操作",
                    divAddClass: ["subtitle"],
                    okval: "确定",
                    ok: function (c) {
                        c();
                    },
                });
            }
        }
    });
}


function VerifyCoupon() {
    $.post("/Order/VerifyCoupon.do", null, function (data) {
        if (data == '2') {
            alert('您的商品数量发生改变，系统自动删除了您填写的部分代金券!');
        }
    });
}


/*
* 处理过长的字符串，截取
* 注：半角长度为1，全角长度为2
* 
* pStr:字符串
* pLen:截取长度
* 
* return: 截取后的字符串
*/
function autoAddEllipsis(pStr, pLen) {

    var _ret = cutString(pStr, pLen);
    var _cutFlag = _ret.cutflag;
    var _cutStringn = _ret.cutstring;

    if ("1" == _cutFlag) {
        return _cutStringn;
    } else {
        return _cutStringn;
    }
}


/*
* 处理过长的字符串，截取并添加省略号
* 注：半角长度为1，全角长度为2
* 
* pStr:字符串
* pLen:截取长度
* 
* return: 截取后的字符串
*/
function autoAddEllipsis1(pStr, pLen) {

    var _ret = cutString(pStr, pLen);
    var _cutFlag = _ret.cutflag;
    var _cutStringn = _ret.cutstring;

    if ("1" == _cutFlag) {
        return _cutStringn;
    } else {
        return _cutStringn;
    }
}


/*
* 取得指定长度的字符串
* 注：半角长度为1，全角长度为2
* 
* pStr:字符串
* pLen:截取长度
* 
* return: 截取后的字符串
*/
function cutString(pStr, pLen) {

    // 原字符串长度 
    var _strLen = pStr.length;

    var _tmpCode;

    var _cutString;

    // 默认情况下，返回的字符串是原字符串的一部分 
    var _cutFlag = "1";

    var _lenCount = 0;

    var _ret = false;

    if (_strLen <= pLen / 2) {
        _cutString = pStr;
        _ret = true;
    }

    if (!_ret) {
        for (var i = 0; i < _strLen; i++) {
            if (isFull(pStr.charAt(i))) {
                _lenCount += 2;
            } else {
                _lenCount += 1;
            }

            if (_lenCount > pLen) {
                _cutString = pStr.substring(0, i);
                _ret = true;
                break;
            } else if (_lenCount == pLen) {
                _cutString = pStr.substring(0, i + 1);
                _ret = true;
                break;
            }
        }
    }

    if (!_ret) {
        _cutString = pStr;
        _ret = true;
    }

    if (_cutString.length == _strLen) {
        _cutFlag = "0";
    }

    return { "cutstring": _cutString, "cutflag": _cutFlag };
}


/**
* 判断是否为全角
* 
* pChar:长度为1的字符串
* return: tbtrue:全角
*          false:半角
**/
function isFull(pChar) {
    for (var i = 0; i < pChar.strLen; i++) {
        if ((pChar.charCodeAt(i) > 128)) {
            return true;
        } else {
            return false;
        }
    }
}


function ShowUserStatus(yuming) {
    if (!yuming) {
        yuming = "";
    }
    if (window.location.host.toLowerCase().indexOf(".m6go.com") > 0) {
        yuming = yuming.replace(/\.gou\.com/g, ".m6go.com");
    } else if (window.location.host.toLowerCase().indexOf(".gou.com") > 0) {
        yuming = yuming.replace(/\.m6go\.com/g, ".gou.com");
    }

    var host = window.location.host;
    if (host.slice(-7) == 'm6go.hk') {
        yuming = document.location.protocol+"//" + host;
    }

    var myDate = new Date();
    var mytime = myDate.toLocaleTimeString();
    var currentUrl = window.location.href;
    var param = "rct=" + mytime + "&currentUrl=" + currentUrl;
    $.getScript(yuming + "/user/ShowUserStatus.do?" + param, function (data) {
        $("#DivUserStatus").html("");
        $("#DivUserStatus").html(contentData.CData);
        if (window.location.href.toLowerCase().indexOf("channel.m6go.com") > 0 || window.location.href.toLowerCase().indexOf("channel.gou.com") > 0) {
            ReplaceChannelUrl();
        }
    });
}

function ShowUserStatus2(yuming) {
    if (!yuming) {
        yuming = "";
    }

    var host = window.location.host;
    if (host.slice(-7) == 'm6go.hk') {
        yuming = document.location.protocol+"//" + host;
    }

    var myDate = new Date();
    var mytime = myDate.toLocaleTimeString();
    var currentUrl = window.location.href;
    var param = "rct=" + mytime + "&currentUrl=" + currentUrl;
    $.getScript(yuming + "/user/ShowUserStatus2.do?" + param, function (data) {
        $("#DivUserStatus").html("");
        $("#DivUserStatus").html(contentData.CData);
    });
}

//设置微信专属客服弹出
function GetLoginWeChate(site) {
    if (!site) {
        site = "";
    }
    var url = site + "/User/checkWeChatUserIsLogin_NP.do?jsoncallback=?&r=" + Math.random;
    jQuery.getJSON(url, function (data) {
        var tactusW = $(".tactus").parent().attr("w") * (($(window).width() + 20) / 1920)
        $(".tactus").parent().attr("w", tactusW);
        $(".tactusImg .i1").css("width", tactusW)
        $(".tactus").parent().css({ bottom: 0 });
        $(".tactus a").width(tactusW - 20)
      
        if (data.Content.Code == 1) {
            
            //没登录 
            $(".LoginAfter").hide();
            $(".LoginBefore").show();
            $(".tactus").show();
            //首次弹出微信客服
            if (data.Content.Num == 1)
            {
                /*客服显示初始化*/
                $(".tactus").parent().css({ width: tactusW, left: -tactusW });
                $(".tactus").addClass("open");
                $(".tactus").parents(".kf").addClass("open");
            }
        } else if (data.Content.Code == 0) {
            //已登录
            if (data.Content.DataSource != null) {
                //已绑定微信客服
                $(".i2").attr("src", data.Content.DataSource.WeChatServerQRcodePic);
                $(".i3_1").attr("src", data.Content.DataSource.AdminUserPhoto);
                $(".i3_2").attr("src", data.Content.DataSource.AdminUserPhoto);
                
                $(".LoginAfter").show();
                $(".LoginBefore").hide();
                $(".tactus").show();

                //已绑定但绑定状态<=1
                //首次弹出微信客服
                if (data.Content.Num == 1) {
                    /*客服显示初始化*/
                    $(".tactus").parent().css({ width: tactusW, left: -tactusW });
                    $(".tactus").addClass("open");
                    $(".tactus").parents(".kf").addClass("open");
                }
            }
            //用户都绑定了客服,一下代码不需要
            //else
            //{
            //    $(".LoginAfter").show();
            //    $(".LoginBefore").hide();
            //    $(".tactus").show();
            //    //未绑定
            //    //首次弹出微信客服
            //    if (data.Content.Num == 1) {
            //        /*客服显示初始化*/
            //        $(".tactus").parent().css({ width: tactusW, left: -tactusW });
            //        $(".tactus").addClass("open");
            //        $(".tactus").parents(".kf").addClass("open");
            //    }
            //}
           

        }
        else {
            window.location.href = window.location.host;
        }

    });
}