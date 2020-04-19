window.addEventListener("DOMContentLoaded", loadPage);

/* --- Helpful Variables ---*/
const loadScreen = document.getElementById('loadScreen');
const videoIntro = document.getElementById('videoIntro');
const resume = document.getElementById('resume');
const progressbar = document.getElementById('progress');
var player;

function showVideo() {
    console.log('showVideoRun');
    videoIntro.classList.add('fadeIn');
    videoIntro.classList.remove('hider'); 
    window.setTimeout(function(){player.YTPRemoveMask();}, 3000);
 
}

function loadPage() {  
    resume.classList.remove('hide');
    resume.classList.add('fadeIn');
    jQuery(function(){
        player = jQuery("#ytp-properties").YTPlayer();
        player.YTPAddMask('images/logo_mask.png');
        player.on("YTPStart", showVideo);
    });
}


