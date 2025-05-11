document.addEventListener('DOMContentLoaded', function () {
  const carousel = document.querySelector('.luxury-carousel');
  const track = document.querySelector('.carousel-track');
  const slides = Array.from(document.querySelectorAll('.carousel-slide'));
  const prevBtn = document.querySelector('.carousel-nav.prev');
  const nextBtn = document.querySelector('.carousel-nav.next');
  const indicators = Array.from(document.querySelectorAll('.indicator'));

  let currentIndex = 0;
  const slideCount = slides.length;

  // Update carousel position
  function updateCarousel() {
    track.style.transform = `translateX(-${currentIndex * 100}%)`;

    // Update slide classes
    slides.forEach((slide, index) => {
      slide.classList.toggle('active', index === currentIndex);
    });

    // Update indicators
    indicators.forEach((indicator, index) => {
      indicator.classList.toggle('active', index === currentIndex);
    });
  }

  // Next slide
  function nextSlide() {
    currentIndex = (currentIndex + 1) % slideCount;
    updateCarousel();
  }

  // Previous slide
  function prevSlide() {
    currentIndex = (currentIndex - 1 + slideCount) % slideCount;
    updateCarousel();
  }

  // Go to specific slide
  function goToSlide(index) {
    currentIndex = index;
    updateCarousel();
  }

  // Event listeners
  nextBtn.addEventListener('click', nextSlide);
  prevBtn.addEventListener('click', prevSlide);

  indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => goToSlide(index));
  });

  // Auto-advance (optional)
  let autoSlide = setInterval(nextSlide, 6000);

  carousel.addEventListener('mouseenter', () => clearInterval(autoSlide));
  carousel.addEventListener('mouseleave', () => {
    autoSlide = setInterval(nextSlide, 6000);
  });

  // Touch support for mobile
  let touchStartX = 0;
  let touchEndX = 0;

  carousel.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
    clearInterval(autoSlide);
  }, { passive: true });

  carousel.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
    autoSlide = setInterval(nextSlide, 6000);
  }, { passive: true });

  function handleSwipe() {
    const threshold = 50;
    if (touchStartX - touchEndX > threshold) nextSlide();
    if (touchEndX - touchStartX > threshold) prevSlide();
  }
});
















// Product Grid Expansion
document.addEventListener('DOMContentLoaded', function () {
  const viewMoreBtn = document.getElementById('viewMoreBtn');
  const productsGrid = document.getElementById('productsGrid');
  const hiddenProducts = document.querySelectorAll('.hidden-product');
  let isExpanded = false;

  viewMoreBtn.addEventListener('click', function () {
    isExpanded = !isExpanded;

    if (isExpanded) {
      // Expand the grid
      productsGrid.classList.add('expanded');
      viewMoreBtn.innerHTML = 'Show Less <svg width="20" viewBox="0 0 24 24"><path d="M19 12H5m0 0l7-7m-7 7l7 7"/></svg>';

      // Animate each hidden product with a delay
      hiddenProducts.forEach((product, index) => {
        setTimeout(() => {
          product.style.display = 'block';
          product.classList.add('animated');
        }, 100 * index);
      });
    } else {
      // Collapse the grid
      productsGrid.classList.remove('expanded');
      viewMoreBtn.innerHTML = 'Shop All <svg width="20" viewBox="0 0 24 24"><path d="M12 5v14m0 0l7-7m-7 7l-7-7"/></svg>';

      // Reset hidden products
      hiddenProducts.forEach(product => {
        product.style.display = 'none';
        product.classList.remove('animated');
      });
    }
  });

  // Initialize Intersection Observer for animations
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animated');
      }
    });
  }, { threshold: 0.1 });

  // Observe all product cards
  document.querySelectorAll('.product-card').forEach(card => {
    observer.observe(card);
  });
});
















// Filter Functionality
document.addEventListener('DOMContentLoaded', function () {
  const filterBtn = document.querySelector('.filter-button');
  const filterOverlay = document.getElementById('filterOverlay');
  const clearFilterBtn = document.getElementById('clearFilter');
  const applyFilterBtn = document.getElementById('applyFilter');
  const priceSlider = document.getElementById('priceSlider');
  const sliderValue = document.getElementById('sliderValue');

  // Toggle filter overlay
  filterBtn.addEventListener('click', function () {
    filterOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  });

  // Close filter overlay when clicking outside
  filterOverlay.addEventListener('click', function (e) {
    if (e.target === filterOverlay) {
      closeFilter();
    }
  });

  // Clear all filters
  clearFilterBtn.addEventListener('click', function () {
    document.querySelectorAll('.filter-checkbox input').forEach(checkbox => {
      checkbox.checked = false;
    });
    priceSlider.value = 100000;
    sliderValue.textContent = '500';
    document.getElementById('minPrice').value = '';
    document.getElementById('maxPrice').value = '';
  });

  // Apply filters
  applyFilterBtn.addEventListener('click', function () {
    // Here you would implement your actual filtering logic
    // For now we'll just close the filter
    closeFilter();

    // Example of getting filter values:
    const selectedTypes = Array.from(document.querySelectorAll('input[name="product-type"]:checked')).map(el => el.value);
    const selectedOccasions = Array.from(document.querySelectorAll('input[name="occasion"]:checked')).map(el => el.value);
    const selectedFlowers = Array.from(document.querySelectorAll('input[name="flower-type"]:checked')).map(el => el.value);
    const maxPrice = priceSlider.value;

    console.log('Applying filters:', {
      types: selectedTypes,
      occasions: selectedOccasions,
      flowers: selectedFlowers,
      maxPrice: maxPrice
    });

    // You would then filter your product list based on these values
  });

  // Price slider update
  priceSlider.addEventListener('input', function () {
    sliderValue.textContent = this.value;
  });

  // Close filter function
  function closeFilter() {
    filterOverlay.classList.remove('active');
    document.body.style.overflow = 'auto';
  }
});










// Price Range Slider
const rangeMin = document.querySelector('.slider-min');
const rangeMax = document.querySelector('.slider-max');
const rangeDisplayMin = document.querySelector('.range-min');
const rangeDisplayMax = document.querySelector('.range-max');
const rangeSlider = document.querySelector('.range-slider');

function updatePriceRange() {
  const minVal = parseInt(rangeMin.value);
  const maxVal = parseInt(rangeMax.value);

  // Prevent crossing
  if (minVal > maxVal) {
    rangeMin.value = maxVal;
  }

  // Update display
  rangeDisplayMin.textContent = `${rangeMin.value} MMK`;
  rangeDisplayMax.textContent = `${rangeMax.value} MMK`;

  // Update slider track (adjust calculation to 5000–100000 range)
  const totalRange = 100000 - 5000;
  const minPercent = ((rangeMin.value - 5000) / totalRange) * 100;
  const maxPercent = ((rangeMax.value - 5000) / totalRange) * 100;

  rangeSlider.style.setProperty('--min-thumb', `${minPercent}%`);
  rangeSlider.style.setProperty('--max-thumb', `${maxPercent}%`);
}

rangeMin.addEventListener('input', updatePriceRange);
rangeMax.addEventListener('input', updatePriceRange);

// Initialize
updatePriceRange();


// Add to cart
document.addEventListener('DOMContentLoaded', function () {
  const addToCartButtons = document.querySelectorAll('.add-to-cart');
  const cartCountElement = document.getElementById('cart-count');
  const addedProducts = new Set();

  addToCartButtons.forEach(button => {
    button.addEventListener('click', function () {
      const productCard = button.closest('.product-card');
      const productName = productCard.querySelector('.product-name').textContent.trim();

      if (!addedProducts.has(productName)) {
        addedProducts.add(productName);
        cartCountElement.textContent = addedProducts.size;
      } else {
        showToast(`${productName} is already in your cart.`);
      }
    });
  });

  function showToast(message) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.classList.add('show');

    setTimeout(() => {
      toast.classList.remove('show');
    }, 3000);
  }
});


function goToFilter() {
  window.location.href = "../Filter Page/filter.html";
}