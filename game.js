let posX = 0;
let inc = 1;

function _update() {
    posX += inc;

    if (posX >= 120) inc = -1;
    if (posX <= 0) inc = 1;
}

function _draw() {
    cls();
    custom_function(posX);
    print("Hello world", 50, 50, 2); 
}

function custom_function(x) {
   rect(0, 0, 8, 8, 2);
   fillrect(8, 0, 8, 8, 6);
   rect(4, 8, 8, 8, 9);
   rect(120, 0, 8, 8, 14);
   circ(40, 10, 1, 9);
   circfill(40, 28, 1, 13);
}

let age = 20;