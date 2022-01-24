"use strict";

var checkbox = document.getElementById('checkbox');
var bodyCalc = document.getElementById('calc');
checkbox.addEventListener('change', function () {
  if (document.documentElement.hasAttribute('theme')) {
    document.documentElement.removeAttribute('theme');
  } else {
    document.documentElement.setAttribute('theme', 'dark');
  }
});