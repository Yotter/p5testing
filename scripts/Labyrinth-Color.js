// Colour labyrinth based on depth using breadth first search

let start;
let origImage;
let outImage;

let startColor;
let endColor;

let queue = [];
let depths = [];
let visited = [];

function preload() {
    origImage = loadImage("labin.png");
}

function setup() {
    // Create the canvas
    createCanvas(origImage.width, origImage.height);
    start = createVector(175, 360);

    // Define the start and end colors
    endColor = color(0, 0, 255);
    startColor = color(255, 0, 0);

    // Create the output image
    origImage.loadPixels();
    outImage = createImage(origImage.width, origImage.height);
    outImage.loadPixels();
    for (let i = 0; i < outImage.pixels.length; i++) {
        outImage.pixels[i] = origImage.pixels[i];
    }
    outImage.updatePixels();

    depth_color();
}

function neighbors(x, y) {
    // Return an array of vectors of the orthogonal and diagonal neighbors of the pixel at (x, y)
    let neighbors = [];
    for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
            if (i != 0 || j != 0) {
                neighbors.push(createVector(x + i, y + j));
            }
        }
    }
    return neighbors;
}

function good(x, y) {
    // Return true if the pixel at (x, y) is white, not visited, and within the image
    let inbounds = (x >= 0 && x < outImage.width && y >= 0 && y < outImage.height);
    let c = outImage.get(x, y);
    white = true
    for (let i = 0; i < c.length; i++) {
        if (c[i] < 127) {
            white = false;
        }
    }
    let notVisited = !visited[x][y];

    // console.log("inbounds: " + inbounds);
    // console.log("white: " + white);
    // console.log(origImage.get(x, y));
    // console.log(origImage.get(x, y) == [255, 255, 255, 255]);
    // console.log("notVisited: " + notVisited);

    return (inbounds && white && notVisited);
}


function depth_color() {
    // Color the labyrinth based on depth using breadth first search

    // initialize the arrays
    for (let i = 0; i < outImage.width; i++) {
        depths[i] = [];
        visited[i] = [];
        for (let j = 0; j < outImage.height; j++) {
            depths[i][j] = -1;
            visited[i][j] = false;
        }
    }

    // Set the start pixel to the start color
    outImage.set(start.x, start.y, startColor);
    outImage.updatePixels();

    // Add the start pixel to the queue
    queue.push(start);
    depths[start.x][start.y] = 0;
    visited[start.x][start.y] = true;

    // While there are still pixels in the queue, process them
    while (queue.length > 0) {
        // Get the next pixel from the queue
        let curr = queue.shift();
        let n = neighbors(curr.x, curr.y);
        for (let i = 0; i < n.length; i++) {
            let x = n[i].x;
            let y = n[i].y;
            console.log("this passes")
            if (good(x, y)) {
                console.log("passed");
                // Set the depth of the pixel
                let depth = depths[curr.x][curr.y] + 1;
                depths[x][y] = depth;

                // Add the pixel to the queue
                queue.push(n[i]);
                visited[x][y] = true;
            }
        }
    }

    // Color the pixels based on depth
    let maxDepth = 0;
    for (let i = 0; i < outImage.width; i++) {
        for (let j = 0; j < outImage.height; j++) {
            if (depths[i][j] > maxDepth) {
                maxDepth = depths[i][j];
            }
        }
    }
    for (let i = 0; i < outImage.width; i++) {
        for (let j = 0; j < outImage.height; j++) {
            let depth = depths[i][j];
            if (depth >= 0) {
                let c = lerpColor(startColor, endColor, depth / maxDepth);
                outImage.set(i, j, c);
            }
        }
    }
    outImage.updatePixels();
    image(outImage, 0, 0);
}
