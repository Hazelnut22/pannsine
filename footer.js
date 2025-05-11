

  // Map Modal Functionality
  document.addEventListener('DOMContentLoaded', function() {
    const mapTrigger = document.getElementById('mapTrigger');
    const mapModal = document.getElementById('mapModal');
    const closeModal = document.querySelector('.close-modal');
  
    mapTrigger.addEventListener('click', () => {
      mapModal.style.display = 'flex';
      document.body.style.overflow = 'hidden'; // Prevent scrolling
    });
  
    closeModal.addEventListener('click', () => {
      mapModal.style.display = 'none';
      document.body.style.overflow = 'auto';
    });
  
    // Close when clicking outside modal
    mapModal.addEventListener('click', (e) => {
      if (e.target === mapModal) {
        mapModal.style.display = 'none';
        document.body.style.overflow = 'auto';
      }
    });
  });