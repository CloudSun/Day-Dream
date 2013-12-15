"use strict"; //ECMAScript 严格模式
/*
 * window error
 */
(function () {
    window.onerror = function (msg, url, line) {
        //var ErrorMsg = "Error=" + msg + "</br>URL=" + url + "</br>LINE=" + line + "</br>" + $("#dataView").html();
        //DebugLog(ErrorMsg);
    };
}());

$().ready(function () {

   //f Resize.onResize();

    //First View - LoginView
    //Controler.transfer(new LoginView());//跳过登陆界面
    /*
    if (!getCookie("username")) {
        Controler.transfer(new LoginView());
    } else {
    */
    
    var screenHeight = window.outerHeight;
    var screenWidth = window.outerWidth;

        var sectionContainer = $("#SectionContainer");
        sectionContainer.css({
            "background-image":
                "-webkit-gradient(radial, 20% 0%," + screenHeight / 6 + ", 20% 0%, " + screenHeight / 2 + ", from(#fff),to(transparent))," +
                "-webkit-gradient(radial, 10% -50%," + screenHeight / 3 + ", 0% 0%, " + screenHeight + ", from(#fff),to(transparent))," +
                "-webkit-gradient(radial, 60% 50%," + 0 + ",60% 50%, " + screenHeight / 16 + ", from(rgba(255, 255, 255,0.4)),to(transparent))," +
                "-webkit-gradient(radial, 73% 65%," + 0 + ",73% 65%, " + screenHeight / 8 + ", from(rgba(255, 255, 255,0.4)),to(transparent))," +
                "-webkit-gradient(radial, 100% 100%," + 0 + ", 100% 100%, " + screenHeight / 4 + ", from(#fff), to(transparent))",
        });
        sectionContainer.removeClass("hidden");
        setTimeout(function () {
            $("#SectionContainer").css({
                "background-color": "rgba(0,0,0,0.9)",
            });
            $("#Baseline").css({
                "width":"100%",
            });
            setTimeout(function () {
                Controler.transfer(new Section2View());
            }, 500);
            
        }, 200);
    
        

    //}
});

