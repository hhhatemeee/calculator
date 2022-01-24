"use strict";

var checkbox = document.getElementById('checkbox');
var bodyCalc = document.getElementById('calc');
var buttons = document.querySelectorAll('.btn');
var calculationText = document.getElementById('calculationText');
var textResult = document.getElementById('resultText');
var toggleSelector = document.getElementById('toggleSelector');
var toggleBall = document.getElementById('toggleBall');
var btnDelete = document.getElementById('btnDelete');
checkbox.addEventListener('change', function () {
  bodyCalc.classList.toggle('calc_theme_dark');
  textResult.classList.toggle('calc-screen__result_theme_dark');
  calculationText.classList.toggle('calc-screen__calculations_theme_dark');
  toggleSelector.classList.toggle('theme__selector_theme_dark');
  toggleBall.classList.toggle('theme__ball_theme_dark');
  btnDelete.classList.toggle('btn__delete_theme_dark');
  buttons.forEach(function (btn) {
    if (btn.classList.contains('btn_bg_gray')) {
      btn.classList.toggle('btn_theme_dark-light');
    }

    if (!btn.classList.contains('btn_bg_gray') && !btn.classList.contains('btn_bg_blue')) {
      btn.classList.toggle('btn_theme_dark');
    }
  });
});