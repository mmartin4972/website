$(document).ready(function() {
    $("#header").removeClass("hide");
    adjustWidth();
    $("#mainContainer").scroll(function(){
        if($("#mainContainer").scrollTop() > 20){
            forceBlack = true;
            header.classList.add('black');
        }
        else{
            forceBlack=false;
            header.classList.remove('black');
        }
    })
    window.addEventListener("resize", adjustWidth);
    player=jQuery("#ytp-properties").YTPlayer();
    player.on("YTPStart", countDown);
});

function countDown(){
    console.log("Execution begins");
    window.setTimeout($(".larger").removeClass("video"), 20000);
}

function iOS() {
    return [
      'iPad Simulator',
      'iPhone Simulator',
      'iPod Simulator',
      'iPad',
      'iPhone',
      'iPod'
    ].includes(navigator.platform)
    // iPad on iOS 13 detection
    || (navigator.userAgent.includes("Mac") && "ontouchend" in document)
  }

/* --- Fixes scroll bar overlap problem --- */
var container = document.getElementById("mainContainer");

function adjustWidth(){
    if(viewportwidth > 839 || !iOS()){
        $("#header").width(viewportwidth-(container.offsetWidth 
        - container.clientWidth));
        $(".menu-container").width(viewportwidth-(container.offsetWidth 
            - container.clientWidth));
        $(".back-container").width(viewportwidth-(container.offsetWidth 
            - container.clientWidth));
    }
    else{
        $("#header").width(viewportwidth);
        $(".back-container").width(viewportwidth);
        $(".menu-container").width(viewportwidth);
    }
}