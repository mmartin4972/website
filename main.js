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

    /*--- Helpful Variables ---*/
    const projects = document.getElementById('projects');
    const projectContainer = document.getElementsByClassName("projects-menu-container");
    const projectBack = document.getElementsByClassName('back-container');
    const logo = document.getElementsByClassName('logo-desktop');
    const mrover = document.getElementById('mrover');

    /*--- Turns off Project Drop Down ---*/
    function turnOffProjectDropDown(){
        projectContainer[0].classList.remove('active');
        projectBack[0].removeEventListener('mouseleave',turnOffProjectDropDown);
        mrover.removeEventListener("mouseover", turnOffProjectDropDown);
        logo[0].removeEventListener("mouseover", turnOffProjectDropDown);
        document.removeEventListener("mouseleave", turnOffProjectDropDown);
    }

    /*--- Projects Drop Down Function ---*/
    projects.addEventListener("mouseover", function(event){
        console.log(projectContainer[0].className);
        if(!projectContainer[0].classList.contains("active")) {
            projectContainer[0].classList.add('active');
            projectBack[0].addEventListener("mouseleave",turnOffProjectDropDown);
            mrover.addEventListener("mouseover", turnOffProjectDropDown);
            logo[0].addEventListener("mouseover", turnOffProjectDropDown);
            document.addEventListener("mouseleave", turnOffProjectDropDown);
        }
    });
}