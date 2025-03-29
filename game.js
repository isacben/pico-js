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
    print("<hello\\world>", 40, 60, 13); 
}

function custom_function(x) {
   //rect(0, 0, 8, 8, 2);
   //rectfill(8, 0, 8, 8, 6);
   //rect(4, 8, 8, 8, 9);
   //rect(120, 0, 8, 8, 14);
   //circ(40, x, 3, 9);
   //circfill(x, 28, 8, 13);
   //line(x, 28, 40, x, 11);
   //rectfill(69, 50, 1, 1, 9);
   //rectfill(70, 50, 1, 1, 9);
   //rectfill(71, 50, 1, 1, 9);
   //rectfill(72, 50, 1, 1, 9);
   //rectfill(73, 50, 1, 1, 9);
}

let age = 20;