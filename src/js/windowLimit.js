export default class WindowLimit {
  createEl() {
    const windowLimit = document.createElement('div');
    const windowHeader = document.createElement('div');
    const windowInfo = document.createElement('p');
    const windowClose = document.createElement('span');

    windowLimit.append(windowHeader, windowInfo);
    windowHeader.append(windowClose);

    windowClose.textContent = '+';
    windowInfo.className = 'window-limit__info';
    windowHeader.className = 'window-limit__header';
    windowLimit.className = 'window-limit';
    windowLimit.id = 'windowLimit';

    windowInfo.textContent = `Достигнут лимит всех сервисов. 
    \n Сервис CC будет доступен примерно через ${60 - new Date().getMinutes()} минут. 
    \n Сервис OE будет доступен ${29 ? `через ${29} дней.` : 'завтра.'}
    \n Сервис FCA будет доступен примерно через ${60 - new Date().getMinutes()} минут. `

    return windowLimit;
  }

  render() {
    return this.createEl();
  }
}
