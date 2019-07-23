const keys = {
  ArrowUp: false,
  ArrowLeft: false,
  ArrowRight: false,
  ArrowDown: false
};


const registerEventHandlers = () => {
  document.addEventListener("keydown", event =>  {
    keys[event.code] = true;
  });
  document.addEventListener("keyup", event =>  {
    keys[event.code] = false;
  });
};


export {
  registerEventHandlers,
  keys
};
