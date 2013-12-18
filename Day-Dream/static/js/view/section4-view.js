var Section4View;
var Section4ViewParam = {
    name: "Section4",
    type: ViewType.SECTION,
    load: "refresh",//refresh evertime load
    bgcolor: "rgba(255, 140, 0,0.6)",
    loaded: "false",
    showtime: 0,
};
(function () {
    Section4View = function() {
        //以父类的构造函数初始化
        Section4View.superClass.constructor.call(this, Section4ViewParam);
        //初始化
        var _this = this;
        var init = function() { Section4View.prototype.init(_this, _this) };
        //Load View
        LoadView(_this, init);
    };

    //Super Class
    extendViewClass(Section4View, View, Section4ViewParam);

    Section4View.prototype.init = function (view) {
        //SuperClass init
        //在创建对象时进行初始化 需要传入初始化对象view
        !view && (view = this);
        Section1View.superClass.init.call(this, view);

        //SectionMenu初始化及显示方法
        console.log(view.name + "View init");


        Section1View.prototype.addEvents.call(this, view);
        CallbackL(arguments);
    };

    Section4View.prototype.addEvents = function (view) {
        //SuperClass addEvents
        //在创建对象时进行事件绑定 需要传入初始化对象view
        !view && (view = this);
        Section4View.superClass.addEvents.call(this, view);
        //TODO
        console.log(view.name + "View addEvent");



        CallbackL(arguments);
    };

    Section4View.prototype.show = function (view) {
        //SuperClass show
        !view && (view = this);
        Section4View.superClass.show.call(this, view);
        //TODO
        console.log(view.name + "View show");


        
        view.resize(view);
        setTimeout(function () {
            Controler.preloadLayerHide(view.target);
        }, 3000);
        
        
        
        CallbackL(arguments);
    };
    
    Section4View.prototype.hide = function (view) {
        //SuperClass hide
        !view && (view = this);
        Section1View.superClass.hide.call(this, view);
        //TODO
        console.log(view.name + "View hide");
        //
        
        CallbackL(arguments);
    };

    Section4View.prototype.resize = function(view) {
        !view && (view = this);
        Section4View.superClass.resize.call(this, view);
        //TODO
        console.log(view.name + "View resize");

        Radar.Init(view.target.children(".section-container"));
        //
        CallbackL(arguments);
    };

})();