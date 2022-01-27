class Button {
  constructor(props) {
    if (typeof props === 'object') {
      this.text = props.text;
      this.name = props.name;
      this.color = props.color;
      this.calc = props.calc;
    }
  }

  createEl() {
    const div = document.createElement('div');
    div.className = `btn ${this.name} ${this.color}`;
    div.innerHTML = this.text;

    div.onclick = (e) => {
      this.calc.click(e.target.textContent);
    };
    return div;
  }

  render() {
    return this.createEl();
  }
}

export default Button;
