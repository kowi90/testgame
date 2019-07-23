let frameCount = 0;
let msCount = 0;

const getContext = (query) => {
  return new Promise((resolve, reject) => {
    const maxRetry = 20;
    let currentRetry = 0;
    const retryInterval = setInterval(() => {
      const canvas = document.querySelector(query);
      if (canvas) {
        clearInterval(retryInterval);
        resolve(canvas.getContext('2d'));
      }
      console.log('[CANVAS] Retry count: ', currentRetry);
      currentRetry++;
      if (currentRetry === maxRetry) {
        clearInterval(retryInterval);
        reject();
      }
    }, 100);
  });
};

const update = ({
  currentDate,
  prevDate,
  context,
  fps,
  elapsedTime,
  render
  }) => {
  let increasedElapsedTime = elapsedTime + (Math.round(currentDate) - Math.round(prevDate));
  
  if (elapsedTime > Math.round(1000/fps)) {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.save();
    render(context);
    context.restore();
    increasedElapsedTime = 0;
  }
  console.log('animationFrameShite');
  window.requestAnimationFrame(timestamp => update({
      currentDate: timestamp,
      prevDate: currentDate,
      context,
      fps,
      elapsedTime: increasedElapsedTime,
      render
    })
  );
};

const startGameLoop = ({context, fps, render}) => {
  update({
    currentDate: 0,
    prevDate: 0,
    context,
    fps,
    elapsedTime: 0,
    render
  });
};

export {
  startGameLoop,
  getContext
};