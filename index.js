const chevronParent = document.getElementById('container');
const canvasWidth = 450;
const canvasHeight = 450;
const colNumber = 40;
const rowNumber = 20;
const colWidth = canvasWidth / colNumber;
const rowHeight = canvasHeight / rowNumber;
const lineCoordinates = [];
let variatorA;
let variatorB;

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

function setup() {
  let canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(chevronParent);
  frameRate(30);

  for (let i = 0; i < colNumber + 1; i++) {
    for (let j = 0; j < rowNumber; j++) {
      const randomVariator = [getRandomArbitrary(-20, -1), getRandomArbitrary(1, 20)];
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
      });
    }
  }
}

function draw() {

  background('rgba(27,27,131, .2)');
  
  for (let i = 0; i < lineCoordinates.length; i++) {

    if (lineCoordinates[i].variator >= lineCoordinates[i].variatorRange[1]) {
      lineCoordinates[i].directionVariator = -1;
    } else if (lineCoordinates[i].variator <= lineCoordinates[i].variatorRange[0]) {
      lineCoordinates[i].directionVariator = 1;
    }

    // only 1 of 2 vector will have a live variation
    if (i % 2 === 0) {
      variatorA = 0;
      variatorB = lineCoordinates[i + 1].variator + lineCoordinates[i + 1].directionVariator;
    } else {
      variatorA = lineCoordinates[i].variator + lineCoordinates[i].directionVariator;
      variatorB = 0;
    }
    // if this is the first vector of the column we give him the first x position
    // other will recieve the randomized x value from the previous vector
    const firstX = i % colNumber === 0 ? lineCoordinates[i].vector1.x : lineCoordinates[i - 1].vector2.x;
    line(
      firstX + variatorA, 
      lineCoordinates[i].vector1.y, 
      lineCoordinates[i].vector2.x + variatorB, 
      lineCoordinates[i].vector2.y
    );
    stroke(129,27,201)

    lineCoordinates[i].variator += lineCoordinates[i].directionVariator;

  }
}

function mousePressed() {
  noLoop();
}
