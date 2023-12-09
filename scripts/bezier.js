// Bezier curve drawer in p5.js

// Global variables
var t; // t-value for animation
var tPoint; // Point on the curve at t
var points = []; // Array of control points
var guideLines = []; // Array of guide lines
var drawnPoints = []; // Array of points drawn on the curve
var finished = false; // Is the curve finished?

// Colors
var backgroundColor;
var controlPointColor;
var guideLineColor;

function mousePressed() {
    // Add a new control point
    points.push(createVector(mouseX, mouseY));
    drawnPoints = [];
    finished = false
}

function updateGuideLines() {
    // Clear guide lines
    guideLines = [];

    // Recursively update guide lines
    updateGuideLinesHelper(points);
}

function updateGuideLinesHelper(points) {
    // update guide lines
    for (let i = 0; i < points.length - 1; i++) {
        guideLines.push([points[i], points[i + 1]]);
    }

    let newPoints = [];
    for (let i = 0; i < points.length - 1; i++) {
        let x = lerp(points[i].x, points[i + 1].x, t);
        let y = lerp(points[i].y, points[i + 1].y, t);
        newPoints.push(createVector(x, y));
    }
    if (newPoints.length > 1) {
        updateGuideLinesHelper(newPoints);
    } else {
        tPoint = newPoints[0];
    }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
    backgroundColor = color("#a4a2a8");
    controlPointColor = color("#c23728");
    guideLineColor = color("#111111");
}

function draw() {
    // Set t
    t = frameCount%100 / 100;

    // Draw background
    background(backgroundColor);

    // Draw control points
    for (let i = 0; i < points.length; i++) {
        fill(controlPointColor);
        stroke(0);
        circle(points[i].x, points[i].y, 10);
    }

    // Draw guide lines
    updateGuideLines();
    stroke(guideLineColor);
    for (let i = 0; i < guideLines.length; i++) {
        line(guideLines[i][0].x, guideLines[i][0].y, guideLines[i][1].x, guideLines[i][1].y);
    }

    // Draw points on the curve
    if (tPoint) {
        fill(0);
        stroke(0);
        circle(tPoint.x, tPoint.y, 10);
        drawnPoints.push(tPoint);
        for (let i = 0; i < drawnPoints.length - 1; i++) {
            circle(drawnPoints[i].x, drawnPoints[i].y, 10);
        }
    }

}