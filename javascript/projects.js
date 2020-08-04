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
});

function adaptMobile(){
    if(viewportwidth <= 739){
        $(".bg").addClass("bgFixed");
    }
        
    else{
        $(".bg").removeClass("bgFixed");
    }
}