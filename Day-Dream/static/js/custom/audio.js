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
            src:filePath + 'ナノ-Silver Sky.mp3',
        },{
            title:"EGOIST-Departures",
            src: filePath + 'EGOIST-Departures ~あなたにおくるアイの歌~ (TV Edit) -Instrumental-.mp3',
        }
    ],
    Analyzer: null,
    analyze: function () {
        this.Analyzer.smoothingTimeConstant = 0.5;
        this.Analyzer.fftSize = 1024;
        this.Analyzer.getFloatFrequencyData(this.Bufdata);
    },
    Bufdata: new Float32Array(1024),
    CurrentSource: null,
    DrawInterval: null,
    Loop: true,
    loopChange:function(){
        this.CurrentSource.source.loop = this.Loop;
    },
    init: function () {
        if (this.Audioctx) {
            return;
        }
        //init AudioContext and return the object
        try {
            // Fix up for prefixing
            window.AudioContext = window.AudioContext || window.webkitAudioContext;
            this.Audioctx = new AudioContext();
        }
        catch (e) {
            alert('Web Audio API is not supported in this browser');
        }
        var _this = this;
        var bufferLoader = new BufferLoader(this.Audioctx, this.LoadList, finishedLoading);
        bufferLoader.load();
        function finishedLoading(bufferList, index) {
            var Audioctx = _this.Audioctx;
            var audioContainer = $("#AudioControl");
            if (index != null) {
                var btnControl = $("<input type='button' id='play"+index+"' value='PLAY'/>");
                var spanInfo = $("<span>" + _this.LoadList[index].title + "</span>");
                audioContainer.append(btnControl).append(spanInfo).append("<br/>");
                btnControl.unbind("click").click(function () {
                    if (_this.CurrentSource && _this.CurrentSource.index != index) {
                        _this.CurrentSource.source.stop(0);
                    }
                    if (this.value() == "PLAY") {
                        var source1 = Audioctx.createBufferSource();
                        source1.buffer = bufferList;
                        _this.Analyzer = Audioctx.createAnalyser();
                        source1.connect(Audioctx.destination);
                        source1.connect(_this.Analyzer);
                        _this.CurrentSource = {
                            source: source1,
                            index: index,
                        }
                        source1.loop = _this.Loop;
                        source1.start(0);
                        _this.drawGraph();
                    } else {

                    }
                    
                });
            }
        }
    },
    drawGraph: function () {
        if (this.DrawInterval) {
            clearInterval(this.DrawInterval);
            this.DrawInterval = null;
        }
        var time = 100;
        var _this = this;
        this.DrawInterval = setInterval(function () {
            _this.analyze();
            var cv = document.getElementById("cvs");
            var ctx = cv.getContext("2d");
            ctx.fillStyle = "#000000";
            ctx.fillRect(0, 0, 512, 256);
            ctx.fillStyle = "#009900";
            for (var i = 0; i < 512; ++i) {
                var f = _this.Audioctx.sampleRate * i / 1024;
                y = 128 + (_this.Bufdata[i] + 48.16) * 2.56;
                ctx.fillRect(i, 256 - y, 1, y);
            }
            ctx.fillStyle = "#ff8844";
            for (var d = -50; d < 50; d += 10) {
                var y = 128 - (d * 256 / 100) | 0;
                ctx.fillRect(20, y, 512, 1);
                ctx.fillText(d + "dB", 5, y);
            }
            ctx.fillRect(20, 128, 512, 1);
            for (var f = 2000; f < _this.Audioctx.sampleRate / 2; f += 2000) {
                var x = (f * 1024 / _this.Audioctx.sampleRate) | 0;
                ctx.fillRect(x, 0, 1, 245);
                ctx.fillText(f + "Hz", x - 10, 255);
            };
        }, 100);
    },
}

CustomAudioContext.init();




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