var cookieColor = getCookie('main-color');
changeColor(cookieColor ? cookieColor : 183);

function changeColor(color){
    document.documentElement.style.setProperty('--main-color', color);
    setCookie('main-color', color);
}

function setCookie(key, value) {
    var expires = new Date();
    expires.setTime(expires.getTime() + (365 * 24 * 60 * 60 * 1000));
    document.cookie = key + '=' + value + ';expires=' + expires.toUTCString();
}
function getCookie(key) {
    var value = document.cookie.match('(^|;) ?' + key + '=([^;]*)(;|$)');
    return value === null ? undefined : value[2];
}

function confL(message) {
    return window.confirm(message);
}
