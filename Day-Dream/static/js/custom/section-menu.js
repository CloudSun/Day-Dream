



    var Flag_FMdownStatus = 0;
    var FirstMenuULNum = 0;
    var BaselineCircleNum = 0;



    function FirstMenu_MoveOut(){
        Flag_FMdownStatus = 0;
        $(".fm-container-hover").clearQueue();
        $("#FMViewZoom").clearQueue();
         $(".fm-container-hover").css({
            top:'0px'
        }); 
        $("#FMViewZoom").animate({
            top:"-55px"
        },400);
        //移动Hover
        $(".fm-container-hover").animate({
            top:'55px'
        },400); 
    }

    $("#FirstMenuUL").mouseout(function(){
        FirstMenu_MoveOut();
        //$("#showText").html("FirstMenuULNum="+FirstMenuULNum+++"BaselineCircleNum"+BaselineCircleNum);
    });
    //主菜单FirstMenu 滑动背景 hover效果
    $('.first-class-li').mouseover(function(){
        var _this = this;
        //adjust FMViewZoom position
        event.stopPropagation();
        $(".fm-container-hover").clearQueue();
        $("#FMViewZoom").clearQueue();

        if(Flag_FMdownStatus){            
            //左右移入效果
            var menuId=$(_this).attr("menu");
            var zoomLeft = $(_this).css("left");
            //移动Zoom
            $("#FMViewZoom").animate({
                "left":zoomLeft
            },300);
            //移动Hover
            var hoverLeft = (parseInt(menuId)-1)*150*-1;
            $(".fm-container-hover").animate({
                left:hoverLeft+'px'
            },300);    
            Flag_FMdownStatus = menuId;
        }else{
            //调整 ViewZoom的垂直位置
            var zoomLeft = $(_this).css("left");
            $("#FMViewZoom").css({
                "top":"-55px",
                "left":zoomLeft
                });
            //上移入效果
            var menuId=$(_this).attr("menu");
            var hoverLeft = (parseInt(menuId)-1)*150*-1;
            //调整hover块
            $(".fm-container-hover").css({
                top:'55px',
                left:hoverLeft+'px'
            });
            //Zoom下移
            $("#FMViewZoom").animate({
                top:"0px"
            },400);
            //Hover上移
            $(".fm-container-hover").animate({
                top:'0px'
            },400);
            Flag_FMdownStatus = menuId;
        }
    }).mouseout(function(){
        event.stopPropagation();
    });

    
    $("#BaselineCircle").mouseover(function(){
        Flag_FMdownStatus = 0;
        FirstMenu_MoveOut();
        //$("#showText").html("FirstMenuULNum="+FirstMenuULNum+"BaselineCircleNum"+BaselineCircleNum++);
    });

    $('.first-class-li-hover').mouseout(function(){
        event.stopPropagation();
    }).mouseover(function(){
        event.stopPropagation();
    });


    //SecondMenu 菜单mouseover效果
    $(".second-class-li").mouseover(function(){
        //clear thr ForthMenu
        $("#ForthMenuUl").html("");
        //$(".sm-arrow-container").css("display","none");
        $(".second-class-li").removeClass("SecondClassLi_hover");
        $(".SMArrowRight_hover").removeClass("SMArrowRight_hover");
        $(this).addClass("SecondClassLi_hover");
        //$(this).children(".sm-arrow-container").css("display","block");
        $(this).children(".sm-arrow-container").children(".sm-arrow-right").addClass("SMArrowRight_hover");
        //ThirdMenuInit
        var index = parseInt($(this).attr("smenu"));
        $("#ThirdMenuUl").html("");
        for(var i = 0;i<THIRDMENU[(index-1)].length;i++){
            var li = $("<li></li>");
            li.addClass("ThirdClassLi");
            li.attr("tmenu",(i+1));
            var arrow = "<div class='TMArrowContainerR'>"+
                            "<div class='TMArrowRight'></div>"+
                        "</div>"+
                        "<div class='TMArrowContainerL'>"+
                            "<div class='TMArrowLeft'></div>"+
                        "</div>";
            li.append(THIRDMENU[(index-1)][i].toString());
            li.append(arrow);
            $("#ThirdMenuUl").append(li);
        }
        //ThirdMenu 菜单mouseover效果
        $("#ThirdMenuUl > .ThirdClassLi").mouseover(function(){
            $("#ThirdMenuUl").children(".ThirdClassLi").removeClass("ThirdClassLi_hover");
            $("#ThirdMenuUl .TMArrowRight").removeClass("TMArrowRight_hover");
            $("#ThirdMenuUl .TMArrowLeft").removeClass("TMArrowLeft_hover");
            $(this).children(".TMArrowContainerR").children(".TMArrowRight").addClass("TMArrowRight_hover");
            $(this).children(".TMArrowContainerL").children(".TMArrowLeft").addClass("TMArrowLeft_hover");
            $(this).addClass("ThirdClassLi_hover");
            //ForthMenuInit
            var indexT = parseInt($(this).attr("tmenu"));
            $("#ForthMenuUl").html("");
            for(var i = 0;i<FORTHMENU[(indexT-1)].length;i++){
                var li = $("<li></li>");
                li.addClass("ThirdClassLi");
                li.attr("fmenu",(i+1));
                var arrow = "<div class='TMArrowContainerR'>"+
                                "<div class='TMArrowRight'></div>"+
                            "</div>"+
                            "<div class='TMArrowContainerL'>"+
                                "<div class='TMArrowLeft'></div>"+
                            "</div>";
                li.append(FORTHMENU[(indexT-1)][i].toString());
                li.append(arrow);
                $("#ForthMenuUl").append(li);
            }
            var forthLength = FORTHMENU[(indexT-1)].length
            var secondLength = $(".second-class-li").length;
            var top = 0//(index-1)*53+26;
            //indexT = indexT+;//important 计算相对偏移
            if((index+thirdLength)>=secondLength){
                //相对位移的相对位移
                indexT = (secondLength-thirdLength+indexT)
            }else{
                indexT = index+indexT;
            }
            if((indexT+forthLength)>secondLength){
                top = ((indexT)-((indexT+forthLength)-secondLength))*53;
            }else{
                top = (indexT-1)*53;
            }
        
            $("#ForthMenuUl").css({
                "display":"block",
                "top":top+"px"
            });

            $("#ForthMenuUl > .ThirdClassLi").mouseover(function(){
                $("#ForthMenuUl").children(".ThirdClassLi").removeClass("ThirdClassLi_hover");
                $("#ForthMenuUl .TMArrowRight").removeClass("TMArrowRight_hover");
                $("#ForthMenuUl .TMArrowLeft").removeClass("TMArrowLeft_hover");
                $(this).children(".TMArrowContainerR").children(".TMArrowRight").addClass("TMArrowRight_hover");
                $(this).children(".TMArrowContainerL").children(".TMArrowLeft").addClass("TMArrowLeft_hover");
                $(this).addClass("ThirdClassLi_hover");
            });

        });

        var thirdLength = THIRDMENU[(index-1)].length
        var secondLength = $(".second-class-li").length;
        var top = 0//(index-1)*53+26;
        if((index+thirdLength)>secondLength){
            top = ((index-1)-((index+thirdLength)-secondLength))*53+26;
        }else{
            top = (index-1)*53+26;
        }
        
        $("#ThirdMenuUl").css({
            "display":"block",
            "top":top+"px"
        });


    });

    //FirstMenu 点击效果:not([class~="menuSelected"])
    $('.first-class-li-hover').click(function(){
        //hidden secondMenu 
        ShowEffect.MenuSelectedClick.prototype.SecondMenuHidden();

        var index = parseInt($(this).attr("menu"));
        $(".menuSelected").removeClass("menuSelected");
        $($(".first-class-li")[(index-1)]).addClass("menuSelected");
        for(var i=0;i<$(".first-class-li").length;i++){
            var left = 0;
            if( i+1 >index){
                left = i * 150+15;
            }else{
                left = i*150;
            }
            $($(".first-class-li")[i]).css({"left": left + "px"});
        }
        //ShowEffect.MenuSelectedMouseover_out();
        //移动箭头
        //ShowEffect.FirstArrowEffect();
        //
        $("#FMArrowContainer").addClass("hidden");
        ShowEffect.MenuSelectedClick();
    });


    var ShowEffect = {
        FirstClassMenuInit: function (i) {
            //FirstClassMenu初始化效果
            i != 0 && !i ? i = 0 : i++;
            var left = i * 150;
            i != 0 ? left += 15 : false;
            $($(".first-class-li")[i]).css({ "left": left + "px" });
            setTimeout(function () {
                $($(".first-class-li")[i]).animate({
                    top: "0px",
                }, 400);
                if ($($(".first-class-li")[i]).attr("class").toString().match('menuSelected')) {
                    ShowEffect.FirstArrowEffect();
                }
            }, (0.2 + 0.15 * i) * 1000);
            /* 
                一次性没有循环效果的动态效果还是不考虑用css3的animation来做了
            */
            if ((i + 1) < $(".first-class-li").length) {
                ShowEffect.FirstClassMenuInit(i);
            } else {
                setTimeout(function () {
                    ShowEffect.FirstArrowEffect();
                }, 1000);
            }
        },
        FirstArrowEffect: function () {
            $("#FMArrowContainer").removeClass("hidden");
            //$("#FMArrowContainer").css("display", "block");
            var left = parseFloat($(".first-class-li.menuSelected").css("left")) + parseFloat($(".first-class-li.menuSelected").css("width")) / 2 - parseFloat($("#FMArrowContainer").css("width")) / 2;
            $("#FMArrowContainer").css("left", left + "px");
        },
        MenuSelectedClick: function () {
            ShowEffect.MenuSelectedClick.prototype = {
                SecondMenuShow: function (targetId) {
                    //show Arrow
                    $("#SecondMenu").removeClass("hidden");
                    $(".sm-arrow-container").css("display", "block");

                    !targetId && targetId != 0 ? targetId = $(".second-class-li").length - 1 : false;
                    var target = $(".second-class-li")[targetId];
                    $(target).animate({
                        "height": "50px",
                        "margin-bottom": "3px",
                    }, 280);
                    if (targetId-- >= 1) {
                        setTimeout(function () {
                            ShowEffect.MenuSelectedClick.prototype.SecondMenuShow(targetId);
                        }, 20);
                    }
                },
                SecondMenuHidden: function (targetId) {
                    //hide Arrow
                    $("#SecondMenu").addClass("hidden");
                    $(".sm-arrow-container").css("display", "none");

                    !targetId && targetId != 0 ? targetId = 0 : false;
                    var target = $(".second-class-li")[targetId];
                    $(target).animate({
                        "height": "0px",
                        "margin-bottom": "0px"
                    }, 280);
                    //$(target).addClass("hidden");
                    if (targetId++ < $(".second-class-li").length) {
                        setTimeout(function () {
                            ShowEffect.MenuSelectedClick.prototype.SecondMenuHidden(targetId)
                        }, 20);
                    }
                }
            }

            //主菜单FirstMenu menuSelected点击效果
            $(".menuSelected[menu='1']").toggle(function () {
                $("#FMArrowContainer").children(".FirstMenuArrowUp").addClass("FirstMenuArrowDown").removeClass("FirstMenuArrowUp");
                $("#FMArrowContainer").removeClass("FirstMenuArrowUp_Effect");
                $("#FMArrowContainer").addClass("FirstMenuArrowDown_Effect").css("height", "25px");
                $("#BaselineMainContainer").css("overflow", "hidden");
                //Clear ThirdMenuUL
                $("#ThirdMenuUl").html("");
                if ($(this).attr("type") == "honeycomb") {
                    ShowEffect.MenuSelectedClick.prototype.SecondMenuShow();
                }
            }, function () {
                $("#FMArrowContainer").children(".FirstMenuArrowDown").addClass("FirstMenuArrowUp").removeClass("FirstMenuArrowDown");
                $("#FMArrowContainer").removeClass("FirstMenuArrowDown_Effect");
                $("#FMArrowContainer").addClass("FirstMenuArrowUp_Effect").css("height", "15px")
                $("#BaselineMainContainer").css("overflow", "visible");
                //Clear ThirdMenuUL
                $("#ThirdMenuUl").html("");
                if ($(this).attr("type") == "honeycomb") {
                    ShowEffect.MenuSelectedClick.prototype.SecondMenuHidden();
                }
            });
        },
        MenuSelectedMouseover_out: function () {
            $(".menuSelected").mouseover(function () {
                if ($(".second-class-li").css("height").toString() == "0px") {
                    $("#FMArrowContainer").addClass("FirstMenuArrowUp_Effect").css("height", "15px");
                    $("#BaselineMainContainer").css("overflow", "visible");
                } else {
                    $("#FMArrowContainer").addClass("FirstMenuArrowDown_Effect").css("height", "25px");
                    $("#BaselineMainContainer").css("overflow", "hidden");
                }
            }).mouseout(function () {
                $("#FMArrowContainer").removeClass("FirstMenuArrowUp_Effect");
                $("#FMArrowContainer").removeClass("FirstMenuArrowDown_Effect");
                if ($(".second-class-li").css("height").toString() == "0px") {
                    $("#FMArrowContainer").css("height", "15px");
                    $("#BaselineMainContainer").css("overflow", "visible");
                } else {
                    $("#FMArrowContainer").css("height", "25px");
                    $("#BaselineMainContainer").css("overflow", "hidden");
                }

            });
        }
    }

    var THIRDMENU = [
        ["S1_Third1", "S1_Third2", "S1_Third3", "S1_Third4", "S1_Third5"],
        ["S2_Third1", "S2_Third2", "S2_Third3", "S2_Third4", "S2_Third5", "S2_Third6", "S2_Third7", "S2_Third8"],
        ["S3_Third1", "S3_Third2", "S3_Third3", "S3_Third4", "S3_Third5", "S3_Third6"],
        ["S4_Third1", "S4_Third2"],
        ["S5_Third1", "S5_Third2", "S5_Third3"],
        ["S6_Third1", "S6_Third2", "S6_Third3", "S6_Third4", "S6_Third5", "S6_Third6"],
        ["S7_Third1", "S7_Third2"],
        ["S8_Third1", "S8_Third2", "S8_Third3"]
    ];

    var FORTHMENU = [
        ["T1_Forth1", "T1_Forth2", "T1_Forth3", "T1_Forth4", "T1_Forth5"],
        ["T2_Forth1", "T2_Forth2", "T2_Forth3", "T2_Forth4", "T2_Forth5", "T2_Forth6", "T2_Forth7", "T2_Forth8"],
        ["T3_Forth1", "T3_Forth2"],
        ["T4_Forth1", "T4_Forth2", "T4_Forth3", "T4_Forth4", "T4_Forth5", "T4_Forth6"],
        ["T5_Forth1", "T5_Forth2", "T5_Forth3"],
        ["T6_Forth1", "T6_Forth2", "T6_Forth3", "T6_Forth4", "T6_Forth5", "T6_Forth6"],
        ["T7_Forth1", "T7_Forth2", "T7_Forth3", "T7_Forth4"],
        ["T8_Forth1", "T8_Forth2", "T8_Forth3"]
    ];


    //主菜单 高亮menu的点击效果
    ShowEffect.MenuSelectedClick();
    //主菜单FirstMenu menuSelected MouseOver效果
    ShowEffect.MenuSelectedMouseover_out();