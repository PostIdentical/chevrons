const chevronParent = document.getElementById('container');
const canvasWidth = 680;
const canvasHeight = canvasWidth;
const colNumber = 40;
const rowNumber = 20;
const colWidth = canvasWidth / colNumber;
const rowHeight = canvasHeight / rowNumber;
const lineCoordinates = [];
const variatorRangeBase = 40;
let variatorA;
let variatorB;

let blueVariator = 1;
let greenVariator = 1;
let redVariator = 1;

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

function setup() {
  let canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(chevronParent);
  frameRate(15);

  for (let i = 0; i < colNumber + 1; i++) {
    for (let j = 0; j < rowNumber; j++) {
      const randomVariator = [getRandomArbitrary(variatorRangeBase * -1, -1), getRandomArbitrary(1, variatorRangeBase)];
      const randomNeedle = Math.floor(Math.random() * randomVariator.length);
      // line with 2 vectors,
      // x value of the 2nd vector as a random value beetween a +/- range
      // variator blindly choose a variator from the previous range
      lineCoordinates.push({
        vector1: createVector(
          colWidth * i, 
          rowHeight * j
        ),
        vector2: createVector(
          colWidth * i + getRandomArbitrary(randomVariator[0], randomVariator[1]), 
          rowHeight * (j + 1)
        ),
        variator: randomVariator[randomNeedle],
        variatorRange: [...randomVariator],
        directionVariator: 1,
        blue: getRandomArbitrary(150, 255),
        green: getRandomArbitrary(0, 30),
        red: getRandomArbitrary(70, 130),
      });
    }
  }
}

function draw() {

  background('rgba(27,27,131, .05)');
  
  for (let i = 0; i < lineCoordinates.length; i++) {

    if (lineCoordinates[i].variator >= lineCoordinates[i].variatorRange[1]) {
      lineCoordinates[i].directionVariator = -1;
    } else if (lineCoordinates[i].variator <= lineCoordinates[i].variatorRange[0]) {
      lineCoordinates[i].directionVariator = 1;
    }

    // only 1 of 2 vector will have a live variation
    if (i % 2 === 0) {
      variatorA = 0;
      variatorB = lineCoordinates[i].variator + lineCoordinates[i].directionVariator;
    } else {
      if (i > 0) {
        variatorA = lineCoordinates[i - 1].variator;
      } else {
        variatorA = 0;
      }
      variatorB = 0;
    }
    // if this is the first vector of the column we give him the first x position
    // other will recieve the randomized x value from the previous vector
    const firstX = i % rowNumber === 0 ? lineCoordinates[i].vector1.x : lineCoordinates[i - 1].vector2.x;
    line(
      firstX + variatorA, 
      lineCoordinates[i].vector1.y, 
      lineCoordinates[i].vector2.x + variatorB, 
      lineCoordinates[i].vector2.y
    );

    if (lineCoordinates[i].blue >= 255) {
      blueVariator = -.1;
    } else if (lineCoordinates[i].blue <= 170) {
      blueVariator = .1;
    }

    lineCoordinates[i].blue += blueVariator;

    if (lineCoordinates[i].green >= 50) {
      greenVariator = -.5;
    } else if (lineCoordinates[i].green <= 0) {
      greenVariator = .5;
    }

    lineCoordinates[i].green += greenVariator;

    if (lineCoordinates[i].red >= 130) {
      redVariator = -.5;
    } else if (lineCoordinates[i].red <= 70) {
      redVariator = .5;
    }

    lineCoordinates[i].red += redVariator;
    
    stroke(lineCoordinates[i].red, lineCoordinates[i].green, lineCoordinates[i].blue);

    lineCoordinates[i].variator += lineCoordinates[i].directionVariator;

  }
}
