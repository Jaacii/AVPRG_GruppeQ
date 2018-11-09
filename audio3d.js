
//variablen
var audioContext = new AudioContext();
var sound = new Audio("../audiosamples/StockAudio.mp3");
var mediaElementAudioSource = audioContext.createMediaElementSource(sound);
var isPlaying = false;
var playStopButton = document.getElementById("playStopButton");
sound.loop = true;


let onLoad = function() {
    Bonus2Scene = new ResonanceAudio(audioContext);
    soundSource = Bonus2Scene.createSource();
    mediaElementAudioSource.connect(soundSource.input);
    Bonus2Scene.output.connect(audioContext.destination);

    let canvas = document.getElementById("canvas");
    let elements = [
        {
            icon: "sourceAIcon",
            x: 0.25,
            y: 0.25,
            radius: 0.04,
            alpha: 0.75,
            clickable: true,
        },
        {
            icon: "listenerIcon",
            x: 0.5,
            y: 0.5,
            radius: 0.04,
            alpha: 0.75,
            clickable: true,
        },
    ];

    canvasControl = new CanvasControl(canvas, elements, updatePositions);
};

window.addEventListener("load", onLoad);


function updatePositions(elements) {
    for (let i = 0; i < elements.length; i++) {
        let x = (elements[i].x - 0.5) * dimensions[dimensionSelection].width / 2;
        let y = 0;
        let z = (elements[i].y - 0.5) * dimensions[dimensionSelection].depth / 2;
        if (i < elements.length - 1) {
            sourcePosition.x = x;
            sourcePosition.z = z;
            soundSource.setPosition(x, sourcePosition.y, z);
        } else {
            Bonus2Scene.setListenerPosition(x, y, z);
        }
    }
}

playStopButton.addEventListener("click", function (e) {
    if (isPlaying) {
        sound.pause();
        playStopButton.innerHTML = "Play";
    } else {
        sound.play();
        playStopButton.innerHTML = "Stop";
    }
    isPlaying = !isPlaying;
  });
  
  sound.addEventListener("ended", function (e) {
    isPlaying = false;
    playStopButton.innerHTML = "Play";
});