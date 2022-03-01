import { SERVICE_LIST } from "./variables.js";

export default class WindowLimit {
  constructor(callback) {
    this.switchService = callback;
    this.isLimit = false;
  }

  createEl() {
    const windowOverlay = document.createElement('div');
    const windowLimit = document.createElement('div');
    const windowHeader = document.createElement('div');
    const windowInfo = document.createElement('p');
    const windowTitle = document.createElement('h4');
    const windowClose = document.createElement('span');
    const windowServiceLine = document.createElement('div');
    const windowButtonLine = document.createElement('div');
    const windowButton = document.createElement('button');
    const windowTapInfo = document.createElement('a');

    const optionList = {};

    SERVICE_LIST.forEach((service, i) => {
      optionList[`service_${i}`] = document.createElement('button');
      optionList[`service_${i}`].className = `window-limit__service ${service}`;
      optionList[`service_${i}`].textContent = service;
    });

    Object.keys(optionList).forEach((service) => {
      windowServiceLine.append(optionList[service]);

      optionList[service].addEventListener('click', () => {
        this.switchService(optionList[service].textContent);
        windowOverlay.classList.remove('open');
        windowLimit.classList.remove('open');
      });
    });

    windowOverlay.append(windowLimit);
    windowLimit.append(windowHeader, windowTapInfo, windowInfo, windowServiceLine, windowButtonLine);
    windowButtonLine.append(windowButton);
    windowHeader.append(windowTitle, windowClose);

    windowTapInfo.style.display = 'none';

    windowTapInfo.textContent = 'См. больше...';
    windowButton.textContent = 'OK';
    windowClose.textContent = '+';
    windowTapInfo.className = 'window-limit__tap-info';
    windowButton.className = 'window-limit__button';
    windowTitle.className = 'window-limit__title';
    windowButtonLine.className = 'window-limit__button-line';
    windowInfo.className = 'window-limit__info';
    windowHeader.className = 'window-limit__header';
    windowServiceLine.className = 'window-limit__service-line';
    windowLimit.className = 'window-limit';
    windowOverlay.className = 'window-overlay';
    windowLimit.id = 'windowLimit';

    windowClose.addEventListener('click', () => {
      windowOverlay.classList.remove('open');
      windowLimit.classList.remove('open');
    });

    windowButton.addEventListener('click', () => {
      windowOverlay.classList.remove('open');
      windowLimit.classList.remove('open');
    });

    windowTapInfo.addEventListener('click', () => {
      if (windowInfo.style.display !== 'none') {
        windowInfo.style.display = 'none';
        windowTapInfo.textContent = 'См. больше...';

        return;
      }

      windowInfo.style.display = 'block';
      windowTapInfo.textContent = 'Скрыть контент..';
    });

    return windowOverlay;
  }

  toggleHide(isHidding, serviceListLimit) {
    const windowOverlay = document.querySelector('.window-overlay');
    const windowLimit = document.querySelector('.window-limit');
    const windowInfo = document.querySelector('.window-limit__info');
    const windowTitle = document.querySelector('.window-limit__title');
    const windowServiceLine = document.querySelector('.window-limit__service-line');
    const windowTapInfo = document.querySelector('.window-limit__tap-info');

    console.log(serviceListLimit);
    serviceListLimit.forEach((serviceName) => {
      document.querySelector(`.${serviceName}`).disabled = true;
    });

    if (serviceListLimit.length === 3) {
      const daysLeftMonth = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1 - 1)
        .getDate() - new Date().getDate();

      this.isLimit = true;
      windowTapInfo.style.display = 'block';
      windowInfo.style.display = 'none';

      windowOverlay.classList.add('open');
      windowLimit.classList.add('open');

      windowServiceLine.style.display = 'none';

      windowTitle.textContent = 'Достигнут лимит запросов.';
      windowInfo.textContent = `
      \r\n Сервис CC будет доступен примерно через ${60 - new Date().getMinutes()} минут. 
      \r\n Сервис OE будет доступен ${daysLeftMonth ? `через ${daysLeftMonth} дней.` : 'завтра.'}
      \r\n Сервис FCA будет доступен примерно через ${60 - new Date().getMinutes()} минут. `;

      return;
    }

    if (isHidding && serviceListLimit[serviceListLimit.length - 1]) {
      windowLimit.classList.add('open');
      windowOverlay.classList.add('open');

      windowTitle.textContent = 'Лимит запросов у сервиса.';

      windowInfo.textContent = `Сервис "${serviceListLimit[serviceListLimit.length - 1]}" превысил лимит, вы автоматически будете переключены на другой.
      \n Или можете выбрать сами:`;

      return;
    }

    windowLimit.classList.remove('open');
  }

  render() {
    return this.createEl();
  }
}
