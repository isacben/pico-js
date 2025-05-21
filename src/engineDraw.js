/**
 * PICO-JS Engine Draw Module
 * - Handles the drawing of the engine
 * @namespace Draw
 */

'use strict';

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

/** Max multiplier to control the size of the main canvas
 * @type {Number}
 * @default 10
 * @memberof Draw */
const maxMultiplier = 10;

/** Max virtual width of the main canvas
 * @type {Number}
 * @default
 * @memberof  Draw */
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

/** Device pixel ratio
 * @type {Number}
 * @default
 * @memberof Draw */
const ratio = window.devicePixelRatio || 1;

/** Main Canvas
 * @type {HTMLCanvasElement}
 * @memberof Draw */
let mainCanvas;

/** Main canvas context
 * @type {CanvasRenderingContext2D}
 * @memberof Draw */
let mainContext;

/** Helper function to draw a circle or a filled circle
 *  @param {Number} centerX   - Coordinate x of the center of the circle
 *  @param {Number} centerY   - Coordinate y of the center of the circle
 *  @param {Number} radius    - Radius of the circle
 *  @param {String} color     - Color of the circle
 *  @param {Boolean} [filled] - If true the circle is filled
 *  @memberof Draw */
function drawCircle(centerX, centerY, radius, color, filled=false)
{
    let x = 0;
    let y = radius;
    let decisionParameter = 1 - radius;

    mainContext.fillStyle = color;
  
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
function plotPixel(x, y) { mainContext.fillRect(x, y, 1, 1); }


/** Helper function to plot a horizontal line to draw a filled circle
 *  @param {Number} x1  - Coordinate x of the left side of the horizontal line
 *  @param {Number} x2  - Coordinate x of the right side of the horizontal line
 *  @param {Number} y   - Coordinate y of the horizontal line
 *  @memberof Draw */
function drawHorizontalLine(x1, x2, y)
{
    for (let x = x1; x <= x2; x++)
        mainContext.fillRect(x, y, 1, 1);
}
