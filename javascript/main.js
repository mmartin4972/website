window.addEventListener("DOMContentLoaded", loadPage);
window.addEventListener("resize", navigation);

/* --- Helpful Variables ---*/
const menu = document.getElementsByClassName('menu');
const projects = document.getElementsByClassName('projects');
const mrover = document.getElementsByClassName('mrover');
const logoDesktop = document.getElementsByClassName('logo-desktop');
const logoMobile = document.getElementsByClassName('logo-mobile');
const mobileMenuToggle = document.getElementsByClassName('mobile-menu-toggle');
var viewportwidth;
const projectsId = document.getElementById('projects');
const projectContainer = document.getElementsByClassName("projects menu-container");
const projectBack = document.getElementsByClassName('projects back-container');
const logo = document.getElementsByClassName('logo-desktop');
const mroverId = document.getElementById('mrover');
const mroverDrop = document.getElementsByClassName('mrover');
const scouts = document.getElementById('scouts');
const first = document.getElementById('first');
const mobileDropDown = document.getElementsByClassName('mobile-dropdown');
const menuToggle = document.getElementsByClassName('menu-toggle');
var mobileInitialized = false;
var desktopInitialized = false;
var headerInitialized = false;
const videoIntro = document.getElementById('videoIntro');
const videoLoop = document.getElementById('videoLoop');
var headerHover = false;
const resume = document.getElementById('resume');

function loadPage() {   
    window.setTimeout(killLoadPage, 1000);
    videoIntro.addEventListener('ended', videoLooper, false);
    
}

function videoLooper() {
    videoLoop.play();
    videoLoop.classList.remove('hide');
    videoIntro.classList.add('hide');
}

function killLoadPage() {
    const loadScreen = document.getElementById('loadScreen');
    const header = document.getElementById('header');
    const menu = document.getElementsByClassName('menu');
    header.classList.add('fadeIn');
    header.classList.remove('hide');
    loadScreen.classList.add('fadeOut');
    window.setTimeout(function() {loadScreen.classList.add('hide');},1000);
    navigation();
    resume.classList.remove('hide');
    
}

/*--- Mobile Functions ---*/
var addWhite = function(event) {
    if(!menuToggle[0].classList.contains('menu-toggle-white')){
        menuToggle[0].classList.add('menu-toggle-white');}
}
var removeWhite = function(event){
    if(menuToggle[0].classList.contains('menu-toggle-white')) {
        menuToggle[0].classList.remove('menu-toggle-white');}
}
var dropShow = function(event){
    if(!mobileDropDown[0].classList.contains('active')){
        mobileDropDown[0].classList.add('active');
        console.log('clicked')}
    else{
        mobileDropDown[0].classList.remove('active');
        console.log('clicked');
    }   
} 

/*--- Desktop Functions ---*/

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
function projectDropDown() {
    if(!projectContainer[0].classList.contains("active")) {
        projectContainer[0].classList.add('active');
        projectBack[0].addEventListener("mouseleave",turnOffProjectDropDown);
        first.addEventListener("mouseover", turnOffProjectDropDown);
        scouts.addEventListener("mouseover", turnOffProjectDropDown);
        document.addEventListener("mouseleave", turnOffProjectDropDown);
    }
}

/*--- MROVER Drop Down Function ---*/
function mroverDropDown() {
    if(!mroverDrop[0].classList.contains("active")) {
        mroverDrop[0].classList.add('active');
        mroverDrop[1].addEventListener("mouseleave",turnOffMROVERDropDown);
        logo[0].addEventListener("mouseover", turnOffMROVERDropDown);
        first.addEventListener("mouseover", turnOffMROVERDropDown);
        document.addEventListener("mouseleave", turnOffMROVERDropDown);
    }
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
            if(window.pageYOffset > 0){
                if(header.className != "black") {
                    header.classList.add('black');
                }
            }
            else {
                header.classList.remove('black');
            }
        });

        //Deactivate black after header is not used for 2 seconds
        header.addEventListener("mouseleave", function(){
            headerHover = false;
            window.setTimeout(function() {if(!headerHover){header.classList.remove('black');}}, 4000);
        });
        
        headerInitialized = true;
        console.log('header initialized');
    }

    //Mobile JavaScript
    if(viewportwidth < 645 && !mobileInitialized) {
        
        /*--- Clean Desktop Event Listeners ---*/
        if(desktopInitialized) {
            projectsId.addEventListener("mouseover", projectDropDown);
            mroverId.addEventListener("mouseover", mroverDropDown);
            desktopInitialized = false;
            console.log('desktop cleaned');
        }
        
        /* --- Hide Desktop Menu Items ---*/
        if(!menu[0].classList.contains('hide')) {menu[0].classList.add('hide');}
        if(!projects[0].classList.contains('hide')) {projects[0].classList.add('hide');}
        if(!mrover[0].classList.contains('hide')) {mrover[0].classList.add('hide');}
        if(!logoDesktop[0].classList.contains('hide')) {logoDesktop[0].classList.add('hide');}

        /*--- Show Mobile Menu Items ---*/
        if(logoMobile[0].classList.contains('hide')) {logoMobile[0].classList.remove('hide');}
        if(mobileMenuToggle[0].classList.contains('hide')) {mobileMenuToggle[0].classList.remove('hide');}

      
        
        /*--- Event Listeners ---*/
        mobileMenuToggle[0].addEventListener('mouseover', addWhite, true);
        mobileMenuToggle[0].addEventListener('mouseleave', removeWhite, true);
        mobileMenuToggle[0].addEventListener('click', dropShow, true);
        mobileInitialized = true;
        console.log('mobile initialized');
    }

    //Desktop JavaScript
    if(viewportwidth >= 645 && !desktopInitialized) {
       
        /*--- Kill Mobile Event Listeners ---*/
        if(mobileInitialized){
            mobileInitialized = false;
            mobileMenuToggle[0].removeEventListener('mouseover', addWhite, true);
            mobileMenuToggle[0].removeEventListener('mouseleave', removeWhite, true);
            mobileMenuToggle[0].removeEventListener('click', dropShow, true);
            
            /*--- Close Mobile Drop Down If Left Open ---*/
            if(mobileDropDown[0].classList.contains('active'))
                mobileDropDown[0].classList.remove('active');
            
            console.log('mobile cleaned');
        }
        
        /*--- Show Desktop Menu Items ---*/ 
        if(menu[0].classList.contains('hide')) {menu[0].classList.remove('hide');}
        if(projects[0].classList.contains('hide')) {projects[0].classList.remove('hide');}
        if(mrover[0].classList.contains('hide')) {mrover[0].classList.remove('hide');}
        if(logoDesktop[0].classList.contains('hide')) {logoDesktop[0].classList.remove('hide');}
        
        /* --- Hide Mobile Menu Items ---*/
        if(!logoMobile[0].classList.contains('hide')) {logoMobile[0].classList.add('hide');}
        if(!mobileMenuToggle[0].classList.contains('hide')) {mobileMenuToggle[0].classList.add('hide');}

        
        /*--- Add Event Listeners ---*/
        projectsId.addEventListener("mouseover", projectDropDown);
        mroverId.addEventListener("mouseover", mroverDropDown);
        desktopInitialized = true;
        console.log('desktop initialized');
    }

    return;
}
