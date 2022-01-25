const checkbox = document.getElementById('checkbox');
const bodyCalc = document.getElementById('calc');

checkbox.addEventListener('change', () => {
    if (document.documentElement.hasAttribute('theme')) {
        document.documentElement.removeAttribute('theme');
    }
    else {
        document.documentElement.setAttribute('theme', 'dark');
    }
})