// Conway's Game of Life in p5.js
// gridW/H = 107, G = 95000 with 3Birth 1Min 3Max was cool
// 323 are the original rules
// 313 was what I was using most of the time
// 223 was symmetrical, generative but volatile
// 314 gives maze like structures

// EDITABLE VARIABLES

let BIRTH = 3; // Number of neighbors to birth a cell
let MIN = 1; // Minimum number of neighbors to keep a cell alive
let MAX = 3; // Maximum number of neighbors to keep a cell alive

let initializeRandom = false; // Initialize the grid randomly, mark center as alive
let cellSize = 5; // Size of each cell
let gridWidth = 101;// Width of the grid in cells
let gridHeight = 101; // Height of the grid in cells
let simulateTo = 0; // Start simulation at this generation, 0 = start immediately
let MAX_LIFETIME = 100; // Time before cell becomes fully hot

// INTERNAL VARIABLES

let grid; // The grid of cells
let next; // The grid of cells for the next generation
let lifetime; // The lifetime of each cell
let running; // Is the simulation running
let generation; // The current generation
let hotColor; // Colors for the cells
let coldColor; // Colors for the cells
let backgroundColor; // Background color
let lastFPS; // The last FPS value recorded
let disableInteraction // Disable interaction with the grid


function setup() {
    running = initializeRandom;
    generation = 0;
    lastFPS = 0;
    disableInteraction = false;
    // gridWidth = floor(windowWidth / cellSize) - 51;
    // gridHeight = floor(windowHeight / cellSize) - 51;
    hotColor = color("#c23728");
    coldColor = color("#1984c5");
    backgroundColor = color("#a4a2a8");
    createCanvas(windowWidth, windowHeight);
    grid = [];
    next = [];
    liftetime = [];
    for (let x = 0; x < gridWidth; x++) {
        grid[x] = [];
        next[x] = [];
        liftetime[x] = [];
        for (let y = 0; y < gridHeight; y++) {
            grid[x][y] = 0;
            next[x][y] = 0;
            liftetime[x][y] = 0;
        }
    }
    // Initialize the grid
    for (let x = 1; x < gridWidth - 1; x++) {
        for (let y = 1; y < gridHeight - 1; y++) {
            if (initializeRandom) {
                grid[x][y] = floor(random(2));
            } else {
                let midX = floor(gridWidth / 2);
                if ((x == midX || x == midX + 1 || x == midX - 1) && y == floor(gridHeight / 2)) {
                    console.log("x: " + x + ", y: " + y)
                    grid[x][y] = 1;
                } else {
                    grid[x][y] = 0;
                }
            }
        }
    }
    // Simulate to the given generation
    for (let i = 0; i < simulateTo; i++) {
        update();
    }
}

function draw() {
    background(backgroundColor);
    for (let x = 0; x < gridWidth; x++) {
        for (let y = 0; y < gridHeight; y++) {
            if (grid[x][y] == 1) {

                let c = lerpColor(coldColor, hotColor, liftetime[x][y] / MAX_LIFETIME);
                fill(c);
                stroke(0);
                rect(x * cellSize, y * cellSize, cellSize, cellSize);
            }
        }
    }

    if (running) {
        update();
    }
    fill(255);
    noStroke();
    text("Generation: " + generation, 10, 20);
    text("lastFPS: " + floor(lastFPS), 10, 40);
    if (frameCount % 10 == 0) {
        lastFPS = frameRate();
    }
    if (disableInteraction) {
        fill(255, 0, 0)
        text("Interaction disabled", 10, 60);
    }
}

function keyPressed() {
    if (key == 'n') {
        update();
    } else if (key == 'p') {
        running = !running;
    } else if (key == 'c') {
        for (let x = 1; x < gridWidth - 1; x++) {
            for (let y = 1; y < gridHeight - 1; y++) {
                grid[x][y] = 0;
            }
        }
        running = false;
    } else if (key == "l") {
        disableInteraction = !disableInteraction;
    } else if (key == "s") {
        gridWidth += 2;
        gridHeight += 2;
        setup();
    }
}

function mousePressed() {
    if (disableInteraction) {
        return;
    }
    let x = floor(mouseX / cellSize);
    let y = floor(mouseY / cellSize);
    if (x >= 0 && x < gridWidth && y >= 0 && y < gridHeight) {
        grid[x][y] = !grid[x][y];
        lifetime[x][y] = 0;
    }
}

function mouseDragged() {
    if (disableInteraction) {
        return;
    }
    let x = floor(mouseX / cellSize);
    let y = floor(mouseY / cellSize);
    if (x >= 0 && x < gridWidth && y >= 0 && y < gridHeight) {
        grid[x][y] = 1;
        lifetime[x][y] = 0;
    }
}

function countNeighbors(x, y) {
    let sum = 0;
    for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
            sum += grid[x + i][y + j];
        }
    }
    sum -= grid[x][y];
    return sum;
}

function update() {
    for (let x = 1; x < gridWidth - 1; x++) {
        for (let y = 1; y < gridHeight - 1; y++) {
            let state = grid[x][y];
            let neighbors = countNeighbors(x, y);
            if (state == 0 && neighbors == BIRTH) {
                next[x][y] = 1;
            } else if (state == 1 && (neighbors < MIN || neighbors > MAX)) {
                next[x][y] = 0;
                liftetime[x][y] = 0;
            } else {
                next[x][y] = state;
                if (state == 1) {
                    liftetime[x][y] = liftetime[x][y] + 1;
                }
            }
        }
    }
    for (let x = 1; x < gridWidth - 1; x++) {
        for (let y = 1; y < gridHeight - 1; y++) {
            grid[x][y] = next[x][y];
        }
    }
    generation++;
}