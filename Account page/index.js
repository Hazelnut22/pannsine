function showSection(id) {
  // Hide all sections
  document.querySelectorAll('.section').forEach(section => {
    section.classList.remove('active');
  });
  
  // Deactivate all buttons
  document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.classList.remove('active');
  });
  
  // Show selected section
  document.getElementById(id).classList.add('active');
  
  // Activate clicked button
  event.currentTarget.classList.add('active');
}

// Logout popup functions
function showLogoutPopup() {
  document.getElementById('logout-popup').classList.add('active');
  document.body.style.overflow = 'hidden';
}

function cancelLogout() {
  document.getElementById('logout-popup').classList.remove('active');
  document.body.style.overflow = 'auto';
}

function confirmLogout() {
  // Redirect to logout page or authentication page
  window.location.href = "../Authentication page/auth.html";
}

// Initialize first section as active
document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('account').classList.add('active');
});