/* --- Helpful Variables ---*/
const header = document.getElementById('header');
const menu = document.getElementsByClassName('menu');
const projects = document.getElementsByClassName('projects');
const leadership = document.getElementsByClassName('leadership');
const logoDesktop = document.getElementsByClassName('logo-desktop');
const logoMobile = document.getElementsByClassName('logo-mobile');
const mobileMenuToggle = document.getElementsByClassName('mobile-menu-toggle');
var viewportwidth;
const projectsId = document.getElementById('projects');
const projectContainer = document.getElementsByClassName("projects menu-container");
const projectBack = document.getElementsByClassName('projects back-container');
const logo = document.getElementsByClassName('logo-desktop');
const leadershipId = document.getElementById('leadership');
const leadershipDrop = document.getElementsByClassName('leadership');
const education = document.getElementById('education');
const fun = document.getElementById('Fun');
const mobileDropDown = document.getElementsByClassName('mobile-dropdown');
const menuToggle = document.getElementsByClassName('menu-toggle');
var mobileInitialized = false;
var desktopInitialized = false;
var headerInitialized = false;
var atTop = true;
var projectMobileDrop = document.getElementsByClassName('projects mobile-dropdown menu-container');
var projectMobile = document.getElementsByClassName('proj dropdown-box menu-box');
var leadershipMobileDrop = document.getElementsByClassName('leadership mobile-dropdown menu-container');
var leadershipMobile = document.getElementsByClassName('leadership dropdown-box menu-box');
var forceBlack = false;
window.addEventListener("DOMContentLoaded", loadNav);
window.addEventListener("resize", navigation);

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
        !leadershipMobileDrop[0].classList.contains('active')){
        mobileDropDown[0].classList.add('active');
        projectMobile[0].addEventListener('click', function(){
            projectMobileDrop[0].classList.add('active');
            mobileDropDown[0].classList.remove('active');
        });
        leadershipMobile[0].addEventListener('click', function(){
            leadershipMobileDrop[0].classList.add('active');
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
        if(!mobileDropDown[0].classList.contains('active')){
            timer2();
        }
    } 
} 

/*--- Desktop Functions ---*/

/*--- Turns off Project Drop Down ---*/
function turnOffProjectDropDown(){
    projectContainer[0].classList.remove('active');
    projectBack[0].removeEventListener('mouseleave',turnOffProjectDropDown);
    education.removeEventListener("mouseover", turnOffProjectDropDown);
    fun.removeEventListener("mouseover", turnOffProjectDropDown);
    document.removeEventListener("mouseleave", turnOffProjectDropDown);
}

/*--- Turns off leadership Drop Down ---*/
function turnOffleadershipDropDown(){
    leadershipDrop[0].classList.remove('active');
    leadershipDrop[1].removeEventListener('mouseleave',turnOffleadershipDropDown);
    education.removeEventListener("mouseover", turnOffleadershipDropDown);
    logo[0].removeEventListener("mouseover", turnOffleadershipDropDown);
    document.removeEventListener("mouseleave", turnOffleadershipDropDown);
}

function outsideClick(event) {
    if(!$(event.target).hasClass('edu')){
        turnOffleadershipDropDown();
        document.removeEventListener('click', outsideClick);
    }
}

function outsideClickP(event) {
    if(!$(event.target).hasClass('proj')){
        turnOffProjectDropDown();
        document.removeEventListener('click', outsideClickP);
    }
}

/*--- Projects Drop Down Function ---*/
function projectDropDown() {
    if(!projectContainer[0].classList.contains("active")) {
        projectContainer[0].classList.add('active');
        projectBack[0].addEventListener("mouseleave",turnOffProjectDropDown);
        fun.addEventListener("mouseover", turnOffProjectDropDown);
        education.addEventListener("mouseover", turnOffProjectDropDown);
        document.addEventListener("mouseleave", turnOffProjectDropDown);
        document.addEventListener('click', outsideClickP);
        $("#idrop").addClass("fadeIn");
        var time = 0;
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

/*--- leadership Drop Down Function ---*/
function leadershipDropDown() {
    if(!leadershipDrop[0].classList.contains("active")) {
        leadershipDrop[0].classList.add('active');
        $("#mdrop").addClass("fadeIn");
        var time = 0;
        window.setTimeout(function(){
            $("#jdrop").addClass("fadeIn");   
             }, time += 150);
        window.setTimeout(function(){
            $("#sdrop").addClass("fadeIn");   
             }, time += 150);
        window.setTimeout(function(){
            $("#fdrop").addClass("fadeIn");
            }, time += 150);
        leadershipDrop[1].addEventListener("mouseleave",turnOffleadershipDropDown);
        logo[0].addEventListener("mouseover", turnOffleadershipDropDown); 
        education.addEventListener("mouseover", turnOffleadershipDropDown);
        document.addEventListener("mouseleave", turnOffleadershipDropDown); 
        document.addEventListener("click", outsideClick);      
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
    $("#mdrop").removeClass("fadeIn");
    $("#sdrop").removeClass("fadeIn");
    $("#fdrop").removeClass("fadeIn");
    $("#wdrop").removeClass("fadeIn");
    $("#pcldrop").removeClass("fadeIn");
    $("#devdrop").removeClass("fadeIn");
    $("#uvdrop").removeClass("fadeIn");
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
            if(window.pageYOffset > 20){
                atTop = false;
                    if(header.className != "black") {
                        header.classList.add('black');
                    }
            }
            else {
                atTop = true;
                if((viewportwidth > 739 && !forceBlack) || (!mobileDropDown[0].classList.contains('active') &&
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
    if(viewportwidth <= 739 && !mobileInitialized) {
        
        /*--- Clean Desktop Event Listeners ---*/
        if(desktopInitialized) {
            projectsId.removeEventListener("mouseover", projectDropDown);
            leadershipId.removeEventListener("mouseover", leadershipDropDown);
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
    if(viewportwidth > 739 && !desktopInitialized) {
       
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
        //Close drop down when push on link
        $(".tile").click(function(){
            turnOffProjectDropDown();
            turnOffleadershipDropDown();
        });
        desktopInitialized = true;
        console.log('desktop initialized');
    }

    return;
}
