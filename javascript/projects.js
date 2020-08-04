var isiOS = false;
window.addEventListener("resize", adaptMobile);

function adaptMobile(){
    console.log("adaptMobile Test");
    isiOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);
    if(isiOS){
        $(".bg").add("bgFixed");
    }
    else{
        $(".bg").remove("bgFixed");
    }
}

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
});