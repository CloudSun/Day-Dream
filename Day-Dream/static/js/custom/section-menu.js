    var Flag_FMdownStatus = 0;
    var FirstMenuULNum = 0;
    var BaselineCircleNum = 0;

var SectionMenu = {
    inited: false,
    baseWidth: function () {
        return Math.floor(window.outerWidth / BaseSizeNumber) * BaseSizeNumber;
    },
    CurrentFM:function(){
        var FMMap = $(".first-class-li.menuSelected");

        return {
            "target": FMMap,
            "index": parseInt(FMMap.attr("menu")),
        };
    },
    CurrentSM:function(){
        var SMMap = $(".second-class-li.selected");
        return {
            "target": SMMap,
            "index": parseInt(SMMap.attr("smenu")),
        };
    },
    FIRSTMENU: [
        {
            title: "Section1", type: "honeycomb",
            view: Section1View,
            viewname:"Section1",
            SecondMenu: [
                {
                    title: "Second 1",
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
        {
            title: "Section2", type: "honeycomb",
            view: Section2View,
            viewname:"Section2"
        },
        {
            title: "Section3", type: "honeycomb",
            view: Section3View,
            viewname:"Section3",
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
            ]
        },
        {
            title: "Section4", type: "one",
            view: Section4View,
            viewname: "Section4",
        },
        { title: "Section5", type: "one" }
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
    /* 暂时到ThirdMenu
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
    */
    FirstMenu_Init: function (viewname) {
        //上横线
        var _this = this;
        if(_this.inited){
            return ;
        }

        $("#BaselineCircle").css("width", "100%");
        //Init Size
        /*
        TODO init the structor
        var SectionMainContainer = $("#SectionContainer");
        var MainMenu = $('<nav id="MainMenu"></nav>')
        */
        var firstMenuUl = $('#FirstMenuUL');
        var firstMenuUl_width = _this.baseWidth();
        var firstMenuUl_height = 70;
        var firstMenuLength = this.FIRSTMENU.length;
        firstMenuUl.css({
            "width": firstMenuUl_width,
            "height": firstMenuUl_height,
            "margin": "0 auto",
            "-webkit-transition-duration":"0.2s",
        });
        
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
                "width": this.FM_size.width + "px",
                "height": this.FM_size.height + "px",
                "line-height": this.FM_size.height + "px",
                "-webkit-transition-duration": "0.2s",
            });
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
            "-webkit-transition-duration": "0.2s",
        });
        var fmHoverContainer = $('<ul class="fm-container-hover"></ul>');
        fmHoverContainer.css({
            "width": firstMenuUl_width + "px",
            "height": this.FM_size.height + "px",
            "top":this.FM_size.height+"px",
            "-webkit-transition-duration": "0.2s",
        });
        
        for (var i = 0; i < firstMenuLength; i++) {
            var f = this.FIRSTMENU[i];
            var firsthoverli = $('<li></li>');// class="first-class-li" menu="1" type="honeycomb"
            firsthoverli.addClass("first-class-li-hover");
            firsthoverli.css({
                "width": this.FM_size.width + "px",
                "height": this.FM_size.height + "px",
                "line-height": this.FM_size.height + "px",
                "-webkit-transition-duration": "0.2s",
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
        if (!viewname) {
            viewname = Controler.currentView.param.name;
        }
        this.AddFMEvents(viewname);
        

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
    onresize:function(){
        var _this = this;
        if (!_this.inited) {
            if(_this.CurrentFM.target){
                _this.FirstMenu_Init();
            }
            return;
        }
        //Init Size
        var firstMenuUl = $('#FirstMenuUL');
        var firstMenuUl_width = _this.baseWidth();
        var firstMenuUl_height = 70;
        var firstMenuLength = this.FIRSTMENU.length;
        firstMenuUl.css({ "width": firstMenuUl_width, "height": firstMenuUl_height, "margin": "0 auto" });
        //Init First Menu node
        this.FM_size.width = firstMenuUl_width / firstMenuLength;
        this.FM_size.height = firstMenuUl_height * GoldenScale;
        //
        $("#BaselineMainContainer").css({ "width": firstMenuUl_width + "px" });

        for (var i = 0; i < firstMenuLength; i++) {
            var f = this.FIRSTMENU[i];
            var firstli = $(firstMenuUl.find("li")[i]);// class="first-class-li" menu="1" type="honeycomb"
            firstli.css({
                "width": this.FM_size.width + "px",
                "height": this.FM_size.height + "px",
                "line-height": this.FM_size.height + "px",
            });
        }
        // #FMViewZoom
        var firstViewZoom = $("#FMViewZoom");
        firstViewZoom.css({
            "width": this.FM_size.width + "px",
            "height": this.FM_size.height + "px",
            "top": -this.FM_size.height + "px",
        });
        var fmHoverContainer = firstViewZoom.find(".fm-container-hover");
        fmHoverContainer.css({
            "width": firstMenuUl_width + "px",
            "height": this.FM_size.height + "px",
            "top": this.FM_size.height + "px",
        });

        for (var i = 0; i < firstMenuLength; i++) {
            var f = this.FIRSTMENU[i];
            var firsthoverli = fmHoverContainer.find("li");// class="first-class-li" menu="1" type="honeycomb"
            firsthoverli.addClass("first-class-li-hover");
            firsthoverli.css({
                "width": this.FM_size.width + "px",
                "height": this.FM_size.height + "px",
                "line-height": this.FM_size.height + "px",
            });
        }
      
        
        _this.AddFMEvents();

        CallbackL(arguments);
        //Init First Menu Hover node

        /*
        //TODO CSS3
        firstMenuShow();

        //Add Events
        this.AddFMEvents(viewname);

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
        */
    },
    FirstArrowEffect: function () {
        $("#FMArrowContainer").removeClass("hidden");
        var left = parseFloat($(".first-class-li.menuSelected").position().left) + $(".first-class-li.menuSelected").width() / 2 - $("#FMArrowContainer").width() / 2;
        $("#FMArrowContainer").css({
            "left": left + "px",
        });
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
    FirstMenuSelected_Click: function () {
        //主菜单FirstMenu menuSelected点击效果changeFM.addClass("menuSelected");
        var _this = this;
        $(".menuSelected[type='honeycomb']").unbind("click").click(function () {
        var currentFM = _this.CurrentFM();
        var second = _this.FIRSTMENU[currentFM.index].SecondMenu ;
        if (!second) {
            return;
        }
        var arrowContainer = $("#FMArrowContainer");
        var arrow = arrowContainer.children();
        var className = arrow.attr("class");
        var FirstArrowDown = "FirstMenuArrowDown";
        var FirstArrowUp = "FirstMenuArrowUp";
        if (className == FirstArrowDown) {
            //下箭头状态
            arrow.removeClass().addClass(FirstArrowUp);
            arrowContainer.css({
                "top": "-15px",
            });
                _this.SecondMenu_Hidden();
            } else {
            //上箭头状态
                arrow.removeClass().addClass(FirstArrowDown);
                arrowContainer.css({
                    "top":"0px",
                });
                _this.SecondMenu_Show();
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
    AddFMEvents: function (viewname) {
        var _this = this;
        if (!viewname) {
            viewname = Controler.currentView.name;
        }
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
                    "left": position.left + "px",
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
                    "top": -_this.FM_size.height + "px",
                    "left": position.left + "px",
                });
                //上移入效果
                //调整hover块
                $(".fm-container-hover").css({
                    top: _this.FM_size.height + "px",
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
        }).unbind('webkitTransitionEnd').bind('webkitTransitionEnd', function () {
            if ($(this).attr("class").indexOf("menuSelected") != -1) {
                /*var FMArrow = $("#FMArrowContainer");
                var arrowleft = $(this).position().left + $(this).width() / 2 - FMArrow.width() / 2;
                FMArrow.css({
                    "left": arrowleft + "px",
                });
                FMArrow.removeClass("hidden");
                */
                _this.FirstArrowEffect();
            }
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
        // moztransitionend transitionend oTransitionEnd
        

        //FirstMenu 点击效果:not([class~="menuSelected"])
        $('.first-class-li-hover').unbind("click").click(function () {
            //hidden secondMenu 
            _this.SecondMenu_Hidden();

            //resize Target
            /*
            _this.FM_size.smallwidth = _this.FM_size.width - (_this.FM_size.width / GoldenScale - _this.FM_size.width) / (_this.FIRSTMENU.length - 1);
            _this.FM_size.bigwidth = _this.FM_size.width / GoldenScale;
            */
            var type = $(this).attr("type");
            var index = parseInt($(this).attr("menu"));
            
            firstMenuHoveredClick(index, type, function () {
                //FirstMenu View Transfer
                //var menu = $(this).attr("menu")
                var targetView = _this.FIRSTMENU[index].view;
                setTimeout(function() {
                    targetView && Controler.transfer(new targetView());
                }, 200);
                
                _this.FirstMenuSelected_Click();
            });
            
        });

        //addEvents End
        //default First Section Menu selected
        for (var i = 0; i < _this.FIRSTMENU.length; i++) {
            if (_this.FIRSTMENU[i].viewname == viewname) {
                var index = i;
                var type = _this.FIRSTMENU[i].type;
                setTimeout(function() {
                    firstMenuHoveredClick(index, type);
                },500);

            }
        }

        function firstMenuHoveredClick(index, type) {
            $(".menuSelected").removeClass("menuSelected");
            var changeFM = $($(".first-class-li")[index]);
            changeFM.addClass("menuSelected");

            var otherFM = $(".first-class-li[class!='" + $(".menuSelected").attr("class") + "']");
            /*otherFM.animate({
                "height": _this.FM_size.height + "px",
                "line-height": _this.FM_size.height + "px",
            }, 150);*/
            otherFM.css({
                "height": _this.FM_size.height + "px",
                "line-height": _this.FM_size.height + "px",
                "-webkit-transition-duration": "0.3s",
            });
            

            //resize FM
            /*
            changeFM.animate({
                "height": 70 + "px",
                "line-height": 70 + "px",
            }, 200);
            */
            changeFM.css({
                "height": 70 + "px",
                "line-height": 70 + "px",
                "-webkit-transition-duration": "0.3s",
            });

            //FirstArrow
            var FMArrow = $("#FMArrowContainer");
            /*
            FMArrow.css({
                "width": 30 + "px",
                "height":15+"px",
            });
            */
            if (type == "honeycomb" && _this.FIRSTMENU[index].SecondMenu && _this.FIRSTMENU[index].SecondMenu.length > 0) {
                FMArrow.children().removeClass().addClass("FirstMenuArrowUp");
                FMArrow.css({ "top": -15 + "px" });
            } else {
                //设置默认为下箭头
                FMArrow.children().removeClass().addClass("FirstMenuArrowDown");
                FMArrow.css({ "top": 0 + "px" });
            }
            
            
           //if (!_this.inited) {
                //setTimeout(function () {
                    var arrowleft = changeFM.position().left + changeFM.width() / 2 - FMArrow.width() / 2
                    FMArrow.css({
                        "left": arrowleft + "px",
                        "-webkit-transition-duration": "0.2s",
                    });
                    FMArrow.removeClass("hidden");
                //}, 500);
                
            //}
            
            

            //resize Zoom 暂时不需要
            /*
            var firstViewZoom = $('#FMViewZoom');
            firstViewZoom.css({
                "width": _this.FM_size.width + "px",
            });
            var fmHoverContainer = $('.fm-
            
            -hover');
            for (var i = 0; i < _this.FIRSTMENU.length; i++) {
                var f = _this.FIRSTMENU[i];
                var firsthoverli = $($('.first-class-li-hover')[i]);// class="first-class-li" menu="1" type="honeycomb"
                var firstMapli = $($('.first-class-li')[i]);
                firsthoverli.css({
                    "width": firstMapli.width(),
                })
            }
            */
            //init End
            _this.inited = true;

            CallbackL(arguments);
        }
    },
    SecondMenu_Init: function (func) {
        var _this = this;
        //!index && (index = 0);
        var secondMenu = $("#SecondMenu");
        var secondMenuUl = $("#SecondMenu .second-menu-ul");
        var mapFM = $(".first-class-li.menuSelected");
        var firstIndex = mapFM.attr("menu");
        var space = 4;
            var arrowWidth = 25;
            secondMenu.css({
                left: ($(document).width() - $("#FirstMenuUL").width())/2 + mapFM.position().left + "px",
                bottom: parseInt($("#MainMenu").css("height"))+parseInt($("#Baseline").css("height"))+"px",
            });
            var secondList = _this.FIRSTMENU[firstIndex].SecondMenu;
            //clear secondMenu
            $(".second-class-li").remove();
            for (var i = 0; i < secondList.length; i++) {
                var second = $('<li class="second-class-li" smenu="' + i + '"></li>');
                var secondContent = $('<li class="second-li-content">' + secondList[i].title + '</li>');
                var smArrowRight = $('<div class="sm-arrow-container"><div class="sm-arrow-right"></div></div>');
                second.css({
                    "width": mapFM.width() + arrowWidth - space + "px",
                    "margin-left": space + "px",
                });
                secondContent.css({
                    "width": mapFM.width() - space + "px",
                })

                second.append(secondContent);
                second.append(smArrowRight);
                secondMenuUl.append(second);
            }

            typeof func == "function" && func();
        },
    SecondMenu_Show: function (targetId) {
            var _this = this;

            _this.SecondMenu_Init(function () {
                $("#SecondMenu").removeClass("hidden");
                $(".second-class-li").clearQueue();
                var space = 4;
                showSecondMenu();
                function showSecondMenu(index) {
                    if (!index && index != 0) {
                        index = $(".second-class-li").length - 1
                    }
                    var target = $(".second-class-li")[index];
                    $(target).animate({
                        "height": "25px",
                        "margin-bottom": space+"px",
                    }, 50, function () {
                        showSecondMenu(--index)
                    });
                    $(target).animate({
                        "height": "50px",
                        "margin-bottom": space+"px",
                    }, 50);

                    index == 0 && _this.AddSMEvents();
                }
            });
            //show Arrow
        },
    SecondMenu_Hidden: function (targetId) {
            var _this = this;
            $(".second-class-li").clearQueue();
            //hide Arrow
            _this.ThirdMenu_Hidden();
            hideSecondMenu();

            function hideSecondMenu(index) {
                !index && (index = 0);
                if (index > $(".second-class-li").length - 1) {
                    $("#SecondMenu").addClass("hidden");
                    return;
                }
                var target = $(".second-class-li")[index];
                $(target).animate({
                    "height": "25px",
                    "margin-bottom": "0px",
                }, 50, function () {
                    hideSecondMenu(++index);
                });
                $(target).animate({
                    "height": "0px",
                    "margin-bottom": "0px",
                }, 50);
            }
        },
    AddSMEvents:function(){
            var _this = this;
            var sm = $(".second-class-li");
            sm.unbind("mouseover").mouseover(function () {
                var index = $(this).attr("smenu");
                if ($(this).attr("class").indexOf("selected")==-1) {
                    $(".second-class-li").removeClass("selected");
                    $(this).addClass("selected");
                    _this.ThirdMenu_Show();
                }
            });
        },
    ThirdMenu_Init: function (func) {
            var _this = this;
            $("#ThirdMenuUl").html("");
            var first = _this.CurrentFM();
            var second = _this.CurrentSM();
            var space = 4;
            var left = space + second.target.width();
            var ThirdMenu = $("#ThirdMenu");
            var arrowWidth = 25;
            var thirdList = _this.FIRSTMENU[first.index].SecondMenu[second.index].ThirdMenu;
            var secondIndex = second.index;
            var secondLength = _this.FIRSTMENU[first.index].SecondMenu.length;
            var thirdSpaceLength = secondLength - (secondIndex+1);//secondIndex from 0
            var liBottomSpace = 25;
            var topSpace = liBottomSpace + space / 2;
            
            if (thirdList) {
                if (thirdSpaceLength < thirdList.length) {
                    topSpace = topSpace - (thirdList.length - thirdSpaceLength - secondIndex) * (50 + space);
                } else {
                    topSpace = topSpace + secondIndex * (50 + space);
                }
                ThirdMenu.css({
                    "left": left - arrowWidth*2 + space + "px",
                    "top": topSpace + "px",
                });

                for (var i = 0; i < thirdList.length; i++) {
                    var li = $("<li class='third-class-li'></li>");
                    li.css({
                        //"width": "0px",//右延伸小姑偶
                        "width":first.target.width(),//渐出效果
                        "height": "50px",
                        "line-height": "50px",
                        "margin-bottom": "4px",
                        "display":"none",
                    });
                    li.attr("tmenu", i);
                    var leftArrow ="<div class='TMArrowContainerL'><div class='TMArrowLeft'></div></div>";
                    var rightArrow = "<div class='TMArrowContainerR'><div class='TMArrowRight'></div></div>";
                    var content = $("<div class='third-li-content'></div>");

                    content.css({
                        "width": first.target.width() - arrowWidth * 2 + "px",
                        "height": "50px",
                        "line-height":"50px",
                    });
                    content.html(thirdList[i].title);
                    var liContainer = $("<div class='third-li-container'></div>")
                    liContainer.css({
                        "width" : first.target.width(),
                        "height" : "50px",
                    })
                    liContainer.append(leftArrow).append(content).append(rightArrow);
                    li.append(liContainer);
                    $("#ThirdMenuUl").append(li);
                }

                typeof func == "function" && func();
            }
        },
    ThirdMenu_Show: function () {
            var _this = this;
            var firstMenu = _this.CurrentFM();
            var ThirdMenu = $("#ThirdMenu");
            var arrowSpace = 25;
            _this.ThirdMenu_Init(function () {
                var tm = $(".third-class-li");
                tm.clearQueue();
                //BaseSizeNumber 210 = 2*3*5*7
                var duringTime = parseInt(BaseSizeNumber / tm.length);
                showThirdMenu();
                function showThirdMenu(index) {
                    !index && index != 0 && (index = 0);
                    if (index >= tm.length) {
                        return;
                    }
                    var t = $(tm[index]);
                    /* 延伸
                    t.animate({
                        "width": firstMenu.target.width() / 2 + "px",
                    }, 100, function () {
                        showThirdMenu(++index);
                        t.animate({
                            "width": firstMenu.target.width()+ "px",
                        }, 100)}
                    );
                    */
                    t.fadeIn(duringTime, function () {
                        showThirdMenu(++index);
                    });
                }
                _this.AddTMEvents();
            });

            
                //$(".sm-arrow-container").css("display","none");
                //$(".second-class-li").removeClass("SecondClassLi_hover");
                //$(".SMArrowRight_hover").removeClass("SMArrowRight_hover");
                //$(this).addClass("SecondClassLi_hover");
                //$(this).children(".sm-arrow-container").css("display","block");
                //$(this).children(".sm-arrow-container").children(".sm-arrow-right").addClass("SMArrowRight_hover");
                //ThirdMenu_Init
            /*
                for (var i = 0; i < SectionMenu.THIRDMENU[(index - 1)].length; i++) {
                    
                }
                //SectionMenu.THIRDMENU 菜单mouseover效果
                $("#ThirdMenuUl > .third-class-li").unbind("mouseover").mouseover(function () {
                    $("#ThirdMenuUl").children(".third-class-li").removeClass("third-class-li_hover");
                    $("#ThirdMenuUl .TMArrowRight").removeClass("TMArrowRight_hover");
                    $("#ThirdMenuUl .TMArrowLeft").removeClass("TMArrowLeft_hover");
                    $(this).children(".TMArrowContainerR").children(".TMArrowRight").addClass("TMArrowRight_hover");
                    $(this).children(".TMArrowContainerL").children(".TMArrowLeft").addClass("TMArrowLeft_hover");
                    $(this).addClass("third-class-li_hover");
                    //ForthMenuInit
                    var indexT = parseInt($(this).attr("tmenu"));
                    $("#ForthMenuUl").html("");
                    for (var i = 0; i < SectionMenu.FORTHMENU[(indexT - 1)].length; i++) {
                        var li = $("<li></li>");
                        li.addClass("third-class-li");
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

                    $("#ForthMenuUl > .third-class-li").mouseover(function () {
                        $("#ForthMenuUl").children(".third-class-li").removeClass("third-class-li_hover");
                        $("#ForthMenuUl .TMArrowRight").removeClass("TMArrowRight_hover");
                        $("#ForthMenuUl .TMArrowLeft").removeClass("TMArrowLeft_hover");
                        $(this).children(".TMArrowContainerR").children(".TMArrowRight").addClass("TMArrowRight_hover");
                        $(this).children(".TMArrowContainerL").children(".TMArrowLeft").addClass("TMArrowLeft_hover");
                        $(this).addClass("third-class-li_hover");
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
                */

    },
    ThirdMenu_Hidden: function () {
        var tm = $(".third-class-li");
        /* 缩进
        tm.animate({
            "width":"0px",
        },100, function () {
            $("#ThirdMenuUl").html("");
        })
        */
        tm.fadeOut(100);
    },
    AddTMEvents: function () {
        var _this = this;
        var tm = $(".third-class-li");
        tm.unbind("mouseover").mouseover(function () {
            tm.removeClass("selected");
            $(this).addClass("selected");
        });
    },
}
