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

    Resize.onResize();

    //First View - LoginView
    //Controler.transfer(new LoginView());//跳过登陆界面
    if (!getCookie("username")) {
        Controler.transfer(new LoginView());
    } else {
        Controler.transfer(new Section1View());
        $("#SectionContainer").css({
            "background-color": "rgba(0,0,0,0.9)",
        });
    }
});

