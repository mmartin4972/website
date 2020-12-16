$(document).ready(function() {
    $("#header").removeClass("hide");
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
    adaptMobile();
    window.addEventListener("resize", adaptMobile);

    adjustWidth();
    window.addEventListener("resize", adjustWidth);
});

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


function adaptMobile(){
    if(viewportwidth <= 739 || iOS()){
        $(".bg").addClass("bgFixed");
    }
        
    else{
        $(".bg").removeClass("bgFixed");
    }
}

/* --- Fixes scroll bar overlap problem --- */
var container = document.getElementById("mainContainer");

function adjustWidth(){
    if(viewportwidth > 739 || !iOS())
        $("#header").width(viewportwidth-(container.offsetWidth 
        - container.clientWidth));
    else{
        $("#header").width(viewportwidth);
    }
}