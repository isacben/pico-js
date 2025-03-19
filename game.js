let posX = 0;
let inc = 1;

function _update() {
    posX += inc;

    if (posX >= 56) inc = -1;
    if (posX <= 0) inc = 1;
}

function _draw() {
    cls();
    custom_function(posX);
    print("Hello world", 50, 50, 2); 
}

function custom_function(x) {
   rect(x, 8, 8, 8, 2);
}

let age = 20;