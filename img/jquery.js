var LazyLoadScrollLoading = new Array();
var LazyLoadEL = new Array();
var LazyLoadCallBack = new Array();

function ContentLazyLoad() {
    this.scrollloading = new Array();
    this.el = new Array();
    this.callback = new Array();
    this.cnt = 0;

    this.addCallBack = function (pel, pcallback) {
        //alert(this.cnt);
        this.el[this.cnt] = pel;
        this.scrollloading[this.cnt] = false;
        this.callback[this.cnt] = pcallback;
        this.cnt++;
    };

    this.scrollBind = function () {
        LazyLoadScrollLoading = this.scrollloading;
        LazyLoadEL = this.el;
        LazyLoadCallBack = this.callback;
        $(window).bind("scroll", function () {
            //��̬�ݼ�������

            $.each(LazyLoadEL, function (i, subel) {


                if ($(window).scrollTop() > parseInt(subel.offset().top) + subel.height() - $(window).height()) {

                    if (LazyLoadScrollLoading[i]) return;

                    if (typeof LazyLoadCallBack[i] == "function") {
                        LazyLoadScrollLoading[i] = true;
                        LazyLoadCallBack[i]();
                    }

                }

            });

        });

    };

};

/*****�����ӳټ������*****/
/*
ʹ�÷���,֧��һ��ҳ�����ӳٻ���ģ��
var cll = new ContentLazyLoad();
cll.addCallBack($("#div_xxxx1"),function(){
loadModule1();
});
cll.addCallBack($("#div_xxxx2"),function(){
loadModule2();
});
cll.scrollBind();
*/