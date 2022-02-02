export default function callFunction(callBack, from, ...args) {
  if (typeof callBack === 'function') {
    return callBack.bind(from, ...args);
  }
  return `${callBack} is not function`;
}
