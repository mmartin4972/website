/* --- Helpful Variables ---*/
const header = document.getElementById('header');
const menu = document.getElementsByClassName('menu');
const projects = document.getElementsByClassName('projects');
const leadership = document.getElementsByClassName('leadership');
const logoDesktop = document.getElementsByClassName('logo-desktop');
const logoMobile = document.getElementsByClassName('logo-mobile');
const mobileMenuToggle = document.getElementsByClassName('mobile-menu-toggle');
var viewportwidth;
const logo = document.getElementsByClassName('logo-desktop');
const education = document.getElementById('education');
const fun = document.getElementById('Fun');
var mobileInitialized = false;
var desktopInitialized = false;
var headerInitialized = false;
var atTop = true;
var forceBlack = false;
window.addEventListener("DOMContentLoaded", loadNav);
window.addEventListener("resize", navigation);

/* --- Desktop Drop Downs --- */
const projectsId = document.getElementById('projects');
const projectContainer = document.getElementsByClassName("projects menu-container");
const projectBack = document.getElementsByClassName('projects back-container');

const workId = document.getElementById('work');
const workContainer = document.getElementsByClassName("work menu-container");
const workBack = document.getElementsByClassName("work back-container");

const leadershipId = document.getElementById('leadership');
const leadershipDrop = document.getElementsByClassName('leadership');

/* --- Mobile Drop Down --- */
const mobileDropDown = document.getElementsByClassName('mobile-dropdown');
const menuToggle = document.getElementsByClassName('menu-toggle');
var projectMobileDrop = document.getElementsByClassName('projects mobile-dropdown menu-container');
var projectMobile = document.getElementsByClassName('proj dropdown-box menu-box');
var leadershipMobileDrop = document.getElementsByClassName('leadership mobile-dropdown menu-container');
var leadershipMobile = document.getElementsByClassName('leadership dropdown-box menu-box');
var workMobileDrop = document.getElementsByClassName('work mobile-dropdown menu-container');
var workMobile = document.getElementsByClassName('work dropdown-box menu-box');

function loadNav(){
    navigation();
}
/*--- Mobile Functions ---*/
var whiteToggle = function(event) {
    if(!menuToggle[0].classList.contains('menu-toggle-white')){
        menuToggle[0].classList.add('menu-toggle-white');}
    else{
        menuToggle[0].classList.remove('menu-toggle-white');}
}
var dropShow = function(event){
    if(!mobileDropDown[0].classList.contains('active') && 
        !projectMobileDrop[0].classList.contains('active') &&
        !leadershipMobileDrop[0].classList.contains('active') &&
        !workMobileDrop[0].classList.contains('active')) {
        forceBlack = true;
        mobileDropDown[0].classList.add('active');
        projectMobile[0].addEventListener('click', function(){
            projectMobileDrop[0].classList.add('active');
            mobileDropDown[0].classList.remove('active');
        });
        leadershipMobile[0].addEventListener('click', function(){
            leadershipMobileDrop[0].classList.add('active');
            mobileDropDown[0].classList.remove('active');
        });
        workMobile[0].addEventListener('click', function(){
            workMobileDrop[0].classList.add('active');
            mobileDropDown[0].classList.remove('active');
        });
        if(header.className != "black") {
            header.classList.add('black');
        }
    }
    else{
        mobileDropDown[0].classList.remove('active');
        projectMobileDrop[0].classList.remove('active');
        leadershipMobileDrop[0].classList.remove('active');
        workMobileDrop[0].classList.remove('active');
        forceBlack = false;
        if(!mobileDropDown[0].classList.contains('active')){
            timer2();
        }
    } 
} 

/*--- Desktop Functions ---*/

/*--- Projects Drop Down Function ---*/
function projectDropDown() {
    if(!projectContainer[0].classList.contains("active")) {
        projectContainer[0].classList.add('active');
        projectBack[0].addEventListener("mouseleave",turnOffProjectDropDown);
        // fun.addEventListener("mouseover", turnOffProjectDropDown);
        workId.addEventListener("mouseover", turnOffProjectDropDown);
        document.addEventListener("mouseleave", turnOffProjectDropDown);
        document.addEventListener('click', outsideClickP);
        forceBlack = true;
        var time = -150;
        window.setTimeout(function(){
            $("#gpudrop").addClass("fadeIn");   
             }, time+=150);
        window.setTimeout(function(){
            $("#pcldrop").addClass("fadeIn");   
             }, time+=150);
        window.setTimeout(function(){
            $("#devdrop").addClass("fadeIn");   
             }, time+=150);
        window.setTimeout(function(){
            $("#wdrop").addClass("fadeIn");   
            }, time+=150);
        window.setTimeout(function(){
            $("#uvdrop").addClass("fadeIn");   
                }, time+=150);
    }
}

function turnOffProjectDropDown(){
    forceBlack = false;
    projectContainer[0].classList.remove('active');
    projectBack[0].removeEventListener('mouseleave',turnOffProjectDropDown);
    education.removeEventListener("mouseover", turnOffProjectDropDown);
    // fun.removeEventListener("mouseover", turnOffProjectDropDown);
    document.removeEventListener("mouseleave", turnOffProjectDropDown);
}

function outsideClickP(event) {
    if(!$(event.target).hasClass('proj')){
        turnOffProjectDropDown();
        document.removeEventListener('click', outsideClickP);
    }
}

/*--- leadership Drop Down Function ---*/
function leadershipDropDown() {
    if(!leadershipDrop[0].classList.contains("active")) {
        leadershipDrop[0].classList.add('active');
        $("#edrop").addClass("fadeIn");
        var time = 0;
        window.setTimeout(function(){
            $("#mdrop").addClass("fadeIn");   
             }, time += 150);
        window.setTimeout(function(){
            $("#jdrop").addClass("fadeIn");   
             }, time += 150);
        window.setTimeout(function(){
            $("#sdrop").addClass("fadeIn");   
             }, time += 150);
        window.setTimeout(function(){
            $("#fdrop").addClass("fadeIn");
            }, time += 150);
        forceBlack = true;
        leadershipDrop[1].addEventListener("mouseleave",turnOffLeadershipDropDown);
        logo[0].addEventListener("mouseover", turnOffLeadershipDropDown); 
        education.addEventListener("mouseover", turnOffLeadershipDropDown);
        document.addEventListener("mouseleave", turnOffLeadershipDropDown); 
        document.addEventListener("click", outsideClick);      
    }
}

function turnOffLeadershipDropDown(){
    forceBlack = false;
    leadershipDrop[0].classList.remove('active');
    leadershipDrop[1].removeEventListener('mouseleave',turnOffLeadershipDropDown);
    education.removeEventListener("mouseover", turnOffLeadershipDropDown);
    logo[0].removeEventListener("mouseover", turnOffLeadershipDropDown);
    document.removeEventListener("mouseleave", turnOffLeadershipDropDown);
}

function outsideClick(event) {
    if(!$(event.target).hasClass('edu')){
        turnOffLeadershipDropDown();
        document.removeEventListener('click', outsideClick);
    }
}

/*--- work Drop Down Function ---*/
function workDropDown() {
    if(!workContainer[0].classList.contains("active")) {
        workContainer[0].classList.add('active');
        var time = 0;
        $("#factdrop").addClass("fadeIn");   
        window.setTimeout(function(){
            $("#idrop").addClass("fadeIn");   
             }, time += 150);
        forceBlack = true;
        workBack[0].addEventListener("mouseleave",turnOffWorkDropDown);
        projectsId.addEventListener("mouseover", turnOffWorkDropDown); 
        education.addEventListener("mouseover", turnOffWorkDropDown);
        document.addEventListener("mouseleave", turnOffWorkDropDown); 
        document.addEventListener("click", outsideClickW);      
    }
}

function turnOffWorkDropDown(){
    forceBlack = false;
    workContainer[0].classList.remove('active');
    workBack[0].removeEventListener('mouseleave',turnOffWorkDropDown);
    education.removeEventListener("mouseover", turnOffWorkDropDown);
    projectsId.removeEventListener("mouseover", turnOffWorkDropDown);
    document.removeEventListener("mouseleave", turnOffWorkDropDown);
}

function outsideClickW(event) {
    if(!$(event.target).hasClass('wrk')){
        turnOffWorkDropDown();
        document.removeEventListener('click', outsideClickW);
    }
}

/*---Black background fade after 2 seconds ---*/
function timer2() {
    headerHover = false;
    window.setTimeout(function() {
        if(!headerHover && !mobileDropDown[0].classList.contains('active')
        && atTop && !projectMobileDrop[0].classList.contains('active') &&
        !leadershipMobileDrop[0].classList.contains('active') && !forceBlack){
            header.classList.remove('black');
            resetFades();
        }}, 4000);
}

function resetFades() {
    $("#edrop").removeClass("fadeIn");
    $("#mdrop").removeClass("fadeIn");
    $("#sdrop").removeClass("fadeIn");
    $("#fdrop").removeClass("fadeIn");
    $("#wdrop").removeClass("fadeIn");
    $("#pcldrop").removeClass("fadeIn");
    $("#devdrop").removeClass("fadeIn");
    $("#uvdrop").removeClass("fadeIn");
    $("#factdrop").removeClass("fadeIn");
    $("#idrop").removeClass("fadeIn");
}

function navigation() {
    
    // the more standards compliant browsers (mozilla/netscape/opera/IE7) use window.innerWidth and window.innerHeight   
     if (typeof window.innerWidth != 'undefined')
     {
          viewportwidth = window.innerWidth;
     }

    //Create Header Styling
    if(!headerInitialized) {
    const header = document.getElementById('header');
       
        //Add black when header is hovered over
        header.addEventListener("mouseover", function(){
            header.classList.add('black');
            headerHover = true;
        });

        //Deactivate black when scroll back to the top
        window.addEventListener('scroll', function(){
            if(window.scrollY > 20){
                atTop = false;
                    if(header.className != "black") {
                        header.classList.add('black');
                    }
            }
            else {
                atTop = true;
                if((viewportwidth > 839 && !forceBlack) || (!mobileDropDown[0].classList.contains('active') &&
                !projectMobileDrop[0].classList.contains('active') && 
                !leadershipMobileDrop[0].classList.contains('active')) && !forceBlack) {
                    header.classList.remove('black');
                }
            }
        });
        
        //Deactivate black after header is not used for 2 seconds
        header.addEventListener("mouseleave", timer2);
        
        headerInitialized = true;
        console.log('header initialized');
    }

    //Mobile JavaScript
    if(viewportwidth <= 839 && !mobileInitialized) {
        
        /*--- Clean Desktop Event Listeners ---*/
        if(desktopInitialized) {
            projectsId.removeEventListener("mouseover", projectDropDown);
            leadershipId.removeEventListener("mouseover", leadershipDropDown);
            workId.removeEventListener("mouseover", workDropDown);

            $(".tile").off("click");
            desktopInitialized = false;
            console.log('desktop cleaned');
        }
        
        /* --- Hide Desktop Menu Items ---*/
        if(!menu[0].classList.contains('hide')) {menu[0].classList.add('hide');}
        if(!projects[0].classList.contains('hide')) {projects[0].classList.add('hide');}
        if(!leadership[0].classList.contains('hide')) {leadership[0].classList.add('hide');}
        if(!logoDesktop[0].classList.contains('hide')) {logoDesktop[0].classList.add('hide');}

        /*--- Show Mobile Menu Items ---*/
        if(logoMobile[0].classList.contains('hide')) {logoMobile[0].classList.remove('hide');}
        if(mobileMenuToggle[0].classList.contains('hide')) {mobileMenuToggle[0].classList.remove('hide');}

      
        
        /*--- Event Listeners ---*/
        mobileMenuToggle[0].addEventListener('click', whiteToggle, true);
        mobileMenuToggle[0].addEventListener('click', dropShow, true);
        //Close drop down when push on tile
        $(".tile").click(function(){
            projectMobileDrop[0].classList.remove('active');
            leadershipMobileDrop[0].classList.remove('active');
        });
        mobileInitialized = true;
        console.log('mobile initialized');
    }

    //Desktop JavaScript
    if(viewportwidth > 839 && !desktopInitialized) {
       
        /*--- Kill Mobile Event Listeners ---*/
        if(mobileInitialized){
            mobileInitialized = false;
            mobileMenuToggle[0].removeEventListener('click', whiteToggle, true);
            mobileMenuToggle[0].removeEventListener('click', dropShow, true);
            $(".tile").off("click");
            
            /*--- Close Drop Downs If Left Open ---*/
            if(mobileDropDown[0].classList.contains('active'))
                mobileDropDown[0].classList.remove('active');
            projectMobileDrop[0].classList.remove('active');
            leadershipMobileDrop[0].classList.remove('active');
            workMobileDrop[0].classList.remove('active');
            console.log('mobile cleaned');
        }
        
        /*--- Show Desktop Menu Items ---*/ 
        if(menu[0].classList.contains('hide')) {menu[0].classList.remove('hide');}
        if(projects[0].classList.contains('hide')) {projects[0].classList.remove('hide');}
        if(leadership[0].classList.contains('hide')) {leadership[0].classList.remove('hide');}
        if(logoDesktop[0].classList.contains('hide')) {logoDesktop[0].classList.remove('hide');}
        
        /* --- Hide Mobile Menu Items ---*/
        if(!logoMobile[0].classList.contains('hide')) {logoMobile[0].classList.add('hide');}
        if(!mobileMenuToggle[0].classList.contains('hide')) {mobileMenuToggle[0].classList.add('hide');}

        
        /*--- Add Event Listeners ---*/
        projectsId.addEventListener("mouseover", projectDropDown);
        leadershipId.addEventListener("mouseover", leadershipDropDown);
        workId.addEventListener("mouseover", workDropDown);
        //Close drop down when push on link
        $(".tile").click(function(){
            turnOffProjectDropDown();
            turnOffLeadershipDropDown();
            turnOffWorkDropDown();
        });
        desktopInitialized = true;
        console.log('desktop initialized');
    }

    return;
}
