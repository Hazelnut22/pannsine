document.addEventListener('DOMContentLoaded', function() {
    const track = document.querySelector('.feedback-carousel-track');
    const leftArrow = document.querySelector('.left-arrow');
    const rightArrow = document.querySelector('.right-arrow');
    const testimonialWidth = document.querySelector('.luxury-testimonial').offsetWidth + 32; // card + gap
  
    leftArrow.addEventListener('click', () => {
      track.scrollBy({ left: -testimonialWidth, behavior: 'smooth' });
    });
  
    rightArrow.addEventListener('click', () => {
      track.scrollBy({ left: testimonialWidth, behavior: 'smooth' });
    });
  });






  

  document.addEventListener('DOMContentLoaded', function() {
    // Create Intersection Observer
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const delay = el.dataset.delay || 0;
          
          setTimeout(() => {
            el.classList.add('animated');
            
            // Reset animation when element leaves viewport
            const unobserver = new IntersectionObserver((unentries) => {
              unentries.forEach(unentry => {
                if (!unentry.isIntersecting) {
                  unentry.target.classList.remove('animated');
                  unobserver.unobserve(unentry.target);
                }
              });
            }, { threshold: 0 });
            
            unobserver.observe(el);
          }, delay * 1000);
        }
      });
    }, { threshold: 0.15 }); // 15% visible triggers animation
  
    // Observe all animated elements
    document.querySelectorAll('[data-animate]').forEach(el => {
      observer.observe(el);
    });
  });













