window.addEventListener("DOMContentLoaded", onPageLoadNavigation);

function onPageLoadNavigation() {
    const header = document.getElementById('header');
    var hovered;
    
    header.addEventListener("mouseover", function(){
        header.classList.add('black');
    });
    
    window.addEventListener('scroll', function(){
        if(window.pageYOffset > 0){
            if(header.className != "black") {
                header.classList.add('black');
            }
        }
        else {
            header.classList.remove('black');
        }
    });
}