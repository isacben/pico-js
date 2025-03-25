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

const maxMultiplier = 10;
const maxWidth = NATIVE_WIDTH * maxMultiplier;
const maxHeight = NATIVE_HEIGHT * maxMultiplier;
const windowPercentage = 0.9;

let cWidth = NATIVE_WIDTH;
let cHeight = NATIVE_HEIGHT; 

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

function drawCircle(centerX, centerY, radius, filled, color) {
    let x = 0;
    let y = radius;
    let decisionParameter = 1 - radius;

    ctx.fillStyle = color;
  
    // Plot the initial point
    if (filled) {
      drawHorizontalLine(centerX - radius, centerX + radius, centerY);
    } else {
      plotCirclePoints(centerX, centerY, x, y);
    }
  
    while (x < y) {
        x++;
        if (decisionParameter < 0) {
            decisionParameter += 2 * x + 1;
        } else {
            y--;
            decisionParameter += 2 * (x - y) + 1;
        }

        if (filled) {
          drawHorizontalLine(centerX - x, centerX + x, centerY + y);
          drawHorizontalLine(centerX - x, centerX + x, centerY - y);
          drawHorizontalLine(centerX - y, centerX + y, centerY + x);
          drawHorizontalLine(centerX - y, centerX + y, centerY - x);
        } else {
          plotCirclePoints(centerX, centerY, x, y);
        }
    }
}
  
function plotCirclePoints(centerX, centerY, x, y) {
    plotPixel(centerX + x, centerY + y);
    plotPixel(centerX - x, centerY + y);
    plotPixel(centerX + x, centerY - y);
    plotPixel(centerX - x, centerY - y);
    plotPixel(centerX + y, centerY + x);
    plotPixel(centerX - y, centerY + x);
    plotPixel(centerX + y, centerY - x);
    plotPixel(centerX - y, centerY - x);
}
  
function plotPixel(x, y) {
    ctx.fillRect(x, y, 1, 1);
}

function drawHorizontalLine(x1, x2, y) {
  for (let x = x1; x <= x2; x++) {
    ctx.fillRect(x, y, 1, 1);
  }
}

function circ(x, y, r, c) {
    drawCircle(x, y, r, false, COLORS[c]);
}

function circfill(x, y, r, c) {
    drawCircle(x, y, r, true, COLORS[c]);
}

function drawPixel(x, y) {
  ctx.fillRect(x, y, 1, 1);
}

function line(x0, y0, x1, y1, c) {
  let dx = Math.abs(x1 - x0);
  let dy = Math.abs(y1 - y0);
  let sx = (x0 < x1) ? 1 : -1;
  let sy = (y0 < y1) ? 1 : -1;
  let err = (dx > dy ? dx : -dy) / 2;

  ctx.fillStyle = COLORS[c];
  
  while (true) {
    ctx.fillRect(x0, y0, 1, 1);

    if (x0 === x1 && y0 === y1) break;

    let e2 = err;
    if (e2 > -dx) {
      err -= dy;
      x0 += sx;
    }
    if (e2 < dy) {
      err += dx;
      y0 += sy;
    }
  }
}

function print(s, x, y, c) {
    ctx.fillStyle = COLORS[c];
    ctx.fillText(s, x, y, 200);
}