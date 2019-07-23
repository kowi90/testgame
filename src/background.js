import {setPixel, createPixelArray, createBufferContext} from './helpers';
import { SCALE, renderOffset } from './globals';

let bufferContext = null;
let actualBufferData = null;
let generatedSand = null;
let generatedGrass = null;
let generatedSky = null;


const STAGE_LENGTH_MULTIPLIER = 3;
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

const renderPartial = (context, fullBg, xOffset, yOffset) => {
  fullBg.forEach(({x, y, color}) => setPixel(x + xOffset, y + yOffset, color, SCALE, context));
};

const renderScene = (context, elements, xOffset, yOffset) => {
  elements.forEach(element => {
    renderPartial(context, element, xOffset, yOffset);
  });  
}

const getBufferContext = (context) => {
  bufferContext = createBufferContext(context.canvas.width, context.canvas.height);
  generatedSand = createPixelArray(0, 85, 100 * STAGE_LENGTH_MULTIPLIER, 15, SCALE, BROWN_COLOR_SET);
  generatedGrass = createPixelArray(0, 80, 100 * STAGE_LENGTH_MULTIPLIER, 5, SCALE, GREEN_COLOR_SET);
  generatedSky = createPixelArray(0, 0, 100 * STAGE_LENGTH_MULTIPLIER, 80, SCALE, BLUE_COLOR_SET);
  renderScene(bufferContext, [generatedSand, generatedGrass, generatedSky], 0, 0);
  return bufferContext;
};

const render = (context) => {
  if(!generatedSand) {
    bufferContext = getBufferContext(context);
    return;
  }
  actualBufferData = bufferContext.getImageData(0, 0, bufferContext.canvas.width, bufferContext.canvas.height);
  context.putImageData(actualBufferData, renderOffset, 0);
};

export default {
  render
};
