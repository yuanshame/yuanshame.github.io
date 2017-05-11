/* liteng creat 2015.7*
 *index js*
 */

createTags()
//创建h5标签使低版本IE兼容

function createTags() {
    var tags = ['header', 'aside', 'footer', 'nav', 'section', 'article', 'hgroup', 'time'];
    for (var i = 0; i < tags.length; i++) {
        document.createElement(tags[i]);
    }
}
/*   切换
     [tip = ]  
 	 [few =  ]
 	 [cycle = ]
 	 [autoPlay = 自动播放  true or false]
	 [prev= 上一页 ][next=下一页] 
	 [box = 效果元素框架] 
	 [scrollbox = 运动box] 
	 [updown = 是否为上下滚动]
*/

function silder(json) {
    $(json['box']).each(function () {
        if (json["cycle"]) {
            if ($(json["scrollbox"], this).children().length / json["tip"] <= 2) {
                $(json["scrollbox"], this).html($(json["scrollbox"], this).html() + $(json["scrollbox"], this).html() + $(json["scrollbox"], this).html())
            }
        }
        this.litm = 1;
        var This = this,
            few = json['few'] || json['tip'];
        this.num = 0;
        var box = $(json['scrollbox'], This);
        var mr = oMargin("margin-right");
        var ml = oMargin("margin-left");
        var mt = oMargin("margin-top");
        var mb = oMargin("margin-bottom");
        this.count = parseInt(box.children().length / json["tip"])
        var w = parseInt(box.children().first().outerWidth()) + ml + mr;
        var h = parseInt(box.children().first().outerHeight()) + mt + mb;
        if (json["updown"]) {
            w = h;
            var attr = "height";
        } else {
            var attr = "width";
        }
        var scroll = json['scroll'] || json['tip'] * w;
        var maxStyle = box.children().length * w;
        box.css(attr, maxStyle);
        //按钮事件
        $(json['prev'], This).css("cursor", "pointer");
        $(json['next'], This).css("cursor", "pointer");
        leftRight($(json['prev'], This), box, this.num, 1);
        leftRight($(json['next'], This), box, this.num, -1);
        if (json["cycle"]) {
            if (This.num == 0) {
                for (var i = 0; i < json["tip"]; i++) {
                    box.children().eq(0).before(box.children().last());
                }
                $(box).css("left", -scroll);
                This.num--
            }
        }

        function leftRight(btn, box, num, dir) {
            var cs = 1;
            if ($(json["scrollbox"], this).children().length / json["tip"] <= 2) {
                cs = 3;
            }
            $(json['count'], This).html(This.count / cs);
            $(json['litm'], This).html(This.litm);
            if ($(json['count'], This).html() == "1") {
                $(json['count'], This).parent().hide();
            }
            var onoff = true;
            btn.on("click", function (event) {
                event.stopPropagation();
                var th = this
                if (!onoff) {
                    return false;
                }
                onoff = false;
                //page 
                This.litm++;
                if (This.litm > This.count / cs) {
                    This.litm = 1
                }
                $(json["litm"]).html(This.litm)

                dir < 0 ? This.num-- : This.num++;
                This.num > 0 ? This.num = 0 : This.num;
                var count = Math.ceil(-(box.children().length - (few - json['tip'])) / json['tip'])
                if (This.num <= Math.floor(-(box.children().length - (few - json['tip'])) / json['tip'])) {
                    if ((box.children().length - (few - json['tip'])) % json['tip'] != 0) {
                        This.num = count;
                    } else {
                        This.num = count + 1;
                    }
                }
                if (json["updown"]) {
                    if (maxStyle + This.num * scroll < few * w) {
                        box.stop().animate({
                            top: -maxStyle + few * w
                        }, json["speed"] || 400, "linear", function () {
                            onoff = true;
                            nocycle(btn, This, This.num);
                        });
                    } else {
                        box.stop().animate({
                            top: This.num * scroll
                        }, json["speed"] || 400, "linear", function () {
                            This.num = iscycle(this, This.num)
                            onoff = true
                        });
                        nocycle(btn, This, This.num)
                    }
                } else {
                    if (maxStyle + This.num * scroll <= few * w && !json["cycle"]) {
                        box.animate({
                            left: -maxStyle + few * w
                        }, json["speed"] || 400, "linear", function () {
                            onoff = true
                        });
                        nocycle(btn, This, This.num)
                    } else {
                        if (json['cycle']) {
                            if ($(th).hasClass("next")) {
                                This.num = This.num == -1 ? -2 : This.num;
                            } else {
                                This.num = This.num == -1 ? 0 : This.num;
                            }
                        }
                        box.animate({
                            left: This.num * scroll
                        }, json["speed"] || 400, "linear", function () {
                            This.num = iscycle(this, This.num)
                            onoff = true;
                        });
                        nocycle(btn, This, This.num)
                    }
                }
            })
        }
        //循环函数

        function iscycle(This, tnum) {
            if (json["cycle"]) {
                //瀵邦亞骞嗛崚鍥ㄥ床
                if (tnum == 0) {
                    for (var i = 0; i < json['tip']; i++) {
                        box.children().eq(0).before(box.children().last());
                    }
                    $(This).css("left", -scroll);
                }
                if (tnum >= (-box.children().length) / few && tnum < 0) {
                    for (var i = 0; i < json['tip']; i++) {
                        box.children().last().after(box.children().first());
                    }
                    $(This).css("left", -scroll);
                    tnum++
                }
            }
            return tnum
        }
        //非循环函数

        function nocycle(btn, This, tnum) {
            if (!json["cycle"]) {
                //闂堢偛鎯婇悳顖涙 缂佹瑧娴夋惔鏃€瀵滈柦顔藉潑閸旂姳绗夐崣顖滃仯閸戠粯鐗卞锟�
                tnum == 0 ? btn.addClass("end") : $(json['prev'], This).removeClass("end");
                tnum == -Math.ceil((box.children().length - few) / json['tip']) ? btn.addClass("end") : $(json['next'], This).removeClass("end");
            }
            return tnum
        }

        function oMargin(attr) {
            return parseInt(box.children().first().css(attr));
        }
    })
    //判断自动播放
    if (json["autoPlay"]) {
        mysilderTime(json["box"], json["next"], json["interVal"] || 3000)
    }
}

//
function slideInde(json) {
    if ($("#timeCon div.ul").length > 0 && json["box"] == ".ul") {
        $("#timeCon div.ul").append('<div class="prev boxleft"></div><div class="next boxright"></div>');
    }
    var addlength = $(json["scrollbox"], this).children().length / json["tip"]
    $(json['box']).each(function () {
        if (json["cycle"]) {
            if (addlength <= 2) {
                $(json["scrollbox"], this).html($(json["scrollbox"], this).html() + $(json["scrollbox"], this).html() + $(json["scrollbox"], this).html())
            }
        }
        this.litm = 1;
        var cs = 1;
        var This = this,
            few = json['few'] || json['tip'];
        this.num = 0;
        var box = $(json['scrollbox'], This);
        var mr = oMargin("margin-right");
        var ml = oMargin("margin-left");
        var mt = oMargin("margin-top");
        var mb = oMargin("margin-bottom");
        this.count = parseInt(box.children().length / json["tip"])
        var w = parseInt(box.children().first().outerWidth()) + ml + mr;
        var h = parseInt(box.children().first().outerHeight()) + mt + mb;
        if (json["updown"]) {
            w = h;
            var attr = "height";
        } else {
            var attr = "width";
        }
        var scroll = json['scroll'] || json['tip'] * w;
        var maxStyle = box.children().length * w;
        box.css(attr, maxStyle);
        $(json['prev'], This).css("cursor", "pointer");
        $(json['next'], This).css("cursor", "pointer");
        leftRight($(json['prev'], This), box, this.num, 1);
        leftRight($(json['next'], This), box, this.num, -1);
        if (json["cycle"]) {
            if (This.num == 0) {
                for (var i = 0; i < json["tip"]; i++) {
                    box.children().eq(0).before(box.children().last());
                }
                $(box).css("left", -scroll);
                This.num--
            }
        }

        function leftRight(btn, box, num, dir) {
            if (addlength <= 2) {
                cs = 3;
            } else {
                cs = 1
            }
            $(json['count'], This).html(parseInt(This.count / cs));
            $(json['litm'], This).html(parseInt(This.litm));
            if (parseInt($(json['count'], This).html()) <= 1) {
                $(json['count'], This).parent().hide();
                $(json['prev'], This).hide();
                $(json['next'], This).hide();
            }
            var onoff = true;
            btn.on("click", function (event) {
                event.stopPropagation();
                var th = this
                if (!onoff) {
                    return false;
                }
                onoff = false;

                //page 
                dir < 0 ? This.litm++ : This.litm--;
                if (This.litm > This.count / cs) {
                    This.litm = 1
                }
                if (This.litm < 1) {
                    This.litm = This.count / cs
                }
                $(json["litm"], This).html(This.litm)

                dir < 0 ? This.num-- : This.num++;
                This.num > 0 ? This.num = 0 : This.num;
                var count = Math.ceil(-(box.children().length - (few - json['tip'])) / json['tip'])
                if (This.num <= Math.floor(-(box.children().length - (few - json['tip'])) / json['tip'])) {
                    if ((box.children().length - (few - json['tip'])) % json['tip'] != 0) {
                        This.num = count;
                    } else {
                        This.num = count + 1;
                    }
                }
                if (json["updown"]) {
                    if (maxStyle + This.num * scroll < few * w) {
                        box.stop().animate({
                            top: -maxStyle + few * w
                        }, json["speed"] || 400, "linear", function () {
                            onoff = true;
                            nocycle(btn, This, This.num);
                        });
                    } else {
                        box.stop().animate({
                            top: This.num * scroll
                        }, json["speed"] || 400, "linear", function () {
                            This.num = iscycle(this, This.num)
                            onoff = true
                        });
                        nocycle(btn, This, This.num)
                    }
                } else {
                    if (maxStyle + This.num * scroll <= few * w && !json["cycle"]) {
                        box.animate({
                            left: -maxStyle + few * w
                        }, json["speed"] || 400, "linear", function () {
                            onoff = true
                        });
                        nocycle(btn, This, This.num)
                    } else {
                        if (json['cycle']) {
                            if ($(th).hasClass("next")) {
                                This.num = This.num == -1 ? -2 : This.num;
                            } else {
                                This.num = This.num == -1 ? 0 : This.num;
                            }
                        }
                        box.animate({
                            left: This.num * scroll
                        }, json["speed"] || 400, "linear", function () {
                            This.num = iscycle(this, This.num)
                            onoff = true;
                        });
                        nocycle(btn, This, This.num)
                    }
                }
            })
        }
        //循环回调

        function iscycle(This, tnum) {
            if (json["cycle"]) {
                //瀵邦亞骞嗛崚鍥ㄥ床
                if (tnum == 0) {
                    for (var i = 0; i < json['tip']; i++) {
                        box.children().eq(0).before(box.children().last());
                    }
                    $(This).css("left", -scroll);
                }
                if (tnum >= (-box.children().length) / few && tnum < 0) {
                    for (var i = 0; i < json['tip']; i++) {
                        box.children().last().after(box.children().first());
                    }
                    $(This).css("left", -scroll);
                    tnum++
                }
            }
            return tnum
        }
        //不循环回调

        function nocycle(btn, This, tnum) {
            if (!json["cycle"]) {
                tnum == 0 ? btn.addClass("end") : $(json['prev'], This).removeClass("end");
                tnum == -Math.ceil((box.children().length - few) / json['tip']) ? btn.addClass("end") : $(json['next'], This).removeClass("end");
            }
            return tnum
        }

        function oMargin(attr) {
            return parseInt(box.children().first().css(attr));
        }
    })
    //自动播放
    if (json["autoPlay"]) {
        mysilderTime(json["box"], json["next"], json["interVal"] || 3000)
    }
}


//自动播放函数
function mysilderTime(obj, btn, tim) {
    $(obj).each(function (index) {
        var This = this;
        index = setInterval(autoPlayTab, tim);

        function autoPlayTab() {
            $(btn, This)[0].click();
        }
        $(this).hover(function () {
            clearInterval(index)
        }, function () {
            index = setInterval(autoPlayTab, tim)
        })
    })
}




/*
 *
 *购物车抛物线
 */
function moveBaby(moveData) {
    //$(".cart_num").html(moveData["num"])
    var timer;
    $(moveData["obj"]).on("click", function (event) {
        event.stopPropagation();
        $(".gou-cart").animate({
            right: -280
        }, 100, function () {
            $(".cart-main-list").children().fadeOut(0);
            $(".cart-nav a").removeClass("on");
        });
        var This = this;
        if (isIEevent() && myBrowser() != "IE7") {
            //非IE7情况下
            var moveImgsrc = $(moveData["graph"]).attr("src");
            var sub = 0;
            while ($("#moveCar" + sub).length > 0) {
                sub++
            }
            $(This).after("<div class='moveCar' id='moveCar" + sub + "'><img src='" + moveImgsrc + "' width='30' height='30' /></div>");
            setTimeout(function () {
                var eleFlyElement = id("#moveCar" + sub);
                var eleShopCart = id("#collectBox");
                var myParabola = funParabola(eleFlyElement, eleShopCart, {
                    speed: 500, //閹舵稓澧跨痪鍧椻偓鐔峰
                    curvature: 0.0007, //閹貉冨煑閹舵稓澧跨痪鍨К鎼达拷
                    complete: function () {
                        $(eleFlyElement).remove();
                        moveData["callBack"] && moveData["callBack"]();
                    }
                });
                $(eleFlyElement).css({
                    left: event.clientX,
                    top: event.clientY,
                    visibility: "visible"
                }).show();
                $(eleFlyElement).animate({
                    width: "50px",
                    height: "50px"
                }, 600, function () {
                    $(this).animate({
                        width: "30px",
                        height: "30px"
                    }, 700);
                })
                $(eleFlyElement).find("img").animate({
                    width: "50px",
                    height: "50px"
                }, 600, function () {
                    $(this).animate({
                        width: "30px",
                        height: "30px"
                    }, 700)
                });
                myParabola.position().move();
            }, 200);
        } else if (myBrowser() == "IE7") {
            //IE7情况下
        }
    });
}
//判断是否是IE并执行操作

function isIEevent() {
    var result = true;
    if ((navigator.userAgent.indexOf('MSIE') >= 0) && (navigator.userAgent.indexOf('Opera') < 0)) {
        result = $(".moveCar").length == 1 ? false : true;
    } else {
        result = $(".moveCar").length <= 2 ? true : false;
    }
    return result
}

function id(id) {
    return document.querySelector(id);
}
//购物车 end



//右侧购物车浮层效果
function clickCart() {
    $(".cart-nav ul li").children().addClass("aStair")
    $(".cart-nav a[list]").on("click", function (event) {
        event.stopPropagation();
        var onoff = true;
        if ($(".moveCar").length <= 2) {
            if ($(this).hasClass("on")) {
                $("[list=" + $(this).attr("list") + "]").removeClass("on");
                moveCart(-280);
            } else {
                var numIndex = $(this).attr("list");
                $(".cart-nav a").removeClass("on");
                $(".cart-main-list").children().hide();
                $("[list=" + $(this).attr("list") + "]").addClass("on");
                if (parseInt($(".gou-cart").css("right")) <= -280) {
                    $(".cart-main-list").css({
                        top: 0
                    });
                    $(".cart-main-list").children().eq(numIndex).show();
                } else {
                    $(".cart-main-list").children().eq(numIndex).fadeIn(500)
                }
                moveCart(0);
            }
        }
    })
    //点击外部关闭
    $(document).on("click", function () {
        moveCart(-280);
        $(".cart-nav a").removeClass("on");
    })
    //取消点击购物车浮层冒泡
    $(".gou-cart").on("click", function (event) {
        event.stopPropagation();
        var px = $(".gou-cart").css("right") == "0px" ? 0 : -280;
        moveCart(px);
    })
    $(".gou-cart .whole #backTop").hover(function (event) {
        event.stopPropagation();
        //$(window).off("scroll",bodyScroll);
    }, function () {
        //$(window).on("scroll",bodyScroll);
    })
    //购物车浮层运动函数

    function moveCart(px) {
        return $(".gou-cart").animate({
            right: px
        }, 200);
    }
    //设置购物车列表菜单单个浮层的位置
    carthover(".cart-nav-list ul li", ".module-pro", 240);
    carthover(".cart-nav-list ul li", ".txt-pro", 80);
    
    /*客服显示初始化*/
    /*var tactusW = $(".tactus").parent().attr("w") * (($(window).width() + 20) / 1920)
    $(".tactus").parent().attr("w", tactusW);
    $(".tactusImg .i1").css("width", tactusW)
    $(".tactus").parent().css({ bottom: 0 });
    $(".tactus a").width(tactusW - 20)
    
    
    $(".tactus").parent().css({ width: tactusW, left: -tactusW});
    $(".tactus").addClass("open");
    $(".tactus").parents(".kf").addClass("open");*/
}

//设置购物车列表菜单单个浮层的位置方法
function carthover(obj, box, width) {
    $(obj).hover(function () {
        $(".tactus").parents(".kf").removeClass("open");
        var This = this, pos = 2;
        var w = $(box, this).attr("w") != undefined ? $(box, this).attr("w") : width;
        if ($(".tactus", This).length == 0 && $(".tactus").hasClass("open") && $(This).parents(".bot").hasClass("bot")) {
            $(".tactus").parent().animate({
                width: "0px",
                left: "0px"
            }, 200);
            $(".tactus").removeClass("open");
        }
        if ($(this).hasClass("kf")) {
            $(box, this).stop().animate({
                width: w,
                left: "-" + w
            }, 200);
        } else { 

            $(box, this).css({
                top: -($(box, this).height() - $(This).height()) / pos
            }).stop().animate({
                width: w,
                left: "-" + w
            }, 200);
        }
        $(".closeThis", This).on("click", function () {
            $(box, This).stop().animate({
                width: "0px",
                left: "0px"
            }, 200);
        })
    }, function () {
        $(box, this).stop().animate({
            width: "0px",
            left: "0px"
        }, 200);
    })
}


/*
 *
 * 判断IE版本方法
 * return   myBrowser()=="IE7" myBrowser()=="IE8"
 *
 */
function myBrowser(ie) {
    var userAgent = navigator.userAgent; //閸欐牕绶卞ù蹇氼潔閸ｃ劎娈憉serAgent鐎涙顑佹稉锟�
    var isOpera = userAgent.indexOf("Opera") > -1; //閸掋倖鏌囬弰顖氭儊Opera濞村繗顫嶉崳锟�
    var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera; //閸掋倖鏌囬弰顖氭儊IE濞村繗顫嶉崳锟�
    var isFF = userAgent.indexOf("Firefox") > -1; //閸掋倖鏌囬弰顖氭儊Firefox濞村繗顫嶉崳锟�
    var isSafari = userAgent.indexOf("Safari") > -1; //閸掋倖鏌囬弰顖氭儊Safari濞村繗顫嶉崳锟�

    if (isIE) {
        var IE5 = IE55 = IE6 = IE7 = IE8 = false;
        var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
        reIE.test(userAgent);
        var fIEVersion = parseFloat(RegExp["$1"]);

        IE55 = fIEVersion == 5.5;
        IE6 = fIEVersion == 6.0;
        IE7 = fIEVersion == 7.0;
        IE8 = fIEVersion == 8.0;
        IE9 = fIEVersion == 9.0;
        if (ie) {
            return "IE"
        }
        if (IE55) {
            return "IE55";
        }
        if (IE6) {
            return "IE6";
        }
        if (IE7) {
            return "IE7";
        }
        if (IE8) {
            return "IE8";
        }
        if (IE9) {
            return "IE9";
        }
    } //isIE end

    if (isFF) {
        return "FF";
    }
    if (isOpera) {
        return "Opera";
    }

} //myBrowser() end

/*
 * 首页滚动条操作
 */
function commonScroll(json) {
    var timer, timer1, onoff = true,
		lastScrollTop = 0;
    $(window).scroll(function (event) {
        var scrollTop = $(this).scrollTop();
        var last = json["last"] ? scrollTop < lastScrollTop : true;
        if (scrollTop >= json["downScroll"] && last) {
            if (onoff) {
                onoff = false;
                timer = setTimeout(function () {
                    json["downfn"] && json["downfn"]();
                    onoff = true;
                }, 200)
            }
        } else if (scrollTop < json["upScroll"]) {
            timer = setTimeout(function () {
                json["upfn"] && json["upfn"]();
            }, 200)
        }
        lastScrollTop = scrollTop;
        //开始运动于结束运动设定 左侧浮层分类
        if ($(json['endPos']) && $(json['endPos']).length > 0) {
            if ($(json['endPos'][0]).offset().top >= json['endPos'][1]) {
                $(json['endPos'][0]).css({
                    position: "absolute",
                    top: json['endPos'][2]
                })
            }
            if (scrollTop < json['endPos'][1]) {
                $(json['endPos'][0]).css({
                    position: "fixed",
                    top: 200
                })
            }
        }
    })

}


//点击左侧浮层分类跳到相应类目位置
function clickScroll(obj) {
    $(window).on("scroll", floorScroll);
    floorScroll()
    $(obj).on("click", function () {
        var This = this;
        $(window).off("scroll", floorScroll);
        $(obj).removeClass("on");
        $(this).addClass("on");
        $('html,body').stop().animate({
            scrollTop: $("[floor=" + $(this).index() + "]").offset().top - 50
        },
			500,
			function () {
			    $(window).on("scroll", floorScroll);
			    return false
			});
    })
}

/*购物车内容商品列表高度设置*/
function cartorderSc() {
    $(window).on("scroll", orderSc);
    $(window).on("resize", orderSc);

    function orderSc() {
        $(".cart-order-list").css({
            "height": $(window).outerHeight() - 80
        });
        $(".public-list").css({
            "height": $(window).outerHeight() - 45
        })
    }
}

//滚动条滚动到相应类目位置使左侧分类浮层选中相应类目
function floorScroll() {
    $("[floor]").each(function (index) {
        var This = this;
        if ($(this).offset().top - $(document).scrollTop() > 50 && $(this).offset().top - $(document).scrollTop() < 450) {
            $(".sn-nav-wrapper a").removeClass("on");
            $(".sn-nav-wrapper a:eq(" + $(This).attr("floor") + ")").addClass("on");
            $(This).attr("floor")
        }
    })
}

//if IE8 IE7 
function iFie(json) {
    var ie = myBrowser()
    if (ie == "IE7" || ie == "IE8") {
        if (ie == "IE8" && json["ie8"]) {
            return json["ie8"]();
        }
        if (ie == "IE7" && json["ie7"]) {
            return json["ie7"]();
        }
        if (json["ie78"]) {
            return json["ie78"]();
        }
    }
}

//首页幻灯片效果
function silderPlay(tabtime, fadetime) {
    tabtime = 4000;
    var num = 0,
		timeval, timeot, imgbox = "#sildeImg .market-silde";
    $(imgbox + ":eq(0)").css({
        //		background:"url("+$(imgbox + ":eq(0) img").attr("src")+") no-repeat scroll center center"
        background: $(imgbox + ":eq(0) img").attr("color")
    }).show();
    fade(0, 200, true);
    $("#marketBtn li:eq(0)").addClass("current");
    $("#marketBtn li").hover(function () {
        var This = this;
        clearInterval(timeval);
        clearTimeout(timeot);
        timeot = setTimeout(function () {
            if (!$(This).hasClass("current")) {
                $("#marketBtn li").animate({
                    top: 0
                }, 200).removeClass();
                $(This).addClass("current").animate({
                    top: -8
                }, 300);
                fade($(This).index(), fadetime);
            }
        }, 50);

    }, function () {
        var This = this;
        num = $(This).index();
        timeval = setInterval(autoPlay, tabtime);
    })
    timeval = setInterval(autoPlay, tabtime);
    //	num = pressBtn(".market-prev",-1);
    //	num = pressBtn(".market-next",1);
    prevNexthover()

    function prevNexthover() {
        var stime = null;
        inshow("#marketBtn li")
        inshow(".forback")
        inshow("#sildeImg")

        function inshow(obj) {
            $(obj).on("mouseover", function (event) {
                event.stopPropagation();
                clearTimeout(stime)
                $(".forback").css({
                    filter: "Alpha(opacity=60)"
                }).fadeIn(300);
            })
        }
        $("#sildeImg").on("mouseout", function (event) {
            stime = setTimeout(function () {
                $(".forback").stop().fadeOut(200);
            }, 200)
        })
    }
    //按钮点击

    function pressBtn(obj, n) {
        $(obj).on("click", function () {
            n > 0 ? num++ : num--;
            num >= 0 ? num %= 5 : num = 4;
            $("#marketBtn li").animate({
                top: 0
            }, 200).removeClass();
            $("#marketBtn li:eq(" + num + ")").addClass("current").animate({
                top: -8
            }, 300);
            fade(num, fadetime);
        })
        $(obj).hover(function () {
            clearInterval(timeval);
        }, function () {
            timeval = setInterval(autoPlay, tabtime);
        })
        return num
    }
    //自动播放

    function autoPlay() {
        num++;
        num %= 5;
        $("#marketBtn li").animate({
            top: 0
        }, 200).removeClass();
        $("#marketBtn li:eq(" + num + ")").addClass("current").animate({
            top: -8
        }, 300);
        fade(num, fadetime);
    }
    //切换特效

    function fade(num, time, first) {
        $("#sildeImg .market-silde:eq(" + num + ") img").removeClass("main_banner")
        if (!first) {
            $("#sildeImg .market-silde").fadeOut(time);
        }
        $("#sildeImg .market-silde:eq(" + num + ")").css({
            background: $("#sildeImg .market-silde:eq(" + num + ") img").attr("color")
        }).fadeIn(time, function () {
            if (myBrowser() != "IE7" && myBrowser() != "IE8" && myBrowser() != "IE9") {
                $("#sildeImg .market-silde:eq(" + num + ") img").addClass("main_banner")
            }
        });
        if (myBrowser() == "IE8") {
            $("#sildeImg .market-silde:eq(" + num + ") img").fadeIn(time);
        }
    }
}

//头部左侧菜单效果
function silderbar(obj, box) {
    navOpen(obj, box);
    $(obj).hover(barfn1, barfn2);
    var fn1time, fn2time, ietest = false

    function barfn1(i) {
        var This = i ? $(obj).eq($(this).index()) : this;
        var px1, px2;
        if ($(box).eq($(this).index()).css("display") != "none") {
            clearTimeout(fn2time);
            px1 = 47, px2 = 47, ietest = true;

        } else {
            px1 = 39, px2 = 47;
        }
        fn1time = setTimeout(function () {
            $(box).eq($(This).index()).show().stop()
				.animate({
				    opacity: 0.96,
				    filter: "alpha(opacity=96)",
				    left: "180px"
				}, 200);
            $(obj).removeClass("nav-selected nav-hover");
            $(This).addClass("nav-selected nav-hover");
            IE($(This), px1, px2, ietest);
        }, 5)
    }

    function barfn2(i) {
        var This = i ? $(obj).eq($(this).index()) : this;
        fn2time = setTimeout(function () {
            $(This).removeClass("nav-hover");
            $(box).eq($(This).index()).stop()
				.animate({
				    opacity: 0.5,
				    filter: "alpha(opacity=50)",
				    left: "170px"
				}, 0, function () {
				    $(this).hide();
				});
            IE($(This), 47, 39);
        }, 5)
    }
    $(box).hover(function () {
        clearTimeout(fn2time)
    }, barfn2)

    function IE(t, px1, px2, ietest) {
        if (myBrowser(1)) {
            t.find("i").css("width", px1).stop().animate({
                width: px2
            }, 100);
        }
        iFie({
            ie78: function () {
                px1 == 39 || ietest ? t.find("span").addClass("ie") : t.find("span").removeClass("ie")
            }
        })
    }
}

function navOpen(obj, box) {
    var opentime1, opentime2;
    if ($(".navMain").attr("stop") == "true") {
        $(".navMain .open-m").hover(function () {
            openfn1(obj)
        }, function () {
            openfn2(obj)
        });
        $(box).hover(function () {
            openfn1(obj)
        }, function () {
            openfn2(obj)
        });
    }

    function openfn1(obj) {
        $(obj).parent().show().stop().animate({
            height: 480
        }, 150);
        $(".navMain .open-menu-btn span").removeClass().addClass("up");
    }

    function openfn2(obj) {
        $(obj).parent().stop().animate({
            height: 0
        }, 150, function () {
            $(this).hide();
            $(".navMain .open-menu-btn span").removeClass().addClass("down");
        });
    }
}

//demo top 未使用
function demoTop(json) {
    var sgb = null;
    setTimeout(demo, json["begin"] || 0)

    function demo() {
        $(json["obj"]).animate({
            height: json["height"][0]
        }, json["speed"] || 0, function () {
            var This = this;
            if (json["height"][1] == 0) {
                $(json["obj"] + " .closeUp").html("閸忔娊妫�");
            } else {
                $(json["obj"] + " .closeUp").html("閺€鎯版崳");
                sgb = setTimeout(function () {
                    $(json["obj"] + " .closeUp")[0].click();
                }, 3000)
            }
            $(json["obj"] + " .closeUp").on("click", down)

            function down(event) {
                event.stopPropagation();
                var it = this
                clearTimeout(sgb);
                $(This).animate({
                    height: json["height"][1]
                }, json["speed"] || 0, function () {
                    $(it).html("鐏炴洖绱�")
                    $(json["obj"] + " .closeUp").off("click", down).on("click", open)
                })
            }

            function open() {
                event.stopPropagation();
                var it = this;
                $(This).animate({
                    height: json["height"][0]
                }, json["speed"] || 0, function () {
                    $(it).html("閺€鎯版崳")
                    $(json["obj"] + " .closeUp").off("click", open).on("click", down)
                })
            }
        });
    }
}
//整点抢切换

function setCon(list, content) {
    $(".timeTit ul li").each(function () {
        if ($(this).hasClass("current")) {
            $(".timeTit ul li i").remove();
            $(this).append("<i class='arrow-down'></i>")
            $("#timeCon .ul:eq(" + $(this).index() + ")").show();
        }
    })
    $(".timeTit ul li").on("click", function () {
        $(".timeTit ul li").removeClass("current");
        $(".timeTit ul li i").remove();
        $(this).addClass("current").append("<i class='arrow-down'></i>");
        $("#timeCon .ul").hide();
        $("#timeCon .ul:eq(" + $(this).index() + ")").show();
    })
}


/*
 *文字特效
 */
function cuteCode(json) {
    var invalTimer = null,
		outTimer = null;
    clearInterval(invalTimer);
    clearTimeout(outTimer);
    $(json["obj"]).each(function () {
        var th1 = this;
        $(json["txt"], this).each(function (index) {
            var th2 = this;
            var str2 = '';
            if ($(this).html()[0] !== "<") {
                for (var i = 1; i <= this.innerHTML.length; i++) {
                    str2 += "<i style='left:" + i + "em; top:" + Math.ceil(index / (i - 1)) * json["swing"] + "px;'>" + $(this).html().charAt(i - 1) + "</i>"
                }
                $(this).html(str2).parents(json["obj"]).css("width", $(this).text().length * 1.2 + "em")
            }
        });
        $(json["txt"], this).each(function (index) {
            var th2 = this;
            setTimeout(function () {
                $("i", th2).each(function (i) {
                    $(this).css({
                        "top": (index) * json["swing"] + "px"
                    }, 0)
                })
            }, 1)
            if (!$(json["obj"]).hasClass("current")) {
                ifTime(th2, json, json["way"], function () {
                    switch (json["way"]) {
                        case "turnup":
                            return turnup(th2, index, json);
                            break;
                        case "jump":
                            return jump(th2, index, json)
                            break;
                    }
                });
            }
        });
    });
}

function ifTime(th2, json, classn, endfn) {
    if ($(th2).parents(json["obj"]).hasClass(classn)) {
        if (json[classn] === true) {
            invalTimer = setInterval(function () {
                endfn && endfn()
            }, classn == "jump" ? 4000 : 3000)
        } else {
            outTimer = setTimeout(function () {
                endfn && endfn()
            }, 100)
        }
    }
}

function turnup(th2, index, json) {
    $("i", th2).each(function (time) {
        $("i", th2).eq(time).animate({
            "top": (index) * json["swing"] - json["swing"] + "px"
        }, (time + 2) / 2 * 400, function () {
            $("i", th2).each(function () {
                $(this).css({
                    "top": (index) * json["swing"] + "px"
                }, 0);
            })
        })
    })
}

function jump(th2, index, json) {
    $("i", th2).each(function (time) {
        $("i", th2).eq(time).animate({
            "top": (index) * json["swing"] - 8 + "px",
            fontSize: 15,
            left: $(this).css("left")
        }, (time + 6) / 2 * 50, function () {
            $("i", th2).each(function () {
                $(this).animate({
                    "top": (index) * json["swing"] + "px",
                    fontSize: 14
                }, 90, function () { });
            })
            if ($("i", th2).length == time + 1) {
                setTimeout(function () {
                    jump(th2, index, json)
                }, 1700)
            }
        })
    })
}

//头部左侧菜单 展开收缩扩展
function indexNavon() {
    var list_obj = ".navMain-list li"
    var w = $(list_obj + ".on").width() - 24;
    if ($(list_obj + ".on").length == 0) {
        $(list_obj + ".onBg").hide();
        var l = 0;
    } else {
        $(list_obj + ".onBg .upaw").show();
        var l = $(list_obj + ".on").offset().left - $(list_obj).parent().offset().left;
    }
    $(list_obj + ".on").fadeIn(400);
    $(list_obj + ".onBg").stop().animate({
        width: w,
        left: l
    }, 400).show();
    $(list_obj).hover(function () {
        var hl = $(this).offset().left - $(this).parent().offset().left;
        $(list_obj + ".onBg .upaw").show();
        if (!$(this).hasClass("onBg")) {
            $(list_obj + ".onBg").stop().animate({
                width: $(this).width() - 24,
                left: hl
            }, 400)
        }
    }, function () {
        $(list_obj + ".onBg").stop().animate({
            width: w,
            left: l
        }, 400)
    })
}
//site 展开收缩方法

function siteEfect() {
    $(".site-top .mygou").each(function () {
        var timei, timeo
        $(this).hover(function () {
            var This = this;
            clearTimeout(timeo)
            timei = setTimeout(function () {
                $(This).addClass("on");
                $(".noneCon", This).stop().slideDown(200);
            }, 220)
        }, function () {
            var This = this;
            clearTimeout(timei)
            timeo = setTimeout(function () {
                $(".noneCon", This).stop().slideUp(200, function () {
                    $(This).removeClass("on");
                });
            }, 230)

        })
    })
}

/*------------------整点抢--------------------*/
//跳转到相应整点抢位置
function jumpTo(startClass, endClass) {
    $(startClass).on("click", function () {
        if ($(this).hasClass("current")) {
            return false;
        }
        $(window).off("scroll", titScro)
        var This = this;
        $(startClass).removeClass("current");
        $(this).addClass("current");
        if ($(".timeBuy").css("position") == "fixed") {
            var toppx = $("[startto].current").attr("startto") == 0 ? 45 : 75;
        } else {
            var toppx = 115
        }
        $('html,body').stop().animate({
            scrollTop: $("[endTo=" + $(This).attr("startTo") + "]").offset().top - toppx
        },
			500,
			function () {
			    $(window).on("scroll", titScro)
			    return false;
			});
    })
}
//整点抢页面滚动条事件

function curtime(num) {
    var curtimestop = $(".timeBuy").offset().top;
    //加载页面后跳转到正在抢购位置
    if (location.hash == "#tomorrow") {
        $("#tomorrow").attr("id", "#tomo")
        $(window).on("scroll", titScro);
        var n = 9;
        $("[startto]").removeClass("current");
        $("[startto=" + n + "]").addClass("current")
        var cotentOffset = $("[endTo=" + n + "]").offset();
        $('body,html').animate({
            scrollTop: cotentOffset.top - 110
        }, 50, function () {
            ws()
        });
        location.href = location.href.replace(/#tomorrow/, "#tomo");
    } else {
        $(window).off("scroll", titScro);
        var n = $("[startto].current").attr("startTo")
        var cotentOffset = $("[endTo=" + n + "]").offset();
        $('body,html').animate({
            scrollTop: cotentOffset.top - 100
        }, 0, function () {
            $(window).on("scroll", titScro);
            ws();
        });
    }
    ws();
    jumpTo("[startTo]", "[endTo]");
    $("[startto].current")[0].click();
    $(window).on("scroll", ws);

    function ws() {
        if (curtimestop <= $(this).scrollTop()) {
            $(".timeBuy").css({
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%"
            });
        } else {
            $(".timeBuy").css({
                position: "",
                top: 0,
                left: 0,
                width: "100%"
            });
        }
    }
}
//整点抢滚动到相应位置选中相应的标题

function titScro() {
    $("[endTo]").each(function (index) {
        //$(this).attr("id","time"+index)
        var This = this;
        if ($(this).offset().top - $(document).scrollTop() >= 10 && $(document).scrollTop() - $(this).offset().top > -450) {
            $("[startTo]").removeClass("current");
            $("[startTo=" + $(This).attr("endTo") + "]").addClass("current")
        }
    })
    //明日抢购位置设定
    if ($("[endTo=9]").size() > 0 && $(document).scrollTop() - $("[endTo=9]").offset().top > 0) {
        $("[startTo=9]").addClass("current")
    }
}

/*---------------------閻劍鍩涢崣宥夘洯---------------------------*/
//弹出框
var pop = {
    lert: function (oEvent, set, endfn) {
        set['obj'] = typeof set['obj'] == "string" ? $(set['obj']) : set['obj'];
        switch (oEvent) {
            case "alway":
                popup({
                    box: set["box"],
                    scrollSize: set["scrollSize"],
                    DownFn: set['DownFn'],
                    follow: set["follow"],
                    opacity: set["opacity"],
                    lastfn: set['lastfn'],
                    timing: set['timing'],
                    mask: set['mask']
                })
                break;
        }
    }
}
//主题函数

function popup(json) {
    var element = {
        ShutDownFn: json["DownFn"] || ".close",
        RemoveBox: json['del'] || false,
        write: json['write'] || ''
    }
    var num = 2;
    while ($("#MASK" + num).length > 0) {
        num++;
    }
    $(document.body).append("<div mask='mask' id='MASK" + num + "'></div>" + element['write']);
    if (json['mask'] != false) {
        layerMask($("#MASK" + num), num, json).fadeIn(300);
    }
    midpos(json, num).fadeIn(300);
    WindowScrollSize($("#MASK" + num), num, json);
    ShutDownFn($(json['box']), $("#MASK" + num), element["ShutDownFn"], element['RemoveBox'], json['lastfn']);
    Confirm(json, num, element['RemoveBox']);
}

//创建遮罩层
function layerMask(mask, num, json) {
    var len = json["opacity"] || 0.6;
    var w = Math.max($(document).width(), $(document.body).width());
    var h = Math.max($(document).height(), $(document.body).height());
    return mask.css({
        position: "fixed",
        width: w + "px",
        height: h + 'px',
        background: "#333",
        left: 0,
        top: 0,
        opacity: 0,
        filter: "alpha(opacity=0)",
        zIndex: 70000 + num * 2
    }).animate({
        opacity: len,
        filter: "alpha(opacity=" + len + "*100)"
    }, 500)
}
//关闭函数

function ShutDownFn(box, mask, downName, del, lastfn) {
    box.find(downName).off("click", null);
    box.find(downName).on("click", function () {
        del ? box.remove() : box.hide();
        mask.remove();
        lastfn && lastfn();
        box.find(".okBtn").off("click", null);
        box.find(".noBtn").off("click", null);
    })

}
//跟随滚动

function WindowScrollSize(mask, num, json) {
    var element = {
        WindowScrollSize: json["scrollSize"] == false ? "false" : "true" || "true"
    }
    if (element['WindowScrollSize'] == "true") {
        $(window).scroll(function () {
            if ($(json['box']).css("display") == 'block') {
                midpos(json, num);
            }
        });
    }
    $(window).resize(function () {
        if (mask.css("display") == 'block') {
            if (json['mask'] != false) {
                layerMask(mask, num, json)
            }
        }
        if ($(json['box']).css("display") == 'block') {
            midpos(json, num);
        }
    })
}
//定位弹出层

function midpos(json, num) {
    var result = null
    $(json["box"]).css("position", "fixed")
    if (json["follow"]) {
        var obj = json["follow"][2] ? json["follow"][2] : json["This"];
        result = $(json["box"]).css({
            width: "auto",
            zIndex: 70000 + (num * 2 + 1),
            top: $(obj).offset().top + json["follow"][1],
            left: $(obj).offset().left + json["follow"][0]
        })
    } else {
        result = $(json["box"]).css({
            zIndex: 70000 + (num * 2 + 1),
            top: ($(window).height() - $(json["box"]).outerHeight()) / 2 + 'px',
            left: ($(window).width() - $(json["box"]).outerWidth()) / 2 + 'px'
        })
    }
    return result
}
//确定取消

function Confirm(json, num, del) {
    var timer = null
    $(json['box']).find(".okBtn").on("click", function () {
        $(this).off("click", null);
        json['ok'] && json['ok']();
        $("#MASK" + num).remove();
        del ? $(json['box']).remove() : $(json['box']).hide();
    })
    $(json['box']).find(".noBtn").on("click", function () {
        del ? $(json['box']).remove() : $(json['box']).hide();
        $("#MASK" + num).remove();
        $(this).off("click", null);
        $(json['box']).find(".okBtn").off("click", null);
    })
    if (json['timing']) {
        timer = setTimeout(function () {
            del ? $(json['box']).remove() : $(json['box']).hide();
            $("#MASK" + num).remove();
        }, json['timing'])
    }
}
var base = {
    createTags: function () {
        var tags = ['header', 'aside', 'footer', 'nav', 'section', 'article', 'hgroup', 'time'];
        for (var i = 0; i < tags.length; i++) {
            document.createElement(tags[i]);
        }
    },
    creatMask: function (json) {
        if ($("#MASK").length == 0) {
            $(document.body).append("<div mask='mask' class='close' id='MASK'></div>");
        }
        mask = $("#MASK");
        var len = json && json["opa"] || 0.6;
        var bgcolor = json && json["bgcolor"] || "#333";
        var w = Math.max($(document).width(), $(document.body).width());
        var h = Math.max($(document).height(), $(document.body).height());
        return mask.css({
            position: "fixed",
            width: w + 2000 + "px",
            height: h + 2000 + 'px',
            background: bgcolor,
            left: -500,
            top: -500,
            opacity: len,
            filter: "alpha(opacity=" + len * 100 + ")",
            zIndex: 10000
        });
    },
    creatHtml: function (json) {
        var element = {
            okval: json['okval'],
            addokval: json['addokval'],
            noval: json['noval'],
            type: json["type"] || "",
            cd: json["ok"] ? "" : json["closeDown"] || "close",
            cn: json["no"] ? "" : json["closeDown"] || "close",
            closeTag: json['closeTag'] || "<i class='icon close'></i>",
            customTag: json["customTag"] || "",
            divAddClass: json["divAddClass"] || "",
            title: json["title"] || "",
            con: "",
            btncon: ''
        }
        var tag = {
            title: element['title'] == "" ? "" : "<div class='layerTitle'>" + element['title'] + "</div>"
        }
        if (json["txt"]) {
            for (var i = 0; i < json['txt'].split('|').length; i++) {
                element['con'] += '<div class="' + element['divAddClass'] + '">' + json['txt'].split('|')[i] + '</div>';
            }
        }
        //按钮
        json['okCon'] = json['noCon'] = json['addokCon'] = '';

        function setbtn(a, str, n, id) {
            if (json[a] && json[a] != null && json[a] != "undefined") {
                return json[str] = '<input type="button" id="' + id + '" class="' + n + '" value="' + json[a] + '">';
            }
        }
        setbtn('okval', 'okCon', 'okBtn ' + element["cd"], json['okid'] || "");
        setbtn('addokval', 'addokCon', 'addokBtn', json['noid']);
        setbtn('noval', 'noCon', 'noBtn ' + element["cn"], json['noid'] || "");
        if (json['okval'] || json['noval'] || json["addokval"]) {
            element['btncon'] = '<div class="layerBtn">' + json['noCon'] + json['okCon'] + json['addokCon'] + '</div>';
        }

        $(document.body).append("<div id='poplayer' class='poplayer " + element['type'] + "'>" + tag['title'] + element["closeTag"] + element['customTag'] + "<div class='layerCon'>" + element["con"] + "</div>" + element['btncon'] + "</div>");
        json['box'] = "#poplayer";
    },
    midpos: function (json) {
        var result = null;
        $(json["box"]).css({
            position: "fixed",
            width: json['width'] || ""
        });
        result = $(json["box"]).css({
            zIndex: 100001,
            top: ($(window).height() - $(json["box"]).outerHeight()) / 2 + 'px',
            left: ($(window).width() - $(json["box"]).outerWidth()) / 2 + 'px'
        });
        return result;
    },
    offLayer: function (json) {
        var del = json["del"] || true,
			mask = $("#MASK");
        var cd = json["closeDown"] || ".close";
        $(json['box'] + " " + cd).on("click", function () {
            var closeDown = function () {
                setTimeout(function () {
                    del ? $(json['box']).remove() : $(json['box']).hide();
                }, 5);
                mask.remove();
            }
            $(json['box']).find(".noBtn").off("click", null);
            $(json['box']).find(".okBtn").off("click", null);
            closeDown();
        });

        bindBtn(".noBtn", "no");
        bindBtn(".okBtn", "ok");
        bindBtn(".addokBtn", "addok");

        function bindBtn(classNa, func) {
            $(json['box'] + " " + classNa).on("click", function () {
                var closeDown = function () {
                    setTimeout(function () {
                        del ? $(json['box']).remove() : $(json['box']).hide();
                    }, 5)
                    mask.remove();
                }
                json[func] && json[func](closeDown);
            });
        }
        if (json["timing"]) {
            var o = "timing",
				otime = 2000,
				a = json[o] == true,
				b = json[o][0] != undefined && typeof json[o][0] != "number",
				c = typeof json[o] != "number" && typeof json[o] != "object",
				d = typeof json[o] == "number" ? json[o] : json[o][0],
				miao = a || b || c ? otime : d;
            setTimeout(function () {
                (typeof json[o]) == "function" && json[o](closeDown);
                json[o][0] && (typeof json[o][0]) == "function" && json[o][0]();
                json[o][1] && (typeof json[o][1]) == "function" && json[o][1]();
                del ? $(json['box']).remove() : $(json['box']).hide();
                mask.remove();
            }, miao);
        }
    },
    onLayer: function (json) {
        base.creatMask(json);
        if (!json["box"]) {
            base.creatHtml(json);
        }
        base.midpos(json);
        base.offLayer(json);
        $(window).resize(function () {
            base.midpos(json);
        });
        base.inputTip();
        json["ready"] && json["ready"]()
        return json
    },
    offPop: function () {
        $("#MASK").remove();
        $("#poplayer").remove();
    },
    inputTip: function () {
        if (myBrowser() != "IE7" && myBrowser() != "IE8" && myBrowser() != "IE9") {
            return false
        }
        $("input[placeholder]").each(function () {
            if ($(this).attr("type") != "password") {
                $(this).val($(this).attr("placeholder")).css("color", "#ccc");
                var txt = $(this).val();
                $(this).on("focus", function () {
                    if ($(this).val() == txt) {
                        $(this).val("").css("color", "#333");
                    }
                })
                $(this).on("blur", function () {
                    if ($(this).val() == "" || $(this).val() == txt) {
                        $(this).val(txt).css("color", "#ccc");
                    }
                })
            } else {
                $(this).hide();
                $(this).after("<input type='text'>");
                $(this).next().attr({
                    "class": $(this).attr("class"),
                    "name": $(this).attr("name") || "",
                    "value": $(this).attr("placeholder")
                }).css("color", "#ccc").removeClass("eyeThis");
                var txt1 = $(this).attr("placeholder");
                $(this).next().on("focus", function () {
                    if ($(this).val() == txt1) {
                        $(this).val("").css("color", "#333");
                        $(this).prev().val("");
                    }
                    if ($(this).parent().find(".showPwd").length > 0 && $(this).parent().find(".showPwd").hasClass("open")) {
                        $(this).prev().hide();
                        $(this).show().focus();
                    } else {
                        $(this).prev().show().focus();
                        $(this).hide();
                    }
                })
                $(this).on("blur", function () {
                    if ($(this).val() == "") {
                        $(this).next().val(txt1).css("color", "#ccc");
                        $(this).next().show();
                        $(this).hide();
                    }
                });
                $(this).next().on("blur", function () {
                    if ($(this).val() == "" || $(this).val() == txt1) {
                        $(this).val(txt1).css("color", "#ccc");
                    }
                })

            }
        })
    },
    msgCode: function (paramete) {
        var obj = paramete["obj"]; //按钮对象
        var time = paramete["lasttime"]; //读秒剩余时间
        var miao = time;
        var timer = null,
			txt = null;
        var bggreen = paramete["c1"] || "";
        var bggray = paramete["c2"] || "disabled";
        var btnhui = $(obj).removeClass(bggreen).addClass(bggray);
        var txt = paramete["customTxt"] || "秒后可重新获取";
        var defaultTxt = paramete["defaultTxt"] || "获取短信验证码";
        var reset = function () {
            clearInterval(timer);
            $(obj).prop("disabled", false);
            $(obj).removeClass(bggray).addClass(bggreen).val(defaultTxt);
        }
        //初始化发送按钮，清空初始化事件
        btnhui.val(miao + txt);
        $(obj).prop("disabled", true);
        //发送倒数读秒
        timer = setInterval(function () {
            miao--;
            btnhui.val(miao + txt);
            if (miao == 0) {
                reset();
                if (paramete["endfn"] != null && typeof paramete["endfn"] == "function") paramete["endfn"]();
            }
        }, 1000);

        return { reset: reset }
    },
    posDiv: function (obj, px) {
        var len = px || 0;
        var elm = $(obj);
        var startPos = $(elm).offset().top;
        jQuery.event.add(window, "scroll", function () {
            var p = $(window).scrollTop();
            $(elm).css('position', ((p) > startPos - len) ? 'fixed' : 'absolute');
            $(elm).css('top', ((p) > startPos - len) ? '200px' : '');
            if ($(obj).offset().top > 8800) {
                $(obj).css({
                    "position": "absolute",
                    'top': 8780
                })
            }
        });
    },
    acrPic: function (option) {
        if ($(option["obj"]) == null || $(option["obj"]) == undefined) {
            return false;
        }
        $(option["obj"]).each(function () {
            if (option["moveway"] && option["moveway"] == "left") {
                var name = option["mark"] ? option["mark"] : "";
                var This = this;
                var oldml = $("img" + name, this).css("margin-left") != undefined ? $("img" + name, this).css("margin-left") : 0;
                $(this).hover(function () {
                    var ml = option["ml"] || (parseInt(oldml) + 10);
                    $("img" + name, this).stop().animate({
                        "margin-left": ml
                    }, 300)
                }, function () {
                    $("img" + name, this).stop().animate({
                        marginLeft: oldml
                    }, 300)
                })
            } else {
                var name = option["mark"] ? option["mark"] : "";
                var oldw = $("img" + name, this).css("width");
                var oldh = $("img" + name, this).css("height");
                $("img" + name, this).removeAttr("style"); //娓呴櫎img鏍峰紡
                $(this).hover(function () {
                    $("img", this).css("opacity", 1);
                    var w = option["w"] || (parseInt(oldw) + 25);
                    var h = option["h"] || w / parseInt(oldw) * parseInt(oldh);
                    $(this).css({
                        position: "relative",
                        overflow: "hidden"
                    });
                    $("img" + name, this).css({
                        position: "absolute"
                    }).stop().animate({
                        width: w,
                        height: h,
                        left: -(w - parseInt(oldw)) / 2,
                        top: -(h - parseInt(oldh)) / 2
                    }, 800)
                }, function () {
                    var This = this;
                    $("img" + name, this).stop().animate({
                        width: oldw,
                        height: oldh,
                        left: 0,
                        top: 0
                    }, 800, function () {
                        $(this).css("position", "static");
                        $(This).css({
                            overflow: "visible"
                        });
                    })
                })
            }
        })
    },
    todayMore: function () {
        if ($(".s-c-filter").length > 0 && $(".s-c-filter").outerHeight() > 38) {
            $(".lookMore").show();
            $(".s-c-filter").css({
                height: 32,
                borderBottom: "1px solid #ddd"
            })
            $(".lookMore").on("click", function () {
                if ($(".s-c-filter").outerHeight() < 38) {
                    $(".s-c-filter").css({
                        height: "auto"
                    })
                    $(".lookMore").html("收起<span></span>");
                } else {
                    $(".s-c-filter").css({
                        height: 32
                    })
                    $(".lookMore").html("展开<span></span>");
                }
            })
        } else {
            $(".s-c-filter").css({
                borderBottom: "0"
            })
        }
    },
    divScroll: function (obj) {
        $(obj).bind('mousewheel', function (event) {
            event.preventDefault();
            var scrollTop = this.scrollTop;
            this.scrollTop = (scrollTop + ((event.deltaY * event.deltaFactor) * -1));
        });
    },
    DisableScroll: function () {
        /*$(".public-list").css("height",$(".public-list").height()-45);
		base.divScroll('.public-list ol');
		base.divScroll(".cart-order-list");*/
    },
    scroll: function (json) {
        $(window).on("load", function () {
            var obj = $(json["obj"])
            if (!obj.offset()) {
                return false;
            }
            var maxtop = json["setTop"] || obj.offset().top;
            $(window).on("scroll", function () {
                if (maxtop < $(document).scrollTop() + json["top"]) {
                    if ($(".occupying").length == 0 && !json["creatPos"]) {
                        obj.after("<div class='occupying'></div>")
                        $(".occupying").css("height", obj.height())
                    }
                    obj.css({
                        position: "fixed",
                        top: +json["top"],
                        left: 0
                    }).fadeIn(200)
                } else {
                    $(".occupying").remove();
                    obj.css({
                        position: ""
                    })
                    if (json["creatPos"]) {
                        obj.fadeOut(0)
                    }
                }
                $(json["maoLink"]).each(function (index, ele) {
                    if ($(this).offset().top >= $(document).scrollTop() - json["dig"][0] && $(this).offset().top < $(document).scrollTop() + json["dig"][1]) {
                        obj.find(json["tagType"]).removeClass("on")
                        obj.find(json["tagType"]).eq(index).addClass("on")
                    }
                })
            })
        })
    },
    slideMove: function (json) {
        $(json["obj"]).each(function () {
            var This = this,
				onoff = true;
            var boxW = $(json["list"], This).outerWidth() * $(json["list"], This).length;
            var scrollW = $(json["list"], This).outerWidth();
            $(json["moveBox"], This).width(boxW);
            btnEvt($(".next", This), -1);
            btnEvt($(".prev", This), 1);

            function btnEvt(obj, np) {
                obj.on("click", function () {
                    if (!onoff) {
                        return false
                    }
                    onoff = false
                    var left = parseInt($(json["moveBox"], This).css("left"));
                    var sw = np < 0 ? -(Math.abs(left) + scrollW) : scrollW - Math.abs(left)
                    if (sw > 0) {
                        sw = 0;
                    }
                    if (sw <= -(boxW - scrollW)) {
                        sw = -(boxW - scrollW)
                    }
                    $(json["moveBox"], This).animate({
                        left: sw
                    }, function () {
                        onoff = true;
                    })
                })
            }
        })
    },
    moreBrand: function () {
        var len = $(".brandLogo table tr").length - 1;
        var h = $(".brandLogo table tr:eq(1)").outerHeight();
        if (len >= 3) {
            $(".moreTd").show().parent().show();
            $(".brandLogo .scrollH").css({ height: h * 2 })
            $(".moreTd").on("click", function () {
                var This = this;
                if (!$(this).hasClass("open")) {
                    $(".brandLogo .scrollH").animate({ height: h * len }, function () {
                        $(This).addClass("open");
                        $("span", This).html('<i class="gjgIco"></i>收起');
                    })
                } else {
                    $(".brandLogo .scrollH").animate({ height: h * 2 }, function () {
                        $(This).removeClass("open");
                        $("span", This).html('<i class="gjgIco"></i>显示更多品牌');
                    })
                }
            })
        }
    },
    addEvent: function () {
        //天天特卖幻灯片
        slideFade("#slide-sale");

        //天天特卖列表图片放大效果
        $(window).resize(function () {
            base.acrPic({
                obj: ".hoverbig ul li",
                mark: ".select"
            });
        })
        base.acrPic({
            obj: ".hoverbig ul li",
            mark: ".select"
        });
        base.todayMore();
        base.DisableScroll();
        base.scroll({
            obj: ".htitbox",
            maoLink: ".maoLink",
            tagType: "a",
            current: "on",
            dig: [500, 100],
            top: 0
        });
        base.scroll({
            obj: ".cBg",
            maoLink: ".maoLink",
            tagType: "li",
            creatPos: true,
            setTop: $(".countryModel:eq(0)").length > 0 && $(".countryModel:eq(0)").offset().top,
            current: "on",
            dig: [500, 100],
            top: 0
        });
        $(".cBg").hide();
        slideFade(".leftSlide", true);
        //base.slideMove({obj:".slideMoveCon",moveBox:".warpBox",list:".bigBoxList"});左右滑动幻灯
        base.moreBrand();

        /*通用幻灯片*/
        if ($(".swiperMove").length > 0) {
            $(".swiperMove").each(function () {
                var swiper = new Swiper(this, {
                    pagination: $(".count", this)[0],
                    slideClass: "sl",
                    wrapperClass: "wraper",
                    paginationClickable: true,
                    slidesPerView: 1,
                    calculateHeight: true,
                    spaceBetween: 30,
                    loop: true,
                    autoplayDisableOnInteraction: false,
                    autoplay: 3000
                });
            });
        }
    }
    /*event end*/
}

//封装获取绝对距离
function getPos(obj) {
    var pos = {
        left: 0,
        top: 0
    };
    while (obj) {
        pos.left += obj.offsetLeft;
        pos.top += obj.offsetTop;
        obj = obj.offsetParent;
    }
    return pos;
}

//天天特卖幻灯片通用
function slideFade(boxId, autoPlay) {
    $(boxId).find("img[bgsrc]").each(function () {
        $(this).parents("li").css("background", $(this).attr("bgsrc"));
    })
    $(boxId).each(function () {
        var This = this;
        var saleTimer = null,
			timeot = null;
        var num = 0;
        var onoff = true;
        $(".item-img li:eq(0)", this).show();
        $(".item-No a:eq(0)", this).addClass("on");
        if ($(".item-img li", this).length < 2) {
            $(".item-No").hide();
            $(".slidePrev").css("display", "none")
            $(".slideNext").css("display", "none")
            return
        }
        auto();
        listTab(".item-No a");
        num = prevNext(".slidePrev", -1);
        num = prevNext(".slideNext", 1);
        //划过切换
        function listTab(obj) {
            $(obj, This).on("mouseover", function () {
                var the = this;
                timeot = setTimeout(function () {
                    if (!$(the).hasClass("on")) {
                        num = $(the).index();
                        inOut(num, 500);
                    }
                }, 150);
            })
            hoverPlay(obj, This)
        }
        //左右切换按钮

        function prevNext(obj, n) {
            $(obj, This).on("click", function () {
                var length = $(".item-img").children().length;
                n > 0 ? num++ : num--;
                num >= 0 ? num %= length : num = (length - 1);
                inOut(num, 500);
            })
            hoverPlay(obj, This)
            return num
        }
        //自动播放

        function auto() {
            if (autoPlay !== false) {
                saleTimer = setInterval(function () {
                    var length = $(".item-img").children().length;
                    num++;
                    num = num >= length ? 0 : num;
                    num = num < 0 ? num = length : num;
                    inOut(num, 300)
                }, 3000)
            }
        }
        //切换效果

        function inOut(num, inOut) {
            $(".item-img li", This).fadeOut(inOut);
            $(".item-No a", This).removeClass("on");
            $(".item-img li:eq(" + num + ")", This).fadeIn(inOut);
            $(".item-No a:eq(" + num + ")", This).addClass("on");
        }

        function hoverPlay(obj) {
            //划过按钮或标签停止自动切换划出继续自动切换
            $(obj).hover(function () {
                clearInterval(saleTimer);
            }, function () {
                auto()
            })
        }
    })
}


//页面加载后加载事件
$(function () {
    base.addEvent();
    if ($("input.txt").length > 0) {
        $('input.txt').bind({
            focus: function () {
                if (this.value == this.defaultValue) {
                    this.value = "";
                }
            },
            blur: function () {
                if (this.value == "") {
                    this.value = this.defaultValue;
                }
            }
        });
    }
    //返回顶部
    if ($("#backTop a img").length > 0) {
        $("#backTop a img").bind("click", function () {
            $('html,body').animate({
                scrollTop: 0
            }, 100);
        })
    }
    //国家馆详情页 幻灯片复制按钮事件
    if ($(".leftSlide").length > 0) {
        $(".slideCon").each(function () {
            var This = this;
            $(".slideBtn.next", This).attr("style", $(".slideNext", This).attr("style"));
            if ($(".slideBtn.next", This).css("display") == "none") {
                $(".bigBoxList", This).css({ padding: "0 25px", width: 1140 });
                $(".rightTxt", This).css({ width: 600 });
            }
            $(".slideBtn.next", This).on("click", function () {
                $(".slideNext", This).click();
            })
            $(".slideBtn.prev", This).attr("style", $(".slideNext", This).attr("style"))
            $(".slideBtn.prev", This).on("click", function () {
                $(".slidePrev", This).click();
            })
        })
    }
});