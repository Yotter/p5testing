// A fully interactable game of life simulation in p5.js

let grid; // The grid of cells
let next; // The grid of cells for the next generation
let dA = 1; // Diffusion rate of A
let dB = 0.5; // Diffusion rate of B
let feed = 0.055; // Feed rate
let k = 0.062; // Kill rate
let gridWidth = 200; // Width of the grid

function setup() {
    createCanvas(800, 800);
    pixelDensity(1);
    grid = [];
    next = [];
    for (let x = 0; x < gridWidth; x++) {
        grid[x] = [];
        next[x] = [];
        for (let y = 0; y < gridWidth; y++) {
            grid[x][y] = {
                a: 1,
                b: 0
            };
            next[x][y] = {
                a: 1,
                b: 0
            };
        }
    }
    for (let i = 100; i < 110; i++) {
        for (let j = 100; j < 110; j++) {
            grid[i][j].b = 1;
        }
    }
}

function draw() {
    background(0);
    loadPixels();
    for (let x = 1; x < gridWidth - 1; x++) {
        for (let y = 1; y < gridWidth - 1; y++) {
            let a = grid[x][y].a;
            let b = grid[x][y].b;
            next[x][y].a = a + (dA * laplaceA(x, y)) - (a * b * b) + (feed * (1 - a));
            next[x][y].b = b + (dB * laplaceB(x, y)) + (a * b * b) - ((k + feed) * b);
            next[x][y].a = constrain(next[x][y].a, 0, 1);
            next[x][y].b = constrain(next[x][y].b, 0, 1);
            let pix = (x + y * gridWidth) * 4;
            let c = floor((next[x][y].a - next[x][y].b) * 255);
            c = constrain(c, 0, 255);
            pixels[pix + 0] = c;
            pixels[pix + 1] = c;
            pixels[pix + 2] = c;
            pixels[pix + 3] = 255;
        }
    }
    updatePixels();
    swap();
}

function laplaceA(x, y) {
    let sumA = 0;
    sumA += grid[x][y].a * -1;
    sumA += grid[x - 1][y].a * 0.2;
    sumA += grid[x + 1][y].a * 0.2;
    sumA += grid[x][y + 1].a * 0.2;
    sumA += grid[x][y - 1].a * 0.2;
    sumA += grid[x - 1][y - 1].a * 0.05;
    sumA += grid[x + 1][y - 1].a * 0.05;
    sumA += grid[x + 1][y + 1].a * 0.05;
    sumA += grid[x - 1][y + 1].a * 0.05;
    return sumA;
}

function laplaceB(x, y) {
    let sumB = 0;
    sumB += grid[x][y].b * -1;
    sumB += grid[x - 1][y].b * 0.2;
    sumB += grid[x + 1][y].b * 0.2;
    sumB += grid[x][y + 1].b * 0.2;
    sumB += grid[x][y - 1].b * 0.2;
    sumB += grid[x - 1][y - 1].b * 0.05;
    sumB += grid[x + 1][y - 1].b * 0.05;
    sumB += grid[x + 1][y + 1].b * 0.05;
    sumB += grid[x - 1][y + 1].b * 0.05;
    return sumB;
}

function swap() {
    let temp = grid;
    grid = next;
    next = temp;
}

function mouseDragged() {
    let x = floor(mouseX / width * gridWidth);
    let y = floor(mouseY / height * gridWidth);
    grid[x][y].b = 1;
}

function mousePressed() {
    let x = floor(mouseX / width * gridWidth);
    let y = floor(mouseY / height * gridWidth);
    grid[x][y].b = 1;
}

function keyPressed() {
    if (key === 's') {
        saveCanvas('image', 'png');
    }
}

