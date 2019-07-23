import { MOVING_SPEED, setRenderOffset, renderOffset } from './globals';
import {keys} from './event';

const render = (context) => {
  if (keys.ArrowRight) {
    setRenderOffset(renderOffset - MOVING_SPEED);
  }
  if (keys.ArrowLeft) {
    setRenderOffset(renderOffset + MOVING_SPEED);
  }
};

export default {
  render
};
