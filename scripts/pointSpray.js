// making fluid maze sim with p5.js

let RADIUS = 50;
let MAX_LIFETIME = 100;

let sandDollar;
let aquaSky;

const circles = [];

class Entity {
    constructor(initialX, intitialY, radius) {
        this.x = initialX;
        this.y = intitialY;
        this.r = radius;
        this.dx = random(-10, 10);
        this.dy = random(-10, 10);
        this.ddx = 0;
        this.ddy = 0;
        this.lifetime = 0;
        this.initialColor = aquaSky;
        this.finalColor = sandDollar;
        this.color = this.initialColor;
    }

    draw() {
        fill(this.color);
        noStroke();
        ellipse(this.x, this.y, this.r);
    }

    update() {
        this.x += this.dx;
        this.y += this.dy;
        this.dx += this.ddx;
        this.dy += this.ddy;

        if (frameCount % 10 == 0) {
            // Change acceleration every 10 frames
            this.ddx = random(-1, 1);
            this.ddy = random(-1, 1);
        }

        this.update_color();
        this.lifetime++;
    }

    update_color() {
        this.color = lerpColor(this.initialColor, this.finalColor, this.lifetime / MAX_LIFETIME);
    }
}

function setup() {
    sandDollar = color(223, 207, 190);
    aquaSky = color(127, 205, 205);
    black = color(0, 0, 0);
    createCanvas(windowWidth, windowHeight);
}

function draw() {
    circles.push(new Entity(windowWidth/2, windowHeight/2, RADIUS));
    background(sandDollar);
    for (let i=0; i < circles.length; i++) {
        if (circles[i].lifetime > MAX_LIFETIME) {
            circles.shift();
        }
        circles[i].update();
        circles[i].draw();
    }
    console.log(circles[0].color);
    textSize(32);
    text(circles.length, 100, 100);
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}