//Resize 

var BaseSizeNumber = 2 * 3 * 5 * 7;//210
var GoldenScale = 0.618;//黄金比例

//var cubeWidth = cubeHeight = 70;
var Resize = {
    square: 70,
    Section: {
        onresize: function(target, smooth) {
            //resize the section-container
            //width depend on FirstMenu
            !target && (target = Controler.currentView.target.children(".section-container"));
            !target && function() { return false; };
            var width = SectionMenu.baseWidth();
            var height = $(document).height() - parseInt($("#MainMenu").css("height"));
            (!smooth && smooth != 0) && (smooth = 0);
            //绝对 剧中
            target.css({
                "width": width + "px",
                "height": height + "px",
                "top": "0px",
                "left": "50%",
                "margin-left": -width / 2 + "px",
                "-webkit-transition-duration": smooth + "s",
            });
            //resize element
            target.attr("resize-width", width).attr("resize-height", height);

            //add to list
            if (!this.list.containsDom(target)) {
                this.list.push(target);
            }

            CallbackL(arguments);
        },
        list: new Array(),
    },
    MapCube: {
        onresize: function(target, smooth) {
            var parent = target.parent();
            var parentWidth;
            var resizeWidth = parent.attr("resize-width");
            if(resizeWidth){
                parentWidth = resizeWidth;
            }else{
                parentWidth = parent.width();
            }
            var resizeHeight = parent.attr("reisze-height");
            if (resizeHeight) {
                parentHeight = resizeHeight;
            } else {
                parentHeight = parent.height();
            }
            var scaleWidth = Math.floor(parentWidth / Resize.square);
            var scaleHeight = Math.floor(parentHeight / Resize.square);
            var targetWidth = scaleWidth * Resize.square;
            var targetHeight = scaleHeight * Resize.square;
            //css
            (!smooth && smooth != 0) && (smooth = 0);
            target.css({
                "width": targetWidth + "px",
                "height": targetHeight + "px",
                "position": "absolute",
                "top": "50%",
                "margin-top": targetHeight / 2 * -1 + "px",
                "left": "50%",
                "margin-left": targetWidth / 2 * -1 + "px",
                "-webkit-transition-duration": smooth + "s",
            });

            target.attr("resize-width", targetWidth).attr("resize-height", targetHeight);

            if (!this.list.containsDom(target)) {
                this.list.push(target);
            }

            CallbackL(arguments);
            //return size scale
            return {
                "scaleWidth": scaleWidth,
                "scaleHeight": scaleHeight
            }
        },
        list: new Array(),
    },
    //图片resize Type:显示实际尺寸，容器居中
    ImageRealCenter: {
        onresize: function(img, smooth) {
            //loaded
            //img.load(function () {
            //after img loaded
            var width = img.width();
            var height = img.height();
            var parent = img.parent();
            var resizeWidth = parent.attr("resize-width");
            var parentWidth = parent.width();
            if (resizeWidth) {
                parentWidth = resizeWidth;
            }
            var resizeHeight = parent.attr("resize-height")
            var parentHeight = parent.height();
            if (resizeHeight) {
                parentHeight = resizeHeight;
            }
            (!smooth && smooth != 0) && (smooth = 0);
            img.css({
                "position": "absolute",
                "top": "50%",
                "margin-top": height / 2 * -1 + "px",
                "left": "50%",
                "margin-left": width / 2 * -1 + "px",
                "-webkit-transition-duration": smooth + "s",
            });
            img.attr("resize-width", width).attr("resize-height", height);
            //return actural absolute: left & top
            var left = parentWidth / 2 - width / 2;
            var top = parentHeight / 2 - height / 2;
            img.currentPosition = {
                left: left,
                top: top,
            }
            if (!this.list.containsDom(img)) {
                this.list.push(img);
            }

            CallbackL(arguments);
            return img;
        },
        list: new Array(),
    },
    onResize: function() {
        var _this = this;
        var screenHeight = $(document).height();
        var screenWidth = $(document).width();

        //resize SectionContainer background
        var sectionContainer = $("#SectionContainer");
        sectionContainer.css({
            "background-image":"-webkit-gradient(radial, 10% -50%,"+screenWidth/2+", 0% 0%, "+screenWidth+", from(#fff),to(transparent))"+
                ",-webkit-gradient(radial, 100% 100%,"+screenHeight/2+", 100% 100%, "+screenHeight+", from(#fff), to(transparent))",
        });

        Resize.Section.list.each(function(target, i) {
            Resize.Section.onresize(target, 0.5);
        });
        Resize.MapCube.list.each(function(target, i) {
            Resize.MapCube.onresize(target, 0.5);
        });
        Resize.ImageRealCenter.list.each(function(target, i) {
            Resize.ImageRealCenter.onresize(target, 0.5);
        });
    }    
};


//bind window resize event
var resizetime;
$(window).resize(function () {
    //
    if(!resizetime) {
        resizetime = setTimeout(function() {
            console.log("=> fire windows resize");
            clearTimeout(resizetime);
            resizetime = null;

            SectionMenu.onresize(function() {
                Resize.onResize();
            });

        }, 1000);
    }
});









//tools functions
Array.prototype.containsDom = function (a) {
    ///<summary>
    ///Check if element contains in the array
    ///</summary>
    ///<param name="a" type="Object">One element object to be checked</param>
    try {
        for (var i in this) {
            if (this[i][0]) {
                if (this[i][0] == a[0])
                    return true;
            } else {
                return false;
            }
        }
        return false;
    } catch (e) { return false; }
};