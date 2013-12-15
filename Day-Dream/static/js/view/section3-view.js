var Section3View;
var Section3ViewParam = {
    name: "Section3",
    type: ViewType.SECTION,
    load: "refresh",//refresh evertime load
    bgcolor: "rgba(255, 140, 0,0.6)",
    loaded: "false",
};
(function () {
    Section3View = function() {
        //以父类的构造函数初始化
        Section3View.superClass.constructor.call(this, Section3ViewParam);
        //初始化
        var _this = this;
        var init = function() { Section3View.prototype.init(_this, _this) };
        //Load View
        LoadView(_this, init);
    };

    //Super Class
    extendViewClass(Section3View, View, Section3ViewParam);

    Section3View.prototype.init = function (view) {
        //SuperClass init
        //在创建对象时进行初始化 需要传入初始化对象view
        !view && (view = this);
        Section1View.superClass.init.call(this, view);

        //SectionMenu初始化及显示方法
        console.log(view.name + "View init");
        SectionMenu.FirstMenu_Init(view.name);

        Section1View.prototype.addEvents.call(this, view);
        CallbackL(arguments);
    };

    Section3View.prototype.addEvents = function (view) {
        //SuperClass addEvents
        //在创建对象时进行事件绑定 需要传入初始化对象view
        !view && (view = this);
        Section3View.superClass.addEvents.call(this, view);
        //TODO
        console.log(view.name + "View addEvent");

        CallbackL(arguments);
    };

    Section3View.prototype.show = function (view) {
        //SuperClass show
        !view && (view = this);
        Section3View.superClass.show.call(this, view);
        //TODO
        console.log(view.name + "View show");

        AlbumWall.Init();
        //
        CallbackL(arguments);
    };
    
    Section3View.prototype.hide = function (view) {
        //SuperClass hide
        !view && (view = this);
        Section1View.superClass.hide.call(this, view);
        //TODO
        console.log(view.name + "View hide");
        //
        CallbackL(arguments);
    };
    
    Section3View.prototype.resize = function (view) {
        !view && (view = this);
        Section3View.superClass.resize.call(this, view);
        //TODO
        console.log(view.name + "View resize");
        //
        CallbackL(arguments);
    }

})();