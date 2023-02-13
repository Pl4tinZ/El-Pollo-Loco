const originalHeight = 1080; // Original size of BackgroundImage

let canvasHeight = 1080; // Game window height
let canvasWidth = (canvasHeight / 9) * 16; // will set in relation to the canvasHeight

let sizeVariable = 2; // Resizing of characters and items
let scalefactor = 1 / sizeVariable; // Resizing of all objects related to the game window to the original image height

let FPS = 60;
let interval = 1000 / FPS;

let intervalIds = []; // Arrey to stopp all intervalls
let enemyIntervals = []; // Arrey for enemies. Use to start new level
let characterIntervals = []; // Arrey for character
let worldIntervals = [];

let levelIndex = 1; // Integer for setting enemies in level
let bgCounter = 4;
let points = 0;

/**
 * generate random number; for example use 0.1 to 3
 * but you can use 0 to infinite ( however, that makes no sense)
 * @param {Number} min
 * @param {Number} max
 * @returns random number between min and max
 */
function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

/**
 * generate random number as INTEGER between 0 and max
 * @param {number} max
 * @returns random number as INTEGER
 */
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function generateLevelsize() {
  bgCounter = 4 + levelIndex;
}
