import get from "../get.js";

class Button {
  constructor(props) {
    this.name = get(props, 'name', '0');
    this.color = get(props, 'color', '0');
    this.text = get(props, 'text', '0');
    this.value = get(props, 'value', '0');
    this.onClick = get(props, 'onClick', () => console.log('Что-то пошло не так'));
  }

  createEl() {
    const div = document.createElement('div');

    div.className = `btn ${this.name} ${this.color}`;
    div.innerHTML = this.text;
    div.onclick = () => this.onClick(this.value);

    return div;
  }

  render() {
    return this.createEl();
  }
}

export default Button;
