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

    const projects = document.getElementById('projects');
    const projectContainer = document.getElementsByClassName("projects-menu-container");
    const projectBack = document.getElementsByClassName('back-container');
    
    projects.addEventListener("mouseover", function(){
        console.log(projectContainer[0].className);
        if(projectContainer[0].className == "projects-menu-container") {
            projectContainer[0].classList.add('active');
            
            projectContainer[0].addEventListener("mouseover",function(){
                projectContainer[0].classList.remove('active');
            });
            console.log("Exited for");
        }
    });
}