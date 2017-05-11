/***********************************jquery.loader.js+jquery.cart.js+mall.js*******************************************/

/***********************************jquery.loader.js*******************************************/
(function ($) {

    var loader = {
        defaults: {
            margin: 500
        },
        url: "",
        offsettop: 0,
        element: null,
        elements: null,
        index: 0,
        init: function (elements, options) {
            this.options = $.extend({}, this.defaults, options);
            this.elements = elements;
            this.bindNext();
        },
        bindNext: function () {
            if (this.elements.length <= this.index) {
                return;
            }
            this.element = $(this.elements).get(this.index++);
            this.url = $(this.element).attr("href");
            this.offsettop = $(this.element).offset().top - this.options.margin;
            $(window).scroll($.proxy(this.scrollHandler, this));
        },
        scrollHandler: function () {
            var scrollTop = $(window).scrollTop() + $(window).height();
            if (scrollTop > this.offsettop) {
                $.proxy(this.loadHtml(function () {

                    //绑定下一个元素
                    this.bindNext();
                }), this);
                $(window).unbind("scroll", this.scrollHandler);
            }
        },
        loadHtml: function (fun) {
            var thisobj = this;
            $.get(this.url, null, function (data) {
                $(thisobj.element).before(data);
                $(thisobj.element).remove();
                if (fun) {
                    $.proxy(fun, thisobj);
                }
            });
        }
    };

    $.fn.loader = function (options) {
        loader.init(this, options);
    }

})(jQuery);

/***********************************jquery.cart.js*******************************************/
(function () {
    var cart = {
        defaults: {
            domain: '',
            hit: '',
            referrer: ''
        },
        source:0,
        options: {},
        html: "<!--购物车浮层-->" +
                        "<div class=\"carDiv addCarDiv\">" +
                        "<a class=\"close\">关闭</a>" +
                        "<p class=\"tex\">" +
                        "<i></i>" +
                        "<span class=\"bold\">添加成功！</span>" +
                        "<span>购物车共有<span class=\"red\" id=\"cartgoodscount\">1</span>件商品，合计：<span class=\"red\" id=\"carttotalprice\">¥0</span></span></p>" +
                        "<p class=\"btn\"><a class=\"addBtn\" href=\"javascript:void(0);\">去结算</a>" +
                        "<a class=\"goBuy\">继续购物</a>" +
                        "</p>" +
                        "</div>",
        htmlPromotion: "<!--购物车浮层-->" +
                        "<div class=\"carDiv addCarDiv\">" +
                        "<a class=\"close\">关闭</a>" +
                        "<p class=\"tex\" style=\"width:190px; margin:0 auto;\">" +
                        "<i></i>" +
                        "<span class=\"bold\" style=\"line-height:52px\" >添加成功！</span>" +
                        "</p>" +
                        "<p class=\"btn\"><a class=\"addBtn\" href=\"javascript:void(0);\">去结算</a>" +
                        "<a class=\"goBuy\">继续购物</a>" +
                        "</p>" +
                        "</div>",
        init: function (opts,sour) {
            this.options = jQuery.extend(this.defaults, opts);
            this.source = sour;
            if (this.source == 1) {
                $(document.body).append(this.htmlPromotion);
            }
            else
            {
                $(document.body).append(this.html);
            }
            $('.carDiv .close,.goBuy').click(this.close);
            $(".carDiv .addBtn").click(this.checkOut);
            $(window).scroll();
        },

        getCount: function (dm, fun) {
            if (!dm)
                dm = "";
            var myDate = new Date();
            var mytime = myDate.toLocaleTimeString();

            jQuery.getJSON(dm + "/Order/GetQuantity_NP.do?jsoncallback=?&t=" + mytime, function (res) {
                if (fun) {
                    fun(res.Gou, res.SubTotal);
                }
            });
        },
        //        getPrice: function (dm, fun) {
        //            if (!dm)
        //                dm = "";
        //            jQuery.getJSON(dm + "/Order/Cart_Json.do?jsoncallback=?", function (data) {
        //                var content = data.Content;
        //                var c = $(content).find("b").text();
        //                if (fun) {

        //                    fun(c);
        //                }
        //            });

        //        },
        show: function (count, price) {
            $("#cartgoodscount").html(count);
            $("#carttotalprice").html(parseFloat(price).toFixed(2));
            $('#bgMask').css('height', $(document).height());
            $('.addCarDiv').css('display', 'block');
            $('#bgMask').css('display', 'block');
            
        },
        showPromotion: function () {
            $('#bgMask').css('height', $(document).height());
            $('.addCarDiv').css('display', 'block');
            $('#bgMask').css('display', 'block');

        },
        close: function () {
            $('.carDiv').css('display', 'none');
            $('#bgMask').css('display', 'none');
            //数据采集 by junfu.wang 2015-11-16
            HitsPosition(-100, 0, 0, 0);
        },
        showDiv: function () {
            this.getCount(this.options.domain, function (count, price) {
                if (cart.source == 0) {
                    cart.show(count, price);
                }
                else {
                    cart.showPromotion();
                }
                //更新右侧购物车数量 by 韩锐
                $('#GQuantity').text(count);
            });
        },
        addToCart: function (goodsid) {
            var ListproductHrefLink = eval('(' + jQuery.cookie("productHrefLink") + ')');
            var myDate = new Date();
            var mytime = myDate.toLocaleTimeString();
            var amount = 1;
            var param = { sid: "", goodsId: goodsid, amount: amount, hitPosition: ListproductHrefLink.position, referrerUrl: window.location.href, rct: mytime };

            //执行插入购物车操作
            jQuery.post("/Order/AddGoods_List.do", param, function (data) {
                var result = eval("[" + data + "]");
                if (parseInt(result[0].printCode) > 0) {
                    cart.showDiv();
                }
                else {
                    if (result[0].printCode == "-1")
                        alert('库存不足');
                    else if (result[0].printCode == "-2")
                        alert('购物车中的商品种类超过允许的上限，请分订单购买');
                    else if (result[0].printCode == "-3")
                        alert('您输入的数量超过库存数量，您最多还可购买' + result[0].shengCount + '件');
                    else if (result[0].printCode == "-4")
                        alert('您要购买的商品已下架');
                    else if (result[0].printCode == "-5")
                        alert('您要购买的商品无货');
                    else if (result[0].printCode == "-6")
                        alert('该商品限购' + result[0].shengCount + '件');
                    else if (result[0].printCode == "-7")
                        alert("活动商品抢的太快，已经抢光啦，下手要快哦！");
                    else if (result[0].printCode == "-8")
                        alert('活动商品每人限购' + result[0].shengCount + '件，留点机会给别人吧！');
                    else if (result[0].printCode == "-20")
                        alert('该商品属于赠品，您只能购买一个');
                    else if (result[0].printCode == "-21")
                        alert('该商品属于赠品，您只能购买一个');
                    else if (result[0].printCode == "-31")
                        alert('该商品为限购商品，您已超过最大限购数！');   //保税区优化 By JunFu.wang
                    else if (result[0].printCode == "-32")
                        alert('该商品暂时无货！');   //保税区优化 By JunFu.wang
                    else
                        alert("购买商品失败，错误代号：" + result[0].printCode);
                }
            });
        },
        addGoodToCart: function (goodsid, skuid, type) {

            var myDate = new Date();
            var mytime = myDate.toLocaleTimeString();
            var amount = 1;
            var param = { skuid: skuid, sid: "", goodsId: goodsid, amount: amount, hitPosition: this.options.hit, referrerUrl: this.options.referrer, rct: mytime, swapIndex: type };

            //执行插入购物车操作
            jQuery.post("/Order/AddGoods_ListXR.do", param, function (data) {


                var result = eval("[" + data + "]");
                if (parseInt(result[0].printCode) > 0) {
                    window.location.href = window.location.href;

                }
                else {
                    if (result[0].printCode == "-1")
                        alert('库存不足');
                    else if (result[0].printCode == "-2")
                        alert('购物车中的商品种类超过允许的上限，请分订单购买');
                    else if (result[0].printCode == "-3")
                        alert('您输入的数量超过库存数量，您最多还可购买' + result[0].shengCount + '件');
                    else if (result[0].printCode == "-4")
                        alert('您要购买的商品已下架');
                    else if (result[0].printCode == "-5") {
                        alert('您要购买的商品无货');
                    }
                    else if (result[0].printCode == "-6")
                        alert('该商品限购' + result[0].shengCount + '件');
                    else if (result[0].printCode == "-7")
                        alert("活动商品抢的太快，已经抢光啦，下手要快哦！");
                    else if (result[0].printCode == "-8")
                        alert('活动商品每人限购' + result[0].shengCount + '件，留点机会给别人吧！');
                    else if (result[0].printCode == "-20")
                        alert('该商品属于赠品，您只能购买一个');
                    else if (result[0].printCode == "-31")
                        alert('该商品为限购商品，您已超过最大限购数！');
                    else if (result[0].printCode == "-32")
                        alert('此商品已售罄，请您选择其它在售商品');
                    else if (result[0].printCode == "-21")
                        alert('该商品属于赠品，您只能购买一个');
                    else
                        alert("购买商品失败，错误代号：" + result[0].printCode);
                }
            });
        },
        checkOut: function () {
            var GQ = parseInt($("#GQuantity").html());
            if (GQ > 0) {
                cart.gotToCheckOut();
            }
            else {
                cart.getCount(cart.options.domain, function (count) {
                    if (count > 0) {
                        cart.gotToCheckOut();
                    }
                    else {
                        alert("您的购物车里没有商品，请继续购物！");
                    }
                });

            }
        },
        gotToCheckOut: function () {
            var myDate = new Date();
            var mytime = myDate.toLocaleTimeString();
            var url = this.options.domain + "/Order/MyCart.do?t=" + mytime;
            if (this.options.domain == "") {
                url += "&type=1";
            }
            window.location = url;
        },
    };

    jQuery.cart = function (opts,sour) {
        cart.init(opts, sour);
    }

    jQuery.addToCart = function (goodid) {
        cart.addToCart(goodid);
    }
    jQuery.addGoodToCart = function (goodid, skuid, type) {
        cart.addGoodToCart(goodid, skuid, type);
    }


})(jQuery);




/*----------------------------Mall.js--------------------------------------*/
function showOnLoadingLayer(left, top) {
    $("#theLoading").css("left", left);
    $("#theLoading").css("top", top);
    $("#theLoading").show();
}
function closeOnLoadingLayer() {
    $("#theLoading").hide();
}
//加入收藏 by xiaotong.cao
function addfavor(url, title) {

    var sURL = url;
    var sTitle = title;
    try {
        if (jQuery.browser.mozilla) {
            window.sidebar.addPanel(sTitle, sURL, "");
        }
        else if (jQuery.browser.msie) {
            window.external.addFavorite(sURL, sTitle);
        }
        else {
            alert('您的浏览器不支持点击收藏，请按快捷键 Ctrl+D 收藏');
        }
    }
    catch (e) {
        alert("您当前的浏览器不支持此功能，请使用Ctrl+D添加收藏！");
    }
}
//---导航搜索-------------------------------------------------------------------------------------
function search_key_focus(obj, defaultValue) {
    if (obj.value == defaultValue) { obj.value = ""; obj.style.color = '#000'; }
}
function search_key_blur(obj, defaultValue) {

    var str = obj.value;
    str = str.replace(/(<(meta|iframe|frame|span|tbody|layer|font)[^>]*>|<\/(iframe|frame|meta|span|tbody|layer|font)>)/gi, "");

    if (str == "" || str == 'undefined') {
        obj.value = defaultValue;
        obj.style.color = '#999999';
    }
}

function search_hotKey(hotkey) {
    var key = $("#search_key").val();
    var str = hotkey;
    if (str != "") {
        str = str.replace(/(<(meta|iframe|frame|span|tbody|layer|font)[^>]*>|<\/(iframe|frame|meta|span|tbody|layer|font)>)/gi, "");
    }
    $("#searchForm").attr('target', '_blank');

    $("#search_key").val(str);
    $("#searchForm").submit();
    $("#search_key").val(key);
    $("#searchForm").attr('target', '_self');
}
function search_submit() {
    var obj = document.getElementById("search_key");

    //    if (obj.value == "518婴儿节，5折就购了" || obj.value == "") {
    if (obj.value == "") {
        alert("请输入搜索关键词");
        obj.focus();
        return false;
    }
    $.cookie("SearchLog", obj.value, { path: "/" });

    return true;
}
function findValue(li) {
    if (li == null) return alert("No match!");

    if (!!li.extra) var sValue = li.extra[0];

    else var sValue = li.selectValue;

    $("#search_key").focus();
}

function selectItem(li) {
    findValue(li);
}

function formatItem(row) {
    return row[0];
}

function lookupAjax() {
    var oSuggest = $("#search_key")[0].autocompleter;
    oSuggest.findValue();
    return false;
}

function filterKey(key) {
    key = key.replace(/<\/span>/g, "");
    key = key.replace("<span class='ac_name'>", "@");

    key = key.substring(key.lastIndexOf("@") + 1);

    return key;
}
//---收藏------------------------------------------------------------------------------
function collectGoodsFun(goodsId) {
    var param = { goodsId: goodsId };
    $.post("/goods/collectGoods_NP.do", param, function (data) {

        if (data == 1)
            alert("收藏成功！");
        else if (data == -3)
            alert("收藏的商品不存在！");
        else if (data == -2)
            gotoLogin("你还没有登录，无法收藏！现在就去登录吗？");
        else if (data == -1)
            alert("已收藏！");
        else
            alert("收藏失败！错误代号：【" + data + "】");
    });
}

//---评论------------------------------------------------------------------------------	
function CommentGoodsFun(goodsId) {
    var param = { goodsId: goodsId };
    $.post("/goods/commentGoods_NP.do", param, function (data) {

        if (data == -2)
            gotoLogin("您还没有登录，无法发表评论！现在就去登录吗？");
        else if (data == -1)
            alert("您还没有购买该商品，不能发表评论！");
        else if (data == 0)
            alert("您已经发表过评论了，不能重复发表评论！");
        else
            window.location = "/my/OrderList.do";
    });
}
//---邀请------------------------------------------------------------------------------
function showInvite() {
    $("#divInvite").show();
}

function hideInvite() {
    $("#divInvite").hide();
}
//---代金券------------------------------------------------------------------------------
function reloadCaptcha(b) {

    if (b) {
        //代金
        $("#captchaDJ").attr("src", '/verifyImgB.aspx?bgColor=F6F6F6&r=' + Math.random());
    }
    else {
        //满减
        $("#captchaMJ").attr("src", '/verifyImg.aspx?bgColor=F6F6F6&r=' + Math.random());
    }

    return false;
}
function bindDJ(source) {
    var oSN = $("#txtSN");
    var oCode = $("#verifyCodeDJ");

    var sn = oSN.val().toUpperCase();
    var vcode = oCode.val();

    if (!$.trim(sn)) {
        alert("请输入您要添加的代金券号");
        oSN.focus();
        return false;
    }
    if (!$.trim(vcode)) {
        alert("请输入验证码");
        oCode.focus();
        return false;
    }
    jQuery.post("/my/BindCoupon_NP.do", {
        txtSN: sn,
        vcode: vcode
    },
    function (data) {
        reloadCaptcha(1);
        if (data == "-1") alert("验证码错误！");
        else if (data == "-2") alert("代金券不存在，请核对您的券号。");
        else if (data == "-3") alert("您的代金券已经被使用过了！");
        else if (data == "-4") alert("您的代金券已被禁止使用！");
        else if (data == "-5") alert("请输入验证码！");
        else if (data == "-6") alert("请输入您要添加的代金券号！");
        else if (data == "-7") alert("该代金券已经绑定了其他账户，只有绑定用户才能使用。");
        else if (data == "-8") alert("很抱歉，您输入的代金券已过期。");
        else if (data == "-9") alert("您还没有登录，请登录后使用，谢谢。");
        else if (data == "-10") alert("该代金券已经录入，请直接使用。");
        else {
            alert("添加成功!");

            if (source == "mysoupon") location.reload();
            if (source == "checkout") loadCouponDJ();   //这里弹出错误以后，输入的代金券清空是因为这个函数又调用了一遍页面，做了刷新
        }

        oCode.val("");    //清空验证码
    });
}


function bindYHQ(source) {
    var oSN = $("#txtSN");
    var oCode = $("#verifyCodeDJ");

    var sn = oSN.val().toUpperCase();
    var vcode = oCode.val();

    if (!$.trim(sn) || $.trim(sn) == "请输入您的券号") {
        alert("请输入您要添加的优惠券号");
        oSN.focus();
        return false;
    }
    if (!$.trim(vcode) || $.trim(vcode) == "验证码") {
        alert("请输入验证码");
        oCode.focus();
        return false;
    }
    jQuery.post("/my/BindCouponFC_NP.do", {
        txtSN: sn,
        vcode: vcode
    },
    function (data) {
        reloadCaptcha(1);
        if (data == "-1") alert("验证码错误！");
        else if (data == "-2") alert("代金券不存在，请核对您的券号。");
        else if (data == "-3") alert("您的代金券已经被使用过了！");
        else if (data == "-4") alert("您的代金券已被禁止使用！");
        else if (data == "-5") alert("请输入验证码！");
        else if (data == "-6") alert("请输入您要添加的代金券号！");
        else if (data == "-7") alert("该代金券已经绑定了其他账户，只有绑定用户才能使用。");
        else if (data == "-8") alert("很抱歉，您输入的代金券已过期。");
        else if (data == "-9") alert("您还没有登录，请登录后使用，谢谢。");
        else if (data == "-10") alert("该代金券已经录入，请直接使用。");
        else {
            alert("添加成功!");

            if (source == "mysoupon") location.reload();
            if (source == "checkout") loadCouponDJ();   //这里弹出错误以后，输入的代金券清空是因为这个函数又调用了一遍页面，做了刷新
        }

        oCode.val("");    //清空验证码
    });
}

//绑定优惠券给用户
function BindCouponToUser(source) {
    var oSN = $("#txtSN");
    var oCode = $("#verifyCodeDJ");

    var sn = oSN.val().toUpperCase();
    var vcode = oCode.val();

    if (!$.trim(sn) || $.trim(sn) == "请输入您的券号") {
        alert("请输入您要添加的优惠券号");
        oSN.focus();
        return false;
    }
    if (!$.trim(vcode) || $.trim(vcode) == "验证码") {
        alert("请输入验证码");
        oCode.focus();
        return false;
    }
    jQuery.post("/my/BindCouponFCNew_NP.do", {
        txtSN: sn
        , vcode: vcode
        , SourcePage: source
        , isBuyNow: $("#isBuyNow").val()
        , goodsId: $("#goodsId").val()
        , goodsNorm: $("#goodsNorm").val()
        , buyCount: $("#buyCount").val()
        , isBonded: $("#isBonded").val()
    },
    function (data) {

        reloadCaptcha(1);

        alert(data.Message);

        if (data.Error == 0) {

            if (source == "mysoupon") {
                location.reload();
            }
            if (source == "checkout") {
                loadCouponDJ();   //这里弹出错误以后，输入的代金券清空是因为这个函数又调用了一遍页面，做了刷新
                getCouponCombination(0);
                getCouponCombination(1);

            }
        }
        oCode.val("");    //清空验证码
    }
    , "json");
}
//----订单列表 获取子订单列表--------------------
function getChildOrderListFun(parentOrderId) {
    $("#content_" + parentOrderId + "_Div").html("正在加载中...");
    jQuery.post("/my/incChildOrderList.do",
					    { parentOrderId: parentOrderId },
					    function (data) {
					        $("#content_" + parentOrderId + "_Div").css("display", "none");
					        $("#orderId_" + parentOrderId + "_Div").css("display", "block");
					        $("#orderId_" + parentOrderId + "_Div").append(data);

					        //设置元素高度
					        if ($(".growBox").size() == 1) {
					            $($(".userListDiv").eq(0)).height($(".myOrderBox").height() + $(".titDiv").height() * 2);
					            $($(".userListDiv").eq(1)).height(140);
					        }
					        else {
					            $(".userListDiv").height($(".myOrderBox").height() + $(".titDiv").height() * 2);
					        }
					    });
}
//----订单列表 获取周期购列表--------------------
function getCycleOrderListFun(parentOrderId, OrderId, FrontOrderId, GoodsCount) {
    $("#CyleOrder_" + OrderId).html("正在加载中...");
    jQuery.post("/my/incCyleOrderList.do",
					    { parentOrderId: parentOrderId, OrderId: OrderId, FrontOrderId: FrontOrderId, GoodsCount: GoodsCount },
					    function (data) {
					        $(".userListDiv").height($(".userLeft").height() - 1);
					        $("#CyleOrder_" + OrderId).html(data);
					        if (data != "") {

					            $("#OrderPrice_" + OrderId).html("￥" + $("#CyleOrder_" + OrderId).find("ul[date-TotalAmount]").attr("date-TotalAmount"));

					            var state = $("#CyleOrder_" + OrderId).find("ul[date-state]").attr("date-state");

					            var orders = $("#CyleOrder_" + OrderId).find("ul[data-orders]").attr("data-orders");

					            var deleteFlag = $("#CyleOrder_" + OrderId).find("ul[data-delete]").attr("data-delete");

					            if (state > 0) {
					                $("#OrderState_" + OrderId).remove();
					            }
					            else {
					                $("#OrderState_" + OrderId).children().removeAttr("onclick").click(eval(function () { showTanCeng('CycleOrdercancel', orders, '') }));
					            }
					            if (deleteFlag > 0) {
					                $("#OrderDelete_" + OrderId).children().html("删除订单").click(eval(function () { showTanCeng('CycleDelOrder', orders, OrderId) }));
					            }


					        }

					        //设置元素高度
					        if ($(".growBox").size() == 1) {
					            $($(".userListDiv").eq(0)).height($(".myOrderBox").height() + $(".titDiv").height() * 2);
					            $($(".userListDiv").eq(1)).height(140);
					        }
					        else {
					            $(".userListDiv").height($(".myOrderBox").height() + $(".titDiv").height() * 2);
					        }
					    });
}


//----360账户登录函数--------------------
function to360Login(apiwebsite, backUrl) {
    //alert(document.URL);
    location.href = "" + apiwebsite + "/ThirdAPI/S60CPS/OAuthLogin.do?backUrl=" + backUrl;
}

//----qq账户登录函数--------------------
function toQzoneLogin(apiwebsite, backUrl, appid) {
    //以下为按钮点击事件的逻辑。注意这里要重新打开窗口
    //否则后面跳转到QQ登录，授权页面时会直接缩小当前浏览器的窗口，而不是打开新窗口
    //var A = window.open("https://graph.qq.com/oauth2.0/authorize?client_id="+appid+"&response_type=token&scope=all&redirect_uri=" + backUrl, "TencentLogin", "width=450,height=320,menubar=0,scrollbars=1,resizable=1,status=1,titlebar=0,toolbar=0,location=1");
    //location.href="/ThirdLogin/logintoqq.do";

    //在当前页面打开---任凯丽
    //window.location.href = "https://graph.qq.com/oauth2.0/authorize?client_id=" + appid + "&response_type=token&scope=all&redirect_uri=" + backUrl;

    window.location.href = "" + apiwebsite + "/ThirdAPI/QQ/QQUnionLogin.do?u_id=" + appid + "&redirect_uri=" + backUrl;

    //如果以后QQ登录判断了reffer，不认识gou.com这个域名，那么使用下面的方法做跳转。
    //window.location.href = "http://www.m6go.com/qqLogin.html?url=" + escape("https://graph.qq.com/oauth2.0/authorize?client_id=" + appid + "&response_type=token&scope=all&redirect_uri=" + backUrl);
}

function toQzoneLoginMid(url) {
    window.location.href = unescape(url);
}

//----支付宝账户登录函数--------------------
function toAlipayLogin(apiwebsite, backUrl) {
    //以下为按钮点击事件的逻辑。注意这里要重新打开窗口
    //否则后面跳转到QQ登录，授权页面时会直接缩小当前浏览器的窗口，而不是打开新窗口

    //var A = window.open(""+apiwebsite+"/ThirdApi/alipayAuth/logintoAlipay.do?backUrl=" + backUrl, "AlipayLogin", "width=1000,height=600,top=100,left=0,menubar=0,scrollbars=1,resizable=1,status=1,titlebar=0,toolbar=0,location=1");
    //location.href="/ThirdLogin/logintoqq.do";

    //在当前页面打开
    window.location.href = "" + apiwebsite + "/ThirdApi/alipayAuth/logintoAlipay.do?backUrl=" + backUrl;
}

//----Sina微博账户登录函数--------------------
function toSinaLogin(apiwebsite, backUrl) {
    //以下为按钮点击事件的逻辑。注意这里要重新打开窗口
    //否则后面跳转到sina登录，授权页面时会直接缩小当前浏览器的窗口，而不是打开新窗口
    //  var A = window.open("http://hapi.m6go.com/ThirdAPI/sina/logintoSiNa.do?backUrl=" + backUrl, "SinaLogin", "width=450,height=320,menubar=0,scrollbars=1,resizable=1,status=1,titlebar=0,toolbar=0,location=1");
    location.href = "" + apiwebsite + "/ThirdAPI/sina/logintoSiNa.do?backUrl=" + backUrl;
}


//---公用函数------------------------------------------------------------------------------
function closeLayerFun(objId) {
    $("#" + objId).hide();
}
function closeLayerFun(objId) {
    $("#" + objId).hide();
}
function hideObj(oid) {
    var obj = document.getElementById(oid);
    obj.style.display = "none";
}
function showObj(oid) {
    var obj = document.getElementById(oid);
    obj.style.display = "";
}
function gotoLogin(msg) {
    if (msg == "") {
        var currentUrl = encodeURIComponent(window.location.href);
        if ("undefined" != typeof yuming) {
            window.location = yuming + "/user/LogIn.do?backUrl=" + currentUrl;
        }
        else {
            window.location = "/user/LogIn.do?backUrl=" + currentUrl;
        }
    }
    else {
        if (confirm(msg)) {
            var currentUrl = encodeURIComponent(window.location.href);
            if ("undefined" != typeof yuming) {
                window.location = yuming + "/user/LogIn.do?backUrl=" + currentUrl;
            }
            else {
                window.location = "/user/LogIn.do?backUrl=" + currentUrl;
            }
        }
    }
}

function DrawImage(ImgD, FitWidth, FitHeight) {
    try {
        var image = new Image();
        image.src = ImgD.src;


        if (image.width > 0 && image.height > 0) {
            if (image.width / image.height >= FitWidth / FitHeight) {
                if (image.width > FitWidth) {
                    ImgD.width = FitWidth;
                    ImgD.height = (image.height * FitWidth) / image.width;
                } else {
                    ImgD.width = image.width;
                    ImgD.height = image.height;
                }
            } else {
                if (image.height > FitHeight) {
                    ImgD.height = FitHeight;
                    ImgD.width = (image.width * FitHeight) / image.height;
                } else {
                    ImgD.width = image.width;
                    ImgD.height = image.height;
                }
            }
        }


    }
    catch (e) { }
}
function copyIt(textit) {
    if (textit == "") {
        alert("您的邀请链接为空!");
        return;
    }
    if (window.clipboardData) {
        window.clipboardData.setData("Text", textit);
        alert("地址:" + textit + "已被复制\r\n您可以粘贴该地址发送给您的朋友！");
    }
    else {
        alert("暂时不支持非IE浏览器,您可以手工复制链接地址发送给您的朋友");
    }
}

function DrawImage2(ImgD, FitWidth, FitHeight) {
    try {
        var image = new Image();
        image.src = ImgD.src;

        if (image.width / image.height >= FitWidth / FitHeight) {
            if (image.width > FitWidth) {
                ImgD.width = FitWidth;
                ImgD.height = (image.height * FitWidth) / image.width;
            } else {
                ImgD.width = image.width;
                ImgD.height = image.height;
            }
        } else {
            if (image.height > FitHeight) {
                ImgD.height = FitHeight;
                ImgD.width = (image.width * FitHeight) / image.height;
            } else {
                ImgD.width = image.width;
                ImgD.height = image.height;
            }
        }

    }
    catch (e) { }
}

//不用了，采用新的收集方法 by junfu 2015-10-12
function CatchHrefLink(position, positionNo, productId, price) {
    //alert(position);
    var genGenDomain = getGenDomain();
    var v = '{"position":"' + position + '","positionNo":"' + positionNo + '","productId":"' + productId + '","price":"' + price + '"}'
    $.cookie("productHrefLink", v, { path: '/', domain: genGenDomain });
    return true;
}

function getGenDomain() {
    var newhost;
    var genDomain;
    var ArrDomain = new Array('.com.cn', '.net.cn', '.org.cn', '.gov.cn', '.com', '.cn', '.tel', '.mobi', '.net', '.org', '.asia', '.me', '.cc', '.name', '.info'); //枚举所有后缀
    var host = document.domain; //当前域名
    for (k in ArrDomain) {
        var index = host.lastIndexOf(ArrDomain[k]);
        if (index >= 0) {
            var hostPart = host.replace(ArrDomain[k], '');
            index = hostPart.lastIndexOf(".");
            genDomain = host.substr(index + 1);
            break;
        }

    }
    return genDomain;
}

//出处:网上搜集   
// Trim() , Ltrim() , RTrim()   
String.prototype.Trim = function () {
    return this.replace(/[ ]/g, "");
}
String.prototype.LTrim = function () {
    return this.replace(/(^\s*)/g, "");
}
String.prototype.RTrim = function () {
    return this.replace(/(\s*$)/g, "");
}

String.prototype.format = function (args) {
    var result = this;
    if (arguments.length > 0) {
        if (arguments.length == 1 && typeof (args) == "object") {
            for (var key in args) {
                if (args[key] != undefined) {
                    var reg = new RegExp("({" + key + "})", "g");
                    result = result.replace(reg, args[key]);
                }
            }
        }
        else {
            for (var i = 0; i < arguments.length; i++) {
                if (arguments[i] != undefined) {
                    var reg = new RegExp("({)" + i + "(})", "g");
                    result = result.replace(reg, arguments[i]);
                }
            }
        }
    }
    return result;
}
String.format = function () {
    if (arguments.length == 0)
        return null;

    var str = arguments[0];
    for (var i = 1; i < arguments.length; i++) {
        var re = new RegExp('\\{' + (i - 1) + '\\}', 'gm');
        str = str.replace(re, arguments[i]);
    }
    return str;
}

function countDown(option) {
    //    option = {
    //        "startDateTime": startDateTime
    //        , "endDateTime": endDateTime
    //        , "selector": selector
    //        , "timeSpan": timeSpan
    //        , "callback": callback
    //    };

    if (isNaN(option.startDateTime)) {
        option.startDateTime = new Date(option.startDateTime.replace("-", "/")).getTime();
    }
    if (isNaN(option.endDateTime)) {
        option.endDateTime = new Date(option.endDateTime.replace("-", "/")).getTime();
    }

    option.timeSpan = option.endDateTime - option.startDateTime;
    if (option.timeSpan > 0) {

        setInterval(function () {

            calcCountDown(option);

        }, 1000);
    }
}
function calcCountDown(option) {

    if (option.timeSpan >= 0) {

        var seconds = option.timeSpan / 1000;

        var myDays = Math.floor(seconds / 3600 / 24);
        var myHours = Math.floor(seconds / 3600 % 24);
        var myMinutes = Math.floor(seconds / 60 % 60);
        var mySeconds = Math.round(seconds % 60);

        //    var days = option.timeSpan / 1000 / 86400;
        //    var myDays = Math.floor(days);

        //    var hours = (days - myDays) * 24;
        //    var myHours = Math.floor(hours);

        //    var minutes = (hours - myHours) * 60;
        //    var myMinutes = Math.floor(minutes);

        //    var seconds = (minutes - myMinutes) * 60;
        //    var mySeconds = Math.round(seconds);
        //console.log(selector + " " + seconds);
        if (option.jsonTemplate) {
            //        if (myDays == 0) {
            //            delete option.jsonTemplate.days;
            //        }
            var arr = [];
            for (var key in option.jsonTemplate) {
                if (myDays == 0 && key == "days") {
                    option.jsonTemplate[key] = "";
                }
                //console.log(key + ":" + option.jsonTemplate[key]);
                arr.push(option.jsonTemplate[key]);
            }
            //add by leiyu 2015-10-21
            if (myDays < 10 && option.daysFormart == 2) {
                myDays = "0" + myDays;
            }
            $(option.selector).html(arr.join("").format({ days: myDays, hours: leftPaddingZero(myHours), minutes: leftPaddingZero(myMinutes), seconds: leftPaddingZero(mySeconds) }));
        }

        else {
            $(option.selector).html(getResult(myDays, myHours, myMinutes, mySeconds, option.caption, option.wrapTag, option.wrapClass, option.timeTag));
        }

        option.timeSpan -= 1000;

    }
    else {
        if (typeof option.callback == "function") {
            option.callback();
        }
    }
}
//显示x天xx日xx时xx秒 by sunrui 2014-09-10
function getResult(d, h, m, s, caption, wrapTag, wrapClass, timeTag) {
    var arr = [];

    //caption，比如：剩余：
    if (caption) {
        arr.push(caption);
    }

    if (wrapTag) {
        arr.push("<" + wrapTag + " class='" + wrapClass + "'>");
    }

    timeTag = timeTag || "em";
    if (d) {
        arr.push("<" + timeTag + ">" + d + "<" + timeTag + ">天");
    }

    arr.push("<" + timeTag + ">" + leftPaddingZero(h) + "<" + timeTag + ">时");
    arr.push("<" + timeTag + ">" + leftPaddingZero(m) + "<" + timeTag + ">分");
    arr.push("<" + timeTag + ">" + leftPaddingZero(s) + "<" + timeTag + ">秒");

    if (wrapTag) {
        arr.push("</" + wrapTag + ">");
    }

    return arr.join("");
}

//左边补零 by sunrui 2014-09-10
function leftPaddingZero(n) {
    return (n < 10 ? "0" + n : n);
}

function validateSecIdCard(n) {
    var d = 0;
    var l = n;
    var i = { 11: "北京", 12: "天津", 13: "河北", 14: "山西", 15: "内蒙", 21: "辽宁", 22: "吉林", 23: "黑龙", 31: "上海", 32: "江苏", 33: "浙江", 34: "安徽", 35: "福建", 36: "江西", 37: "山东", 41: "河南", 42: "湖北", 43: "湖南", 44: "广东", 45: "广西", 46: "海南", 50: "重庆", 51: "四川", 52: "贵州", 53: "云南", 54: "西藏", 61: "陕西", 62: "甘肃", 63: "青海", 64: "宁夏", 65: "新疆", 71: "台湾", 81: "香港", 82: "澳门", 91: "国外" };
    if (!/^\d{17}(\d|x)$/i.test(l)) {
        return false;
    }
    l = l.replace(/x$/i, "a");
    if (i[parseInt(l.substr(0, 2))] == null) {
        return false;
    }
    var j = l.substr(6, 4) + "-" + Number(l.substr(10, 2)) + "-" + Number(l.substr(12, 2));
    var m = new Date(j.replace(/-/g, "/"));
    if (j != (m.getFullYear() + "-" + (m.getMonth() + 1) + "-" + m.getDate())) {
        return false;
    }
    for (var k = 17; k >= 0; k--) {
        d += (Math.pow(2, k) % 11) * parseInt(l.charAt(17 - k), 11)
    }
    if (d % 11 != 1) {
        return false;
    }
    return true;
}

function getCNCookie(wangzhi) {
    var url = wangzhi + "/home/Getcookie.do";
    $.getScript(url, function (data) {
        var ReferUrl = content["ReferUrl"];
        var FrontUrl = content["FrontUrl"];
        jQuery.ajax({
            "type": "get",
            "url": "/goods/SetCookie.do",
            "dataType": "text",
            "data": { ReferUrl: ReferUrl, FrontUrl: FrontUrl },
            "success": function (data) {
            }
        });
    });
}

/***********************************************************************************我的账户/我的订单 Begin ********************************************************/
//确认收货弹层（标识 所用ID,''）
//删除订单弹出层(标识 所用ID,父ID)
function showTanCeng(sign, signId, parentOrderId) {
    $("#Confirmation").removeAttr("onclick");
    if (sign == "OrderFinished") {
        $("#torderId").val(signId);
        $("#MessageContent").html("您确认要收货吗？");
        $("#Confirmation").bind("click", OrderFinished);
    }
    if (sign == "DelOrder") {
        $("#MessageContent").html("您确定删除该订单？");
        $("#Confirmation").bind("click", function () {
            DelOrder(signId, parentOrderId, "");
        });
    }
    if (sign == "Ordercancel") {
        $("#MessageContent").html("您确定取消该订单？");
        $("#Confirmation").bind("click", function () {
            Ordercancel(signId, "");
        });
    }
    if (sign == "CycleOrdercancel") {
        $("#MessageContent").html("您确定取消该订单？");
        $("#Confirmation").bind("click", function () {
            Ordercancel("", signId);
        });
    }
    if (sign == "CycleDelOrder") {
        $("#MessageContent").html("您确定删除该订单？");
        $("#Confirmation").bind("click", function () {
            DelOrder(parentOrderId, parentOrderId, signId);
        });
    }
    var l = document.documentElement.clientWidth / 2 - 200;
    var h = document.documentElement.clientHeight / 2 - 100;
    $('.scratchMask').css('height', $(document).height()); $('.tcpay').css('left', l);
    $('.scratchMask').css('display', "block");
    $('.winCancel').css('position', 'fixed');
    $('.winCancel').css('top', 300);
    $('.winCancel').css('display', "block");
}

//关闭弹层
function closeTanCeng() {
    $('.scratchMask').css('display', 'none');
    $('.winCancel').css('display', 'none');

    HitsPosition(-100,0,0,0);   //购物终点 Step归零。 by junfu 2015-10-14
}

//确认收货
function OrderFinished() {
    var orderId = $("#torderId").val();
    jQuery.ajax({
        "type": "POST",
        "url": "/my/OrderFinished.do?orderid=" + orderId,
        "dataType": "text",
        "data": '',
        "success": function (data) {
            window.location = "/My/MyRateEdit.do?orderid=" + orderId + "&cmtMsg=交易成功！发表评论即可参加抽奖。";
        }
    });
}
//删除订单
function DelOrder(orderId, ParentOrderId, OrderIds) {
    closeTanCeng();
    var requestUrl = "deleteOrder_NP.do?t=" + new Date().getTime();
    var param = { orderId: orderId.toString(), OrderIds: OrderIds.toString() };
    jQuery.ajax({
        url: requestUrl
                , data: param
                , type: "post"
		        , dataType: "text"
		        , success: function (data) {
		            if (data == "1") {

		                $("#" + orderId).remove();
		                if (ParentOrderId > 0) {
		                    var pid = $("#orderId_" + ParentOrderId + "_Div");
		                    if (pid.children("table").length == 0) {
		                        pid.remove();
		                    }
		                }
		                if ($(".myOrderList").size() == 0) {
		                    if (window.location.search == "?first=10") {
		                        window.location.href = "/my/OrderList.do"
		                    }
		                    else {
		                        window.location.reload();
		                    }
		                }

		                ChangeUserListDivHeight();
		            }
		            else {
		                alert("系统繁忙！请稍后删除！");
		            }
		        }
    });
}

//取消订单
function Ordercancel(OrderId, OrderIds) {
    $("#MessageContent").html("正在取消订单...");
    var requestUrl = "/my/ordercancel_NP.do?t=" + new Date().getTime();
    var param = { orderId: OrderId.toString(), OrderIds: OrderIds.toString() };
    jQuery.ajax({
        url: requestUrl
            , data: param
            , type: "post"
		    , dataType: "json"
		    , timeout: 180000 //3分钟
		    , success: function (data) {
		        if (data.Error == "0") {
		            window.top.location.reload();
		        }
		        else {
		            if (data.RedirectUrl != null) {
		                window.location.href = data.RedirectUrl;
		            }
		            else {
		                window.location.href = "/";
		            }
		        }
		    }
    });
}
//取消订单
function CycleOrdercancel(OrderIds) {

    var requestUrl = "/my/ordercancel_NP.do?t=" + new Date().getTime();
    var param = { OrderIds: OrderIds.toString() };
    jQuery.ajax({
        url: requestUrl
            , data: param
            , type: "post"
		    , dataType: "json"
		    , timeout: 180000 //3分钟
		    , success: function (data) {
		        if (data.Error == "0") {
		            window.top.location.reload();
		        }
		        else {
		            if (data.RedirectUrl != null) {
		                window.location.href = data.RedirectUrl;
		            }
		            else {
		                window.location.href = "/";
		            }
		        }
		    }
    });
}
function ChangeUserListDivHeight() {
    if (window.location.href.indexOf('/my/') != -1 && window.location.href.indexOf('/my/Baby.do') == -1) {
        if ($(".userListDiv").size() > 0) {
            if ($(".userListDiv").height() < $(".userLeft").height()) {
                if ($(".userListDiv").size() == 2) {
                    if ($(".user_list_box_tp").size() != 1) {
                        if ($(".growBox").size() > 0 && $($(".userListDiv")[0]).height() > 0 && (($($(".userListDiv")[0]).height() + $($(".userListDiv")[1]).height() + 6 + 40 + $(".growBox").height()) < $(".userLeft").height())) {
                            $($(".userListDiv")[1]).height($(".userLeft").height() - 6 - 40 - $($(".userListDiv")[0]).height() - $(".growBox").height());
                        }
                        else {

                            if (($($(".userListDiv")[0]).height() + $($(".userListDiv")[1]).height()) < $(".userLeft").height() && $(".growBox").size() == 0) {
                                $($(".userListDiv")[1]).height($(".userLeft").height() - 4 - 20 - $($(".userListDiv")[0]).height());
                            }
                        }
                    }
                }
                else if ($(".growBox").size() > 0)//账户首页
                {
                    if ($(".user_list_box_tp").size() == 0 && $(".userListDiv").size() == 1) {

                        $(".userListDiv").height($(".userLeft").height() - 3 - 20 - $(".growBox").height());
                    }
                }
                else {
                    if (window.location.href.toLowerCase().indexOf("/my/orderlist") != -1) {
                        if ($(".ParentOrder").size() == 0) {
                            if ($(".userLeft").height() > $(".userListDiv").height()) {
                                if ($(".sharePic").size() > 0) {

                                    $(".userListDiv").height($(".userLeft").height() - 3 - $(".sharePic").height() - 20);
                                }
                                else {
                                    $(".userListDiv").height($(".userLeft").height() - 1);
                                }
                            }
                        }
                    }
                    else if (window.location.href.toLowerCase().indexOf("/my/couponfc.do") != -1) {
                        if ($("#avaibleCount").attr("class") == "titDiv") {
                            if (($(".myOrderBox ").height() + $(".myOrderBox ").siblings().height() + 37) > $(".userLeft").height()) {
                                $(".userListDiv").height($(".myOrderBox ").height() + $(".myOrderBox ").siblings().height() + 37);
                            }
                            else {
                                $(".userListDiv").height($(".userLeft").height() - 1);
                            }
                        }
                        else {
                            if (($(".myOrderBox ").height() + $(".myOrderBox ").siblings().height() + 37) > $(".userLeft").height()) {
                                $(".userListDiv").height($(".myOrderBox ").height() + $(".myOrderBox ").siblings().height() + 37);
                            }
                            else {
                                $(".userListDiv").height($(".userLeft").height() - 1);
                            }
                        }
                    }
                    else {
                        if ($(".userLeft").height() > $(".userListDiv").height()) {
                            if ($(".sharePic").size() > 0) {
                                if ($(".userLeft").height() > ($(".userListDiv").height() + $(".sharePic").height())) {
                                    $(".userListDiv").height($(".userLeft").height() - 3 - $(".sharePic").height() - 20);
                                }
                            }
                            else {
                                $(".userListDiv").height($(".userLeft").height() - 1);
                            }
                        }
                    }
                }
            }

        }
    }
}
/***********************************************************************************我的账户/我的订单 End ********************************************************/

//列表页专用 by junfu
function AlllistCollectGoods(goodsId) {
    var param = { goodsId: goodsId };
    jQuery.post("/Goods/collectGoods_NP.do", param, function (data) {
        if (data == 1) {
            $("#favor_" + goodsId).addClass("hover");
            alert("收藏成功！");
        }
        else if (data == -3) {
            alert("收藏的商品不存在！");
        }
        else if (data == -2) {
            gotoLogin("你还没有登录，无法收藏！现在就去登录吗？");
        }
        else if (data == -1) {
            alert("已收藏！");
        }
        else {
            alert("收藏失败！错误代号：【" + data + "】");
        }
    });
}

//妈妈赚钱计划
function ReplaceWebMomPlanUrl() {
    if (window.location.href.toLowerCase().indexOf("/topic/newzhuanqianplan") > 0 && window.location.href.toLowerCase().indexOf("localhost") == -1) {
        $("area").each(function (index) {
            var areaUrl = $(this).attr("href")
            areaUrl = areaUrl.replace(encodeURIComponent("http://www.m6go.com"), encodeURIComponent("http://" + window.location.host))
            $(this).attr("href", areaUrl);
        });
        var ShareUrl = $("h4").html();
        ShareUrl = ShareUrl.replace("www.m6go.com", window.location.host);
        $("h4").html(ShareUrl);
    }
}

//品牌馆
function ReplaBrandUrl() {
    if ((window.location.href.toLowerCase().indexOf("/brand") > 0 || window.location.href.toLowerCase().indexOf("/brand/index.do") > 0) && window.location.href.toLowerCase().indexOf("localhost") == -1) {
        $("li.hot a").each(function (index) {
            var lihotaUrl = $(this).attr("href")
            if (window.location.href.toLowerCase().indexOf(".gou.") > 0) {
                lihotaUrl = lihotaUrl.replace(".m6go.", ".gou.")
            }
            if (window.location.href.toLowerCase().indexOf(".mailegou.") > 0) {
                lihotaUrl = lihotaUrl.replace(".m6go.", ".mailegou.")
            }
            $(this).attr("href", lihotaUrl);
        });
    }
}


//替换channel站点的url链接（channel.m6go.com里面的a便签链接替替换成www.m6go.com)
function ReplaceChannelUrl() {
    if (window.location.href.toLowerCase().indexOf("channel.m6go.com") > 0) {
        $("a[href*='.gou.com']").each(function (index) {
            var weblUrl = $(this).attr("href");

            $(this).attr("href", weblUrl.replace(/\.gou\.com/g, ".m6go.com"));
        });
    }
    if (window.location.href.toLowerCase().indexOf("channel.mailegou.cn") > 0) {
        $("a[href*='.gou.com']").each(function (index) {
            var weblUrl = $(this).attr("href");
            $(this).attr("href", weblUrl.replace(/\.gou\.com/g, ".mailegou.cn"));
        });
    }
}


$(function () {
    ChangeUserListDivHeight();
    //ReplaceWebMomPlanUrl();
    ReplaceChannelUrl();
    ReplaBrandUrl();
    //移除空链接的href属性和target属性
    //    $("a[href*='#']").each(function (index) {
    //        $(this).removeAttr("href");
    //        $(this).removeAttr("target");
    //    });
});

//获取url中的参数 by junfu 2015-4-29
function getParam(par) {
    //获取当前URL
    var local_url = document.location.href;
    //获取要取得的get参数位置
    local_url = local_url.toLowerCase();
    par = par.toLowerCase();
    var get = local_url.indexOf(par + "=");
    if (get == -1) {
        return false;
    }
    //截取字符串
    var get_par = local_url.slice(par.length + get + 1);
    //判断截取后的字符串是否还有其他get参数
    var nextPar = get_par.indexOf("&");
    if (nextPar != -1) {
        get_par = get_par.slice(0, nextPar);
    }
    return get_par;
}



/**************************************整点抢的倒计时******************************************************/
function integralPoint(option) {
    //系统当前时间
    if (isNaN(option.startDateTime)) {
        option.startDateTime = new Date(option.startDateTime.replace("-", "/")).getTime();
    }
    //正在进行的结束时间
    if (isNaN(option.endDateTime)) {
        option.endDateTime = new Date(option.endDateTime.replace("-", "/")).getTime();
    }
    //整点抢开始时间
    if (isNaN(option.integralStartTime)) {
        option.integralStartTime = new Date(option.integralStartTime.replace("-", "/")).getTime();
    }
    //整点抢结束时间
    if (isNaN(option.integralEndTime)) {
        option.integralEndTime = new Date(option.integralEndTime.replace("-", "/")).getTime();
    }
    //未开始的

    option.timeSpan = option.integralStartTime - option.startDateTime;
    if (option.timeSpan > 0) {

        setInterval(function () {
            calcCountDown(option);
        }, 1000);

    }
    //正在进行的
    option.timeSpanOne = option.integralEndTime - option.startDateTime;
    option.timeSpanTwo = option.integralStartTime - option.startDateTime;
    if (option.timeSpanOne > 0 && option.timeSpanTwo <= 0) {

        option.timeSpan = option.integralEndTime - option.startDateTime;
        setInterval(function () {
            calcCountDown(option);
        }, 1000);
    }

}
/**************************************整点抢的倒计时结束******************************************************/



//===========================renkaili==========================

//右侧导航 个人中心
function userCenter(backPage, yuming) {
    if (!yuming) {
        yuming = "";
    }
    if (window.location.host.toLowerCase().indexOf(".m6go.com") > 0) {
        yuming = yuming.replace(/\.gou\.com/g, ".m6go.com");
    } else if (window.location.host.toLowerCase().indexOf(".gou.com") > 0) {
        yuming = yuming.replace(/\.m6go\.com/g, ".gou.com");
    }

    var myDate = new Date();
    var mytime = myDate.toLocaleTimeString();
    var currentUrl = window.location.href;
    var pageParam = "rct=" + mytime + "&currentUrl=" + currentUrl + "&backPage=" + backPage;
    var pageName = "/user/IndexRightLogin.do";
    $.getJSON(yuming + "/Banner/GetJsonPage.do?jsoncallback=?&pageName=" + pageName + "&pageParam=" + pageParam, function (data) {
        $("#sideLogin").html("");
        $("#sideLogin").html(data.Content);
    })
}

//首页 宝宝信息
function userBaby(yuming) {
    if (!yuming) {
        yuming = "";
    }
    if (window.location.host.toLowerCase().indexOf(".m6go.com") > 0) {
        yuming = yuming.replace(/\.gou\.com/g, ".m6go.com");
    } else if (window.location.host.toLowerCase().indexOf(".gou.com") > 0) {
        yuming = yuming.replace(/\.m6go\.com/g, ".gou.com");
    }

    var myDate = new Date();
    var mytime = myDate.toLocaleTimeString();
    var param = "rct=" + mytime;
    $.get(yuming + "/user/IndexBabyInfo.do?" + param, function (data) {
        $("#babyInfodiv").html("");
        $("#babyInfodiv").html(data);
    });
}
function switchPage(oldpage, newpage) {
    $(".cart-nav a[list=" + oldpage + "]").removeClass("on");
    $(".cart-main-list").children().hide();
    $(".cart-nav a[list=" + newpage + "]").addClass("on");
    $(".cart-main-list").children().eq(newpage).show();
}

//右侧导航 我的收藏
function getMyFavor(yuming) {
    //1.判断是否登录
    if (!yuming) {
        yuming = "";
    }
    if (window.location.host.toLowerCase().indexOf(".m6go.com") > 0) {
        yuming = yuming.replace(/\.gou\.com/g, ".m6go.com");
    } else if (window.location.host.toLowerCase().indexOf(".gou.com") > 0) {
        yuming = yuming.replace(/\.m6go\.com/g, ".gou.com");
    }

    var myDate = new Date();
    var mytime = myDate.toLocaleTimeString();
    var pageParam = "rct=" + mytime + "&first=0";
    var pageName = "/Banner/IncNavMyFavor.do";
    $.getJSON(yuming + "/Banner/GetJsonPage.do?jsoncallback=?&pageName=" + pageName + "&pageParam=" + pageParam, function (data) {
        if (data.Content == "-1") {
            switchPage(2, 0);
            userCenter("myFavor", yuming);
        } else {
            $("#divcollect").html("");
            $("#divcollect").html(data.Content);
        }
    })
}

//右侧导航 浏览历史
function getHistory(yuming) {
    if (!yuming) {
        yuming = "";
    }
    if (window.location.host.toLowerCase().indexOf(".m6go.com") > 0) {
        yuming = yuming.replace(/\.gou\.com/g, ".m6go.com");
    } else if (window.location.host.toLowerCase().indexOf(".gou.com") > 0) {
        yuming = yuming.replace(/\.m6go\.com/g, ".gou.com");
    }
    var myDate = new Date();

    var mytime = myDate.toLocaleTimeString();

    var pageParam = "rct=" + mytime + "&first=0";
    $.getJSON(yuming + "/Banner/IncNavBrowseHistory.do?jsoncallback=?&pageParam=" + pageParam, function (data) {
        $("#divhistory").html("");
        if (data == "" || data == null) {
            data.Content = 0;
        }

        $("#divhistory").html('<h3><a class="refresh" href="javascript:;" onclick="getHistory(' + "'" + yuming + "'" + ')"><i></i>刷新</a>浏览历史</h3>');
        $("#historyHtmlTemplete").tmpl(data).appendTo('#divhistory');
        HitsPosition(1251, 0, 0, 0); //add by yu.lei 2015-11-24
    })
}
//猜你喜欢下边  您关注的商品
function LoadRecentlyGoodsVisit() {
    $("#divGoodsVisit").html('');
    jQuery.ajax({
        "type": "POST",
        "url": "/Banner/IncRecentlyGoodsVisit.do",
        "dataType": "text",
        "data": "",
        "success": function (data) {

            if (jQuery.trim(data) != "") {
                $("#divGoodsVisit").html(data);
            }
            HitsPosition(1250, 0, 0, 0); //add by yu.lei 2015-11-24
        }
    });
}


//整点抢
function loadMLastMinuteData() {
    $("#div_MLastMinute").html('<p class="loading"></p>');
    jQuery.ajax({
        "type": "POST",
        "url": "/Banner/IncIndexMLastMinute.do",
        "dataType": "text",
        "data": "",
        "success": function (data) {

            if (jQuery.trim(data) != "") {
                $("#div_MLastMinute").html(data);
            }
        }
    });
}

//特卖
function loadTeMaiData() {
    $("#div_TeMai").html('<p class="loading"></p>');
    jQuery.ajax({
        "type": "POST",
        "url": "/Banner/IncIndexTeMai.do",
        "dataType": "text",
        "data": "",
        "success": function (data) {

            if (jQuery.trim(data) != "") {
                $("#div_TeMai").html(data);
            }
        }
    });
}

//推荐
function loadRecommendData() {
    $("#div_Recommend").html('<p class="loading"></p>');
    jQuery.ajax({
        "type": "POST",
        "url": "/Banner/IncIndexRecommend.do",
        "dataType": "text",
        "data": "",
        "success": function (data) {

            if (jQuery.trim(data) != "") {
                $("#div_Recommend").html(data);
            }
        }
    });
}

//猜你喜欢
function loadGuessYouLikeData(first) {
 // var first = $("#ChangeBatch").attr("firstvalue");
   // $("#div_GuessYouLike").html('<p class="loading"></p>');
    jQuery.ajax({
        "type": "POST",
        "url": "/Banner/IncIndexGuessYouLike.do",
        "dataType": "text",
        "data": { first: 0 },
        "success": function (data) {

            if (jQuery.trim(data) != "") {

                $("#div_GuessYouLike").html(data);
                //$("#ChangeBatch").attr("firstvalue", $("#FirstCount").html());
                HitsPosition(1249, 0, 0, 0); //add by yu.lei 2015-11-24
            }
        }
    });
}

//晒单评论
function loadSunAreaData() {
    $("#div_SunArea").html('<p class="loading"></p>');
    jQuery.ajax({
        "type": "POST",
        "url": "/Banner/IncIndexComment.do",
        "dataType": "text",
        "data": {},
        "success": function (data) {
            if (jQuery.trim(data) != "") {
                $("#div_SunArea").html(data);
            }
        }
    });
}

//整点抢倒计时   Add 2015-07-30 By XiaoTong.Cao
function custTime(option) {
    var time_now_server, time_now_client, time_end, time_server_client, timerID;
    if (option["endTime"]) $(option["obj"]).attr("data-end", option["endTime"])
    if (option["startTime"]) $(option["obj"]).attr("data-start", option["startTime"])
    time_end = new Date($(option["obj"]).attr("data-end")); //结束的时间
    time_end = time_end.getTime();
    time_now_server = new Date($(option["obj"]).attr("data-start")); //开始的时间
    time_now_server = time_now_server.getTime();
    time_now_client = new Date();
    time_now_client = time_now_client.getTime();
    time_server_client = time_now_server - time_now_client;
    setTimeout(show_time, 100);

    function show_time() {
        var timer = $(option["obj"]);
        timer.each(function () {
            var o = {
                day: $(".day", this)
					   , hour: $(".hour", this)
					   , allhour: $(".allhour", this)
					   , min: $(".mini", this)
					   , sec: $(".sec", this)
					   , hm: $(".hm", this)
            }
            var This = this;
            if (!timer) {
                return;
            }
            var time_now, time_distance, strday, strhour, strmini, strsec, strhm;
            var day, hour, allhour, minute, second, hm;
            var time_now = new Date();
            time_now = time_now.getTime() + time_server_client;
            time_distance = time_end - time_now;
            if (time_distance > 0) {
                //						day = Math.floor(time_distance / 86400000)
                //						time_distance -= day * 86400000;
                //						hour = Math.floor(time_distance / 3600000)
                //						time_distance -= hour * 3600000;

                allhour = Math.floor(time_distance / (86400000 / 24))
                time_distance -= allhour * (86400000 / 24);
                //						time_distance -= allhour * 3600;

                minute = Math.floor(time_distance / 60000)
                time_distance -= minute * 60000;
                second = Math.floor(time_distance / 1000)
                hm = Math.floor((time_distance % 1000) / 100)
                if (hour < 10)
                    hour = "0" + hour;
                if (allhour < 10)
                    allhour = "0" + allhour;
                if (minute < 10)
                    minute = "0" + minute;
                if (second < 10)
                    second = "0" + second;
                strday = day + "";
                strhour = hour + "";
                strallhour = allhour + "";
                strmini = minute + "";
                strsec = second + "";
                strhm = hm + "";

                timeSt(o.allhour, strallhour);
                timeSt(o.min, strmini);
                timeSt(o.sec, strsec)
                timeSt(o.hm, strhm)
                setTimeout(show_time, 100);
            } else {
                o.allhour.html(00)
                o.min.html(00)
                o.sec.html(00)
                o.hm.html(0)
                if (option["callback"]) {
                    option["callback"]();
                }
                clearTimeout(timerID)
            }
        })
        function timeSt(ob, t) {
            if (t) {
                for (var i = 0; i <= t.length; i++) {
                    ob.eq(i).html(ob.length != 1 ? t.charAt(i) : t)
                }
            }
        }
    }
}

//channel站点 月份广告位
$(function () {
    $(".month_nav a").each(function () {
        $(this).click(HitsPosition(1198, $(this).html(), 0, 0));
    });
});