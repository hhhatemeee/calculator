export default function callFunction(callBack, from, ...args) {
  if (typeof callBack === 'function') {
    return callBack.bind(from, ...args);
  }
  console.log(`${callBack} is not a function`);
}
