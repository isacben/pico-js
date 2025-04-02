let posX = 0;
let inc = 1;

let T = 0;
const playerAnimation = [0, 1];

function _update() {
    T += 1;
    posX += inc;

    if (posX >= 120) inc = -1;
    if (posX <= 0) inc = 1;
}

function _draw() {
    cls();
    custom_function(posX);
    print("hello world!", 40, 60); 
}

function custom_function(x) {
    rect(0, 0, 8, 8);
    rectfill(8, 0, 8, 8);
    //rect(4, 8, 8, 8, 9);
    //rect(120, 0, 8, 8, 14);
    circ(40, x, 3);
    circfill(x, 28, 8);
    line(x, 28, 40, x);
    line(10, 10, 20, 30, 9);
    //rectfill(69, 50, 1, 1, 9);
    //rectfill(70, 50, 1, 1, 9);
    //rectfill(71, 50, 1, 1, 9);
    //rectfill(72, 50, 1, 1, 9);
    //rectfill(73, 50, 1, 1, 9);
    const sp = Math.floor(T / 28) % playerAnimation.length;
    spr(playerAnimation[sp], 40, 80);
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