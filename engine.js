const COLORS = ["white", "#134134", "#cc5599"];
const FRAMES_PER_SECOND = 1000 / 60;
const WINDOW_MARGIN = 50;
const TILE_SIZE = 8;
const NATIVE_WIDTH = TILE_SIZE * 16;
const NATIVE_HEIGHT = TILE_SIZE * 16;


const maxMultiplier = 10;
const maxWidth = NATIVE_WIDTH * maxMultiplier;
const maxHeight = NATIVE_HEIGHT * maxMultiplier;
const windowPercentage = 0.9;

var canvas = document.createElement('canvas');
var ctx = canvas.getContext("2d");

let accumulator = 0;
let previousTime = performance.now();
var gameContainer = document.getElementById("game");
gameContainer.append(canvas);

let cWidth = NATIVE_WIDTH;
let cHeight = NATIVE_HEIGHT; 

ctx.canvas.width = cWidth;
ctx.canvas.height = cHeight; 
ctx.imageSmoothingEnabled = false;

function resizeCanvas() {
    cWidth = window.innerWidth;
    cHeight = window.innerHeight;

    const nativeRatio = NATIVE_WIDTH / NATIVE_HEIGHT;
    const browserWindowRatio = cWidth / cHeight;

    // browser window is too wide
    if (browserWindowRatio > nativeRatio) {
        cHeight = Math.floor(cHeight * windowPercentage); // optional
        if (cHeight > maxWidth) cHeight = maxHeight; // optional
    
        cWidth = Math.floor(cHeight * nativeRatio);
    } else {
    // browser window is too high

    cWidth = Math.floor(cWidth * windowPercentage); // optional
    if (cWidth > maxWidth) cWidth = maxWidth; // optional

    cHeight = Math.floor(cWidth / nativeRatio);
    }

    ctx.canvas.style.width = `${cWidth}px`;
    ctx.canvas.style.height = `${cHeight}px`;

    // Redraw canvas content after resizing if needed
    _draw();
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

window.requestAnimationFrame(gameLoop);

function gameLoop(timestamp) {
    const delta = timestamp - previousTime;
	accumulator += delta;

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
    fillRect(0, 0, canvas.width, canvas.height, 1);
}

function rect(x, y, w, h, c) {
    //x *= TILE_SIZE; y *= TILE_SIZE; w *= TILE_SIZE; h *= TILE_SIZE;

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