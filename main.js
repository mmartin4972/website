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
    const projectContainer = document.getElementsByClassName("projects menu-container");
    const projectBack = document.getElementsByClassName('projects back-container');
    const logo = document.getElementsByClassName('logo-desktop');
    const mrover = document.getElementById('mrover');
    const mroverDrop = document.getElementsByClassName('mrover');
    const scouts = document.getElementById('scouts');
    const first = document.getElementById('first');

    /*--- Turns off Project Drop Down ---*/
    function turnOffProjectDropDown(){
        projectContainer[0].classList.remove('active');
        projectBack[0].removeEventListener('mouseleave',turnOffProjectDropDown);
        scouts.removeEventListener("mouseover", turnOffProjectDropDown);
        first.removeEventListener("mouseover", turnOffProjectDropDown);
        document.removeEventListener("mouseleave", turnOffProjectDropDown);
    }

       /*--- Turns off MROVER Drop Down ---*/
       function turnOffMROVERDropDown(){
        mroverDrop[0].classList.remove('active');
        mroverDrop[1].removeEventListener('mouseleave',turnOffMROVERDropDown);
        first.removeEventListener("mouseover", turnOffMROVERDropDown);
        logo[0].removeEventListener("mouseover", turnOffMROVERDropDown);
        document.removeEventListener("mouseleave", turnOffMROVERDropDown);
    }

    /*--- Projects Drop Down Function ---*/
    projects.addEventListener("mouseover", function(){
        if(!projectContainer[0].classList.contains("active")) {
            projectContainer[0].classList.add('active');
            projectBack[0].addEventListener("mouseleave",turnOffProjectDropDown);
            first.addEventListener("mouseover", turnOffProjectDropDown);
            scouts.addEventListener("mouseover", turnOffProjectDropDown);
            document.addEventListener("mouseleave", turnOffProjectDropDown);
        }
    });

    /*--- MROVER Drop Down Function ---*/
    mrover.addEventListener("mouseover", function(){
        if(!mroverDrop[0].classList.contains("active")) {
            mroverDrop[0].classList.add('active');
            mroverDrop[1].addEventListener("mouseleave",turnOffMROVERDropDown);
            logo[0].addEventListener("mouseover", turnOffMROVERDropDown);
            first.addEventListener("mouseover", turnOffMROVERDropDown);
            /*(document.addEventListener("mouseleave", turnOffMROVERDropDown);*/
        }
    });
}