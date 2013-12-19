var audioctx;

var CustomAudioContext = {
    init: function () {
        //init AudioContext and return the object
        try {
            // Fix up for prefixing
            window.AudioContext = window.AudioContext || window.webkitAudioContext;
            return new AudioContext();
        }
        catch (e) {
            alert('Web Audio API is not supported in this browser');
        }
    }
};


audioctx = CustomAudioContext.init();

var bufferLoader = new BufferLoader(
    audioctx,
    [
     '../sound/ナノ-Silver Sky.mp3',
     //'../sound/MyDearest.mp3'
    ],
    finishedLoading
    );
//bufferLoader.load();

var DrawInterval = null;
var CurrentSource = null;
var Analyzer = null;
var bufsize = 1024;
var data = new Float32Array(bufsize);
//return the buffer or bufferlist & according the index value
function finishedLoading(bufferList, index) {
    /*
    // Create two sources and play them both together.
    var source1 = audioctx.createBufferSource();
    //var source2 = context.createBufferSource();
    source1.buffer = bufferList[0];
    //source2.buffer = bufferList[1];
    var analyzer = audioctx.createAnalyser();
    source1.connect(audioctx.destination);
    //source2.connect(context.destination);
    source1.connect(analyzer);
    //source2.start(0);
    source1.start(0);
    setInterval(DrawGraph(audioctx,analyzer), 100);
    */
    if (index == 0) {
        var source1 = audioctx.createBufferSource();
        source1.buffer = bufferList;
        $("#playBtn1").removeAttr("disabled");
        $("#playBtn1").unbind("click").click(function () {
            Analyzer = audioctx.createAnalyser();
            source1.connect(audioctx.destination);
            CurrentSource = source1;
            source1.start(0);
            //DrawInterval = setInterval(DrawGraph(), 100);
        });
    } else if (index == null) {
        //getAll bufferList
        $("#playBtn2").removeAttr("disabled");
        var source2 = audioctx.createBufferSource();
        source2.buffer = bufferList[bufferList.length - 1];
        source2.connect(audioctx.destination);
        CurrentSource = source2;
    }
}
$("#playBtn2").unbind("click").click(function () {
    Analyzer = audioctx.createAnalyser();
    setInterval(function () { DrawGraph() }, 100);
    CurrentSource.start(0);
});


function Analyze() {
    Analyzer.smoothingTimeConstant = 0.5;
    Analyzer.fftSize = 1024;
    Analyzer.getFloatFrequencyData(data);
}
var drawNumber = 0;
function DrawGraph() {
    Analyze();
    var cv = document.getElementById("cvs");
    var ctx = cv.getContext("2d");
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, 512, 256);
    ctx.fillStyle = "#009900";
    for (var i = 0; i < 512; ++i) {
        var f = audioctx.sampleRate * i / 1024;
        y = 128 + (data[i] + 48.16) * 2.56;
        ctx.fillRect(i, 256 - y, 1, y);
    }
    ctx.fillStyle = "#ff8844";
    for (var d = -50; d < 50; d += 10) {
        var y = 128 - (d * 256 / 100) | 0;
        ctx.fillRect(20, y, 512, 1);
        ctx.fillText(d + "dB", 5, y);
    }
    ctx.fillRect(20, 128, 512, 1);
    for (var f = 2000; f < audioctx.sampleRate / 2; f += 2000) {
        var x = (f * 1024 / audioctx.sampleRate) | 0;
        ctx.fillRect(x, 0, 1, 245);
        ctx.fillText(f + "Hz", x - 10, 255);
    }
    $("#alert").html(drawNumber++);
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