const chevronParent = document.getElementById('container');
const canvasWidth = 450;
const canvasHeight = 450;
const colNumber = 10;
const rowNumber = 10;
const colWidth = canvasWidth / colNumber;
const rowHeight = canvasHeight / rowNumber;
const lineCoordinates = [];
const xVariatorBase = colWidth / 2.3;
let liveVariator = 1;
let directionVariator = 1;
let variatorA;
let variatorB;
let randomVariator;

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

function setup() {
  let canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(chevronParent);
  frameRate(30);

  for (let i = 0; i < colNumber + 1; i++) {
    for (let j = 0; j < rowNumber; j++) {
      randomVariator = [getRandomArbitrary(-2, -1), getRandomArbitrary(1, 2)];
      const randomNeedle = Math.floor(Math.random() * randomVariator.length);
      lineCoordinates.push({
        vector1: createVector(colWidth * i, rowHeight * j),
        vector2: createVector(colWidth * i + getRandomArbitrary(xVariatorBase * randomVariator[0], xVariatorBase * randomVariator[1]), rowHeight * (j + 1)),
        variator: randomVariator[randomNeedle],
        limitVariator: getRandomArbitrary(.1, .9)
      });
    }
  }
}

function draw() {
  // translate(canvasWidth / 2, canvasHeight / 2);

  // randomness should be in draw ?
  // in this case, in each draw, random values are the same ?
  // things like lineCoordinates[i + 1].speed * random value ? (and so is speed usefull ?)
  // 

  background('rgba(255,255,255, .05)');
  
  for (let i = 0; i < lineCoordinates.length; i++) {

    if (i % 2 === 0) {
      variatorA = 0;
      variatorB = lineCoordinates[i + 1].variator * liveVariator;
    } else {
      variatorA = lineCoordinates[i].variator * liveVariator;
      variatorB = 0;
    }
    
    const firstX = i % colNumber === 0 ? lineCoordinates[i].vector1.x : lineCoordinates[i - 1].vector2.x;
    line(
      firstX + variatorA, 
      lineCoordinates[i].vector1.y, 
      lineCoordinates[i].vector2.x + variatorB, 
      lineCoordinates[i].vector2.y
    );
    stroke(129,27,201)

  }

  if (liveVariator >= xVariatorBase) {
    directionVariator = -1;
  } else if (liveVariator <= xVariatorBase * -1) {
    directionVariator = 1;
  }

  liveVariator += directionVariator;

}
