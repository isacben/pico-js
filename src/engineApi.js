/**
 * PICO-JS Main API
 * - The main API of the engine
 * @namespace Api
 */

import * as Draw from "./engineDraw";
import * as Engine from './engine';
import { keyIsDown, keyWasPressed } from "./engineInput";
import { COLORS } from "./constants";

/** Startup PICO-JS engine
 * @param {Function} update - Called every frame to update the game objects
 * @param {Function} draw - Called every frame to render the game objects
 * @param {{[key: string]: number[][]}} sprites - Contains the sprites to be used in the game
 * @memberof Api
 */
export function engineInit( update, draw, sprites ) {
    Engine.init( update, draw, sprites );
}

/** Clear game screen
 *  @param {Number} [color] - Color to cover the screen with (defualt=0)
 *  @memberof Api */
export function cls( color=0 )
{
    Draw.clearScreen( color );
}


/** Draw a rectangle
 *  @param {Number} x - Coordinate x of the top left corner of the rectangle
 *  @param {Number} y - Coordinate y of the top left corner of the rectangle
 *  @param {Number} width - Width of the rectangle
 *  @param {Number} height - Height of the rectangle
 *  @param {Number} [color] - Color of the rectangle (default=6)
 *  @example
 *  rect(10, 10, 50, 30, 7)  // draw a white rectangle at (10,10)
 *  @memberof Api */
function rect(x, y, width, height, color=6)
{
    x += .5;
    y += .5;
    width -= 1;
    height -= 1;

    if (color === 6)
    {
        ctx.strokeRect(x, y, width, height);
        return;
    }

    ctx.save();
    ctx.strokeStyle = COLORS[color];
    ctx.strokeRect(x, y, width, height);
    ctx.restore();
}


/** Draw a filled rectangle
 *  @param {Number} x - Coordinate x of the top left corner of the rectangle
 *  @param {Number} y - Coordinate y of the top left corner of the rectangle
 *  @param {Number} width - Width of the rectangle
 *  @param {Number} height - Height of the rectangle
 *  @param {Number} [color] - Color of the rectangle (default=6)
 *  @example
 *  rectfill(10, 10, 50, 30, 7)  // draw a white filled rectangle at (10,10)
 *  @memberof Api */
function rectfill(x, y, width, height, color=6)
{
    if (color === 6) {
        ctx.fillRect(x, y, width, height);
        return;
    }

    ctx.save();
    ctx.fillStyle = COLORS[color];
    ctx.fillRect(x, y, width, height); 
    ctx.restore();
}


/** Draw a circle
 *  @param {Number} x   - Coordinate x of the center of the circle
 *  @param {Number} y   - Coordinate y of the center of the circle
 *  @param {Number} radius   - Radius of the circle
 *  @param {Number} [color] - Color of the circle (default=6)
 *  @example
 *  circ(10, 10, 5, 7)  // draw a white circle with center at (10,10)
 *  @memberof Api */
export function circ( x, y, radius, color=6 ) {
    Draw.circle( x, y, radius, COLORS[ color ] );
}


/** Draw a filled circle
 *  @param {Number} x   - Coordinate x of the center of the circle
 *  @param {Number} y   - Coordinate y of the center of the circle
 *  @param {Number} radius   - Radius of the circle
 *  @param {Number} [color] - Color of the circle (defualt=6)
 *  @example
 *  circfill(10, 10, 5, 7)  // draw a white filled circle with center at (10,10)
 *  @memberof Api */
export function circfill(x, y, radius, color=6) {
    Draw.circle( x, y, radius, COLORS[ color ], true );
}


/** Draw a line
 *  @param {Number} x0  - Coordinate x of the left side of the line
 *  @param {Number} y0  - Coordinate y of the left side of the line
 *  @param {Number} x1  - Coordinate x of the right side of the line
 *  @param {Number} y1  - Coordinate y of the right side of the line
 *  @param {Number} [color]   - Color of the line (default=6)
 *  @example
 *  line(10, 10, 20, 20, 7)  // draw a white line
 *  @memberof Api */
export function line( x0, y0, x1, y1, color=6 )
{
    Draw.line( x0, y0, x1, y1, color );
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
export function spr(n, x, y, w=1, h=1)
{
    Draw.sprite( n, x, y, w, h );
}


/** Print a string on the screen
 *  @param {String} str   - String to print
 *  @param {Number} posX  - Coordinate x of the string on the screen
 *  @param {Number} posY  - Coordinate y of the string on the scree
 *  @param {Number} [color]   - Color of the line (default=6)
 *  @example
 *  print("hello world", 10, 20, 7) // print the text "hello world"
 *  @memberof Api */
export function print(str, posX, posY, color=6)
{
    Draw.text( str, posX, posY, color );
}


/** Get button state. Returns true when a button is pressed
 *  - b=0: left
 *  - b=1: right
 *  - b=2: up
 *  - b=3: down
 *  - b=4: z
 *  - b=5: x
 *  @param {Number} b - Number of the button pressed
 *  @returns {Boolean}
 *  @example
 *  btn(5) // returns true when `x` is pressed
 *  @memberof Api */
export function btn(b)
{
    //if (buttons[b]) return true;
    //return false;
    return ! Engine.paused && keyIsDown(b);
}


/** Returns true when a button is down and it was not down the last frame
 *  It also returns true every 8 frames it held
 *  - b=0: left
 *  - b=1: right
 *  - b=2: up
 *  - b=3: down
 *  - b=4: z
 *  - b=5: x
 *  @param {Number} b - Number of the button pressed
 *  @returns {Boolean}
 *  @example
 *  btnp(5) // returns true when `x` is pressed
 *  @memberof Api */
function btnp(b)
{
  //if (buttons[b]) {
    // Every time the button is pressed increment the counter.
    //pressedBtnCounter[b] += 1;

    // Return true only the first time the button is pressed (the counter is 1)
    //if (pressedBtnCounter[b] === 1) return true;
    
    // If the button is still pressed, but the counter reached 30 fps, reset the counter
    //if (pressedBtnCounter[b] >= 15) pressedBtnCounter[b] = 0;
    return ! Engine.paused && keyWasPressed(b);
  //}

  //return false;
}