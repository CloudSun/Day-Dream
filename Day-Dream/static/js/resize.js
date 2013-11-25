//Resize 

var BaseSizeNumber = 2 * 3 * 5 * 7;//210
var GoldenScale = 0.618;//黄金比例

//var cubeWidth = cubeHeight = 70;
var Resize = {
    square: 70,
    Section:{
        onresize:function(target,smooth){
            //resize the section-container
            //width depend on FirstMenu
            !target && (target = Controler.currentView.target.children(".section-container"));
            !target && function () { return };
            var width = SectionMenu.baseWidth;
            var height = $(document).height() - parseInt($("#MainMenu").css("height"));
            (!smooth && smooth != 0) && (smooth = 0);
            //绝对 剧中
            target.css({
                "width": width+"px",
                "height": height + "px",
                "top":"0px",
                "left": "50%",
                "margin-left": -width / 2 + "px",
                "-webkit-transition-duration":smooth+"s",
            })

            //add to list
            if (!this.list.containsDom(target)) {
                this.list.push(target);
            }
            
        },
        list:new Array(),
    },
    MapCube:{
        onresize: function (target,smooth) {
            var parent = target.parent();
            var parent_width = parent.width();
            var parent_height = parent.height();
            var scale_width = Math.floor(parent_width / Resize.square);
            var scale_height = Math.floor(parent_height / Resize.square);
            var target_width = scale_width * Resize.square;
            var target_height = scale_height * Resize.square;
            //css
            (!smooth && smooth != 0) && (smooth = 0);
            target.css({
                "width": target_width + "px",
                "height": target_height + "px",
                "position": "absolute",
                "top": "50%",
                "margin-top": target_height / 2 * -1 + "px",
                "left": "50%",
                "margin-left": target_width / 2 * -1 + "px",
                "-webkit-transition-duration": smooth + "s",
            });

            //return size scale
            return {
                "scaleWidth": scale_width,
                "scaleHeight": scale_height
            }

            if (!this.list.containsDom(target)) {
                this.list.push(target);
            }
        },
        list:new Array(),
    },
    //图片resize Type:显示实际尺寸，容器居中
    ImageRealCenter: {
        onresize: function (img,smooth) {
            //loaded
            //img.load(function () {
            //after img loaded
            var parent = img.parent();
            var width = img.width();
            var height = img.height();
            var parent_height = parent.height();
            var parent_width = parent.width();
            (!smooth && smooth != 0) && (smooth = 0);
            img.css({
                "position": "absolute",
                "top": "50%",
                "margin-top": height / 2 * -1 + "px",
                "left": "50%",
                "margin-left": width / 2 * -1 + "px",
                "-webkit-transition-duration": smooth + "s",
            });

            //return actural absolute: left & top
            var left = parent_width / 2 - width / 2;
            var top = parent_height / 2 - height / 2;
            img.currentPosition = {
                left: left,
                top: top,
            }
            if (!this.list.containsDom(img)) {
                this.list.push(img);
            }
            return img;
        },
        list: new Array(),
    },
    onResize: function () {

    }
    
}


//bind window resize event
var resizetime
$(window).resize(function () {
    //
    if(!resizetime){
        resizetime = setTimeout(function () {
            console.log("=> fire windows resize");
            clearTimeout(resizetime);
            resizetime = null;
        },1000)
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