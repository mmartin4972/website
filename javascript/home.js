window.addEventListener("DOMContentLoaded", loadPage);

/* --- Helpful Variables ---*/
const loadScreen = document.getElementById('loadScreen');
const videoIntro = document.getElementById('videoIntro');
const resume = document.getElementById('resume');
const progressbar = document.getElementById('progress');

function showVideo() {
    console.log('showVideoRun');
    videoIntro.classList.add('fadeIn');
    videoIntro.classList.remove('hider'); 
}

function loadPage() {  
    resume.classList.remove('hide');
    resume.classList.add('fadeIn');
    jQuery(function(){
        var player = jQuery("#ytp-properties").YTPlayer();
        player.on("YTPStart", function(){window.setTimeout(showVideo, 3000)});
    });
}


