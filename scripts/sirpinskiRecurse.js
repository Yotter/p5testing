// p5.js Sirpinski Triangle generator

let topPoint;
let leftPoint;
let rightPoint;
let queue = [];
let stack = [];
let DFS = true;
let BFS = false;
let structure;
let delta = 0;

let sideLength = 800;
let minTriangleSize = 5;
let DFSorBFS = DFS;
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

    triangle(topPoint.x, topPoint.y, leftPoint.x, leftPoint.y, rightPoint.x, rightPoint.y)
    if (DFSorBFS) {
        structure = stack;
    } else {
        structure = queue;
    }
    structure.push([topPoint, leftPoint, rightPoint]);
}

function draw() {
    // Draws one trinagle each frame

    if  (structure.length > 0) {
        // Get the next big enough triangle from the structure
        let locked = true;
        let curr;
        let topPos;
        let leftPos;
        let rightPos;

        while (locked) {
            if (DFSorBFS) {
                curr = structure.pop();
            } else {
                curr = structure.shift();
            }
            topPos = curr[0];
            leftPos = curr[1];
            rightPos = curr[2];
            let LRdist = p5.Vector.dist(leftPos, rightPos);
            if (LRdist > minTriangleSize) {
                locked = false;
            }
        }

        // Calculate the midpoints of the triangle
        let midLeft = p5.Vector.lerp(topPos, leftPos, 0.5);
        let midRight = p5.Vector.lerp(topPos, rightPos, 0.5);
        let midBottom = p5.Vector.lerp(leftPos, rightPos, 0.5);

        // Draw the triangle
        stroke(0);
        triangle(topPos.x, topPos.y, leftPos.x, leftPos.y, rightPos.x, rightPos.y);

        // Add the three smaller triangles to the structure
        structure.push([topPos, midLeft, midRight]);
        structure.push([midLeft, leftPos, midBottom]);
        structure.push([midRight, midBottom, rightPos]);


        // Draw the number of trinagles in the stack on a small black box
        fill(0);
        rect(0, 0, 100, 20);
        fill(255);
        text(structure.length, 10, 10);
    }
}
