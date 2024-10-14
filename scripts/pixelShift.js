// P5 js

let img;
let iterations = 1000; // Number of iterations to perform without drawing

function setup() {
  // Create a canvas that matches the window size
  createCanvas(windowWidth, windowHeight);
  background(200);

  // Create a file input element
  let input = createFileInput(handleFile);
  input.id('imageUpload');
  input.position(0, 0);

  // Disable image smoothing
  noSmooth();
}

function handleFile(file) {
  if (file.type === 'image') {
    img = loadImage(file.data, () => {
      // Resize canvas to match the window size
      resizeCanvas(windowWidth, windowHeight);
      drawImage();
      document.getElementById("imageUpload").style.display = 'none';
    });
  } else {
    console.log('Not an image file!');
  }
}

function draw() {
  if (img) {
    img.loadPixels();

    for (let i = 0; i < iterations; i++) {
      let isRow = random() < 0.5;
      let shiftDirection = random() < 0.5 ? -1 : 1;

      if (isRow) {
        // Shift a random row
        let row = floor(random(img.height));
        shiftRow(row, shiftDirection);
      } else {
        // Shift a random column
        let col = floor(random(img.width));
        shiftDirection = random() < 0.5 ? -1 : 1;
        shiftColumn(col, shiftDirection);
      }
    }

    img.updatePixels();
    drawImage();
  }
}

function drawImage() {
  // Calculate the scaling factor to fit the image within the window dimensions
  let scaleFactor = min(windowWidth / img.width, windowHeight / img.height);
  let newWidth = img.width * scaleFactor;
  let newHeight = img.height * scaleFactor;
  let xOffset = (windowWidth - newWidth) / 2;
  let yOffset = (windowHeight - newHeight) / 2;

  // Draw grey background
  background(200);

  // Draw the image scaled to the calculated size
  image(img, xOffset, yOffset, newWidth, newHeight);
}

function shiftRow(row, direction) {
  let rowStart = row * img.width * 4;
  let rowEnd = rowStart + img.width * 4;

  if (direction === 1) {
    // Shift right
    for (let i = rowEnd - 4; i > rowStart; i -= 4) {
      img.pixels[i] = img.pixels[i - 4];
      img.pixels[i + 1] = img.pixels[i - 3];
      img.pixels[i + 2] = img.pixels[i - 2];
      img.pixels[i + 3] = img.pixels[i - 1];
    }
    img.pixels[rowStart] = img.pixels[rowStart + 4];
    img.pixels[rowStart + 1] = img.pixels[rowStart + 5];
    img.pixels[rowStart + 2] = img.pixels[rowStart + 6];
    img.pixels[rowStart + 3] = img.pixels[rowStart + 7];
  } else {
    // Shift left
    for (let i = rowStart; i < rowEnd - 4; i += 4) {
      img.pixels[i] = img.pixels[i + 4];
      img.pixels[i + 1] = img.pixels[i + 5];
      img.pixels[i + 2] = img.pixels[i + 6];
      img.pixels[i + 3] = img.pixels[i + 7];
    }
    img.pixels[rowEnd - 4] = img.pixels[rowEnd - 8];
    img.pixels[rowEnd - 3] = img.pixels[rowEnd - 7];
    img.pixels[rowEnd - 2] = img.pixels[rowEnd - 6];
    img.pixels[rowEnd - 1] = img.pixels[rowEnd - 5];
  }
}

function shiftColumn(col, direction) {
  let colStart = col * 4;

  if (direction === 1) {
    // Shift down
    for (let i = img.height - 1; i > 0; i--) {
      let currentIndex = (i * img.width + col) * 4;
      let aboveIndex = ((i - 1) * img.width + col) * 4;
      img.pixels[currentIndex] = img.pixels[aboveIndex];
      img.pixels[currentIndex + 1] = img.pixels[aboveIndex + 1];
      img.pixels[currentIndex + 2] = img.pixels[aboveIndex + 2];
      img.pixels[currentIndex + 3] = img.pixels[aboveIndex + 3];
    }
    let firstIndex = colStart;
    img.pixels[firstIndex] = img.pixels[firstIndex + img.width * 4];
    img.pixels[firstIndex + 1] = img.pixels[firstIndex + img.width * 4 + 1];
    img.pixels[firstIndex + 2] = img.pixels[firstIndex + img.width * 4 + 2];
    img.pixels[firstIndex + 3] = img.pixels[firstIndex + img.width * 4 + 3];
  } else {
    // Shift up
    for (let i = 0; i < img.height - 1; i++) {
      let currentIndex = (i * img.width + col) * 4;
      let belowIndex = ((i + 1) * img.width + col) * 4;
      img.pixels[currentIndex] = img.pixels[belowIndex];
      img.pixels[currentIndex + 1] = img.pixels[belowIndex + 1];
      img.pixels[currentIndex + 2] = img.pixels[belowIndex + 2];
      img.pixels[currentIndex + 3] = img.pixels[belowIndex + 3];
    }
    let lastIndex = ((img.height - 1) * img.width + col) * 4;
    img.pixels[lastIndex] = img.pixels[lastIndex - img.width * 4];
    img.pixels[lastIndex + 1] = img.pixels[lastIndex - img.width * 4 + 1];
    img.pixels[lastIndex + 2] = img.pixels[lastIndex - img.width * 4 + 2];
    img.pixels[lastIndex + 3] = img.pixels[lastIndex - img.width * 4 + 3];
  }
}

function windowResized() {
  // Resize the canvas when the window is resized
  resizeCanvas(windowWidth, windowHeight);
  if (img) {
    drawImage();
  }
}
