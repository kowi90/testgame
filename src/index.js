
import {getContext, startGameLoop} from './init';
import {registerEventHandlers} from './event';
import render from './render';

const init = ({fps, getContext, startGameLoop, render}) => {
  getContext('#canvas')
  .then(context => {
    console.log('[CANVAS] Initialized.');
    startGameLoop({context, fps, render});
  })
  .catch(() =>{
    console.error('[CANVAS] Unable to initialize.');
  });
  registerEventHandlers();
};

init({
  fps: 30,
  getContext,
  startGameLoop,
  render
});
