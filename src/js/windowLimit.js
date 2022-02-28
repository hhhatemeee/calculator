export default class WindowLimit {
  createEl() {
    const windowLimit = document.createElement('div');
    const windowHeader = document.createElement('div');
    const windowInfo = document.createElement('p');

    windowLimit.append(windowHeader);
    windowHeader.append(windowInfo);

    windowInfo.className = 'window-limit__info';
    windowHeader.className = 'window-limit__header';
    windowLimit.className = 'window-limit';
    windowLimit.id = 'windowLimit';

    return windowLimit;
  }

  render() {
    return this.createEl();
  }
}
