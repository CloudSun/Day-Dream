var Rotate3DCube = {
    container: $("#Rotate3DCubeContainer"),
    row: 10,
    col: 10,
    Init: function () {
        if ($("#Rotate3DCubeContainer").children().length==0){
            for (var r = 0; r < this.row; r++) {
                for (var d = 0; d < this.col; d++) {
                    var cube = $('<div class="cubepane"></div>')
                    //add front pane
                    cube.append('<div class="pane-front">正</div>');
                    cube.append('<div class="pane-end">正</div>');
                    cube.attr("id", "cube-pane-" + r + "-" + d);
                    this.container.append(cube);
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
        this.container.click(function () {
            //add delay
            var delay = 0.1;
            var duration = 0.5;
            var panes = $(_this.container.children());
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