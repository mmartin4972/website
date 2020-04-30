/* --- Helpful Variables ---*/
const header = document.getElementById('header');
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
const fun = document.getElementById('Fun');
const mobileDropDown = document.getElementsByClassName('mobile-dropdown');
const menuToggle = document.getElementsByClassName('menu-toggle');
var mobileInitialized = false;
var desktopInitialized = false;
var headerInitialized = false;
var atTop = true;
var projectMobileDrop = document.getElementsByClassName('projects mobile-dropdown menu-container');
var projectMobile = document.getElementsByClassName('proj dropdown-box menu-box');
var mroverMobileDrop = document.getElementsByClassName('mrover mobile-dropdown menu-container');
var mroverMobile = document.getElementsByClassName('mrover dropdown-box menu-box');

window.addEventListener("DOMContentLoaded", loadNav);
window.addEventListener("resize", navigation);

function loadNav(){
    header.classList.add('fadeIn');
    header.classList.remove('hide');
    navigation();
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
    if(!mobileDropDown[0].classList.contains('active') && 
        !projectMobileDrop[0].classList.contains('active') &&
        !mroverMobileDrop[0].classList.contains('active')){
        mobileDropDown[0].classList.add('active');
        projectMobile[0].addEventListener('click', function(){
            projectMobileDrop[0].classList.add('active');
            mobileDropDown[0].classList.remove('active');
        });
        mroverMobile[0].addEventListener('click', function(){
            mroverMobileDrop[0].classList.add('active');
            mobileDropDown[0].classList.remove('active');
        });
        if(header.className != "black") {
            header.classList.add('black');
        }
    }
    else{
        mobileDropDown[0].classList.remove('active');
        projectMobileDrop[0].classList.remove('active');
        mroverMobileDrop[0].classList.remove('active');
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
    scouts.removeEventListener("mouseover", turnOffProjectDropDown);
    fun.removeEventListener("mouseover", turnOffProjectDropDown);
    document.removeEventListener("mouseleave", turnOffProjectDropDown);
}

/*--- Turns off MROVER Drop Down ---*/
function turnOffMROVERDropDown(){
    mroverDrop[0].classList.remove('active');
    mroverDrop[1].removeEventListener('mouseleave',turnOffMROVERDropDown);
    scouts.removeEventListener("mouseover", turnOffMROVERDropDown);
    logo[0].removeEventListener("mouseover", turnOffMROVERDropDown);
    document.removeEventListener("mouseleave", turnOffMROVERDropDown);
    console.log('off');
}

function outsideClick(event) {
    if(!$(event.target).hasClass('rover')){
        turnOffMROVERDropDown();
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
        scouts.addEventListener("mouseover", turnOffProjectDropDown);
        document.addEventListener("mouseleave", turnOffProjectDropDown);
        document.addEventListener('click', outsideClickP);
    }
}

/*--- MROVER Drop Down Function ---*/
function mroverDropDown() {
    if(!mroverDrop[0].classList.contains("active")) {
        mroverDrop[0].classList.add('active');
        mroverDrop[1].addEventListener("mouseleave",turnOffMROVERDropDown);
        logo[0].addEventListener("mouseover", turnOffMROVERDropDown); 
        scouts.addEventListener("mouseover", turnOffMROVERDropDown);
        document.addEventListener("mouseleave", turnOffMROVERDropDown); 
        document.addEventListener("click", outsideClick);      
    }
}

/*---Black background fade after 2 seconds ---*/
function timer2() {
    headerHover = false;
    window.setTimeout(function() {
        if(!headerHover && !mobileDropDown[0].classList.contains('active')
        && atTop && !projectMobileDrop[0].classList.contains('active') &&
        !mroverMobileDrop[0].classList.contains('active')){
            header.classList.remove('black');
        }}, 4000);
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
                if(viewportwidth > 739 || (!mobileDropDown[0].classList.contains('active') &&
                !projectMobileDrop[0].classList.contains('active') && 
                !mroverMobileDrop[0].classList.contains('active'))) {
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
            mroverId.removeEventListener("mouseover", mroverDropDown);
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
    if(viewportwidth > 739 && !desktopInitialized) {
       
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
