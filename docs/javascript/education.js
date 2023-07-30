$(document).ready(function() {
    $("#header").removeClass("hide");
})

var atTop = true;
var forceBlack = false;
let mainContainer = document.querySelector("#mainContainer");

mainContainer.addEventListener("scroll", function(){
  if(mainContainer.scrollTop > 20){
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