window.addEventListener("DOMContentLoaded", loadPage);

/* --- Helpful Variables ---*/
const loadScreen = document.getElementById('loadScreen');
const videoIntro = document.getElementById('videoIntro');
const resume = document.getElementById('resume');
const background = document.getElementById('background');
var player;

function showVideo() {
    videoIntro.classList.add('fadeIn');
    videoIntro.classList.remove('hider'); 
    window.setTimeout(function(){player.YTPRemoveMask();}, 3000);
 
}

function loadPage() {  
    background.classList.add('fadeIn');
    resume.classList.remove('hide');
    resume.classList.add('fadeIn');
    jQuery(function(){
        player = jQuery("#ytp-properties").YTPlayer();
        player.YTPAddMask('images/logo_star_mask.png');
        player.on("YTPStart", showVideo);
    });
}


