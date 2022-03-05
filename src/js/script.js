import Calculator from './Calculator.js';
import convertationService from './convertationService.js';
import WindowLimit from './windowLimit.js';
import declinationNumber from './declinationNumber.js';

document.addEventListener('DOMContentLoaded', () => {
  window.test = new Calculator('test');
  console.log(declinationNumber(3, 'asasdasdas'));
  test.init();
});
