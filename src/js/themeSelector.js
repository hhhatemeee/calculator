class ThemeSelector {
  constructor(onChangeCallBack) {
    this.onChange = onChangeCallBack;
  }

  createEl() {
    const checkbox = document.createElement('input');

    checkbox.className = 'checkbox';
    checkbox.id = 'checkbox';
    checkbox.type = 'checkbox';

    checkbox.addEventListener('change', () => {
      this.onChange();
    });

    return checkbox;
  }

  render() {
    return this.createEl();
  }
}

export default ThemeSelector;
