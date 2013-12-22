/* song Album */
var SongAlbumInit = function () {
    var resizeContainer = $("#Section1 .section-container");
    var resize = Resize.getSize(resizeContainer);
    var albumContainer = $("#SongAlbumContainer");

    var height = toFixed(resize.height / 2 * 1 / 2);
    var width = resize.width;
    albumContainer.css({
        "width": width + "px",
        "height": height + "px",
        "margin-top":-height*12/10,
    });

    var songList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    var unitWidth = height;
    for (var i=0;i<songList.length;i++) {
        var songCover = $("<span class='songCover'>" + songList[i] + "</span>");
        //右半边数量
        var rightNumber = Math.ceil(songList.length / 2);
        var leftNumber = songList.length - rightNumber;//
        if (i < rightNumber) {
            var uleft = width/2/rightNumber;
            var uAngle = 90 / rightNumber;
            var uopacity = 1 / rightNumber;
            var uZ = 400 / rightNumber;
            songCover.css({
                "width": unitWidth + "px",
                "height": unitWidth + "px",
                "left": "50%",
                "margin-left": -unitWidth / 2 + "px",
                "-webkit-transform": "translate3d(" + (i * uleft) + "px," + 0 + "px," + (200-uZ*i) + "px) rotateY(" + (-i * uAngle) + "deg)",
                "opacity": 1 - i * uopacity,
                "z-index":(1-i*uopacity)*10,
            });
            albumContainer.append(songCover);
        } else {
            var uleft = width / 2 / leftNumber;
            var uAngle = 90 / leftNumber;
            var uopacity = 1 / leftNumber;
            var uZ = 400 / leftNumber;
            var j = i - rightNumber;
            j = rightNumber - j;
            songCover.css({
                "width": unitWidth + "px",
                "height": unitWidth + "px",
                "left": "50%",
                "margin-left": -unitWidth / 2 + "px",
                "-webkit-transform": "translate3d(" + -(j * uleft) + "px," + 0 + "px," + (200 - uZ * j) + "px) rotateY(" + (j * uAngle) + "deg)",
                "opacity": 1 - j * uopacity,
                "z-index": (1 - j * uopacity) * 10,
            });
            albumContainer.append(songCover);
        }
    }
}



/* Gain Controler */
/* 音量控制 Slider */
var gainControl = $("#GainControl");
bindSlideControler(gainControl, function (value) {
    //change value
    value != undefined && ((value = parseInt(toFixed(value, 2) * 100)));
    
     CustomAudioContext.Gainer.change(value/100);//0-1
    console.log("gainControl:getTheVaule=" + value+"%");
});

function bindSlideControler(target,callback) {
    var mouseDragControler = null;
    var mousedown = false;
    target.bind("mouseenter", function (e) {
        //只有当鼠标进入绑定的元素时触发 mousenter不区分子元素
        //只有当鼠标离开绑定的元素时触发 mouseleave不区分子元素
        $(this).find(".handle").fadeIn();
    }).bind("mouseleave", function () {
        if (!(mouseDragControler && mouseDragControler.t[0] == $(this).find(".handle")[0])) {
            $(this).find(".handle").fadeOut();
        }
    }).bind("mousedown", function (e) {
        var available = "x";
        var left = e.offsetX;
        var top = e.offsetY;
        var controler = $(this).find(".handle");
        var space = $(this).find(".space");
        controler.css({
            "display": "block",
        })

        left = left - controler.width() / 2;
        top = top - controler.height() / 2;
        left < 0 && (left = 0);
        top < 0 && (top = 0);
        if (available.indexOf("x") != -1) {
            controler.css({
                "left": left + "px",
            });
            space.css({
                "width": left + controler.width(),
            });

            callback(left / ($(this).width() - controler.width()));
        }
        if (available.indexOf("y") != -1) {
            controler.css({
                "top": top + "px",
            });
            space.css({
                "height": top + controler.height(),
            });

            callback(top / ($(this).height() - controler.height()));
        }
        mousedown = true;
        mouseDragControler = new MouseDragControler(controler, e, available, callback)
    }).find(".handle").bind("mousedown", function (e) {
        mousedown = true;
        mouseDragControler = new MouseDragControler($(this), e, "x", callback)
        stopBubble(e);
        stopDefault(e);
    });


    $(document).bind("mousemove", function (e) {
        if (mouseDragControler) {
            mouseDragControler.move(e);
        }
    }).bind("mouseup", function (e) {
        if (mouseDragControler) {
            mouseDragControler.end();
            mouseDragControler = null;
        }
    })

}


//阻止冒泡事件  
function stopBubble(e) {  
    if (e && e.stopPropagation) {//非IE  
        e.stopPropagation();  
    }  
    else {//IE  
        window.event.cancelBubble = true;  
    }  
}  
function stopDefault(e) {  
    //阻止默认浏览器动作(W3C)  
    if (e && e.preventDefault)  
        e.preventDefault();  
        //IE中阻止函数器默认动作的方式  
    else  
        window.event.returnValue = false;  
    return false;  
}  



//MouseControler t:dom target; moveavailable:x,y,xy,container(parent),callback
function MouseDragControler(t,e,available,callback){
    this.t = t;
    this.position = t.position();
    this.start = {
        x:e.pageX,
        y:e.pageY,
    }
    this.available = available;
    this.margin = {
        left:e.offsetX,
        top:e.offsetY,
    }
    var _this = this;
    this.move = function (e) {
        var endPoint = {
            x: e.pageX,
            y: e.pageY,
        }
        var x = endPoint.x - _this.start.x;
        var y = endPoint.y - _this.start.y;

        var pWidth = _this.t.parent().width()-_this.t.width();
        var pHeight = _this.t.parent().height() - _this.t.height();
        var left = _this.position.left + x;
        var top = _this.position.top + y;
        left < 0 && (left = 0);
        left > pWidth && (left = pWidth);
        top < 0 && (top = 0);
        top > pHeight && (top = pHeight);

        //space spread
        var space = _this.t.parent().find(".space");
        
        if (_this.available.indexOf("x") != -1) {
            _this.t.css({
                "left":left+"px",
            });
            space.css({
                "width": left + _this.t.width() + "px",
            });

            callback(left / pWidth);
        }
        if (_this.available.indexOf("y") != -1) {
            _this.t.css({
                "top":top+"px"
            });
            space.css({
                "height": top + _this.t.height() + "px",
            });
            callback(top / pHeight);
        }
       
    }
    this.end = function () {
        _this.t.fadeOut();
    }
}




//BufferLoader Object

function BufferLoader(context, urlList, callback) {
    this.context = context;
    this.urlList = urlList;
    this.onload = callback;
    this.bufferList = new Array();
    this.loadCount = 0;
}

BufferLoader.prototype.loadBuffer = function (url, index) {
    // Load buffer asynchronously
    var request = new XMLHttpRequest();
    request.open("GET", url, true);
    request.responseType = "arraybuffer";

    var loader = this;

    request.onload = function () {
        // Asynchronously decode the audio file data in request.response
        loader.context.decodeAudioData(
            request.response,
            function (buffer) {
                if (!buffer) {
                    alert('error decoding file data: ' + url);
                    return;
                }
                loader.bufferList[index] = buffer;
                //if (++loader.loadCount == loader.urlList.length) {
                //    loader.onload(loader.bufferList, null);
                //} else {
                
                loader.onload(loader.bufferList[index], index);
                //}
            },
            function (error) {
                console.error('decodeAudioData error', error);
            }
        );
    };

    request.onerror = function () {
        alert('BufferLoader: XHR error');
    };
    request.send();
};

BufferLoader.prototype.load = function () {
    for (var i = 0; i < this.urlList.length; ++i)
        this.loadBuffer(this.urlList[i].src, i);
};


var filePath = '../sound/';
var CustomAudioContext = {
    Audioctx: null,
    //Default playList
    //TODO more list
    LoadList: [
        /*filePath + '境界的彼方ED「Daisy」.mp3',
        filePath + 'EGOIST-Departures ~あなたにおくるアイの歌~ (TV Edit) -Instrumental-.mp3',
        filePath + 'Supercell-My Dearest(《罪恶王冠》动漫主题曲).mp3',
        filePath + 'Supercell-告白 (Album Mix).mp3',*/
        {
            title: "ナノ-Silver Sky",
            src: filePath + 'ナノ-Silver Sky.mp3',
        },{
            title: "Daisy",
            src: filePath + '境界的彼方ED「Daisy」.mp3',
        },
        {
            title: "Departures",
            src: filePath + 'EGOIST-Departures ~あなたにおくるアイの歌~ (TV Edit) -Instrumental-.mp3',
        }, {
            title: "MyDearest",
            src: filePath + 'Supercell-My Dearest(《罪恶王冠》动漫主题曲).mp3',
        }, {
            title: "告白",
            src: filePath + 'Supercell-告白 (Album Mix).mp3',
        }
    ],
    Loop: true,
    Gainer: {
        t: null,
        controler:$("#gain"),
        change: function (v){
            if (!v) {
                v = this.controler.val();
            }
            if (!this.t) {
                throw "Gainer.t is null";
            }
            this.t.gain.value = v;
        }
    },
    Analyzer: {
        t: null,
        freq_data:new Float32Array(1024),
        run: function () {
            this.t.smoothingTimeConstant = 0.5;
            this.t.fftSize = 1024;
            this.t.getFloatFrequencyData(this.freq_data);
        }
    },
    Audio:{
        t: $("#song"),
        buffer: {
        }
    },
    CurrentSource: null,
    init: function() {
        if (this.Audioctx) {
            return;
        }
        //init AudioContext and return the object
        try {
            // Fix up for prefixing
            window.AudioContext = window.AudioContext || window.webkitAudioContext;
            this.Audioctx = new AudioContext();
        } catch(e) {
            alert('Web Audio API is not supported in this browser');
        }
        var _this = this;
        this.Gainer.t = this.Audioctx.createGainNode();
        this.Analyzer.t = this.Audioctx.createAnalyser();
        this.Gainer.t.connect(this.Analyzer.t);
        this.Analyzer.t.connect(this.Audioctx.destination);
        this.Analyzer.freq_data = new Float32Array(this.Analyzer.t.frequencyBinCount);

        //var bufferLoader = new BufferLoader(this.Audioctx, this.LoadList, finishedLoading);
        
        //bufferLoader.load();
        
        this.Canvas.resize();
        
        var audio = this.Audio.t[0];
        audio.src = this.LoadList[1].src;
        audio.Loop = this.loop;
        var source = this.Audioctx.createMediaElementSource(audio);
        source.connect(this.Gainer.t);
        audio.addEventListener('play', this.Canvas.drawGraph);

        /*add Events */
        
        

        /*

        function finishedLoading(bufferList, index) {
            var Audioctx = _this.Audioctx;
            var audioContainer = $("#AudioControl");
            if (index != null) {
                var btnControl = $("<input type='button' class='playBtn' id='play" + index + "' value='PLAY'/>");
                var spanInfo = $("<span>" + _this.LoadList[index].title + "</span>");
                audioContainer.append(btnControl).append(spanInfo).append("<br/>");
                btnControl.unbind("click").click(function () {
                    _this.resizeCanvas();
                    
                    if (_this.CurrentSource && _this.CurrentSource.index != index) {
                        _this.CurrentSource.source.stop(0);
                    }
                    if (this.value == "PLAY") {
                        $(".playBtn").attr("value", "PLAY");
                        var source1 = Audioctx.createBufferSource();
                        source1.buffer = bufferList;
                        source1.connect(_this.Gain);
                        _this.CurrentSource = {
                            source: source1,
                            index: index,
                        };
                        _this.gainChange();
                        _this.loopChange();
                        _this.drawGraph();
                        source1.start(0);
                        this.value = "STOP";
                    } else {
                        _this.CurrentSource.source.stop(0);
                        this.value = "PLAY";
                    }

                });
            }
        }
        */
    },
    Canvas: {
        target: $(document.getElementById("cvs")),
        width: 0,
        height: 0,
        ctx: null,
        draw_interval: null,
        drawGraph: function () {
            var canvas = CustomAudioContext.Canvas;
            var cac = CustomAudioContext;
            if (canvas.draw_interval) {
                clearInterval(canvas.draw_interval);
                canvas.draw_interval = null;
            }
            !canvas.ctx && (canvas.ctx = canvas.target[0].getContext("2d"));
            canvas.draw_interval = setInterval(function () {
                var audio = CustomAudioContext;
                var canvas = CustomAudioContext.Canvas;
                var w = canvas.width;
                var h = canvas.height;
                audio.Analyzer.run();
                var ctx = canvas.ctx;
                ctx.clearRect(0, 0, w, h);

                // Spacing between the individual bars
                /*
                //var SPACING = 10;
                for (var i = 0; i < _this.FreqData.length; i++) {
                    // Work out the hight of the current bar
                    // by getting the current frequency
                    var magnitude = _this.FreqData[i];
                    // Draw a bar from the bottom up (cause for the "-magnitude")
                    ctx.fillRect(i, h-(h+magnitude), 2, h);
                };
                ctx.fillStyle = "lightblue";
                */
                var length = audio.Analyzer.freq_data.length / 2;
                var center = {
                    x: w / 2,
                    y: h / 2,
                }
                w = w / 2;
                if (w > (length)) {
                    var SPACING = w / length;
                    for (var i = 0; i < length; i++) {
                        // Work out the hight of the current bar
                        // by getting the current frequency
                        //var magnitude =h/2+ (_this.FreqData[i]+48.16) * h/100;
                        var magnitude = (150 + audio.Analyzer.freq_data[i]) / 150 * h / 3;
                        if (magnitude > 0 && magnitude < h / 2) {
                            // Draw a bar from the bottom up (cause for the "-magnitude")
                            ctx.fillRect(i * SPACING + center.x, (center.y - magnitude), SPACING, magnitude);
                            ctx.fillRect((-i * SPACING - SPACING) + center.x, (center.y - magnitude), SPACING, magnitude);
                            ctx.fillStyle = "rgba(255,255,255,0.10)";
                            ctx.fillRect(i * SPACING + center.x, (center.y), SPACING, magnitude);
                            ctx.fillRect((-i * SPACING - SPACING) + center.x, (center.y), SPACING, magnitude);
                            ctx.fillStyle = "rgba(255,255,255,0.25)";
                        }
                    }
                } else {
                    var spaceNumber = length / w;
                    spaceNumber = Math.round(spaceNumber);
                    for (var i = 0; i < length; i++) {
                        if (i % spaceNumber == 0) {
                            var magnitude = (150 + audio.Analyzer.freq_data[i]) / 150 * h / 3;
                            if (magnitude > 0 && magnitude < h / 2) {
                                // Draw a bar from the bottom up (cause for the "-magnitude")
                                ctx.fillRect(i + center.x, (center.y - magnitude), 1, magnitude);
                                ctx.fillRect((-i - 1) + center.x, (center.y - magnitude), 1, magnitude);
                                ctx.fillStyle = "rgba(255,255,255,0.10)";
                                ctx.fillRect(i + center.x, (center.y), 1, magnitude);
                                ctx.fillRect((-i - 1) + center.x, (center.y), 1, magnitude);
                                ctx.fillStyle = "rgba(255,255,255,0.10)";
                            }
                        }

                    }
                }
            }, 100);
        },
        resize: function () {
            var container = $(this.target).parent();
            var size = Resize.getSize(container);
            this.target.attr({
                "width": size.width + "px",
                "height": size.height + "px",
            });
            this.width = size.width;
            this.height = size.height;
        },
    },
};

CustomAudioContext.init();



window.requestAnimFrame = (function () {
    return window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            function (callback) {
                window.setTimeout(callback, 1000 / 60);//定义每秒执行60次动画
            };
})();
//相当于使用setInterval(render, 16)方法,但是具有更高的性能
(function animloop() {
    requestAnimFrame(animloop);
    //render();
})();



/* other main.js
// The audio element
audioElement = document.getElementById('audio');
    
// The canvas, its context and fillstyle
canvas = document.getElementById('fft');
ctx = canvas.getContext('2d');
ctx.fillStyle = "white";
 
// Create new Audio Context and an audio Analyzer
audioContext = new webkitAudioContext();
analyser = audioContext.createAnalyser();
 
// Canvas' height and width
CANVAS_HEIGHT = canvas.height;
CANVAS_WIDTH = canvas.width;
// We'll need the offset later
OFFSET = 100;
// Spacing between the individual bars
SPACING = 10;
// initialize and start drawing
// when the audio starts playing
window.onload = init;
audioElement.addEventListener('play', draw);
 
function init() {
  // Take input from audioElement
  source = audioContext.createMediaElementSource(audioElement);
  // Connect the stream to an Analyzer
  source.connect(analyser);
  // Connect the Analyzer to the speakers
  analyser.connect(audioContext.destination);
  // Start the animation
  draw();
}
 
function draw() {
  // See http://paulirish.com/2011/requestanimationframe-for-smart-animating/
  requestAnimFrame(draw, canvas);
  // New typed array for the raw frequency data
  freqData = new Uint8Array(analyser.frequencyBinCount);
  // Put the raw frequency into the newly created array
  analyser.getByteFrequencyData(freqData);
  // Clear the canvas
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  // This loop draws all the bars
  OFFSET = 100;
// Spacing between the individual bars
SPACING = 10;
  for (var i = 0; i < freqData.length - OFFSET; i++) {
    // Work out the hight of the current bar
    // by getting the current frequency
    var magnitude = freqData[i + OFFSET];
    // Draw a bar from the bottom up (cause for the "-magnitude")
    ctx.fillRect(i * SPACING, CANVAS_HEIGHT, SPACING / 2, -magnitude);
  };
}
*/

/*
gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
 
gradient.addColorStop(0, "rgba(255, 0, 0, 1)");
gradient.addColorStop(0.15, "rgba(255, 255, 0, 1)");
gradient.addColorStop(0.3, "rgba(0, 255, 0, 1)");
gradient.addColorStop(0.5, "rgba(0, 255, 255, 1)");
gradient.addColorStop(0.65, "rgba(0, 0, 255, 1)");
gradient.addColorStop(0.8, "rgba(255, 0, 255, 1)");
gradient.addColorStop(1, "rgba(255, 0, 0, 1)");
 
ctx.fillStyle = gradient;
*/