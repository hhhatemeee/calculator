const checkbox = document.getElementById('checkbox');
const bodyCalc = document.getElementById('calc');
const buttons = document.querySelectorAll('.btn');
const calculationText = document.getElementById('calculationText');
const textResult = document.getElementById('resultText');
const toggleSelector = document.getElementById('toggleSelector');
const toggleBall = document.getElementById('toggleBall');
const btnDelete = document.getElementById('btnDelete');

checkbox.addEventListener('change', () => {
    bodyCalc.classList.toggle('calc_theme_dark');
    textResult.classList.toggle('calc-screen__result_theme_dark');
    calculationText.classList.toggle('calc-screen__calculations_theme_dark');
    toggleSelector.classList.toggle('theme__selector_theme_dark');
    toggleBall.classList.toggle('theme__ball_theme_dark')
    btnDelete.classList.toggle('btn__delete_theme_dark')
    buttons.forEach(btn => {
        if (btn.classList.contains('btn_bg_gray')) {
            btn.classList.toggle('btn_theme_dark-light');
        }
        if (!btn.classList.contains('btn_bg_gray') && !btn.classList.contains('btn_bg_blue')) {
            btn.classList.toggle('btn_theme_dark');
        }
    })
})