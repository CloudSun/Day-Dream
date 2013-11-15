var Rotate3DCube = {
    container: {
        target: $("#Rotate3DCubeContainer"),
        width: $("#Rotate3DCubeContainer").width(),
        height: $("#Rotate3DCubeContainer").height(),
    },
    cube: {
        size: {
            width: 100,
            height: 100,
        },
        row: 0,
        col: 0,
    },
    Init: function () {
        //clear #Rotate3DCubeContainer
        var _this = this;
        _this.container.target.html("");
        //_this.cube.row = _this.container.width/
        if ($("#Rotate3DCubeContainer").children().length==0){
            for (var r = 0; r < _this.row; r++) {
                for (var d = 0; d < this.col; d++) {
                    var cube = $('<div class="cubepane"></div>')
                    var cubeW = _this.container.width/_this.row;
                    var cubeH = _this.container.height/_this.col;
                    cube.css({
                        "width": cubeW+"px",
                        "height": cubeH + "px",
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
            var duration = 0.5;
            var panes = $(_this.container.target.children());
            for (var i = 0; i < panes.length; i++) {
                var pane = $(panes[i]);
                //add transition class
                var r = parseInt(i / _this.col);
                var d = i % _this.row;
                var r_time = 0;
                r > 0 && (r_time = r * _this.col * delay);
                var d_time = 0;
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