import {
  setPixel,
  createPixelArray,
  createBufferContext,
  randBetween
} from './helpers';
import { SCALE } from './globals';

const RANDOMINESS = 10;
const GROUND_TILE_SIZE = 15;
const GRASS_TILE_SIZE = 5;
const SKY_TILE_SIZE = 20;

const BROWN_COLOR_SET = [
  [255,235,205],
  [255,228,196],
  [255,222,173],
  [245,222,179],
  [242,204,155]
];
const GREEN_COLOR_SET = [
  [34,139,34],
  [0,128,0],
  [0,100,0],
  [50,205,50],
  [127,255,0]
];

const BLUE_COLOR_SET = [
  [145,216,260],
  [145,216,245],
  [186,234,240],
  [230,238,245]
];

let firstRender = true;

let groundTextures = [];
let skyTextures = [];
let grassTextures = [];

let groundImage = null;
let skyImage = null;
let grassImage = null;

const generateTexture = (width, height, colorSet, scale) => {
  const pixelArray = createPixelArray(0, 0, width, height, scale, colorSet);
  const bufferContext = createBufferContext(width, height);
  pixelArray.forEach(({x, y, color}) => setPixel(x, y, color, scale, bufferContext));
  return bufferContext.getImageData(0, 0, width, height);
};

const generateTile = (variations, width, height) => {
  const singleWidth = variations[0].width;
  const singleHeight = variations[0].height;
  const neededRows = Math.round(width / singleWidth);
  const neededColumns = Math.round(height / singleHeight);
  const bufferContext = createBufferContext(width, height);
  
  for(let currentColumn = 0; currentColumn < neededColumns + 1; currentColumn ++) {
    for (let currentRow = 0; currentRow < neededRows + 1; currentRow ++) {
      const randomTile = variations[randBetween(0, variations.length - 1)];
      bufferContext.putImageData(randomTile, singleWidth * currentRow, singleHeight * currentColumn);
    }
  }
  return bufferContext.getImageData(0, 0, width, height);
};

const generateTextures = (randomness) => {
  for (let i = 0; i < randomness; i++) {
    groundTextures.push(generateTexture(GROUND_TILE_SIZE, GROUND_TILE_SIZE, BROWN_COLOR_SET, SCALE));  
    skyTextures.push(generateTexture(SKY_TILE_SIZE, SKY_TILE_SIZE, BLUE_COLOR_SET, SCALE));
    grassTextures.push(generateTexture(GRASS_TILE_SIZE, GRASS_TILE_SIZE, GREEN_COLOR_SET, SCALE));
  }
};

const createTiles = () => {
  groundImage = generateTile(groundTextures, 1000, 100);
  grassImage = generateTile(grassTextures, 1000, 20);
  skyImage = generateTile(skyTextures, 1000, 380);
};

const render = (context) => {
  if (firstRender) {
    generateTextures(RANDOMINESS);
    createTiles();
    firstRender = false;
  }
  context.putImageData(groundImage, 0, 400);
  context.putImageData(grassImage, 0, 380);
  context.putImageData(skyImage, 0, 0);
};

export default {
  render
};
