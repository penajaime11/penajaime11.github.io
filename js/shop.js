document.addEventListener('DOMContentLoaded', function() {
    
    const menuToggle = document.querySelector('.menu-toggle');
    const merchNavbar = document.querySelector('.merch-navbar'); 

   
    if (menuToggle && merchNavbar) {
        menuToggle.addEventListener('click', function() {
            
            merchNavbar.classList.toggle('active');
        });
    }
});