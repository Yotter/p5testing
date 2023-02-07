// p5.js Sirpinski Triangle generator

// Draw three point in an equilateral triangle centered in the middle of the screen.
// Then draw a new point in between two of the points.
// Draw a point in between the new point and one of the original points.

let sideLength = 800;
let topPoint;
let leftPoint;
let rightPoint;
let newPoint;


function setup() {
    // Create the canvas
    createCanvas(windowWidth, windowHeight);
    background(0);

    // Calculate the height of the triangle
    let triangleHeight = sideLength * sqrt(3) / 2;

    // Calculate and draw the three points of the triangle
    topPoint = createVector(width / 2, height / 2 - triangleHeight / 2);
    leftPoint = createVector(width / 2 - sideLength / 2, height / 2 + triangleHeight / 2);
    rightPoint = createVector(width / 2 + sideLength / 2, height / 2 + triangleHeight / 2);

    stroke(255);
    strokeWeight(4);
    point(topPoint.x, topPoint.y);
    point(leftPoint.x, leftPoint.y);
    point(rightPoint.x, rightPoint.y);

    // randomly choose one of the three points to be newPoint
    newPoint = random([topPoint, leftPoint, rightPoint]);
}

function draw() {
    // if (frameCount % 100 == 0) {
    // randomly choose one of the three points to be newPoint
    let nextPoint = random([topPoint, leftPoint, rightPoint]);

    // calculate the midpoint between newPoint and nextPoint
    let midPoint = p5.Vector.lerp(newPoint, nextPoint, 0.5);
    
    // draw the midpoint
    strokeWeight(1);
    point(midPoint.x, midPoint.y);
    
    // set newPoint to the midpoint
    newPoint = midPoint;
    // }
}