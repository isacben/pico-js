/** 
 * PICO-JS - A tiny JavaScript Game Engine
 * MIT License - Copyright 2025 Isaac Benitez
 * 
 * Engine Features
 * @namespace Engine
 */

'use strict';

/** Name of the engine
 *  @type {String}
 *  @default
 *  @memberof Engine */
const engineName = 'PICO-JS';

/** Version of engine
 *  @type {String}
 *  @default
 *  @memberof Engine */
const engineVersion = '0.1.0';

/** Array containing the engine colors
 *  @type {Array}
 *  @memberof Engine */
const COLORS = [
  "#000000", "#1D2B53", "#7E2553", "#008751", 
  "#AB5236", "#5F574F", "#C2C3C7", "#FFF1E8", 
  "#FF004D", "#FFA300", "#FFEC27", "#00E436",
  "#29ADFF", "#83769C", "#FF77A8", "#FFCCAA"];

/** Frames per second to update the game
 * @type {Number}
 * @default 1000/60
 * @memberof Engine */
const FRAMES_PER_SECOND = 1000 / 60;

/** Browser window marging
 * @type {Number}
 * @default 50
 * @memberof Engine */
const WINDOW_MARGIN = 50;

/** Size of the tiles
 * @type {Number}
 * @default 8
 * @memberof Engine */
const TILE_SIZE = 8;

/** The native game canvas width size in pixels
 * @type {Number}
 * @default 128
 * @memberof Engine */
const NATIVE_WIDTH = TILE_SIZE * 16;

/** The native game canvas height size in pixels
 * @type {Number}
 * @default 128
 * @memberof Engine */
const NATIVE_HEIGHT = TILE_SIZE * 16;

/** Max multiplier to control the size of the main canvas
 * @type {Number}
 * @default 10
 * @memberof Engine */
const maxMultiplier = 10;

/** Max virtual width of the main canvas
 * @type {Number}
 * @default
 * @memberof Engine */
const maxWidth = NATIVE_WIDTH * maxMultiplier;

/** Max virtual height of the main canvas
 * @type {Number}
 * @default
 * @memberof Engine */
const maxHeight = NATIVE_HEIGHT * maxMultiplier;

/** Value to adjust the virtual size of the canvas in the window
 * @type {Number}
 * @default 0.9
 * @memberof Engine */
const windowPercentage = 0.9;

/** Main engine state machine
 * @type {Object}
 * @default
 * @memberof Engine */
const engineState = Object.freeze({
  GAME: 'game',
  PAUSED: 'paused',
  RESET: 'reset'
});

/** Array of the available buttons in the engine
 * - 0: left
 * - 1: right
 * - 2: up
 * - 3: down
 * - 4: z
 * - 5: x
 *  @type {Array<Boolean>}
 *  @memberof Engine */
const buttons = [
  false, false, false, false,
  false, false
];

/** Engine current state of the engine state machine
 * @type {String}
 * @default
 * @memberof Engine */
let engineCurrentState = engineState.GAME;

/** Prevents input continuing to the default browser handling (false by default)
 *  @type {Boolean}
 *  @memberof Engine */
let preventDefaultInput = false;

/** Array containing the engine supported characters
 *  @type {Array}
 *  @memberof Engine */
const engineChars = {
  '!': [
    [,1],
    [,1],
    [,1],
    [,,],
    [,1],
  ],
  '"': [
    [1,,1],
    [1,,1]
  ],
  '#': [
    [1,,1],
    [1,1,1],
    [1,,1],
    [1,1,1],
    [1,,1]
  ],
  '$': [
    [1,1,1],
    [1,1],
    [,1,1],
    [1,1,1],
    [,1]
  ],
  '%': [
    [1,,1],
    [,,1],
    [,1],
    [1],
    [1,,1]
  ],
  '&': [
    [1,1],
    [1,1],
    [,1,1],
    [1,,1],
    [1,1,1]
  ],
  '\'': [
    [,1],
    [1],
  ],
  '(': [
    [,1],
    [1],
    [1],
    [1],
    [,1,,]
  ],
  ')': [
    [,1],
    [,,1],
    [,,1],
    [,,1],
    [,1]
  ],
  '*': [
    [1,,1],
    [,1],
    [1,1,1],
    [,1],
    [1,,1]
  ],
  '+': [
    [],
    [,1],
    [1,1,1],
    [,1],
  ],
  ',': [
    [],
    [],
    [],
    [,1],
    [1],
  ],
  '-': [
    [],
    [],
    [1,1,1],
  ],
  '.': [
    [],
    [],
    [],
    [],
    [,1,,]
  ],
  '/': [
    [,,1],
    [,1],
    [,1],
    [,1],
    [1]
  ],
  ':': [
    [,],
    [,1],
    [],
    [,1,,],
  ],
  ';': [
    [,],
    [,1],
    [],
    [,1],
    [1,,,]
  ],
  '<': [
    [,,1],
    [,1],
    [1,],
    [,1],
    [,,1]
  ],
  '=': [
    [],
    [1,1,1],
    [],
    [1,1,1],
  ],
  '>': [
    [1],
    [,1],
    [,,1],
    [,1],
    [1]
  ],
  '?': [
    [1,1,1],
    [,,1],
    [,1,1],
    [],
    [,1]
  ],
  '@': [
    [,1],
    [1,,1],
    [1,,1],
    [1],
    [,1,1]
  ],
  '{': [
    [,1,1],
    [,1],
    [1,1],
    [,1],
    [,1,1]
  ],
  '|': [
    [,1],
    [,1],
    [,1],
    [,1],
    [,1,,]
  ],
  '}': [
    [1,1],
    [,1],
    [,1,1],
    [,1],
    [1,1]
  ],
  '[': [
    [1,1],
    [1],
    [1],
    [1],
    [1,1,,]
  ],
  '\\': [
    [1],
    [,1],
    [,1],
    [,1],
    [,,1]
  ],
  ']': [
    [,1,1],
    [,,1],
    [,,1],
    [,,1],
    [,1,1]
  ],
  '0': [
      [1,1,1],
      [1,,1],
      [1,,1],
      [1,,1],
      [1,1,1],
  ],
  '1': [
    [1,1],
    [,1],
    [,1],
    [,1],
    [1,1,1],
  ],
  '2': [
    [1,1,1],
    [,,1],
    [1,1,1],
    [1],
    [1,1,1],
  ],
  '3': [
    [1,1,1],
    [,,1],
    [,1,1],
    [,,1],
    [1,1,1],
  ],
  '4': [
    [1,,1],
    [1,,1],
    [1,1,1],
    [,,1],
    [,,1],
  ],
  '5': [
    [1,1,1],
    [1],
    [1,1,1],
    [,,1],
    [1,1,1],
  ],
  '6': [
    [1],
    [1],
    [1,1,1],
    [1,,1],
    [1,1,1],
  ],
  '7': [
    [1,1,1],
    [,,1],
    [,,1],
    [,,1],
    [,,1],
  ],
  '8': [
    [1,1,1],
    [1,,1],
    [1,1,1],
    [1,,1],
    [1,1,1],
  ],
  '9': [
    [1,1,1],
    [1,,1],
    [1,1,1],
    [,,1],
    [,,1],
  ],
  'A': [
      [1,1,1],
      [1,,1],
      [1,1,1],
      [1,,1],
      [1,,1]
  ],
  'B': [
      [1,1,1],
      [1, ,1],
      [1,1],
      [1,,1],
      [1,1,1]
  ],
  'C': [
    [,1,1],
    [1],
    [1],
    [1],
    [,1,1]
  ],
  'D': [
    [1,1],
    [1,,1],
    [1,,1],
    [1,,1],
    [1,1,1]
  ],
  'E': [
    [1,1,1],
    [1],
    [1,1],
    [1],
    [1,1,1]
  ],
  'F': [
    [1,1,1],
    [1],
    [1,1],
    [1],
    [1]
  ],
  'G': [
    [,1,1],
    [1],
    [1],
    [1,,1],
    [1,1,1]
  ],
  'H': [
    [1,,1],
    [1,,1],
    [1,1,1],
    [1,,1],
    [1,,1]
  ],
  'I': [
    [1,1,1],
    [,1],
    [,1],
    [,1],
    [1,1,1]
  ],
  'J': [
    [1,1,1],
    [,1],
    [,1],
    [,1],
    [1,1]
  ],
  'K': [
    [1,,1],
    [1,,1],
    [1,1],
    [1,,1],
    [1,,1]
  ],
  'L': [
    [1],
    [1],
    [1],
    [1],
    [1,1,1]
  ],
  'M': [
    [1,1,1],
    [1,1,1],
    [1,,1],
    [1,,1],
    [1,,1]
  ],
  'N': [
    [1,1],
    [1,,1],
    [1,,1],
    [1,,1],
    [1,,1]
  ],
  'O': [
    [,1,1],
    [1,,1],
    [1,,1],
    [1,,1],
    [1,1]
  ],
  'P': [
    [1,1,1],
    [1,,1],
    [1,1,1],
    [1],
    [1]
  ],
  'Q': [
    [,1],
    [1,,1],
    [1,,1],
    [1,1],
    [,1,1]
  ],
  'R': [
    [1,1,1],
    [1,,1],
    [1,1],
    [1,,1],
    [1,,1]
  ],
  'S': [
    [,1,1],
    [1],
    [1,1,1],
    [,,1],
    [1,1]
  ],
  'T': [
    [1,1,1],
    [,1],
    [,1],
    [,1],
    [,1]
  ],
  'U': [
    [1,,1],
    [1,,1],
    [1,,1],
    [1,,1],
    [,1,1]
  ],
  'V': [
    [1,,1],
    [1,,1],
    [1,,1],
    [1,1,1],
    [,1]
  ],
  'W': [
    [1,,1],
    [1,,1],
    [1,,1],
    [1,1,1],
    [1,1,1]
  ],
  'X': [
    [1,,1],
    [1,,1],
    [,1],
    [1,,1],
    [1,,1]
  ],
  'Y': [
    [1,,1],
    [1,,1],
    [1,1,1],
    [,,1],
    [1,1,1]
  ],
  'Z': [
    [1,1,1],
    [,,1],
    [,1],
    [1],
    [1,1,1]
  ],
  ' ': [
    [,,,]
  ],
}

/** Canvas virtual width
 * @type {Number}
 * @default
 * @memberof Engine */
let cWidth = NATIVE_WIDTH;

/** Canvas virtual height
 * @type {Number}
 * @default
 * @memberof Engine */
let cHeight = NATIVE_HEIGHT; 

let accumulator = 0;
let previousTime = performance.now();

/** Main Canvas
 * @type {HTMLElement}
 * @default
 * @memberof Engine */
const canvas = document.getElementById('can');

const ctx = canvas.getContext("2d");

/** Device pixel ratio
 * @type {Number}
 * @default
 * @memberof Engine */
const ratio = window.devicePixelRatio || 1;

canvas.width = cWidth * ratio;
canvas.height = cHeight * ratio; 
ctx.imageSmoothingEnabled = false;

ctx.scale(ratio,ratio);

/** Resize main canvas based on the browser window size
 *  @memberof Engine */
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

/** Main engine game loop
 *  @param {Number} timestamp - Timestamp when the game loop starts 
 *  @memberof Engine */
function gameLoop(timestamp) {
  const delta = timestamp - previousTime;
	accumulator += delta;

  while (accumulator >= FRAMES_PER_SECOND) {

      if (engineCurrentState === engineState.GAME) {
        _update();
      }
      _draw();

      accumulator -= FRAMES_PER_SECOND;
  }

  previousTime = timestamp;
  window.requestAnimationFrame(gameLoop);
}

////////////////////////////////////////////////////////////////////////////////
// Main engine API

/** Clear game screen
 *  @param {Number} [color] - Color to cover the screen with (defualt=0)
 *  @memberof Engine */
function cls(color=0) {
    rectfill(0, 0, canvas.width, canvas.height, color);
}

/** Draw a rectangle
 *  @param {Number} x - Coordinate x of the top left corner of the rectangle
 *  @param {Number} y - Coordinate y of the top left corner of the rectangle
 *  @param {Number} w - Width of the rectangle
 *  @param {Number} h - Height of the rectangle
 *  @param {Number} [c] - Color of the rectangle (default=6)
 * @example
 * rect(10, 10, 50, 30, 7)  // draw a white rectangle at (10,10)
 * @memberof Engine */
function rect(x, y, w, h, c=6) {
    x += .5;
    y += .5;
    w -= 1;
    h -= 1;
    ctx.strokeStyle = COLORS[c];
    ctx.strokeRect(x, y, w, h);
}

/** Draw a filled rectangle
 *  @param {Number} x - Coordinate x of the top left corner of the rectangle
 *  @param {Number} y - Coordinate y of the top left corner of the rectangle
 *  @param {Number} w - Width of the rectangle
 *  @param {Number} h - Height of the rectangle
 *  @param {Number} [c] - Color of the rectangle (default=6)
 * @example
 * rectfill(10, 10, 50, 30, 7)  // draw a white filled rectangle at (10,10)
 * @memberof Engine */
function rectfill(x, y, w, h, c=6) {
    ctx.fillStyle = COLORS[c];
    ctx.fillRect(x, y, w, h); 
}

/** Helper function to draw a circle or a filled circle
 *  @param {Number} centerX   - Coordinate x of the center of the circle
 *  @param {Number} centerY   - Coordinate y of the center of the circle
 *  @param {Number} radius    - Radius of the circle
 *  @param {Number} color     - Color of the circle
 *  @param {Boolean} [filled] - If true the circle is filled
 * @memberof Engine */
function drawCircle(centerX, centerY, radius, color, filled=false) {
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
  
/** Helper function to plot the pixels of the circunference
 *  @param {Number} centerX - Coordinate x of the center of the circle
 *  @param {Number} centerY - Coordinate y of the center of the circle
 *  @param {Number} x       - Coordinate x of the point in the circunference
 *  @param {Number} y       - Coordinate y of the point in the circunference
 * @memberof Engine */
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
 
/** Helper function to plot a single pixels
 *  @param {Number} x - Coordinate x of the pixel
 *  @param {Number} y - Coordinate y of the pixel
 * @memberof Engine */
function plotPixel(x, y) {
    ctx.fillRect(x, y, 1, 1);
}

/** Helper function to plot a horizontal line to draw a filled circle
 *  @param {Number} x1  - Coordinate x of the left side of the horizontal line
 *  @param {Number} x2  - Coordinate x of the right side of the horizontal line
 *  @param {Number} y   - Coordinate y of the horizontal line
 * @memberof Engine */
function drawHorizontalLine(x1, x2, y) {
  for (let x = x1; x <= x2; x++) {
    ctx.fillRect(x, y, 1, 1);
  }
}

/** Draw a circle
 *  @param {Number} x   - Coordinate x of the center of the circle
 *  @param {Number} y   - Coordinate y of the center of the circle
 *  @param {Number} r   - Radius of the circle
 *  @param {Number} [c] - Color of the circle (default=6)
 * @example
 * circ(10, 10, 5, 7)  // draw a white circle with center at (10,10)
 * @memberof Engine */
function circ(x, y, r, c=6) {
    drawCircle(x, y, r, COLORS[c]);
}

/** Draw a filled circle
 *  @param {Number} x   - Coordinate x of the center of the circle
 *  @param {Number} y   - Coordinate y of the center of the circle
 *  @param {Number} r   - Radius of the circle
 *  @param {Number} [c] - Color of the circle (defualt=6)
 * @example
 * circfill(10, 10, 5, 7)  // draw a white filled circle with center at (10,10)
 * @memberof Engine */
function circfill(x, y, r, c=6) {
    drawCircle(x, y, r, COLORS[c], true);
}

//function drawPixel(x, y) {
//  ctx.fillRect(x, y, 1, 1);
//}

/** Draw a line
 *  @param {Number} x0  - Coordinate x of the left side of the line
 *  @param {Number} y0  - Coordinate y of the left side of the line
 *  @param {Number} x1  - Coordinate x of the right side of the line
 *  @param {Number} y1  - Coordinate y of the right side of the line
 *  @param {Number} [c]   - Color of the line (default=6)
 * @example
 * line(10, 10, 20, 20, 7)  // draw a white line
 * @memberof Engine */
function line(x0, y0, x1, y1, c=6) {
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

/** Print a string on the screen
 *  @param {String} str   - String to print
 *  @param {Number} posX  - Coordinate x of the string on the screen
 *  @param {Number} posY  - Coordinate y of the string on the scree
 *  @param {Number} [c]   - Color of the line (default=6)
 * @example
 * print("hello world", 10, 20, 7) // print the text "hello world"
 * @memberof Engine */
function print(str, posX, posY, c=6) {
  ctx.fillStyle = COLORS[c];

  let needed = [];
  str = str.toUpperCase();

  for (let i = 0; i < str.length; i++) {
    let char = engineChars[str.charAt(i)];
    if (char) {
        needed.push(char);
    }
  }

  let currX = 0;
  for (let i = 0; i < needed.length; i++) {
    let char = needed[i];
    let currY = 0;
    let addX = 0;

    for (let y = 0; y < char.length; y++) {
      let row = char[y];
      for (let x = 0; x < row.length; x++) {
        if (row[x]) {
          ctx.fillRect(posX + currX + x, posY + currY, 1, 1);
        }
      }
      addX = Math.max(addX, row.length);
      currY += 1;
    }
    currX += 1 + addX;
  }
}

/** Draw a sprite on the screen
 *  @param {Number} n - Index of the sprite
 *  @param {Number} x  - Coordinate x of the sprite on the screen
 *  @param {Number} y  - Coordinate y of the sprite on the scree
 * @example
 * spr(0, 10, 20) // draw sprite 0 at position (10,20)
 * @memberof Engine */
function spr(n, x, y) {
  const sprite = sprites[n];
  let currY = 0;

  for (let row = 0; row < sprite.length; row++) {
    let currRow = sprite[row];
    for (let col = 0; col < currRow.length; col++) {
      if (currRow[col]) {
        const color = COLORS[sprite[row][col]];
        ctx.fillStyle = color;
        ctx.fillRect(x + col, y + currY, 1, 1);
      }
    }
    currY += 1;
  }
}

/** Get button state
 * - b=0: left
 * - b=1: right
 * - b=2: up
 * - b=3: down
 * - b=4: z
 * - b=5: x
 *  @param {Number} b - Id of the button
 * @example
 * btn(5) // returns true when `x` is press
e* @memberof Engine */
function btn(b) {
  if (buttons[b]) return true;
  return false;
}



document.addEventListener('keydown', (event) => {
  if (!event.repeat) {
    switch (event.key) {
      case "ArrowLeft":
        buttons[0] = true;
        break;
      case "ArrowRight":
        buttons[1] = true;
        break;
      case "ArrowUp":
        buttons[2] = true;
        break;
      case "ArrowDown":
        buttons[3] = true;
        break;
    }
  }

  preventDefaultInput && e.preventDefault();
});

document.addEventListener('keyup', (event) => {
  switch (event.key) {
    case "ArrowLeft":
      buttons[0] = false;
      break;
    case "ArrowRight":
      buttons[1] = false;
      break;
    case "ArrowUp":
      buttons[2] = false;
      break;
    case "ArrowDown":
      buttons[3] = false;
      break;
  }
});