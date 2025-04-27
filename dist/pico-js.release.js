// PICO-JS - MIT License - Copyright 2025 Isaac Benitez

'use strict';

/** 
 * PICO-JS - A tiny JavaScript Game Engine
 * MIT License - Copyright 2025 Isaac Benitez
 * 
 * Engine Features
 * 
 * Call engineInit() to start the engine!
 * @namespace Engine
 */



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
 * @type {{PLAYING: string, PAUSED: string, MENU: string, RESET: string}}
 * @memberof Engine */
const engineState = {
  PLAYING: 'playing',
  PAUSED: 'paused',
  MENU: 'menu',
  RESET: 'reset'
};

/** Array of the available buttons in the engine
 * - 0: left
 * - 1: right
 * - 2: up
 * - 3: down
 * - 4: z
 * - 5: x
 * @type {Array<Boolean>}
 * @memberof Engine */
const buttons = [
  false, false, false, false,
  false, false
];

/** Array to keep track of the number of frames that have passed when a button remains pressed
 * @type {Array<Number>}
 * @memberof Engine */
let pressedBtnCounter = [0, 0, 0, 0, 0, 0];

/** Engine current state of the engine state machine
 * @type {String}
 * @default
 * @memberof Engine */
let engineCurrentState = engineState.PLAYING;

/** Prevents input continuing to the default browser handling (false by default)
 *  @type {Boolean}
 *  @memberof Engine */
let preventDefaultInput = false;

/** Array containing the engine supported characters
 *  @type {{[key: string]: number[][]}}
 *  @memberof Engine */
const engineChars = {
  '~': [
    [1],
    [1,1],
    [1,1,1],
    [1,1],
    [1]
  ],
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
 * @type {HTMLCanvasElement}
 * @memberof Engine */
let canvas;
canvas = document.createElement('canvas');

/** Game area
 * @type {HTMLElement}
 * @memberof Engine */
const rootElement = document.getElementById('game');
rootElement.appendChild(canvas);

/** Main canvas context
 * @type {CanvasRenderingContext2D}
 * @memberof Engine */
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

/**
 * @type {HTMLImageElement}
 */
let spritesImg = new Image;
//rootElement.appendChild(spritesImg); // for debugging, display sprites sheet

/**
 * Draw the sprites sheet from a secondary canvas
 * @param {{[key: string]: number[][]}} sprites - Contains the sprites to be used in the game
 * @memberof Engine */
function drawSprites(sprites) {
  const spritesCanvas = document.createElement('canvas');
  spritesCanvas.width = 128;
  spritesCanvas.height = 128;
  let c = spritesCanvas.getContext('2d');
  
  let x = 0; 
  let y = 0;
  Object.keys(sprites).forEach((key) => {
    const sprite = sprites[key];
    let currY = 0;

    x = Math.floor(Number(key) % 16) * 8;
    y = Math.floor(Number(key) / 16) * 8;
    for (let row = 0; row < sprite.length; row++) {
      let currRow = sprite[row];
      for (let col = 0; col < currRow.length; col++) {
        if (currRow[col]) {
          const color = COLORS[sprite[row][col]];
          c.fillStyle = color;
          c.fillRect(x + col, y + currY, 1, 1);
        }
      }
      currY += 1;
    }
  });
  c.drawImage(spritesImg, 0, 0, 128, 128);
  spritesImg.src = spritesCanvas.toDataURL();
}

/** Startup PICO-JS engine
 * @param {Function} _update - Called every frame to update the game objects
 * @param {Function} _draw - Called every frame to render the game objects
 * @param {{[key: string]: number[][]}} sprites - Contains the sprites to be used in the game
 * @memberof Engine
 */
function engineInit(_update, _draw, sprites) {

  // Resize main canvas based on the browser window size
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
      if (engineCurrentState === engineState.PAUSED) drawEngineMenu();
  }

  // Main engine game loop
  function gameLoop(timestamp=0) {
    const delta = timestamp - previousTime;
    accumulator += delta;
    const fps = Math.round(1000 / delta);

    while (accumulator >= FRAMES_PER_SECOND) {
      switch (engineCurrentState) {
        case engineState.PLAYING:
          _update();
          _draw();
          print(`FPS: ${fps}`, 0, 0, 7);
          break;
        case engineState.PAUSED:
          _draw();
          drawEngineMenu();
          break;
      }
      accumulator -= FRAMES_PER_SECOND;
    }

    previousTime = timestamp;
    window.requestAnimationFrame(gameLoop);
  }
  
  drawSprites(sprites);
  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();
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
 *  @param {Number} width - Width of the rectangle
 *  @param {Number} height - Height of the rectangle
 *  @param {Number} [color] - Color of the rectangle (default=6)
 * @example
 * rect(10, 10, 50, 30, 7)  // draw a white rectangle at (10,10)
 * @memberof Engine */
function rect(x, y, width, height, color=6) {
    x += .5;
    y += .5;
    width -= 1;
    height -= 1;
    ctx.strokeStyle = COLORS[color];
    ctx.strokeRect(x, y, width, height);
}

/** Draw a filled rectangle
 *  @param {Number} x - Coordinate x of the top left corner of the rectangle
 *  @param {Number} y - Coordinate y of the top left corner of the rectangle
 *  @param {Number} width - Width of the rectangle
 *  @param {Number} height - Height of the rectangle
 *  @param {Number} [color] - Color of the rectangle (default=6)
 * @example
 * rectfill(10, 10, 50, 30, 7)  // draw a white filled rectangle at (10,10)
 * @memberof Engine */
function rectfill(x, y, width, height, color=6) {
    ctx.fillStyle = COLORS[color];
    ctx.fillRect(x, y, width, height); 
}

/** Helper function to draw a circle or a filled circle
 *  @param {Number} centerX   - Coordinate x of the center of the circle
 *  @param {Number} centerY   - Coordinate y of the center of the circle
 *  @param {Number} radius    - Radius of the circle
 *  @param {String} color     - Color of the circle
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
 *  @param {Number} radius   - Radius of the circle
 *  @param {Number} [color] - Color of the circle (default=6)
 * @example
 * circ(10, 10, 5, 7)  // draw a white circle with center at (10,10)
 * @memberof Engine */
function circ(x, y, radius, color=6) {
    drawCircle(x, y, radius, COLORS[color]);
}

/** Draw a filled circle
 *  @param {Number} x   - Coordinate x of the center of the circle
 *  @param {Number} y   - Coordinate y of the center of the circle
 *  @param {Number} radius   - Radius of the circle
 *  @param {Number} [color] - Color of the circle (defualt=6)
 * @example
 * circfill(10, 10, 5, 7)  // draw a white filled circle with center at (10,10)
 * @memberof Engine */
function circfill(x, y, radius, color=6) {
    drawCircle(x, y, radius, COLORS[color], true);
}

//function drawPixel(x, y) {
//  ctx.fillRect(x, y, 1, 1);
//}

/** Draw a line
 *  @param {Number} x0  - Coordinate x of the left side of the line
 *  @param {Number} y0  - Coordinate y of the left side of the line
 *  @param {Number} x1  - Coordinate x of the right side of the line
 *  @param {Number} y1  - Coordinate y of the right side of the line
 *  @param {Number} [color]   - Color of the line (default=6)
 * @example
 * line(10, 10, 20, 20, 7)  // draw a white line
 * @memberof Engine */
function line(x0, y0, x1, y1, color=6) {
  let dx = Math.abs(x1 - x0);
  let dy = Math.abs(y1 - y0);
  let sx = (x0 < x1) ? 1 : -1;
  let sy = (y0 < y1) ? 1 : -1;
  let err = (dx > dy ? dx : -dy) / 2;

  ctx.fillStyle = COLORS[color];
  
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
 *  @param {Number} [color]   - Color of the line (default=6)
 * @example
 * print("hello world", 10, 20, 7) // print the text "hello world"
 * @memberof Engine */
function print(str, posX, posY, color=6) {
  ctx.fillStyle = COLORS[color];

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
 *  @param {Number} [w] - How many sprites wide (default=1)
 *  @param {Number} [h] - How many sprites high (default=1)
 * @example
 * spr(0, 10, 20) // draw sprite 0 at position (10,20)
 * @memberof Engine */
function spr(n, x, y, w=1, h=1) {
  // check if the sprite is in the range of the sprites: 16x16
  if (n < 0 || n > 255) {
    console.error(`Sprite ${n} is out of range`);
    return;
  }

  // drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight):
  // Draws a section of the image, defined by (sx, sy, sWidth, sHeight),
  // onto the canvas at (dx, dy), scaled to dWidth and dHeight.
  ctx.drawImage(
    spritesImg, 
    (n % 16) * 8,           // sx of the section of the sprite sheet
    Math.floor(n / 16) * 8, // sy of the section of the sprite sheet
    w * 8,                  // sWidth of the section of the sprite sheet
    h * 8,                  // sHeight of the section of the sprite sheet
    x,                      // dx position in the canvas
    y,                      // dy position in the canvas
    w * 8,                  // scaled width of the sprite
    h * 8);                 // scaled height of the sprite
}

/** Main engine state machine
 * @type {{DISABLED: string, MAIN: string, OPTIONS: string}}
 * @memberof Engine */
const menuState = {
  DISABLED: 'disabled',
  MAIN: 'main',
  OPTIONS: 'options',
};

/** Main menu items
 * @type {Array<string>}
 * @memberof Engine */
let menuItems = [];

/** Current engine menu state
 * @type {{state: string, index: Number}}
 * @memberof Engine */
let currentMenuState = {
  state: menuState.DISABLED,
  index: 0
}

/** Engine volume
 * @type {Number}
 * @default 4
 * @memberof Engine
 */
let volume = 4;

/** Engine sound control 
 * @type {Boolean}
 * @default true 
 * @memberof Engine
 */
let soundOn = true;

function printVolume() {
  return "0".repeat(volume) + "-".repeat(8-volume);
}

/** Handle engine main menu
 * @memberof Engine */
function handleMenu() {
  switch (currentMenuState.state) {
    case menuState.DISABLED:
      engineCurrentState = engineState.PAUSED;
      currentMenuState.state = menuState.MAIN;
      menuItems = ['continue', 'options', 'reset game'];
      break;
    case menuState.MAIN:
      switch (currentMenuState.index) {
        case 0: // select 'continue'
          currentMenuState.state = menuState.DISABLED;
          engineCurrentState = engineState.PLAYING;
          break;
        case 1: // select 'options'
          currentMenuState.state = menuState.OPTIONS
          currentMenuState.index = 0;
          menuItems = [soundOn ? 'sound: on':'sound: off', `volume: ${printVolume()}`, 'back'];
          break;
      }
      break;
    case menuState.OPTIONS:
      switch (currentMenuState.index) {
        case 0: // enable/disable sound
          soundOn = !soundOn;
          menuItems[0] = soundOn ? "sound: on" : "sound: off";
          break;
        case 2: // select go back
          currentMenuState.state = menuState.MAIN;
          currentMenuState.index = 0;
          menuItems = ['continue', 'options', 'reset game'];
          break;
      }
      break;
  }
}

/** Draw engine menu
 * @memberof Engine */
function drawEngineMenu() {
  rectfill(23, 43, 80, 36, 0);
  rect(23, 43, 80, 36, 7);

  // print the menu arrow icon (>)
  print('~', 27, 50 + currentMenuState.index * 8, 7);

  // print the menu items
  let y = 0;
  menuItems.forEach(item => {
    // push the selected menu forward
    let x = 0;
    if (currentMenuState.index === y) x = 1;

    // print the menu item
    print(item, 32 + x, 50 + y * 8, 7);
    y += 1;
  });

  // arrow up 
  if (btnp(2)) {
    currentMenuState.index -= 1;
    if (currentMenuState.index < 0)
      currentMenuState.index = menuItems.length - 1;
  }
  
  // arrow down
  if (btnp(3)) {
    currentMenuState.index += 1;
    if (currentMenuState.index >= menuItems.length)
      currentMenuState.index = 0;
  }

  // left and right keys for volume control
  if (currentMenuState.state === menuState.OPTIONS &&
    currentMenuState.index === 1) {
    if (btnp(0))
      volume = Math.max(0, volume - 1);
    if (btnp(1))
      volume = Math.min(8, volume + 1);
    menuItems[1] =`volume: ${printVolume()}`;
  }
}

/** Get button state. Returns true when a button is pressed
 * - b=0: left
 * - b=1: right
 * - b=2: up
 * - b=3: down
 * - b=4: z
 * - b=5: x
 * @param {Number} b - Number of the button pressed
 * @returns {Boolean}
 * @example
 * btn(5) // returns true when `x` is pressed
 * @memberof Engine */
function btn(b) {
  if (buttons[b]) return true;
  return false;
}

/** Returns true when a button is down and it was not down the last frame
 * 
 * It also returns true every 8 frames it held
 * - b=0: left
 * - b=1: right
 * - b=2: up
 * - b=3: down
 * - b=4: z
 * - b=5: x
 * @param {Number} b - Number of the button pressed
 * @returns {Boolean}
 * @example
 * btnp(5) // returns true when `x` is pressed
 * @memberof Engine */
function btnp(b) {
  if (buttons[b]) {
    // Every time the button is pressed increment the counter.
    pressedBtnCounter[b] += 1;

    // Return true only the first time the button is pressed (the counter is 1)
    if (pressedBtnCounter[b] === 1) return true;
    
    // If the button is still pressed, but the counter reached 30 fps, reset the counter
    if (pressedBtnCounter[b] >= 15) pressedBtnCounter[b] = 0;
  }

  return false;
}

document.addEventListener('keydown', (event) => {
  if (!event.repeat) {
    switch (event.code) {
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
      case "KeyZ":
        buttons[4] = true;
        break;
      case "KeyX":
        buttons[5] = true;
        break;
      case "Enter":
        handleMenu();
        break;
    }
  }

  preventDefaultInput && event.preventDefault();
});

document.addEventListener('keyup', (event) => {
  switch (event.code) {
    case "ArrowLeft":
      buttons[0] = false;
      pressedBtnCounter[0] = 0;
      break;
    case "ArrowRight":
      buttons[1] = false;
      pressedBtnCounter[1] = 0;
      break;
    case "ArrowUp":
      buttons[2] = false;
      pressedBtnCounter[2] = 0;
      break;
    case "ArrowDown":
      buttons[3] = false;
      pressedBtnCounter[3] = 0;
      break;
    case "KeyZ":
      buttons[4] = false;
      pressedBtnCounter[4] = 0;
      break;
    case "KeyX":
      buttons[5] = false;
      pressedBtnCounter[5] = 0;
      break;
  }
});
