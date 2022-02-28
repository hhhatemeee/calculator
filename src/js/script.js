import Calculator from './Calculator.js';
import convertationService from './convertationService.js';
import WindowLimit from './windowLimit.js';

document.addEventListener('DOMContentLoaded', () => {
  window.test = new Calculator('test');

  test.init();
});
