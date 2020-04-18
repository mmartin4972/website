window.addEventListener("DOMContentLoaded", loadPage);

/* --- Helpful Variables ---*/
const loadScreen = document.getElementById('loadScreen');
const videoIntro = document.getElementById('videoIntro');
const resume = document.getElementById('resume');
const progressbar = document.getElementById('progress');

function killLoadPage() {
    header.classList.add('fadeIn');
    videoIntro.classList.add('fadeIn');
    header.classList.remove('hide');
    loadScreen.classList.add('fadeOut');
    loadScreen.classList.add('hide');
    videoIntro.classList.remove('hider');
    navigation();
    resume.classList.remove('hide');
}

function loadPage() {  
    header.classList.add('hide'); 
    jQuery(function(){
        var player = jQuery("#ytp-properties").YTPlayer();
        player.on("YTPStart", function(){progressbar.classList.add('progress-value');})
        player.on("YTPStart", function(){ window.setTimeout(killLoadPage, 3000);});
    });
}


