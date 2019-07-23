import background from './background';
import clouds from './clouds';
import common from './common';

const render = (context) => {
  common.render(context);
  background.render(context);
  clouds.render(context);
};

export default render;