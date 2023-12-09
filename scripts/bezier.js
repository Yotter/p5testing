// Bezier curve drawer in p5.js

// Global variables
var t; // t-value for animation
var tPoint; // Point on the curve at t
var controlPoints = []; // Array of control points
var curvePoints = []; // Array of points on the curve
var guideLines = []; // Array of guide lines

// Colors
var backgroundColor;
var controlPointColor;
var guideLineColor;

function mousePressed() {
    // Add a new control point
    controlPoints.push(createVector(mouseX, mouseY));
    t = 0;
    curvePoints = [];
}

function updateGuideLines() {
    // Clear guide lines
    guideLines = [];

    // Recursively update guide lines
    updateGuideLinesHelper(controlPoints);
}

function updateGuideLinesHelper(ctrlPoints) {
    // Base case
    if (ctrlPoints.length <= 1) {
        tPoint = ctrlPoints[0];
    } else {
        // add guide lines
        for (let i = 0; i < ctrlPoints.length - 1; i++) {
            guideLines.push([ctrlPoints[i], ctrlPoints[i + 1]]);
        }
    
        // Find points on new lines
        let newPoints = [];
        for (let i = 0; i < ctrlPoints.length - 1; i++) {
            let x = lerp(ctrlPoints[i].x, ctrlPoints[i + 1].x, t);
            let y = lerp(ctrlPoints[i].y, ctrlPoints[i + 1].y, t);
            newPoints.push(createVector(x, y));
        }
        updateGuideLinesHelper(newPoints);
    }
}

function doesNotIncludeVector(array, vector) {
    for (let i = 0; i < array.length; i++) {
        if (array[i].x == vector.x && array[i].y == vector.y) {
            return false;
        }
    }
    return true;
}

function setup() {
  createCanvas(windowWidth, windowHeight);
    backgroundColor = color("#a4a2a8");
    controlPointColor = color("#c23728");
    guideLineColor = color("#111111");
    t = 0;
}

function draw() {
    // Draw background
    background(backgroundColor);

    // Draw control points
    for (let i = 0; i < controlPoints.length; i++) {
        fill(controlPointColor);
        stroke(0);
        circle(controlPoints[i].x, controlPoints[i].y, 10);
    }

    // Draw guide lines
    updateGuideLines();
    stroke(guideLineColor);
    for (let i = 0; i < guideLines.length; i++) {
        line(guideLines[i][0].x, guideLines[i][0].y, guideLines[i][1].x, guideLines[i][1].y);
    }

    // Draw curve
    if (tPoint) {
        console.log("t: " + t + ", tPoint: " + tPoint);
        if (doesNotIncludeVector(curvePoints, tPoint)) {
            curvePoints.push(tPoint);
        }
        stroke(255, 0, 0);
        for (let i = 0; i < curvePoints.length - 1; i++) {
            line(curvePoints[i].x, curvePoints[i].y, curvePoints[i + 1].x, curvePoints[i + 1].y);
        }
    }

    // Draw the last point in curvePoints for debugging
    // if (curvePoints.length > 0) {
    //     fill(255,255,0);
    //     stroke(0);
    //     circle(curvePoints[curvePoints.length - 1].x, curvePoints[curvePoints.length - 1].y, 10);
    //     console.log("curvePoints: " + curvePoints[0]);
    // }

    // Set t
    t+=0.01;
    if (t > 1.000001) {
        t = 0;
    }

}