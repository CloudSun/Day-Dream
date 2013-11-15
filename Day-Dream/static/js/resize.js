//Resize 

var BaseSizeNumber = 2 * 3 * 5 * 7;//210
var GoldenScale = 0.618;//黄金比例

var Resize = {
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
    },

}