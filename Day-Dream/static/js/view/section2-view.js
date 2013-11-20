var Section2View;
var Section2ViewParam = {
    name: "Section2",
    type: ViewType.SECTION,
    load: "refresh",//refresh evertime load
    loaded: false,
};
(function () { 
    Section2View = function () {
        var _this = this;
        //以父类的构造函数初始化
        Section2View.superClass.constructor.call(this, Section2ViewParam);
        //初始化
        var init = function () { Section2View.prototype.init(_this, _this) };
        //Load View
        LoadView(_this, init);
    }

    //Super Class
    extendViewClass(Section2View, View, Section2ViewParam);

    Section2View.prototype.init = function (view) {
        //SuperClass init
        //在创建对象时进行初始化 需要传入初始化对象view
        !view && (view = this);
        Section1View.superClass.init.call(this, view);

        //SectionMenu初始化及显示方法
        console.log(view.name + "View init");
        SectionMenu.FirstMenu_Init(view.name);

        CallbackL(arguments);
    };

    Section2View.prototype.addEvents = function (view) {
        //SuperClass addEvents
        //在创建对象时进行事件绑定 需要传入初始化对象view
        !view && (view = this);
        Section2View.superClass.addEvents.call(this, view);
        //TODO
        console.log(view.name + "View addEvent");

        /*
        $("#pane").click(function () {
            $("#pane1_1").addClass("pane-x-transition");
        });
        $("#paneY").click(function () {
            $("#paneY").addClass("pane-y-transition");
        });
        $("#paneZ").click(function () {
            $("#paneZ").addClass("pane-z-transition");
        });
        $("#back").click(function () {

        })
        */
        /*$("#pane").on("webkitTransitionEnd", function () {
            $("#pane").removeClass("pane-x-transition");
            $("#pane").addClass("pane-y-transition");
        })*/

        CallbackL(arguments);
    };

    Section2View.prototype.show = function (view) {
        //SuperClass show
        !view && (view = this);
        Section2View.superClass.show.call(this, view);
        //TODO
        console.log(view.name + "View show");
        //
        //3D Cube初始化方法
        //在主内容显示之后初始化
        //
        var sizeScale = Resize.MapCubeContainer($("#imageBoard"));
        var imagesContainer = $("#Section2 .section-container");
        var imagesTarget = $($("#imageBoard").children("img")[0]);
        Rotate3DCube.Init(imagesContainer, imagesTarget);
        //resize and get the currentPosition
        /*var targetImage = 0;
        if (images.length > 0) {
            targetImage = Resize.ImageActualCenter($(images[0]));
            targetImage.show();

            if (images.length > 1) {
                bindRotate3DCube(targetImage);
            }
        }*/
        
        CallbackL(arguments);
    };
    
    Section2View.prototype.hide = function (view) {
        //SuperClass hide
        !view && (view = this);
        Section1View.superClass.hide.call(this, view);
        //TODO
        console.log(view.name + "View hide");
        //
        CallbackL(arguments);
    };
    

})();
