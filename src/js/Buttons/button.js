class Button {
  constructor(props) {
    if (typeof props === 'object') {
      this.text = props.text;
      this.name = props.name;
      this.color = props.color;
      this.onClick = props.onClick;
      this.value = props.value;
    }
  }

  createEl() {
    const div = document.createElement('div');
    div.className = `btn ${this.name} ${this.color}`;
    div.innerHTML = this.text;

    div.onclick = () => {
      this.onClick(this.value);
    };
    return div;
  }

  render() {
    return this.createEl();
  }
}

export default Button;
