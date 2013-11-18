﻿var Rotate3DCube = {
    container: {
        target: $("#Rotate3DCubeContainer"),
    },
    cube: {
        size: {
            w: 70,
            h: 70,
        },
        row: 0,
        col: 0,
    },
    Init: function () {
        console.log("Init 3D pane");
        //clear #Rotate3DCubeContainer
        var _this = this;
        _this.container.target.html("");
        var parentContainer = _this.container.target.parent();
        var parentContainer_width = parentContainer.width();
        var parentContainer_height = parentContainer.height();
        var containerWidthScale = Math.floor(parentContainer_width / _this.cube.size.w);
        var containerHeightScale = Math.floor(parentContainer_height / _this.cube.size.h);
        //resize #Rotate3DCubeContainer
        _this.container.target.css({
            "width": containerWidthScale * _this.cube.size.w + "px",
            "height": containerHeightScale * _this.cube.size.h + "px",
            "top": "50%",
            "margin-top": -containerHeightScale * _this.cube.size.h / 2 + "px",
        });
        //init row & col
        _this.row = containerHeightScale;
        _this.col = containerWidthScale;
        if (_this.container.target.children().length==0){
            for (var r = 0; r < _this.row; r++) {
                for (var d = 0; d < _this.col; d++) {
                    var cube = $('<div class="cubepane"></div>')
                    cube.css({
                        "width":_this.cube.size.w+"px",
                        "height": _this.cube.size.h + "px",
                    });
                    //add front pane
                    cube.append('<div class="pane-front">正</div>');
                    cube.append('<div class="pane-end">正</div>');
                    cube.attr("id", "cube-pane-" + r + "-" + d);
                    this.container.target.append(cube);
                }
            }
            //Add index
            for (var i = 0; i < $(".cubepane").length; i++) {
                var t = $($(".cubepane")[i]);
                t.attr("index", i);
            }

            this.AddEvent();
        }
    },
    AddEvent: function () {
        //简单效果 1 [左上角起多米诺骨牌]
        var _this = this;
        this.container.target.click(function () {
            //add delay
            var delay = 0.1;
            var duration = 0.4;
            var panes = $(_this.container.target.children());
            for (var i = 0; i < panes.length; i++) {
                var pane = $(panes[i]);
                var backpane = pane.find(".pane-end");
                //add transition class
                var r = parseInt(i / _this.col);
                var d = i % _this.col;
                var r_time = 0;
                r > 0 && (r_time = r * _this.col * delay);
                var d_time = 0;
                //backpane add ready ckass
                backpane.addClass("backpane-ready-x");
                if (r % 2 == 0) {
                    d_time = d * delay;
                    pane.addClass("pane-to-right");
                } else {
                    d_time = (_this.col - 1 - d) * delay;
                    pane.addClass("pane-to-left");
                }
                var spaceTime = r_time + d_time;
                pane.css("-webkit-transition-delay", spaceTime + "s");
                pane.css("-webkit-transition-duration", duration + "s");
            }
        });
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