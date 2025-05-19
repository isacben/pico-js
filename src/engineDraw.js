/**
 * PICO-JS Engine Draw Module
 * - Handles the drawing of the engine
 * @namespace Draw
 */

import { BGCOLOR, COLORS } from "./constants";
import { engineChars } from "./engineFont";

/** Browser window marging
 * @type {Number}
 * @default 50
 * @memberof Draw */
const WINDOW_MARGIN = 50;

/** Size of the tiles
 * @type {Number}
 * @default 8
 * @memberof Draw */
const TILE_SIZE = 8;

/** The native game canvas width size in pixels
 * @type {Number}
 * @default 128
 * @memberof Draw */
const NATIVE_WIDTH = TILE_SIZE * 16;

/** The native game canvas height size in pixels
 * @type {Number}
 * @default 128
 * @memberof Draw */
const NATIVE_HEIGHT = TILE_SIZE * 16;

/** Max multiplier to control the size of the main canvas
 * @type {Number}
 * @default 10
 * @memberof Draw */
const maxMultiplier = 10;

/** Max virtual width of the main canvas
 * @type {Number}
 * @default
 * @memberof Draw */
const maxWidth = NATIVE_WIDTH * maxMultiplier;

/** Max virtual height of the main canvas
 * @type {Number}
 * @default
 * @memberof Draw */
const maxHeight = NATIVE_HEIGHT * maxMultiplier;

/** Value to adjust the virtual size of the canvas in the window
 * @type {Number}
 * @default 0.9
 * @memberof Draw */
const windowPercentage = 0.9;

/** Canvas virtual width
 * @type {Number}
 * @default
 * @memberof Draw */
let cWidth = NATIVE_WIDTH;

/** Canvas virtual height
 * @type {Number}
 * @default
 * @memberof Draw */
let cHeight = NATIVE_HEIGHT; 

/** Main Canvas
 * @type {HTMLCanvasElement}
 * @memberof Draw */
let canvas = null;

/** Main canvas context
 * @type {CanvasRenderingContext2D}
 * @memberof Draw */
let ctx = null;

/** Clear game screen
 *  @param {Number} [color] - Color to cover the screen with (defualt=0)
 *  @memberof Draw */
export function clearScreen( color )
{
    // ctx.strokeStyle = COLORS[6]; // default color
    ctx.fillStyle = COLORS[ color || BGCOLOR ];
    canvas.style.backgroundColor = COLORS[ color || BGCOLOR ];

    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

/** Helper function to draw a circle or a filled circle
 *  @param {Number} centerX   - Coordinate x of the center of the circle
 *  @param {Number} centerY   - Coordinate y of the center of the circle
 *  @param {Number} radius    - Radius of the circle
 *  @param {String} color     - Color of the circle
 *  @param {Boolean} [filled] - If true the circle is filled
 *  @memberof Draw */
export function circle(centerX, centerY, radius, color, filled=false)
{
    let x = 0;
    let y = radius;
    let decisionParameter = 1 - radius;

    ctx.fillStyle = color;
  
    // Plot the initial point
    if (filled)
        drawHorizontalLine(centerX - radius, centerX + radius, centerY);
    else 
        plotCirclePoints(centerX, centerY, x, y);
  
    while (x < y)
    {
        x++;
        if (decisionParameter < 0)
            decisionParameter += 2 * x + 1;
        else {
            y--;
            decisionParameter += 2 * (x - y) + 1;
        }

        if (filled)
        {
            drawHorizontalLine(centerX - x, centerX + x, centerY + y);
            drawHorizontalLine(centerX - x, centerX + x, centerY - y);
            drawHorizontalLine(centerX - y, centerX + y, centerY + x);
            drawHorizontalLine(centerX - y, centerX + y, centerY - x);
        }
        else 
          plotCirclePoints(centerX, centerY, x, y);
    }
}

/** Draw a line
 *  @param {Number} x0  - Coordinate x of the left side of the line
 *  @param {Number} y0  - Coordinate y of the left side of the line
 *  @param {Number} x1  - Coordinate x of the right side of the line
 *  @param {Number} y1  - Coordinate y of the right side of the line
 *  @param {Number} [color]   - Color of the line (default=6)
 *  @example
 *  line(10, 10, 20, 20, 7)  // draw a white line
 *  @memberof Draw */
export function line( x0, y0, x1, y1, color=6 )
{
    let dx = Math.abs(x1 - x0);
    let dy = Math.abs(y1 - y0);
    let sx = (x0 < x1) ? 1 : -1;
    let sy = (y0 < y1) ? 1 : -1;
    let err = (dx > dy ? dx : -dy) / 2;

    ctx.fillStyle = COLORS[color];
    
    while (true) 
    {
        ctx.fillRect(x0, y0, 1, 1);
        if (x0 === x1 && y0 === y1) break;

        let e2 = err;
        if (e2 > -dx)
        {
            err -= dy;
            x0 += sx;
        }

        if (e2 < dy) 
        {
            err += dx;
            y0 += sy;
        }
    }
}
  

/** Helper function to plot the pixels of the circunference
 *  @param {Number} centerX - Coordinate x of the center of the circle
 *  @param {Number} centerY - Coordinate y of the center of the circle
 *  @param {Number} x       - Coordinate x of the point in the circunference
 *  @param {Number} y       - Coordinate y of the point in the circunference
 *  @memberof Draw */
function plotCirclePoints(centerX, centerY, x, y)
{
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
 *  @memberof Draw */
function plotPixel(x, y) { ctx.fillRect(x, y, 1, 1); }


/** Helper function to plot a horizontal line to draw a filled circle
 *  @param {Number} x1  - Coordinate x of the left side of the horizontal line
 *  @param {Number} x2  - Coordinate x of the right side of the horizontal line
 *  @param {Number} y   - Coordinate y of the horizontal line
 *  @memberof Draw */
function drawHorizontalLine(x1, x2, y)
{
    for (let x = x1; x <= x2; x++)
        ctx.fillRect(x, y, 1, 1);
}

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

    //_draw();
    //if (engineCurrentState === engineState.PAUSED) drawEngineMenu();
}

export function init( target ) {
    canvas = document.createElement( 'canvas' );
    ctx = canvas.getContext( '2d', { alpha: true } );

    const ratio = window.devicePixelRatio || 1;

    canvas.width = cWidth * ratio;
    canvas.height = cHeight * ratio; 
    ctx.imageSmoothingEnabled = false;
    canvas.style.backgroundColor = COLORS[ BGCOLOR ];
    canvas.style.imageRendering = 'pixelated';
    console.log( canvas );
    ctx.scale(ratio,ratio);

    target.appendChild( canvas );

    resizeCanvas();
    window.addEventListener( 'resize', resizeCanvas );    
}


/** Sprite sheet image
 * @type {HTMLImageElement}
 * @memberof Draw */
let spritesImg = new Image;
//rootElement.appendChild(spritesImg); // for debugging, display sprites sheet

/**
 * Draw the sprites sheet from a secondary canvas
 * @param {{[key: string]: number[][]}} sprites - Contains the sprites to be used in the game
 * @memberof Draw */
export function drawSprites(sprites) {
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

/** Draw a sprite on the screen
 *  @param {Number} n - Index of the sprite
 *  @param {Number} x  - Coordinate x of the sprite on the screen
 *  @param {Number} y  - Coordinate y of the sprite on the scree
 *  @param {Number} [w] - How many sprites wide (default=1)
 *  @param {Number} [h] - How many sprites high (default=1)
 *  @example
 *  spr(0, 10, 20) // draw sprite 0 at position (10,20)
 *  @memberof Api */
export function sprite( n, x, y, w=1, h=1 )
{
    // check if the sprite is in the range of the sprites: 16x16
    if (n < 0 || n > 255)
    {
        console.error(`Sprite ${n} is out of range`);
        return;
    }

    // drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight):
    // Draws a section of the image, defined by (sx, sy, sWidth, sHeight),
    // onto the canvas at (dx, dy), scaled to dWidth and dHeight.

    const sx = (n % 16) * 8;           // sx of the section of the sprite sheet
    const sy = Math.floor(n / 16) * 8; // sy of the section of the sprite sheet
    const sWidth = w * 8;              // sWidth of the section of the sprite sheet
    const sHeight = h * 8;             // sHeight of the section of the sprite sheet

    ctx.save();

    ctx.drawImage(
        spritesImg, 
        sx,           // sx of the section of the sprite sheet
        sy,           // sy of the section of the sprite sheet
        sWidth,      // sWidth of the section of the sprite sheet
        sHeight,      // sHeight of the section of the sprite sheet
        x,            // dx position in the canvas
        y,            // dy position in the canvas
        sWidth,       // scaled width of the sprite
        sHeight);     // scaled height of the sprite

    ctx.restore();
}


/** Print a string on the screen
 *  @param {String} str   - String to print
 *  @param {Number} posX  - Coordinate x of the string on the screen
 *  @param {Number} posY  - Coordinate y of the string on the scree
 *  @param {Number} [color]   - Color of the line (default=6)
 *  @example
 *  text("hello world", 10, 20, 7) // print the text "hello world"
 *  @memberof Draw */
export function text( str, posX, posY, color = 6 )
{
    ctx.save(); 
    if (color !== 6)
        ctx.fillStyle = COLORS[color];

    let needed = [];
    str = str.toUpperCase();

    for (let i = 0; i < str.length; i++)
    {
        let char = engineChars[str.charAt(i)];
        if (char)
            needed.push(char);
    }

    let currX = 0;
    for (let i = 0; i < needed.length; i++) {
        let char = needed[i];
        let currY = 0;
        let addX = 0;

        for (let y = 0; y < char.length; y++)
        {
            let row = char[y];
            for (let x = 0; x < row.length; x++)
            {
                if (row[x])
                ctx.fillRect(posX + currX + x, posY + currY, 1, 1);
            }
            addX = Math.max(addX, row.length);
            currY += 1;
        }
        currX += 1 + addX;
    }
    ctx.restore();
}