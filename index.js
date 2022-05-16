const chevronParent = document.getElementById('container');
const canvasWidth = 450;
const canvasHeight = 450;
const colNumber = 30;
const rowNumber = 40;
const colWidth = canvasWidth / colNumber;
const rowHeight = canvasHeight / rowNumber;
const lineCoordinates = [];
const variatorRangeBase = 10;
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
    // variatorB increment twice to keep up with i-1 allready incremented value 
    if (i % 2 === 0) {
      variatorA = 0;
      variatorB = lineCoordinates[i].variator + lineCoordinates[i].directionVariator  + lineCoordinates[i].directionVariator;
    } else {
      if (i > 0) {
        variatorA = lineCoordinates[i - 1].variator + lineCoordinates[i - 1].directionVariator;
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
    
    stroke(129,27,201)

    lineCoordinates[i].variator += lineCoordinates[i].directionVariator;

    console.log(i, '1X', lineCoordinates[i].vector1.x)
    console.log(i, '2X', lineCoordinates[i].vector2.x)
    console.log(i, '1Y', lineCoordinates[i].vector1.y)
    console.log(i, '2Y', lineCoordinates[i].vector2.y)

  }
}
