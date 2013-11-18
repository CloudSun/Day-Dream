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

    //First View - LoginView
    //Controler.transfer(new LoginView());//跳过登陆界面
    Controler.transfer(new Section2View());

});
