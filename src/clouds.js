import {setPixel, createPixelArray, createBufferContext, randBetween} from './helpers';
import { SCALE, renderOffset } from './globals';

let bufferContext = null;
let generatedClouds = new Array();

const CLOUD_W = 100;
const CLOUD_H = 60;

const LIGHT_BLUE_COLOR_SET = [
  [240,248,255],
  [240,255,255],
  [224,255,255]
];

const cloudPartial = () => {
  const randX = randBetween(0, 5);
  const randY = randBetween(0, 5);
  const randX2 = randBetween(0, 15);
  const randY2 = randBetween(0, 15);
  return createPixelArray(randX, randY, randX2, randY2, SCALE, LIGHT_BLUE_COLOR_SET);
};

let randomCloudYPositions = [];
let randomCloudXPositions = [];
let renderOffsets = [];
let currentRenderOffsets = [];
const render = (context) => {
  if(!generatedClouds[generatedClouds.length - 1]) {
    bufferContext = createBufferContext(CLOUD_W, CLOUD_H);
    for (let a = 0 ; a < 30; a++) {
      const tempCloudStore = [];
      tempCloudStore.push([...cloudPartial(), ...cloudPartial(), ...cloudPartial()]);
      tempCloudStore.forEach(cloud => {
        bufferContext.canvas.width = bufferContext.canvas.width;
        cloud.forEach(({x, y, color}) => setPixel(x, y, color, SCALE, bufferContext));
      });
      let img = new Image();
      img.src = bufferContext.canvas.toDataURL('image/png');
      generatedClouds.push(img);
      randomCloudYPositions.push(randBetween(0, 200));
      randomCloudXPositions.push(randBetween(0, 2000));
      renderOffsets.push(randBetween(1, 6));
      currentRenderOffsets.push(0);
    }
    return;
  }
  
  generatedClouds.forEach((cloudImg, i) => {
    context.drawImage(cloudImg, 100 + randomCloudXPositions[i] + currentRenderOffsets[i] + renderOffset, 100 + randomCloudYPositions[i]);
    currentRenderOffsets[i] -= renderOffsets[i];
    if (currentRenderOffsets[i] < -600) {
      currentRenderOffsets[i] = 300;
    }
  });
};

export default {
  render
};
