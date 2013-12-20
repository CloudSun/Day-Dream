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
    Gain: 1,//默认音量
    Analyzer: null,
    analyze: function () {
        //this.Analyzer.minDecibels = 0;
        //this.Analyzer.maxDecibels = 100;
        this.Analyzer.smoothingTimeConstant = 0.5;
        this.Analyzer.fftSize = 1024;
        this.Analyzer.getFloatFrequencyData(this.FreqData);
        
    },
    gainChange: function(v) {
        if (!v) {
            v = $("#gain").val();
        }
        this.Gain.gain.value = v;
    },
    FreqData: new Float32Array(1024),
    CurrentSource: null,
    DrawInterval: null,
    
    loopChange: function(v) {
        if (v) {
            this.Loop = v;
        }
        this.CurrentSource.source.loop = this.Loop;
    },
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
        var bufferLoader = new BufferLoader(this.Audioctx, this.LoadList, finishedLoading);
        
        bufferLoader.load();
        
        this.resizeCanvas();
        
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
                        _this.Gain = Audioctx.createGainNode();
                        source1.connect(_this.Gain);
                        _this.Analyzer = Audioctx.createAnalyser();
                        _this.Gain.connect(_this.Analyzer);
                        _this.Analyzer.connect(Audioctx.destination);
                        _this.FreqData = new Float32Array(_this.Analyzer.frequencyBinCount);
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
    },
    Canvas: {
        target: $(document.getElementById("cvs")),
        width: 0,
        height:0,
    },
    resizeCanvas: function() {
        var container = $(this.Canvas.target).parent();
        var size = Resize.getSize(container);
        this.Canvas.target.attr({            
            "width": size.width + "px",
            "height":size.height+"px",
        });
        this.Canvas.width = size.width;
        this.Canvas.height = size.height;
    },
    Ctx:null,
    drawGraph: function() {
        if (this.DrawInterval) {
            clearInterval(this.DrawInterval);
            this.DrawInterval = null;
        }
        !this.Ctx && (this.Ctx = this.Canvas.target[0].getContext("2d"));
        var time = 100;
        var _this = this;
        this.DrawInterval = setInterval(function() {
            var w = _this.Canvas.width;
            var h = _this.Canvas.height;
            _this.analyze();
            var ctx = _this.Ctx;
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
            var length = _this.FreqData.length/2;
            var center = {
                x: w / 2,
                y: h / 2,
            }
            w = w/2;
            if ( w > (length)) {
                var SPACING = w / length;
                for (var i = 0; i < length; i++) {
                    // Work out the hight of the current bar
                    // by getting the current frequency
                    //var magnitude =h/2+ (_this.FreqData[i]+48.16) * h/100;
                    var magnitude = (150 + _this.FreqData[i]) / 150 * h / 3;
                    if (magnitude > 0 && magnitude < h/2) {
                        // Draw a bar from the bottom up (cause for the "-magnitude")
                        ctx.fillRect(i * SPACING + center.x, (center.y - magnitude), SPACING, magnitude);
                        ctx.fillRect((-i * SPACING - SPACING) + center.x, (center.y - magnitude), SPACING, magnitude);
                        ctx.fillStyle = "rgba(255,255,255,0.10)";
                        ctx.fillRect(i * SPACING + center.x, (center.y), SPACING, magnitude);
                        ctx.fillRect((-i * SPACING - SPACING) + center.x, (center.y), SPACING, magnitude);
                        ctx.fillStyle = "rgba(255,255,255,0.25)";
                    } else {

                    }
                }
            } else {
                var spaceNumber = length / w;
                spaceNumber = Math.round(spaceNumber);
                for (var i = 0; i < length; i++) {
                    if (i % spaceNumber == 0) {
                        var magnitude = (150 + _this.FreqData[i]) / 150 * h / 3;
                        if (magnitude > 0 && magnitude < h / 2) {
                            // Draw a bar from the bottom up (cause for the "-magnitude")
                            ctx.fillRect(i + center.x, (center.y - magnitude), 1, magnitude);
                            ctx.fillRect((-i - 1) + center.x, (center.y - magnitude), 1, magnitude);
                            ctx.fillStyle = "rgba(255,255,255,0.10)";
                            ctx.fillRect(i + center.x, (center.y ), 1, magnitude);
                            ctx.fillRect((-i - 1) + center.x, (center.y), 1, magnitude);
                            ctx.fillStyle = "rgba(255,255,255,0.10)";
                        } else {

                        }
                    }
                    
                }
            }
            
            
            /*
            for (var d = -50; d < 50; d += 10) {
                var y = 128 - (d * h / 100) | 0;
                ctx.fillRect(20, y, 512, 1);
                ctx.fillText(d + "dB", 5, y);
            }
            ctx.fillRect(20, 128, 512, 1);
            for (var f = 2000; f < _this.Audioctx.sampleRate / 2; f += 2000) {
                var x = (f * 1024 / _this.Audioctx.sampleRate) | 0;
                ctx.fillRect(x, 0, 1, 245);
                ctx.fillText(f + "Hz", x - 10, 255);
            }
            */
        }, 100);
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

document.getElementById("gain").addEventListener('change',
  function (e) {
      CustomAudioContext.gainChange(this.value);
  });

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