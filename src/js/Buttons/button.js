class Button {
  constructor(props) {
    this.text = props.text;
    this.name = props.name;
    this.color = props.color;
  }

  render() {
    return `<div class="btn ${this.name} ${this.color}">${this.text}</div>`;
  }
}

export default Button;
