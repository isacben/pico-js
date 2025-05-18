/**
 * PICO-JS Engine Draw Module
 * - Handles the drawing of the engine
 * @namespace Draw
 */

'use strict';


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
