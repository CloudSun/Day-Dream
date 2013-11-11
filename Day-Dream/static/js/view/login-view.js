var LoginView = function () {
    View.call(this, "Login",ViewType.FULL);
    this.prototype = new View();
    this.prototype.constructor = LoginView;
    //call parents init and addEvent function
    var parent = this.prototype;
    parent.init.call(parent, parent.addEvents);

    //DataInit
    this.init = function () {
        //TODO
        console.log("LoginView init");

        CallbackL(arguments);
    };

    //AddEvent
    this.addEvents = function () {
        console.log("LoginView addEvent");
        $("#LoginBtn").unbind("mouseover").mouseover(function () {
            $(this).css({ 'background-color': '#999', 'color': '#fff' });
        }).unbind("mousedown").mousedown(function () {
            $(this).css({ 'background-color': '#777' });
        }).unbind("mouseup").mouseup(function () {
            $(this).css({ 'background-color': '#999' });
        }).unbind("mouseout").mouseout(function () {
            $(this).css({ 'background-color': '#fff', 'color': '#999' });
        })

        $(".CircleZoom").unbind("mouseover").mouseover(function () {
            $(".CircleOut").addClass("circleEffect");
        }).unbind("mouseout").mouseout(function () {
            $(".CircleOut").removeClass("circleEffect");
        });

        /*
        $("#UserName").keydown(function (event) {
    
        var keychar = String.fromCharCode(event.keyCode);
        alert(keychar);
        });
        */

        $("#UserName").unbind("focusin").focusin(function () {
            $(this).css({ 'color': '#555' });
            if ($(this).attr('value').toString().toLowerCase().match("input your name")) {
                $(this).attr('value', '');
            }
        });

        $("#LoginBtn").unbind("click").click(function () {
            $("#BaselineCircle").css("right", "0px");
            setTimeout(function () {
                //基线延伸效果
                $("#BaselineCircle").animate({
                    width: "100%",
                    //opacity: 0.4,
                    //marginLeft: "0.6in",
                }, 500);
                // $("#BaselineCircle").addClass("baselineEffectIn");
                setTimeout(function () {
                    //$("#BaselineCircle").css("width", "100%");
                    //滚轮效果
                    $(".CircleOut").removeClass("circleEffect");
                    $(".CircleIn").hide();
                    $(".CircleZoom").addClass("rotateEffect")
                    $(".CircleOut").addClass("moveEffect");
                    setTimeout(function () {
                        $(".CircleZoom").hide();
                        $(".CircleOut").hide();
                        Controler.transfer(new Section1View())
                    }, 1500);

                }, 450);
            }, 300);
        });

        CallbackL(arguments);
    };

    //Show
    this.show = function () {
        this.prototype.show.call(this);   //调用父类中的show()方法
        //TODO
        console.log("LoginView show");
    };

    //Hide
    this.hide = function () {
        this.prototype.hide.call(this);   //调用父类中的hide()方法
        //TODO
        console.log("LoginView hide");

    };

    //func run
    this.init.call(this, this.addEvents);
}