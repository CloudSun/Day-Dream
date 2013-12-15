var Section2View;
var Section2ViewParam = {
    name: "Section2",
    type: ViewType.SECTION,
    load: "once",//refresh evertime load
    bgcolor: "rgba(100, 149, 237,0.6)",
    loaded: false,
    resize: new Array(),
    showtime:0,
};

(function () {
    Section2View = function() {
        var _this = this;
        //以父类的构造函数初始化
        Section2View.superClass.constructor.call(this, Section2ViewParam);
        //初始化
        var init = function() { Section2View.prototype.init(_this, _this) };
        //Load View
        LoadView(_this, init);
    };

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

        /*Init Html content*/
        var imageBoard = $('<div id="imageBoard"></div>');
        var imgList = [{
                title: "",
                src: "content/img/image1.jpg",
            }, {
                title: "",
                src: "content/img/image2.jpg",
            }, {
                title: "",
                src: "content/img/image3.jpg",
            }, {
                title: "",
                src: "content/img/image4.jpg",
            }];

        var dataTarget;

        for (var i = 0 ; i < imgList.length;i++) {
            var img = $('<img src="' + imgList[i].src + '" alt=' + imgList[i].title + '>');
            img.addClass("hidden");
            img.resize(function() {
                console.log("img resize");
            });
            imageBoard.append(img);
            if(i==0){
                dataTarget = img;
            }
        }

        var SectionContainer = view.target.find(".section-container");
        SectionContainer.html(imageBoard);

        var _arguments = arguments;

        dataTarget.load(function () {
            //加载完后
            view.loaded();
        });
        
        
    };
    Section2View.prototype.loaded = function (view) {
        !view && (view = this);

        if (!view.param.showtime) {
            //3D Cube初始化方法
            //在主内容显示之后初始化
            Resize.ImageRealCenter.onresize($($("#imageBoard").children("img")[0]));

            Resize.MapCube.onresize($("#imageBoard"));
            var imagesContainer = $("#Section2 .section-container");
            var imagesTarget = $($("#imageBoard").children("img")[0]);
            Rotate3DCube.Init(imagesContainer, imagesTarget);

        }

        view.addEvents();
        CallbackL(arguments);
    }

    Section2View.prototype.addEvents = function (view) {
        //SuperClass addEvents
        //在创建对象时进行事件绑定 需要传入初始化对象view
        !view && (view = this);
        Section2View.superClass.addEvents.call(this, view);
        //TODO
        console.log(view.name + "View addEvent");
        

        //view.show();

        CallbackL(arguments);
    };

    Section2View.prototype.show = function (view) {
        //SuperClass show
        !view && (view = this);
        Section2View.superClass.show.call(this, view);


        //TODO
        console.log(view.name + "View show");
        //
        //临时方法
        if (view.param.showtime && view.resize) {
            view.resize(view);
        }
        //resize and get the currentPosition
        
        
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
    
    Section2View.prototype.resize = function (view) {
        !view && (view = this);
        Section2View.superClass.resize.call(this, view);
        //TODO
        console.log(view.name + "View resize");

        
        Resize.MapCube.list.each(function (target, i) {
            Resize.MapCube.onresize(target, 0.5);
        });
        Resize.ImageRealCenter.list.each(function (target, i) {
            Resize.ImageRealCenter.onresize(target, 0.5);
        });
        Rotate3DCube.Init();
        //
        CallbackL(arguments);
    }
})();
