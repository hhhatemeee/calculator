const checkbox = document.getElementById('checkbox');
const bodyCalc = document.getElementById('calc');

checkbox.addEventListener('change', () => {
    bodyCalc.classList.toggle('calc_theme_dark');
})