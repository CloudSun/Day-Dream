var Section2View
(function () { 
    var ViewParam = {
        name : "Section2",
        type:ViewType.SECTION
    }
    Section2View = function () {
        //以父类的构造函数初始化
        Section2View.superClass.constructor.call(this, ViewParam);
        //初始化
        Section2View.prototype.init(this,this,Section2View.prototype.addEvents);
    }

    //Super Class
    extendViewClass(Section2View, View, ViewParam);

    Section2View.prototype.init = function (view) {
        //SuperClass init
        //在创建对象时进行初始化 需要传入初始化对象view
        !view && (view = this);
        Section1View.superClass.init.call(this, view);

        //SectionMenu初始化及显示方法
        console.log(name + "View init");
        SectionMenu.FirstMenu_Init();

        CallbackL(arguments);
    };

    Section2View.prototype.addEvents = function (view) {
        //SuperClass addEvents
        //在创建对象时进行事件绑定 需要传入初始化对象view
        !view && (view = this);
        Section2View.superClass.addEvents.call(this, view);
        //TODO
        console.log(name + "View addEvent");

        for (var i = 0; i < $(".cubebox").length; i++) {
            var t = $($(".cubebox")[i]);
            t.attr("index", i);
            var clickTime = 0
            t.unbind("click").click(function () {
                var font = $($(this).find(".box-font"));
                var back = $($(this).find(".box-end"));
                switch (parseInt($(this).attr("index")) % 3) {
                    case 0:
                        $(this).addClass("box_x_transition");
                        break;
                    case 1:
                        $(this).addClass("box_y_transition");
                        break;
                    case 2:
                        $(this).addClass("box_z_transition");
                        break;
                }
            });
        }
        /*
        $("#box").click(function () {
            $("#box1_1").addClass("box_x_transition");
        });
        $("#boxY").click(function () {
            $("#boxY").addClass("box_y_transition");
        });
        $("#boxZ").click(function () {
            $("#boxZ").addClass("box_z_transition");
        });
        $("#back").click(function () {

        })
        */
        /*$("#box").on("webkitTransitionEnd", function () {
            $("#box").removeClass("box_x_transition");
            $("#box").addClass("box_y_transition");
        })*/

        CallbackL(arguments);
    };

    Section2View.prototype.show = function (view) {
        //SuperClass show
        !view && (view = this);
        Section2View.superClass.show.call(this, view);
        //TODO
        console.log(name + "View show");
        //
        CallbackL(arguments);
    };
    
    Section2View.prototype.hide = function (view) {
        //SuperClass hide
        !view && (view = this);
        Section1View.superClass.hide.call(this, view);
        //TODO
        console.log(name + "View hide");
        //
        CallbackL(arguments);
    };
    

})();