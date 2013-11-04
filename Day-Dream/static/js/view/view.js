//View
/* Base View Class */
var View = function (viewParam) {
    this.name = viewParam.name;
    this.target = $("#" + viewParam.name);
    this.viewtype = viewParam.type;
    this.load = viewParam.load;
    this.param = viewParam;//default
};

//视图初始化方法
View.prototype.init = function (view) {
    //获得视图对象 id = name
    console.log("View init");
    !view && (view = this); 
    view.target.addClass(view.viewtype.classview);
    //View Type Common init func
    typeof view.viewtype.init == "function" && view.viewtype.init(view);

    //callback
    CallbackL(arguments);
}

//视图初始化方法
View.prototype.addEvents = function () {
    //获得视图对象 id = name
    console.log("View addEvent");
    //callback
    CallbackL(arguments);
}

//视图显示方法
View.prototype.show = function (view) {
    view.viewtype.showstyle(view.target);
    //TODO
    console.log("View show");

    //callback
    CallbackL(arguments);
}

View.prototype.hide = function (view) {
    view.viewtype.hidestyle(view.target);
    //TODO
    console.log("View hide");

    //callback
    CallbackL(arguments);
}


var ViewShow = {
    NORMAL: function (target) {
        target && target.removeClass("hidden")
    },
    FADEIN: function (target) {
        target && target.fadeIn();
    }
}

var ViewHide = {
    NORMAL: function (target) {
        target && target.addClass("hidden");
    },
    FADEOUT: function (target) {
        target && target.fadeOut();
    }
}
/*
 * 视图类型
 * 根据视图类型设定视图的大小，层级，容器，视图默认显示方式
 */
var ViewType = {
    FULL: {
        container: $("#MainContainer"),
        classview: "full-view",
        showstyle: ViewShow.FADEIN, //设定默认的显示方式
        hidestyle: ViewHide.FADEOUT, //设定默认的隐藏方式

    },
    SECTION:{
        container: $("#SectionContainer"),
        classview: "section-view",
        showstyle: ViewShow.FADEIN,
        hidestyle: ViewHide.FADEOUT,
        //common init function
        init: function (view) {
            Resize.section_container(view);
        }
    }
}

//判断 View的加载方式
var LoadView = function (view,func) {
    switch (view.load) {
        case "once":
            if (view.param.loaded) {
                return;
            } else {
                typeof func == "function" && func();
                view.param.loaded = true;
            }
            break;
        case "refresh":
            typeof func == "function" && func();
            break;
    }
};

