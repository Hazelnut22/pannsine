
document.addEventListener('DOMContentLoaded', function() {
    // Initialize the first section as active
    document.getElementById('account').classList.add('active');
  });
  
  function showSection(id) {
    // Get all sections and buttons
    const sections = document.querySelectorAll('.section');
    const navButtons = document.querySelectorAll('.nav-btn');
    
    // Remove active class from all buttons
    navButtons.forEach(btn => {
      btn.classList.remove('active');
    });
    
    // Add active class to clicked button
    document.querySelector(`button[onclick="showSection('${id}')"]`).classList.add('active');
    
    // Hide all sections with fade out animation
    sections.forEach(section => {
      if (section.classList.contains('active')) {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        setTimeout(() => {
          section.classList.remove('active');
        }, 300); // Match this with CSS transition duration
      }
    });
    
    // Show selected section with fade in animation after a slight delay
    setTimeout(() => {
      const target = document.getElementById(id);
      target.classList.add('active');
      setTimeout(() => {
        target.style.opacity = '1';
        target.style.transform = 'translateY(0)';
      }, 10);
    }, 300);
  }


  function login() {
    // Redirect to logout page or authentication page
    window.location.href = "../Account page/index.html";
  }


















  document.addEventListener('DOMContentLoaded', function() {
    const authContainer = document.querySelector('.auth-container');
    const loginToggle = document.getElementById('loginToggle');
    const registerToggle = document.getElementById('registerToggle');
    const switchToLogin = document.getElementById('switchToLogin');
    const switchToRegister = document.getElementById('switchToRegister');
    const toggleBg = document.querySelector('.toggle-bg');
    const loginForm = document.querySelector('.login-form');
    const registerForm = document.querySelector('.register-form');
    
    // Initialize
    setTimeout(() => {
      authContainer.classList.add('loaded');
    }, 300);
    
    // Toggle forms with animation
    function showForm(formToShow) {
      if ((formToShow === 'login' && loginForm.classList.contains('active')) || 
          (formToShow === 'register' && registerForm.classList.contains('active'))) {
        return;
      }
      
      // Start animation
      authContainer.classList.add('animating');
      
      // Move toggle background
      toggleBg.style.transform = formToShow === 'login' ? 
        'translateX(0)' : 'translateX(calc(100% - 0.5rem))';
      
      // Toggle active classes
      if (formToShow === 'login') {
        loginToggle.classList.add('active');
        registerToggle.classList.remove('active');
        
        registerForm.classList.add('leaving');
        setTimeout(() => {
          registerForm.classList.remove('active', 'leaving');
          loginForm.classList.add('active');
        }, 300);
      } else {
        registerToggle.classList.add('active');
        loginToggle.classList.remove('active');
        
        loginForm.classList.add('leaving');
        setTimeout(() => {
          loginForm.classList.remove('active', 'leaving');
          registerForm.classList.add('active');
        }, 300);
      }
      
      // Reset animation after completion
      setTimeout(() => {
        authContainer.classList.remove('animating');
      }, 1000);
    }
    
    // Event listeners
    loginToggle.addEventListener('click', () => showForm('login'));
    registerToggle.addEventListener('click', () => showForm('register'));
    switchToLogin.addEventListener('click', (e) => {
      e.preventDefault();
      showForm('login');
    });
    switchToRegister.addEventListener('click', (e) => {
      e.preventDefault();
      showForm('register');
    });
    
    // Form submissions
    loginForm.addEventListener('submit', function(e) {
      e.preventDefault();
      // Login logic
    });
    
    registerForm.addEventListener('submit', function(e) {
      e.preventDefault();
      // Registration logic
    });
  });