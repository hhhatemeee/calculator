import Calculator from './Calculator.js';
import ConvertationService from './convertationService.js'

document.addEventListener('DOMContentLoaded', () => {
  (new Calculator('test')).init();

  window.createService = () => {
    window.service = new ConvertationService();
  };
});
