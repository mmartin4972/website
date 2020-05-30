window.addEventListener("load", callLoad);

/* --- Helpful Variables ---*/
const loadScreen = document.getElementById('loadScreen');
const videoIntro = document.getElementById('videoIntro');
const background = document.getElementById('background');
var player;

function callLoad() {
    window.setTimeout(loadPage, 400);
}

function showVideo() {
    videoIntro.classList.add('fadeIn');
    videoIntro.classList.remove('hider'); 
    forceBlack = true;
    header.classList.add('black');
    window.setTimeout(function(){forceBlack = false;}, 3000);

 
}

function loadPage() { 
    header.classList.add('fadeIn');
    header.classList.remove('hide');
    loadScreen.classList.add('fadeOut');
    background.classList.add('fadeIn');
    window.setTimeout(function(){background.classList.remove('hider');}, 1000 );
    jQuery(function(){
        player = jQuery("#ytp-properties").YTPlayer();
        player.on("YTPStart", showVideo);
    });
}


