export default function getFunction(callBack, from, ...args) {
  if (typeof callBack === 'function') {
    return callBack.bind(from, ...args);
  }

  console.warn(`Allowed first argument is function. \n ${callBack} is not a function`);
};
