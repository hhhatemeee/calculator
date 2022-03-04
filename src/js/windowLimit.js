import declinationNumber from "./declinationNumber.js";
import { SERVICE_LIST, SERVICE_URL } from "./variables.js";

export default class WindowLimit {
  constructor(callback) {
    this.switchService = callback;
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
        windowOverlay.classList.remove('open-window');
        windowLimit.classList.remove('open-window');
      });
    });

    windowOverlay.append(windowLimit);
    windowLimit.append(
      windowHeader,
      windowTapInfo,
      windowInfo,
      windowServiceLine,
      windowButtonLine,
    );
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
      windowOverlay.classList.remove('open-window');
      windowLimit.classList.remove('open-window');
    });

    windowButton.addEventListener('click', () => {
      windowOverlay.classList.remove('open-window');
      windowLimit.classList.remove('open-window');
    });

    windowTapInfo.addEventListener('click', () => {
      if (windowInfo.style.opacity !== '0') {
        windowInfo.style.opacity = 0;
        windowInfo.style.maxHeight = 0;
        windowTapInfo.textContent = 'См. больше...';

        return;
      }

      windowInfo.style.maxHeight = '100px';
      windowInfo.style.opacity = 1;
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

    serviceListLimit.forEach((serviceName) => {
      document.querySelector(`.${serviceName}`).disabled = true;
      document.querySelector(`.${serviceName}`).style.display = 'none';
    });

    if (serviceListLimit.length >= 3) {
      const daysLeftMonth = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1 - 1)
        .getDate() - new Date().getDate();

      windowInfo.style.opacity = 0;
      windowInfo.style.maxHeight = 0;
      windowInfo.style.whiteSpace = 'pre';
      windowInfo.textContent = '';

      windowTapInfo.style.display = 'block';

      windowOverlay.classList.add('open-window');
      windowLimit.classList.add('open-window');

      windowServiceLine.style.display = 'none';

      windowTitle.textContent = 'Достигнут лимит запросов.';

      SERVICE_LIST.forEach((service) => {
        if (service === 'OE') {
          windowInfo.textContent += `Сервис ${service}: ${daysLeftMonth ? `${declinationNumber(daysLeftMonth, 'd')}` : 'завтра обновится.'} до обновления. \r\n`;

          return;
        }

        windowInfo.textContent += `Сервис ${service}: ${declinationNumber(60 - new Date().getMinutes(), 'm')} до обновления. \r\n`;
      });

      return;
    }

    if (isHidding && serviceListLimit[serviceListLimit.length - 1]) {
      windowLimit.classList.add('open-window');
      windowOverlay.classList.add('open-window');

      windowTitle.textContent = 'Лимит запросов у сервиса.';

      windowInfo.innerHTML = `Сервис "<a class="window-limit__link">${serviceListLimit[serviceListLimit.length - 1]}</a>"
      <a class="link" href="https://${SERVICE_URL[serviceListLimit[serviceListLimit.length - 1]]}">
      ${SERVICE_URL[serviceListLimit[serviceListLimit.length - 1]]} 
      </a>
      превысил лимит, вы автоматически будете переключены на другой. Или можете выбрать сами:`;

      windowInfo.querySelector('a').addEventListener('click', () => {
        if (windowInfo.querySelector('.link').classList.contains('link-open')) {
          windowInfo.querySelector('.link').classList.remove('link-open');

          return;
        }
        windowInfo.querySelector('.link').classList.add('link-open');
      });

      return;
    }

    windowLimit.classList.remove('open-window');
  }

  render() {
    return this.createEl();
  }
}
