//Resize 

var BaseSizeNumber = 2 * 3 * 5 * 7;//210
var GoldenScale = 0.618;//黄金比例

var cubeWidth = cubeHeight = 70;
var Resize = {
    square:70,
    SectionContainer: function (view) {
        //resize the section-container
        //width depend on FirstMenu
        !view && (view = Controler.currentView);
        !view && function () { return };
        var width = SectionMenu.baseWidth;
        var height = $(document).height() - parseInt($("#MainMenu").css("height"));
        //绝对 剧中
        var container = view.target.children(".section-container").css({
            "width": width+"px",
            "height": height + "px",
            "top":"0px",
            "left": "50%",
            "margin-left": -width / 2 + "px",
        })
        //console.log("SectionContainer Resize Done");
    },
    MapCubeContainer: function (container){
        var _this = this;
        var parent = container.parent();
        var parent_width = parent.width();
        var parent_height = parent.height();
        var scale_width = Math.floor(parent_width/_this.square);
        var scale_height = Math.floor(parent_height / _this.square);
        var container_width = scale_width*_this.square;
        var container_height = scale_height*_this.square;
        //css
        container.css({
            "width": container_width + "px",
            "height": container_height + "px",
            "position": "absolute",
            "top": "50%",
            "margin-top": container_height / 2 * -1 + "px",
            "left": "50%",
            "margin-left": container_width / 2 * -1 + "px",
        });

        //return size scale
        return {
            "scaleWidth": scale_width,
            "scaleHeight":scale_height
        }
    },
    //图片resize Type:显示实际尺寸，容器居中
    ImageActualCenter: function (img) {
        var _this = this;
        //loaded
        //img.load(function () {
        //after img loaded
        var parent = img.parent();
        var width = img.width();
        var height = img.height();
        var parent_height = parent.height();
        var parent_width = parent.width();

        img.css({
            "position": "absolute",
            "top": "50%",
            "margin-top": height / 2 * -1 + "px",
            "left": "50%",
            "margin-left": width / 2 * -1 + "px",
        });

        /*
        if (img.attr("class").indexOf("hidden") != -1) {
            img.removeClass("hidden");
        }
        */
        //})

        //return actural absolute: left & top
        var left = parent_width/2 - width/2;
        var top = parent_height/2 - height/2;
        img.currentPosition = {
            left: left,
            top: top,
        }

        return img;

    }
}
