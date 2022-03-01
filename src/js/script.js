import Calculator from './Calculator.js';
import convertationService from './convertationService.js';
import WindowLimit from './windowLimit.js';
import declinationNumber from './declinationNumber.js';

document.addEventListener('DOMContentLoaded', () => {
  window.test = new Calculator('test');

  console.log(new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1 - 1)
    .getDate() - new Date().getDate());
  console.log(declinationNumber(30, 'h'));

  test.init();
});
