var Rotate3DCube = {
    container: {
        target: "",
    },
    currentTarget:null,
    cube: {
        size: {
            w: 0,
            h: 0,
            u: 70,
        },
        row: 0,
        col: 0,
    },
    Init: function (container,target) {
        console.log("Init 3D pane");
        //clear #Rotate3DCubeContainer
        var _this = this;
        if (container.children(".Rotate3DCubeContainer").length == 0) {
            var rotateContainer = $("<div class='Rotate3DCubeContainer'></div>");
            container.append(rotateContainer);
            _this.container.target = rotateContainer;
        }
        _this.container.target.html("");
        var sizeScale = Resize.MapCubeContainer(_this.container.target);
        //两个翻转size //TODO
        _this.row = sizeScale.scaleHeight;
        _this.col = sizeScale.scaleWidth;
        _this.cube.size.w = _this.cube.size.h = _this.cube.size.u;
        
        if (_this.container.target.children().length==0){
            for (var r = 0; r < _this.row; r++) {
                for (var d = 0; d < _this.col; d++) {
                    var cube = $('<div class="cubepane"></div>')
                    cube.css({
                        "width":_this.cube.size.w+"px",
                        "height": _this.cube.size.h + "px",
                    });
                    //init front pane
                    var front = $('<div class="pane-front"></div>');
                    //init back pane
                    var back = $('<div class="pane-end"></div>')

                    //add front content
                    var frontContent = target.clone();
                    
                    //css posiion
                    var cube_left = d * _this.cube.size.w;
                    var cube_top = r * _this.cube.size.h;
                    frontContent.css({
                        "left": target.currentPosition.left - cube_left + "px",
                        "top": target.currentPosition.top - cube_top + "px",
                        "margin": "0px",
                        "display":"block",
                    });

                    front.append(frontContent);

                    //add front pane
                    cube.append(front);
                    //add back pane
                    cube.append(back);

                    cube.attr("id", "cube-pane-" + r + "-" + d);
                    this.container.target.append(cube);
                }
            }
            //Add index
            for (var i = 0; i < $(".cubepane").length; i++) {
                var t = $($(".cubepane")[i]);
                t.attr("index", i);
            }
            //_this.container.target.click();
        }
    },
    nextTarget: function (next) {
        console.log("Init 3D pane");
        //clear #Rotate3DCubeContainer
        var _this = this;
        _this.currentTarget.css({
            "display": "none",
        })

        //if (_this.container.target.children().length != 0) {
        var cubes = _this.container.target.children(".cubepane");
        if(cubes.length>0){
            for (var r = 0; r < _this.row; r++) {
                for (var d = 0; d < _this.col; d++) {
                    var cube = $(cubes[r * _this.rol + d]);
                    //init front pane
                    var front = cube.find(".pane-front");
                    //init back pane
                    var back = cube.find("pane-end");
                    
                    //add back content
                    if (!next.currentPosition) {
                        next = Resize.ImageActualCenter(next);
                    }

                    var backContent = next.clone();

                    //css posiion
                    var cube_left = d * _this.cube.size.w;
                    var cube_top = r * _this.cube.size.h;
                    frontContent.css({
                        "left": _this.currentTarget.currentPosition.left - cube_left + "px",
                        "top": _this.currentTarget.currentPosition.top - cube_top + "px",
                        "margin": "0px",
                        "display": "block",
                    });
                    backContent.css({
                        "left": next.currentPosition.left - cube_left + "px",
                        "top": target.currentPosition.top - cube_top + "px",
                        "margin": "0px",
                        "display": "block",
                    })

                    front.append(frontContent);
                    back.append(backContent);

                    //add front pane
                    cube.append(front);
                    //add back pane
                    cube.append(back);

                    cube.attr("id", "cube-pane-" + r + "-" + d);
                    this.container.target.append(cube);
                }
            }
            //Add index
            for (var i = 0; i < $(".cubepane").length; i++) {
                var t = $($(".cubepane")[i]);
                t.attr("index", i);
            }

            _this.container.target.addClass("top-pane");

            _this.AddEvent();
            //_this.container.target.click();
        }
    },
    AddEvent: function () {
        //简单效果 1 [左上角起多米诺骨牌]
        var _this = this;
        /*
        //this.container.target.unbind("click").click(function () {
            //add delay
            var delay = 0.2;
            var duration = 0.6;
            var panes = $(_this.container.target.children());
            for (var i = 0; i < panes.length; i++) {
                var pane = $(panes[i]);
                var backpane = pane.find(".pane-end");
                var frontpane = pane.find(".pane-front");
                //add transition class
                var r = parseInt(i / _this.col);
                var d = i % _this.col;
                var r_time = 0;
                r > 0 && (r_time = r * _this.col * delay);
                var d_time = 0;
                //backpane add ready ckass
                
                if (r % 2 == 0) {
                    frontpane.addClass("frontpane-ready-to-right");
                    backpane.addClass("backpane-ready-to-right");
                    d_time = d * delay;
                    pane.addClass("pane-to-right");
                } else {
                    frontpane.addClass("frontpane-ready-to-left");
                    backpane.addClass("backpane-ready-to-left");
                    d_time = (_this.col - 1 - d) * delay;
                    pane.addClass("pane-to-left");
                }
                var spaceTime = r_time + d_time;
                pane.css("-webkit-transition-delay", spaceTime + "s");
                pane.css("-webkit-transition-duration", duration + "s");
            }
        //});
        */
        //从左上角起的连片翻转
        //add delay
        var delay = 0.2;
        var duration = 0.6;
        var panes = $(_this.container.target.children());
        lastpanes = $(panes[panes.length - 1]);
        lastpanes.bind('webkitTransitionEnd moztransitionend transitionend oTransitionEnd', function () {
            alert("TransitionEnd");
        });
        for (var i = 0; i < panes.length; i++) {
            var pane = $(panes[i]);
            var backpane = pane.find(".pane-end");
            var frontpane = pane.find(".pane-front");
            //add transition class
            var r = parseInt(i / _this.col);
            var d = i % _this.col;
            //backpane add ready ckass
            frontpane.addClass("frontpane-ready-to-right");
            backpane.addClass("backpane-ready-to-right");
            pane.addClass("pane-to-right");

            var spaceTime = (d + r) * delay;
            pane.css("-webkit-transition-delay", spaceTime + "s");
            pane.css("-webkit-transition-duration", duration + "s");
        }
        


    }
    
}

//辗转相除法求最大公约数
//辗转相除法:

function f(x,y)
{
var m, n, t ;
if(x > y){
    m = x ;
    n = y ;
}else{
    m = y ;
    n = x ;
}

while(m % n != 0)
{
    t = n ;
    n = m % n ;
    m = t ;
}

return n ;
}


function bindRotate3DCube(targetImage) {
    targetImage.unbind("click").click(function () {
        //next Image
        var nextImage = $($(this).next());
        if (nextImage.length) {
            //Init Rotate3DCube
            Rotate3DCube.Init(targetImage, nextImage);
        } else {
            nextImage = ($(this).parent().children()[0])
            Rotate3DCube.Init(targetImage, nextImage);
        }
    });
}