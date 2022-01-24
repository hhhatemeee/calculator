"use strict";

var checkbox = document.getElementById('checkbox');
var bodyCalc = document.getElementById('calc');
checkbox.addEventListener('change', function () {
  bodyCalc.classList.toggle('calc_theme_dark');
});