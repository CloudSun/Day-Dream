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
                if (++loader.loadCount == loader.urlList.length) {
                    loader.onload(loader.bufferList, null);
                } else {
                    loader.onload(loader.bufferList[index], index);
                }
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
        this.loadBuffer(this.urlList[i], i);
};


var filePath = '../sound/';
var CustomAudioContext = {
    audioctx: null,
    loadList: [
        filePath + '境界的彼方ED「Daisy」.mp3',
        filePath + 'EGOIST-Departures ~あなたにおくるアイの歌~ (TV Edit) -Instrumental-.mp3',
        filePath + 'Supercell-My Dearest(《罪恶王冠》动漫主题曲).mp3',
        filePath + 'Supercell-告白 (Album Mix).mp3',
        filePath + 'ナノ-Silver Sky.mp3',
    ],
    analyzer: null,
    analyze: function () {
        this.analyzer.smoothingTimeConstant = 0.5;
        this.analyzer.fftSize = 1024;
        this.analyzer.getFloatFrequencyData(this.bufdata);
    },
    bufdata: new Float32Array(1024),
    currentSource: null,
    drawInterval: null,
    init: function () {
        if (this.audioctx) {
            return;
        }
        //init AudioContext and return the object
        try {
            // Fix up for prefixing
            window.AudioContext = window.AudioContext || window.webkitAudioContext;
            this.audioctx = new AudioContext();
        }
        catch (e) {
            alert('Web Audio API is not supported in this browser');
        }
        var _this = this;
        var bufferLoader = new BufferLoader(this.audioctx, this.loadList, finishedLoading);
        bufferLoader.load();
        function finishedLoading(bufferList, index) {
            var audioctx = _this.audioctx;
            if (index == 1) {
                $("#playBtn1").removeAttr("disabled");
                $("#playBtn1").unbind("click").click(function () {
                    var source1 = audioctx.createBufferSource();
                    source1.buffer = bufferList;
                    _this.analyzer = audioctx.createAnalyser();
                    source1.connect(audioctx.destination);
                    source1.connect(_this.analyzer);
                    _this.currentsource = source1;
                    source1.start(0);
                    _this.DrawGraph();
                });
            } else if (index == null) {
                //getAll bufferList
                $("#playBtn2").removeAttr("disabled");
                $("#playBtn2").unbind("click").click(function () {
                    var source2 = audioctx.createBufferSource();
                    source2.buffer = bufferList[bufferList.length - 1];
                    _this.analyzer = audioctx.createAnalyser();
                    source2.connect(audioctx.destination);
                    source2.connect(_this.analyzer);
                    _this.currentsource = source2;
                    source2.start(0);
                    _this.DrawGraph();;
                });
                
            }
        }
    },
    DrawGraph: function () {
        if (this.drawInterval) {
            clearInterval(this.drawInterval);
            this.drawInterval = null;
        }
        var time = 100;
        var _this = this;
        this.drawInterval = setInterval(function () {
            _this.analyze();
            var cv = document.getElementById("cvs");
            var ctx = cv.getContext("2d");
            ctx.fillStyle = "#000000";
            ctx.fillRect(0, 0, 512, 256);
            ctx.fillStyle = "#009900";
            for (var i = 0; i < 512; ++i) {
                var f = _this.audioctx.sampleRate * i / 1024;
                y = 128 + (_this.bufdata[i] + 48.16) * 2.56;
                ctx.fillRect(i, 256 - y, 1, y);
            }
            ctx.fillStyle = "#ff8844";
            for (var d = -50; d < 50; d += 10) {
                var y = 128 - (d * 256 / 100) | 0;
                ctx.fillRect(20, y, 512, 1);
                ctx.fillText(d + "dB", 5, y);
            }
            ctx.fillRect(20, 128, 512, 1);
            for (var f = 2000; f < _this.audioctx.sampleRate / 2; f += 2000) {
                var x = (f * 1024 / _this.audioctx.sampleRate) | 0;
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
 
// Create new Audio Context and an audio analyzer
audioContext = new webkitAudioContext();
analyser = audioContext.createAnalyser();
 
// Canvas' height and width
CANVAS_HEIGHT = canvas.height;
CANVAS_WIDTH = canvas.width;
// We'll need the offset later
OFFSET = 100;
// Spacing between the individual bars
SPACING = 10;
// Initialize and start drawing
// when the audio starts playing
window.onload = init;
audioElement.addEventListener('play', draw);
 
function init() {
  // Take input from audioElement
  source = audioContext.createMediaElementSource(audioElement);
  // Connect the stream to an analyzer
  source.connect(analyser);
  // Connect the analyzer to the speakers
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