var Section1View;
var Section1ViewParam = {
    name: "Section1",
    type: ViewType.SECTION,
    load: "once",//once 只加载一次
    bgcolor: "rgba(154, 205, 50,0.6)",
    loaded: false,
    showtime:0,
};
(function () {
    Section1View = function() {
        //以父类的构造函数初始化
        Section1View.superClass.constructor.call(this, Section1ViewParam);
        //初始化
        var _this = this;
        var init = function() { Section1View.prototype.init(_this, _this) };
        //Load View
        LoadView(_this, init);
    };

    //Super Class
    extendViewClass(Section1View, View, Section1ViewParam);

    Section1View.prototype.init = function (view) {
        //SuperClass init
        //在创建对象时进行初始化 需要传入初始化对象view
        !view && (view = this);
        Section1View.superClass.init.call(this, view);
        
        //SectionMenu初始化及显示方法
        console.log(view.name + "View init");

        Section1View.prototype.addEvents.call(this, view);
        CallbackL(arguments);
    };

    Section1View.prototype.addEvents = function (view) {
        //SuperClass addEvents
        //在创建对象时进行事件绑定 需要传入初始化对象view
        !view && (view = this);
        Section1View.superClass.addEvents.call(this, view);
        //TODO
        console.log(view.name + "View addEvent");

        CallbackL(arguments);
    };

    Section1View.prototype.show = function (view) {
        //SuperClass show
        !view && (view = this);
        Section1View.superClass.show.call(this, view);
        //TODO
        console.log(view.name + "View show");
        //
        


        
        view.resize(view);
        setTimeout(function () {
            Controler.preloadLayerHide(view.target);
        }, 3000);
        CallbackL(arguments);
    };
    
    Section1View.prototype.hide = function (view) {
        //SuperClass hide
        !view && (view = this);
        Section1View.superClass.hide.call(this, view);
        //TODO
        console.log(view.name + "View hide");
        //
        CallbackL(arguments);
    };

    Section1View.prototype.resize = function (view) {
        !view && (view = this);
        Section1View.superClass.resize.call(this, view);
        //TODO
        console.log(view.name + "View resize");
        var bgResize = function() {
            //Section1View bg w/h = 1.6
            //h screenH 70%
            //w screenW 50
            var imageHeight = 1200;
            var imageWidth = 990;
            var screenHeight = window.outerHeight;
            var screenWidth = window.outerWidth;
            var widthScale = screenWidth / imageWidth;
            var heightScale =  screenHeight/ imageHeight;
            console.log("screenHeight=" + screenHeight);
            console.log("screenWidth=" + screenWidth);
            console.log("widthScale=" + widthScale);
            console.log("heightScale=" + heightScale);
            if (widthScale>heightScale) {
                $("#Section1 .section-container").addClass("section1bg_width").removeClass("section1bg_height");
            } else {
                $("#Section1 .section-container").addClass("section1bg_height").removeClass("section1bg_width");
            }
            $("#Section1 .section-container:before ").css({
                "background": "",
            });
        };
        bgResize();

        CustomAudioContext.Canvas.resize();
        //
        CallbackL(arguments);
    }
})();

//Section1 resize function
