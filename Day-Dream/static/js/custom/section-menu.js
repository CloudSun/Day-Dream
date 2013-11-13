    var Flag_FMdownStatus = 0;
    var FirstMenuULNum = 0;
    var BaselineCircleNum = 0;


var SectionMenu = {
    FIRSTMENU: [
        {
            title: "Section1", type: "honeycomb",
            SecondMenu: [
                {
                    title: "Second 1",
                    ThirdMenu: [
                        {
                            title:"Third 1",
                        },
                        {
                            title: "Third 2",
                        },
                        {
                            title: "Third 3",
                        }
                    ],
                },
                {
                    title: "Second 2",
                    ThirdMenu: [
                        {
                            title: "Third 1",
                        },
                        {
                            title: "Third 2",
                        },
                        {
                            title: "Third 3",
                        }
                    ],
                },
                {
                    title: "Second 3",
                    ThirdMenu: [
                        {
                            title: "Third 1",
                        },
                        {
                            title: "Third 2",
                        },
                        {
                            title: "Third 3",
                        },
                        {
                            title: "Third 4",
                        },
                        {
                            title: "Third 5",
                        },
                        {
                            title: "Third 6",
                        }
                    ],
                },
                {
                    title: "Second 4",
                    ThirdMenu: [
                        {
                            title: "Third 1",
                        },
                        {
                            title: "Third 2",
                        },
                        {
                            title: "Third 3",
                        }
                    ],
                },
                {
                    title: "Second 5",
                },
                {
                    title: "Second 6",
                },
                {
                    title: "Second 7",
                },
                {
                    title: "Second 8",
                }
            ]
        },
        { title: "Section2", type: "one" },
        { title: "Section3", type: "one" },
        { title: "Section4", type: "one" },
        { title: "Section5", type: "one" },
        { title: "Section6", type: "one" },
    ],
    FM_size: {
        width:0,
        height:0,
    },
    SM_size:{
        width: 0,
        height:0,
    },
    TH_size:{
        width:0,
        height:0,
    },
    THIRDMENU: [
        ["S1_Third1", "S1_Third2", "S1_Third3", "S1_Third4", "S1_Third5"],
        ["S2_Third1", "S2_Third2", "S2_Third3", "S2_Third4", "S2_Third5", "S2_Third6", "S2_Third7", "S2_Third8"],
        ["S3_Third1", "S3_Third2", "S3_Third3", "S3_Third4", "S3_Third5", "S3_Third6"],
        ["S4_Third1", "S4_Third2"],
        ["S5_Third1", "S5_Third2", "S5_Third3"],
        ["S6_Third1", "S6_Third2", "S6_Third3", "S6_Third4", "S6_Third5", "S6_Third6"],
        ["S7_Third1", "S7_Third2"],
        ["S8_Third1", "S8_Third2", "S8_Third3"]
        ],
    FORTHMENU : [
        ["T1_Forth1", "T1_Forth2", "T1_Forth3", "T1_Forth4", "T1_Forth5"],
        ["T2_Forth1", "T2_Forth2", "T2_Forth3", "T2_Forth4", "T2_Forth5", "T2_Forth6", "T2_Forth7", "T2_Forth8"],
        ["T3_Forth1", "T3_Forth2"],
        ["T4_Forth1", "T4_Forth2", "T4_Forth3", "T4_Forth4", "T4_Forth5", "T4_Forth6"],
        ["T5_Forth1", "T5_Forth2", "T5_Forth3"],
        ["T6_Forth1", "T6_Forth2", "T6_Forth3", "T6_Forth4", "T6_Forth5", "T6_Forth6"],
        ["T7_Forth1", "T7_Forth2", "T7_Forth3", "T7_Forth4"],
        ["T8_Forth1", "T8_Forth2", "T8_Forth3"]
    ],
    FirstMenu_Init: function () {
        //上横线
        $("#BaselineCircle").css("width", "100%");
        //Init Size
        var firstMenuUl = $('#FirstMenuUL');
        var firstMenuUl_width = BaseSizeNumber * 5;
        var firstMenuUl_height = 70;
        var firstMenuLength = this.FIRSTMENU.length;
        firstMenuUl.css({ "width": firstMenuUl_width, "height": firstMenuUl_height, "margin":"0 auto" });
        //Init First Menu node
        this.FM_size.width = firstMenuUl_width / firstMenuLength;
        this.FM_size.height = firstMenuUl_height * GoldenScale;
        //
        $("#BaselineMainContainer").css({ "width": firstMenuUl_width + "px" });

        for (var i = 0; i < firstMenuLength; i++) {
            var f = this.FIRSTMENU[i];
            var firstli = $('<li></li>');// class="first-class-li" menu="1" type="honeycomb"
            firstli.addClass("first-class-li");
            firstli.css({
                "width": this.FM_size.width  + "px",
                "height": this.FM_size.height + "px",
                "line-height": this.FM_size.height + "px",
            })
            firstli.attr("menu", i);
            firstli.attr("type", f.type);
            firstli.html(f.title);
            firstMenuUl.append(firstli);
        }
        // #FMViewZoom
        var firstViewZoom = $('<div id="FMViewZoom"></div>');
        firstViewZoom.css({
            "width": this.FM_size.width + "px",
            "height": this.FM_size.height + "px",
            "top": -this.FM_size.height + "px",
        });
        var fmHoverContainer = $('<ul class="fm-container-hover"></ul>');
        fmHoverContainer.css({
            "width": firstMenuUl_width + "px",
            "height": this.FM_size.height+"px",
        });
        
        for (var i = 0; i < firstMenuLength; i++) {
            var f = this.FIRSTMENU[i];
            var firsthoverli = $('<li></li>');// class="first-class-li" menu="1" type="honeycomb"
            firsthoverli.addClass("first-class-li-hover");
            firsthoverli.css({
                "width": this.FM_size.width + "px",
                "height": this.FM_size.height + "px",
                "line-height": this.FM_size.height + "px",
            })
            firsthoverli.attr("menu", i);
            firsthoverli.attr("type", f.type);
            firsthoverli.html(f.title);
            fmHoverContainer.append(firsthoverli);
        }
        firstViewZoom.append(fmHoverContainer);
        firstMenuUl.append(firstViewZoom);
        
        //Init First Menu Hover node

        //TODO CSS3
        firstMenuShow();

        //Add Events
        this.AddFMEvents();

        function firstMenuShow(i) {
            //FirstClassMenu初始化效果
            i != 0 && !i ? i = 0 : i++;
            var left = i * 150;
            i != 0 ? left += 15 : false;
            //$($(".first-class-li")[i]).css({ "left": left + "px" });
            setTimeout(function () {
                $($(".first-class-li")[i]).animate({
                   'margin-top': "0px",
                }, 400);
                if ($($(".first-class-li")[i]).attr("class").toString().match('menuSelected')) {
                    SectionMenu.FirstArrowEffect();
                }
            }, (0.2 + 0.15 * i) * 1000);
            if ((i + 1) < $(".first-class-li").length) {
                firstMenuShow(i);
            }
        }
    },
    FirstArrowEffect: function () {
        $("#FMArrowContainer").removeClass("hidden");
        var left = parseFloat($(".first-class-li.menuSelected").css("left")) + parseFloat($(".first-class-li.menuSelected").css("width")) / 2 - parseFloat($("#FMArrowContainer").css("width")) / 2;
        $("#FMArrowContainer").css("left", left + "px");
    },
    FirstMenu_MoveOut:function(){
        Flag_FMdownStatus = false;
            $(".fm-container-hover").clearQueue();
            $("#FMViewZoom").clearQueue();
            $(".fm-container-hover").css({
                top: '0px'
            });
            $("#FMViewZoom").animate({
                top: - this.FM_size.height + "px",
            }, 400);
            //移动Hover
            $(".fm-container-hover").animate({
                top: this.FM_size.height + "px",
            }, 400);
        },
        FirstMenuSelectedClick: function () {
            //主菜单FirstMenu menuSelected点击效果changeFM.addClass("menuSelected");
            var _this = this;
            $(".menuSelected[type='honeycomb']").unbind("click").click(function () {
                var arrow = $("#FMArrowContainer").children();
                var className = arrow.attr("class");
                var FirstArrowDown = "FirstMenuArrowDown";
                var FirstArrowUp = "FirstMenuArrowUp";
                if (className == FirstArrowDown) {
                    //下箭头状态
                    arrow.removeClass(FirstArrowDown).addClass(FirstArrowUp);
                    _this.SecondMenuHidden();
                } else {
                    //上箭头状态
                    arrow.removeClass(FirstArrowUp).addClass(FirstArrowDown);
                    _this.SecondMenuShow();
                }
                //$("#FMArrowContainer").removeClass("FirstMenuArrowUp_Effect");
                //$("#FMArrowContainer").addClass("FirstMenuArrowDown_Effect").css("height", "25px");
                //$("#BaselineMainContainer").css("overflow", "hidden");
                //Clear ThirdMenuUL
                if ($(this).attr("type") == "honeycomb") {
                    
                }
            });

            /*$(".menuSelected[type='honeycomb']").mouseover(function () {
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
            */

        },
        SecondMenuInit:function(){
            //!index && (index = 0);
            var secondMenu = $("#SecondMenu");
            var mapFM = $(".first-class-li.menuSelected");
            secondMenu.css({
                left: (document.width - parseInt($("#FirstMenuUL").css("width")))/2 + $("#FirstMenuUL").position().left + "px",
                bottom: parseInt($("#MainMenu").css("height"))+parseInt($("#Baseline").css("height"))+"px",
            });

            secondMenu.removeClass("hidden");
        },
        SecondMenuShow: function (targetId) {
            var _this = this;

            _this.SecondMenuInit();
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
                    _this.SecondMenuShow(targetId);
                }, 20);
            }
        },
        SecondMenuHidden: function (targetId) {
            var _this = this;
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
                    _this.SecondMenuHidden(targetId)
                }, 20);
            }
        },
        AddFMEvents: function () {
            var _this = this;
            $("#FirstMenuUL").unbind("mouseout").mouseout(function () {
                _this.FirstMenu_MoveOut();
            });
            //主菜单FirstMenu 滑动背景 hover效果
            $('.first-class-li').unbind("mouseover").mouseover(function () {
                var _thisli = this;
                //adjust FMViewZoom position
                event.stopPropagation();
                $(".fm-container-hover").clearQueue();
                $("#FMViewZoom").clearQueue();

                if (Flag_FMdownStatus) {
                    //左右移入效果
                    var position = $(_thisli).position();
                    //移动Zoom
                    $("#FMViewZoom").animate({
                        "left": position.left+"px",
                    }, 300);
                    //移动Hover
                    //var hoverLeft = (parseInt(menuId) - 1) * 150 * -1;
                    $(".fm-container-hover").animate({
                        left: -position.left + 'px'
                    }, 300);
                    Flag_FMdownStatus = true;
                } else {
                    //调整 ViewZoom的垂直位置
                    var position = $(_thisli).position();
                    $("#FMViewZoom").css({
                        "top": -_this.FM_size.height+"px",
                        "left": position.left+"px",
                    });
                    //上移入效果
                    //调整hover块
                    $(".fm-container-hover").css({
                        top: _this.FM_size.height+"px",
                        left: -position.left + 'px'
                    });
                    //Zoom下移
                    $("#FMViewZoom").animate({
                        top: "0px"
                    }, 400);
                    //Hover上移
                    $(".fm-container-hover").animate({
                        top: '0px'
                    }, 400);
                    Flag_FMdownStatus = true;
                }
            }).unbind("mouseout").mouseout(function () {
                event.stopPropagation();
            });


            $("#Baseline").unbind("mouseover").mouseover(function () {
                Flag_FMdownStatus = false;
                _this.FirstMenu_MoveOut();
                //$("#showText").html("FirstMenuULNum="+FirstMenuULNum+"BaselineCircleNum"+BaselineCircleNum++);
            });

            $('.first-class-li-hover').unbind("mouseout").mouseout(function () {
                event.stopPropagation();
            }).unbind("mouseover").mouseover(function () {
                event.stopPropagation();
            });


            //SecondMenu 菜单mouseover效果
            $(".second-class-li").unbind("mouseover").mouseover(function () {
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
                for (var i = 0; i < SectionMenu.THIRDMENU[(index - 1)].length; i++) {
                    var li = $("<li></li>");
                    li.addClass("ThirdClassLi");
                    li.attr("tmenu", (i + 1));
                    var arrow = "<div class='TMArrowContainerR'>" +
                                    "<div class='TMArrowRight'></div>" +
                                "</div>" +
                                "<div class='TMArrowContainerL'>" +
                                    "<div class='TMArrowLeft'></div>" +
                                "</div>";
                    li.append(SectionMenu.THIRDMENU[(index - 1)][i].toString());
                    li.append(arrow);
                    $("#ThirdMenuUl").append(li);
                }
                //SectionMenu.THIRDMENU 菜单mouseover效果
                $("#ThirdMenuUl > .ThirdClassLi").unbind("mouseover").mouseover(function () {
                    $("#ThirdMenuUl").children(".ThirdClassLi").removeClass("ThirdClassLi_hover");
                    $("#ThirdMenuUl .TMArrowRight").removeClass("TMArrowRight_hover");
                    $("#ThirdMenuUl .TMArrowLeft").removeClass("TMArrowLeft_hover");
                    $(this).children(".TMArrowContainerR").children(".TMArrowRight").addClass("TMArrowRight_hover");
                    $(this).children(".TMArrowContainerL").children(".TMArrowLeft").addClass("TMArrowLeft_hover");
                    $(this).addClass("ThirdClassLi_hover");
                    //ForthMenuInit
                    var indexT = parseInt($(this).attr("tmenu"));
                    $("#ForthMenuUl").html("");
                    for (var i = 0; i < SectionMenu.FORTHMENU[(indexT - 1)].length; i++) {
                        var li = $("<li></li>");
                        li.addClass("ThirdClassLi");
                        li.attr("fmenu", (i + 1));
                        var arrow = "<div class='TMArrowContainerR'>" +
                                        "<div class='TMArrowRight'></div>" +
                                    "</div>" +
                                    "<div class='TMArrowContainerL'>" +
                                        "<div class='TMArrowLeft'></div>" +
                                    "</div>";
                        li.append(SectionMenu.FORTHMENU[(indexT - 1)][i].toString());
                        li.append(arrow);
                        $("#ForthMenuUl").append(li);
                    }
                    var forthLength = SectionMenu.FORTHMENU[(indexT - 1)].length
                    var secondLength = $(".second-class-li").length;
                    var top = 0//(index-1)*53+26;
                    //indexT = indexT+;//important 计算相对偏移
                    if ((index + thirdLength) >= secondLength) {
                        //相对位移的相对位移
                        indexT = (secondLength - thirdLength + indexT)
                    } else {
                        indexT = index + indexT;
                    }
                    if ((indexT + forthLength) > secondLength) {
                        top = ((indexT) - ((indexT + forthLength) - secondLength)) * 53;
                    } else {
                        top = (indexT - 1) * 53;
                    }

                    $("#ForthMenuUl").css({
                        "display": "block",
                        "top": top + "px"
                    });

                    $("#ForthMenuUl > .ThirdClassLi").mouseover(function () {
                        $("#ForthMenuUl").children(".ThirdClassLi").removeClass("ThirdClassLi_hover");
                        $("#ForthMenuUl .TMArrowRight").removeClass("TMArrowRight_hover");
                        $("#ForthMenuUl .TMArrowLeft").removeClass("TMArrowLeft_hover");
                        $(this).children(".TMArrowContainerR").children(".TMArrowRight").addClass("TMArrowRight_hover");
                        $(this).children(".TMArrowContainerL").children(".TMArrowLeft").addClass("TMArrowLeft_hover");
                        $(this).addClass("ThirdClassLi_hover");
                    });

                });

                var thirdLength = SectionMenu.THIRDMENU[(index - 1)].length
                var secondLength = $(".second-class-li").length;
                var top = 0//(index-1)*53+26;
                if ((index + thirdLength) > secondLength) {
                    top = ((index - 1) - ((index + thirdLength) - secondLength)) * 53 + 26;
                } else {
                    top = (index - 1) * 53 + 26;
                }

                $("#ThirdMenuUl").css({
                    "display": "block",
                    "top": top + "px"
                });
            });

            //FirstMenu 点击效果:not([class~="menuSelected"])
            $('.first-class-li-hover').unbind("click").click(function () {
                //hidden secondMenu 
                _this.SecondMenuHidden();

                //resize Target
                /*
                _this.FM_size.smallwidth = _this.FM_size.width - (_this.FM_size.width / GoldenScale - _this.FM_size.width) / (_this.FIRSTMENU.length - 1);
                _this.FM_size.bigwidth = _this.FM_size.width / GoldenScale;
                */
                var type = $(this).attr("type");
                var index = parseInt($(this).attr("menu"));
                $(".menuSelected").removeClass("menuSelected");
                var changeFM = $($(".first-class-li")[index]);
                changeFM.addClass("menuSelected");

                var otherFM = $(".first-class-li[class!='" + $(".menuSelected").attr("class") + "']");
                otherFM.animate({
                    "height": _this.FM_size.height + "px",
                    "line-height": _this.FM_size.height + "px",
                }, 150);

                changeFM.animate({
                    "height": 70 + "px",
                    "line-height": 70 + "px",
                }, 200);
                
                //FirstArrow
                var FMArrow = $("#FMArrowContainer");
                /*
                FMArrow.css({
                    "width": 30 + "px",
                    "height":15+"px",
                });
                */
                //if (type == "honeycomb" && _this.FIRSTMENU[index].SecondMenu && _this.FIRSTMENU[index].SecondMenu.length > 0) {
                    //FMArrow.children().removeClass("FirstMenuArrowDown").addClass("FirstMenuArrowUp");
                    //FMArrow.css({ "top": -15 + "px" });
                //} else {
                //设置默认为下箭头
                FMArrow.children().removeClass("FirstMenuArrowUp").addClass("FirstMenuArrowDown");
                    //FMArrow.css({ "top": 0 + "px" });
                //}
                var Arrowleft = changeFM.position().left + parseInt(changeFM.css("width"))/2 - parseInt(FMArrow.css("width")) / 2
                FMArrow.css({
                    "left": Arrowleft + "px",
                });
                FMArrow.removeClass("hidden");
                //resize FM


                //resize Zoom 暂时不需要
                /*
                var firstViewZoom = $('#FMViewZoom');
                firstViewZoom.css({
                    "width": _this.FM_size.width + "px",
                });
                var fmHoverContainer = $('.fm-container-hover');
                for (var i = 0; i < _this.FIRSTMENU.length; i++) {
                    var f = _this.FIRSTMENU[i];
                    var firsthoverli = $($('.first-class-li-hover')[i]);// class="first-class-li" menu="1" type="honeycomb"
                    var firstMapli = $($('.first-class-li')[i]);
                    firsthoverli.css({
                        "width": firstMapli.css("width"),
                    })
                }
                */
                

                //$("#FMArrowContainer").addClass("hidden");
                _this.FirstMenuSelectedClick();

                //View Transfer
                //var menu = $(this).attr("menu")
                //MenuSection[menu] && Controler.transfer(new MenuSection[menu]());
            });
        },
        ThirdMenuHide:function(){
            $("#ThirdMenuUl").html("");
        },
        ThirdMenuShow: function () {

        }
    }

    //主菜单 高亮menu的点击效果
    //SectionMenu.FirstMenuSelectedClick();


/* MenuSection 匹配函数 */
var MenuSection = {
    "1": Section1View,
    "2": Section2View,
    "3": Section3View,
}