let posX = 0;
let inc = 1;
let playerX = 40;
let playerY = 80;

let T = 0;
const playerAnimation = [0, 1];

function _update() {
    T += 1;
    posX += inc;

    if (posX >= 120) inc = -1;
    if (posX <= 0) inc = 1;

    if (btn(0)) {
        playerX -= 1;
    }

    if (btn(1)) {
        playerX += 1;
    }

    if (btn(2)) {
        playerY -= 1;
    }

    if (btn(3)) {
        playerY += 1;
    }
}

function _draw() {
    cls();
    custom_function(posX);
    print("hello world!", 40, 60); 
}

function custom_function(x) {
    rect(0, 0, 8, 8);
    rectfill(8, 0, 8, 8);
    circ(40, x, 3);
    circfill(x, 28, 8, 4);
    line(x, 28, 40, x);
    line(10, 10, 20, 30, 9);
    const sp = Math.floor(T / 28) % playerAnimation.length;
    spr(playerAnimation[sp], playerX, playerY);

}

// Sprites

const sprites = {
    0: [
        [,3,3,3,3,3,4,],
        [,,3,5,15,5,,4],
        [,,3,15,15,15,,15],
        [,3,3,3,3,3,3,4],
        [,15,4,4,4,4,,4],
        [,,3,3,3,3,,4],
        [,,3,,,3,4,],
        []
    ],
    1: [
        [,,,,,,4,],
        [,3,3,3,3,3,,4],
        [,,3,5,15,5,,15],
        [,,3,15,15,15,3,4],
        [,3,4,4,4,4,,4],
        [,15,3,3,3,3,,4],
        [,,3,,,3,4,],
        []
    ]
}