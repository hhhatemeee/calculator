class ThemeSelector {
  render() {
    return (
      `<div class="theme">
    <div class="theme__container">
      <input type="checkbox" class="checkbox" id="checkbox" />
      <label for="checkbox" class="theme__selector" id="toggleSelector">
        <i class="icon-sun"></i>
        <i class="icon-moon-1"></i>
        <div class="theme__ball" id="toggleBall"></div>
      </label>
    </div>
  </div>`
    );
  }
}

export default ThemeSelector;
