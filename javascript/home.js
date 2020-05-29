window.addEventListener("DOMContentLoaded", callLoad);

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
    window.setTimeout(function(){player.YTPRemoveMask();}, 3000);
 
}

function loadPage() { 
    header.classList.add('fadeIn');
    header.classList.remove('hide');
    loadScreen.classList.add('fadeOut');
    background.classList.add('fadeIn');
    jQuery(function(){
        player = jQuery("#ytp-properties").YTPlayer();
        player.YTPAddMask('images/logo_star_mask.png');
        player.on("YTPStart", showVideo);
    });
}


