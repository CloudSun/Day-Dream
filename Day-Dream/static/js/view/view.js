//View
/* Base View Class */
var View = function (name ,type) {
    this.name = name;
    this.target = $("#" + name);
    this.viewtype = type;
};

//视图初始化方法
View.prototype.init = function () {
    //获得视图对象 id = name
    console.log("View init");
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
View.prototype.show = function () {
    this.viewtype.showstyle(this.target);
    //TODO
    console.log("View show");

    //callback
    CallbackL(arguments);
}

View.prototype.hide = function () {
    this.viewtype.hidestyle(this.target);
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
        showtyle: ViewShow.FADEIN,
        hidestyle: ViewHide.FADEOUT,
    }
}



