document.addEventListener('DOMContentLoaded', function() {
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileNav = document.getElementById('mobileNav');
  const mobileOverlay = document.getElementById('mobileOverlay');
  const body = document.body;
  
  // Toggle mobile menu
  function toggleMenu() {
    const isExpanded = mobileMenuBtn.getAttribute('aria-expanded') === 'true';
    mobileMenuBtn.setAttribute('aria-expanded', !isExpanded);
    mobileMenuBtn.classList.toggle('active');
    mobileNav.classList.toggle('active');
    mobileOverlay.classList.toggle('active');
    body.classList.toggle('menu-open');
  }
  
  // Event listeners
  mobileMenuBtn.addEventListener('click', toggleMenu);
  mobileOverlay.addEventListener('click', toggleMenu);
  
  // Close menu when clicking nav links
  document.querySelectorAll('.mobile-nav a').forEach(link => {
    link.addEventListener('click', toggleMenu);
  });
  
  // Update cart count on both displays
  function updateCartCount(count) {
    document.getElementById('cart-count').textContent = count;
    document.getElementById('mobile-cart-count').textContent = count;
  }
  
  // Initialize cart count (example)
  updateCartCount(0);
  
  // Handle window resize
  function handleResize() {
    if (window.innerWidth > 768) {
      // Close mobile menu if open when resizing to desktop
      if (mobileNav.classList.contains('active')) {
        toggleMenu();
      }
    }
  }
  
  window.addEventListener('resize', handleResize);
});







document.addEventListener('DOMContentLoaded', function() {
  // Only run on the collection page
  if (!window.location.pathname.includes('shopping.html')) return;

  // Luxurious scroll function
  function smoothScrollTo(target, duration = 2000) {
    const targetElement = document.getElementById(target);
    if (!targetElement) return;

    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;

    function animation(currentTime) {
      if (!startTime) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);
      
      // Custom easing for luxury feel
      const ease = progress < 0.5 
        ? 2 * progress * progress 
        : 1 - Math.pow(-2 * progress + 2, 2) / 2;
      
      window.scrollTo(0, startPosition + distance * ease);
      
      if (timeElapsed < duration) {
        requestAnimationFrame(animation);
      }
    }

    requestAnimationFrame(animation);
  }

  // Show carousel for 5 seconds then scroll to products
  function initCollectionExperience() {
    // Scroll to top first (in case user landed mid-page)
    window.scrollTo({ top: 0, behavior: 'instant' });
    
    // Add visual highlight to carousel
    const carousel = document.getElementById('carousel-section');
    if (carousel) {
      carousel.classList.add('luxury-highlight');
      
      // Create loading indicator
      const loader = createLoader();
      document.body.appendChild(loader);
      
      // After 5 seconds, scroll to products
      setTimeout(() => {
        smoothScrollTo('products-section', 1800);
        carousel.classList.remove('luxury-highlight');
        
        // Remove loader after scroll completes
        setTimeout(() => {
          loader.style.opacity = '0';
          setTimeout(() => loader.remove(), 500);
        }, 1800);
      }, 3000);
    }
  }

  // Create elegant loading indicator
  function createLoader() {
    const loader = document.createElement('div');
    loader.className = 'luxury-collection-loader';
    loader.innerHTML = `
      <div class="luxury-spinner">
        <div class="petal"></div>
        <div class="petal"></div>
        <div class="petal"></div>
      </div>
      <p>Explore More...</p>
    `;
    return loader;
  }

  // Start the experience
  setTimeout(initCollectionExperience, 300); // Small delay for page stability
});