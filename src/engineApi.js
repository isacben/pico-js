/**
 * PICO-JS Main API
 * - The main API of the engine
 * @namespace Api
 */

'use strict';


/** Clear game screen
 *  @param {Number} [color] - Color to cover the screen with (defualt=0)
 *  @memberof Api */
function cls(color=0)
{
    if (color !== bgColor)
    {
        bgColor = color;
        mainCanvas.style.backgroundColor = COLORS[bgColor];
    }
    mainContext.clearRect(0, 0, mainCanvas.width, mainCanvas.height);
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
        mainContext.strokeRect(x, y, width, height);
        return;
    }

    mainContext.save();
    mainContext.strokeStyle = COLORS[color];
    mainContext.strokeRect(x, y, width, height);
    mainContext.restore();
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
        mainContext.fillRect(x, y, width, height);
        return;
    }

    mainContext.save();
    mainContext.fillStyle = COLORS[color];
    mainContext.fillRect(x, y, width, height); 
    mainContext.restore();
}


/** Draw a circle
 *  @param {Number} x   - Coordinate x of the center of the circle
 *  @param {Number} y   - Coordinate y of the center of the circle
 *  @param {Number} radius   - Radius of the circle
 *  @param {Number} [color] - Color of the circle (default=6)
 *  @example
 *  circ(10, 10, 5, 7)  // draw a white circle with center at (10,10)
 *  @memberof Api */
function circ(x, y, radius, color=6) { drawCircle(x, y, radius, COLORS[color]); }


/** Draw a filled circle
 *  @param {Number} x   - Coordinate x of the center of the circle
 *  @param {Number} y   - Coordinate y of the center of the circle
 *  @param {Number} radius   - Radius of the circle
 *  @param {Number} [color] - Color of the circle (defualt=6)
 *  @example
 *  circfill(10, 10, 5, 7)  // draw a white filled circle with center at (10,10)
 *  @memberof Api */
function circfill(x, y, radius, color=6) { drawCircle(x, y, radius, COLORS[color], true);}


/** Draw a line
 *  @param {Number} x0  - Coordinate x of the left side of the line
 *  @param {Number} y0  - Coordinate y of the left side of the line
 *  @param {Number} x1  - Coordinate x of the right side of the line
 *  @param {Number} y1  - Coordinate y of the right side of the line
 *  @param {Number} [color]   - Color of the line (default=6)
 *  @example
 *  line(10, 10, 20, 20, 7)  // draw a white line
 *  @memberof Api */
function line(x0, y0, x1, y1, color=6)
{
    let dx = Math.abs(x1 - x0);
    let dy = Math.abs(y1 - y0);
    let sx = (x0 < x1) ? 1 : -1;
    let sy = (y0 < y1) ? 1 : -1;
    let err = (dx > dy ? dx : -dy) / 2;

    mainContext.fillStyle = COLORS[color];
    
    while (true) 
    {
        mainContext.fillRect(x0, y0, 1, 1);
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


/** Draw a sprite on the screen
 *  @param {Number} n - Index of the sprite
 *  @param {Number} x  - Coordinate x of the sprite on the screen
 *  @param {Number} y  - Coordinate y of the sprite on the scree
 *  @param {Number} [w] - How many sprites wide (default=1)
 *  @param {Number} [h] - How many sprites high (default=1)
 *  @example
 *  spr(0, 10, 20) // draw sprite 0 at position (10,20)
 *  @memberof Api */
function spr(n, x, y, w=1, h=1)
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

    mainContext.save();

    mainContext.drawImage(
        spritesImg, 
        sx,           // sx of the section of the sprite sheet
        sy,           // sy of the section of the sprite sheet
        sWidth,      // sWidth of the section of the sprite sheet
        sHeight,      // sHeight of the section of the sprite sheet
        x,            // dx position in the canvas
        y,            // dy position in the canvas
        sWidth,       // scaled width of the sprite
        sHeight);     // scaled height of the sprite

    mainContext.restore();
}


/** Print a string on the screen
 *  @param {String} str   - String to print
 *  @param {Number} posX  - Coordinate x of the string on the screen
 *  @param {Number} posY  - Coordinate y of the string on the scree
 *  @param {Number} [color]   - Color of the line (default=6)
 *  @example
 *  print("hello world", 10, 20, 7) // print the text "hello world"
 *  @memberof Api */
function print(str, posX, posY, color=6)
{
    mainContext.save(); 
    if (color !== 6)
        mainContext.fillStyle = COLORS[color];

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
                mainContext.fillRect(posX + currX + x, posY + currY, 1, 1);
            }
            addX = Math.max(addX, row.length);
            currY += 1;
        }
        currX += 1 + addX;
    }
    mainContext.restore();
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
function btn(b)
{
    //if (buttons[b]) return true;
    //return false;
    return !paused && keyIsDown(b);
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
    return !paused && keyWasPressed(b);
  //}

  //return false;
}