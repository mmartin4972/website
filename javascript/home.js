window.addEventListener("DOMContentLoaded", loadPage);

/* --- Helpful Variables ---*/
const loadScreen = document.getElementById('loadScreen');
const videoIntro = document.getElementById('videoIntro');
const videoLoop = document.getElementById('videoLoop');
const resume = document.getElementById('resume');

function loadPage() {   
    window.setTimeout(killLoadPage, 1000);
    videoIntro.addEventListener('ended', videoLooper, false);   
}

function videoLooper() {
    videoLoop.play();
    videoLoop.classList.remove('hide');
    videoIntro.classList.add('hide');
}

function killLoadPage() {
    header.classList.add('fadeIn');
    header.classList.remove('hide');
    loadScreen.classList.add('fadeOut');
    window.setTimeout(function() {loadScreen.classList.add('hide');},1000);
    navigation();
    resume.classList.remove('hide');
}
