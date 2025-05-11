
const quantityControls = document.querySelectorAll(".quantity-control");
const minValue = 0;
const maxValue = 100;

quantityControls.forEach(control => {
    const increment = control.querySelector(".plus");
    const decrement = control.querySelector(".minus");
    const numberContainer = control.querySelector(".number");

    function updateButtons(value) {
        decrement.disabled = value <= minValue;
        increment.disabled = value >= maxValue;
        numberContainer.textContent = value >= maxValue ? `${value}+` : value;
    }

    increment.addEventListener("click", () => {
        let currentValue = parseInt(numberContainer.textContent) || 0;
        if (currentValue < maxValue) {
            currentValue++;
            updateButtons(currentValue);
        }
    });

    decrement.addEventListener("click", () => {
        let currentValue = parseInt(numberContainer.textContent) || 0;
        if (currentValue > minValue) {
            currentValue--;
            updateButtons(currentValue);
        }
    });

    updateButtons(parseInt(numberContainer.textContent));
});

const thumbnails = document.querySelectorAll(".thumbnail img");
const mainImage = document.querySelector(".main-image img");

thumbnails.forEach(thumb => {
    thumb.addEventListener("click", () => {
        // Remove active class from all thumbnails
        thumbnails.forEach(t => t.parentElement.classList.remove("active"));
        
        // Add active class to clicked thumbnail
        thumb.parentElement.classList.add("active");
        
        // Add fade-out class
        mainImage.classList.add("fade-out");

        // After the fade-out ends, swap images and fade-in
        setTimeout(() => {
            mainImage.src = thumb.src;
            mainImage.classList.remove("fade-out");
        }, 400);
    });
});




function scrollRightBtn() {
    const container = document.getElementById('materials');
    container.scrollBy({ left: 200, behavior: 'smooth' });
    setTimeout(updateScrollButtons, 300);
}

function scrollLeftBtn() {
    const container = document.getElementById('materials');
    container.scrollBy({ left: -200, behavior: 'smooth' });
    setTimeout(updateScrollButtons, 300);
}

function updateScrollButtons() {
    const container = document.getElementById('materials');
    const scrollLeftBtn = document.getElementById('scrollLeftBtn');
    const scrollRightBtn = document.getElementById('scrollRightBtn');
    
    scrollLeftBtn.style.display = container.scrollLeft > 0 ? 'block' : 'none';
    scrollRightBtn.style.display =
        container.scrollLeft + container.clientWidth < container.scrollWidth
            ? 'block'
            : 'none';
}

// Run on load and on resize
window.addEventListener('load', updateScrollButtons);
window.addEventListener('resize', updateScrollButtons);
