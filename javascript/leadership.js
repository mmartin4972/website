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
})