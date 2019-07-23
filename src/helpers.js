export const setPixel = (x, y, color, size, context) => {
  context.fillStyle = "rgba("+color.r+","+color.g+","+color.b+","+ 1 +")";
  context.fillRect( x, y, size, size );
};

const getRandomColorFormSet = (set) => {

  const randomColor = set[randBetween(0, set.length - 1)];
  return {color:{r: randomColor[0], g: randomColor[1], b: randomColor[2]}};
};

export const createPixelArray = (xOffset, yOffset, width, height, scale, colorSet) => {
  let pixelArray = [];
  for(let y=0; y < height * scale; y+= scale) {
    for (let x=0; x < width * scale; x+= scale) {
      pixelArray = [...pixelArray, {...getRandomColorFormSet(colorSet), ...{x: x + (xOffset * scale), y: y + (yOffset * scale)}}];
    }
  }
  return pixelArray;
};

export const showFps = () => {
  const times = [];
  let fps;
  const fpsCounter = document.createElement('div');
  fpsCounter.className = 'fpscounter';

  document.body.appendChild(fpsCounter);
  function refreshLoop() {
    window.requestAnimationFrame(() => {

      const now = performance.now();
      while (times.length > 0 && times[0] <= now - 1000) {
        times.shift();
      }
      times.push(now);
      fps = times.length;
      fpsCounter.innerHTML = fps;
      
      refreshLoop();
    });
  }
  
  refreshLoop();
}

showFps();
export const createBufferContext = (width, height) => {
const canvas = document.createElement('canvas');
canvas.width = width;
canvas.height = height;
console.log(canvas);
return canvas.getContext('2d');
};

export const randBetween = (start, end) => {
  return Math.round(Math.random() * (end - start)) + start;
};
