const COLORS = ["white", "#134134", "#cc5599"];
const FRAMES_PER_SECOND = 1000 / 60;

var canvas = document.createElement('canvas');

let accumulator = 0;
let previousTime = performance.now();

const rows = 8;
const cols = 8;
const tileSize = 64;
const pixelSize = 8;

canvas.width = rows * tileSize;
canvas.height = cols * tileSize;
canvas.style.zIndex = 8;
canvas.style.position = "absolute";
canvas.style.border = "1px solid";

var body = document.getElementsByTagName("body")[0];
body.appendChild(canvas);

var ctx = canvas.getContext("2d");
ctx.imageSmoothingEnabled = false;

window.requestAnimationFrame(gameLoop);

function gameLoop(timestamp) {

    const delta = timestamp - previousTime;
	accumulator += delta;

    //console.log(accumulator, FRAMES_PER_SECOND);

    while (accumulator >= FRAMES_PER_SECOND) {
        _update();
        _draw();

        accumulator -= FRAMES_PER_SECOND;
    }

    previousTime = timestamp;

    window.requestAnimationFrame(gameLoop);
}

//function init(update) {
//    update();
//}
//init(_update);



// API

function cls() {
    fillRect(0, 0, canvas.width, canvas.height, 0);
}

function rect(x, y, w, h, c) {
    x *= pixelSize; y *= pixelSize; w *= pixelSize; h *= pixelSize;

    ctx.beginPath();
    ctx.lineWidth = "8";
    ctx.strokeStyle = COLORS[c];
    ctx.rect(x, y, w, h);
    ctx.stroke();
}

function fillRect(x, y, w, h, c) {
    ctx.fillStyle = COLORS[c];
    ctx.fillRect(x, y, w, h); 
}

function print(s, x, y, c) {
    ctx.fillStyle = COLORS[c];
    ctx.fillText(s, x, y, 200);
}