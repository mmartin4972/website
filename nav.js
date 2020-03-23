const header = document.getElementById('header');
window.addEventListener('scroll', function(){
   var reOffset;
    if(window.pageYOffset < 100){
        header.classList.remove('black');
    }
    else {
        header.classList.add('black');
    }
});
