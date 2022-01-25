const checkbox = document.getElementById('checkbox');
const bodyCalc = document.getElementById('calc');
const notification = document.getElementById('notification');
const closeNotif = document.getElementById('closeNotif')
const btnNotif = document.getElementById('btnNotif');

checkbox.addEventListener('change', changeTheme)



setTimeout(() => {
    notification.classList.add('open');
}, 1000);

closeNotif.onclick = () => {
    notification.classList.remove('open');
}

btnNotif.onclick = () => {
    if (document.documentElement.hasAttribute('theme')) {
        document.documentElement.removeAttribute('theme');
    }
    else {
        document.documentElement.setAttribute('theme', 'dark');
    }
}




function setThemeOnTime() {
    const nowHours = new Date().getHours();
    if (nowHours => 6 && nowHours <= 18) {
        document.documentElement.removeAttribute('theme');
    } else {
        document.documentElement.setAttribute('theme', 'dark');
    }
}

function changeTheme() {
    if (document.documentElement.hasAttribute('theme')) {
        document.documentElement.removeAttribute('theme');
    }
    else {
        document.documentElement.setAttribute('theme', 'dark');
    }
}