export default (callback, time) => {
  let timeout = null;
  return (...param) => {
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => {
      callback(...param);
    }, time);
  }
}