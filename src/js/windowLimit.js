import { SERVICE_LIST } from "./variables.js";

export default class WindowLimit {
  constructor(callback) {
    this.switchService = callback;
  }

  createEl() {
    const windowLimit = document.createElement('div');
    const windowHeader = document.createElement('div');
    const windowInfo = document.createElement('p');
    const windowClose = document.createElement('span');
    const windowSelect = document.createElement('select');

    const optionList = {};
    SERVICE_LIST.forEach((service, i) => {
      optionList[`service_${i}`] = document.createElement('option');

      optionList[`service_${i}`].textContent = service;
    });

    Object.keys(optionList).forEach((service) => windowSelect.append(optionList[service]));

    windowLimit.append(windowHeader, windowInfo, windowSelect);
    windowHeader.append(windowClose);

    windowClose.textContent = '+';
    windowInfo.className = 'window-limit__info';
    windowHeader.className = 'window-limit__header';
    windowSelect.className = 'window-limit__select';
    windowLimit.className = 'window-limit';
    windowLimit.id = 'windowLimit';

    windowSelect.addEventListener('change', (e) => {
      this.switchService(e.currentTarget.value);
      windowLimit.classList.remove('open');
    });

    windowClose.addEventListener('click', () => {
      windowLimit.classList.remove('open');
    });

    return windowLimit;
  }

  toggleHide(isHidding, serviceName, newService = serviceName) {
    const windowLimit = document.querySelector('.window-limit');
    const windowInfo = document.querySelector('.window-limit__info');
    const windowSelect = document.querySelector('.window-limit__select');

    if (isHidding && serviceName) {
      windowLimit.classList.add('open');

      windowSelect.value = newService;

      windowInfo.textContent = `Сервис "${serviceName}" превысил лимит, вы автоматически будете переключены на другой.
      \n Или можете выбрать сами:`;

      return;
    }

    if (isHidding) {
      const daysLeftMonth = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1 - 1)
        .getDate() - new Date().getDate();

      windowLimit.classList.add('open');

      windowInfo.textContent = `Достигнут лимит всех сервисов. 
      \n Сервис CC будет доступен примерно через ${60 - new Date().getMinutes()} минут. 
      \n Сервис OE будет доступен ${daysLeftMonth ? `через ${daysLeftMonth} дней.` : 'завтра.'}
      \n Сервис FCA будет доступен примерно через ${60 - new Date().getMinutes()} минут. `;
    }

    windowLimit.classList.remove('open');
  }

  render() {
    return this.createEl();
  }
}
