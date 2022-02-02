import distributor from "../distibutorFunc.js";
import get from "../get.js";

class Button {
  constructor(props) {
    this.text = get(props, ['text.1.values', 'text.2.values'], '0');
    console.log(this.text);
    // this.
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
