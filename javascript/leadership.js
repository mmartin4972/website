$(document).ready(function() {
    $("#header").removeClass("hide");
    /*--- Control Black Header since no Window Scroll ---*/
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
    jQuery("#ytp-properties").YTPlayer();
    jQuery("#ytp-properties2").YTPlayer();
    adaptMobile();
    window.addEventListener("resize", adaptMobile);
})

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