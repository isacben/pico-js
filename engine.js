const COLORS = [
    "#000000", "#1D2B53", "#7E2553", "#008751", 
    "#AB5236", "#5F574F", "#C2C3C7", "#FFF1E8", 
    "#FF004D", "#FFA300", "#FFEC27", "#00E436",
    "#29ADFF", "#83769C", "#FF77A8", "#FFCCAA"];
const FRAMES_PER_SECOND = 1000 / 60;
const WINDOW_MARGIN = 50;
const TILE_SIZE = 8;
const NATIVE_WIDTH = TILE_SIZE * 16;
const NATIVE_HEIGHT = TILE_SIZE * 16;

let cWidth = NATIVE_WIDTH;
let cHeight = NATIVE_HEIGHT; 

const maxMultiplier = 10;
const maxWidth = NATIVE_WIDTH * maxMultiplier;
const maxHeight = NATIVE_HEIGHT * maxMultiplier;
const windowPercentage = 0.9;

let accumulator = 0;
let previousTime = performance.now();

const canvas = document.getElementById('can');
const ctx = canvas.getContext("2d");

const ratio = window.devicePixelRatio || 1;

canvas.width = cWidth * ratio;
canvas.height = cHeight * ratio; 
ctx.imageSmoothingEnabled = false;

ctx.scale(ratio,ratio);

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

// API

function cls() {
    fillrect(0, 0, canvas.width, canvas.height, 0);
}

function rect(x, y, w, h, c) {
    x += .5;
    y += .5;
    w -= 1;
    h -= 1;
    ctx.strokeStyle = COLORS[c];
    ctx.strokeRect(x, y, w, h);
}

function fillrect(x, y, w, h, c) {
    ctx.fillStyle = COLORS[c];
    ctx.fillRect(x, y, w, h); 
}

function circ(x, y, r, c) {
    ctx.strokeStyle = COLORS[c];
    ctx.beginPath();
    ctx.arc(x+.5, y+.5, r, 0, 2 * Math.PI);
    ctx.stroke();
}
function print(s, x, y, c) {
    ctx.fillStyle = COLORS[c];
    ctx.fillText(s, x, y, 200);
}