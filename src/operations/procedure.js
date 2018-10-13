import { initialize } from './common';
import methodFactory from './methods';

let lastTime = 0;
let timeout = null;

export default ({ randomSeed, refreshTime, gridSize, neighborhood, onFinish, onRefresh }) => {
  if (timeout) {
    clearTimeout(timeout);
    timeout = null;
  }
  lastTime = (new Date()).getTime();
  let data = initialize(randomSeed, gridSize);

  onRefresh(data);
  
  const method = methodFactory(neighborhood);

  let shouldFinish = false;
  const finished = (lastData) => {
    shouldFinish = true;
    clearTimeout(timeout);
    timeout = null;
    onFinish(lastData);
  }

  const procedure = () => {
    data = method(data, gridSize, finished);
    const newTime = (new Date()).getTime();
    if (newTime - lastTime >= refreshTime) {
      onRefresh(data);
      lastTime = (new Date()).getTime();
    }
    
    if (!shouldFinish) {
      timeout = setTimeout(procedure, 1);
    }
  }

  timeout = setTimeout(procedure, 1);
}