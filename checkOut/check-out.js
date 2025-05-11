
        const scheduleRadio = document.getElementById('schedule');
        const otherRadios = document.querySelectorAll('input[name="delivery"]:not(#schedule)');
        const scheduleContainer = document.getElementById('schedule-date-container');
        const dateInput = document.getElementById('scheduled-date');
        const dateDisplay = document.getElementById('selected-date-display');

        function updateScheduleVisibility() {
            if (scheduleRadio.checked) {
                scheduleContainer.style.display = 'block';
            } else {
                scheduleContainer.style.display = 'none';
                dateDisplay.textContent = '';
                dateInput.value = '';
            }
        }

        scheduleRadio.addEventListener('change', updateScheduleVisibility);
        otherRadios.forEach(radio => radio.addEventListener('change', updateScheduleVisibility));

        dateInput.addEventListener('change', () => {
            const selectedDate = new Date(dateInput.value);
            if (!isNaN(selectedDate)) {
                dateDisplay.textContent = `Scheduled for: ${selectedDate.toDateString()}`;
            }
        });

        document.addEventListener("DOMContentLoaded", () => {
            // Handle quantity changes
            document.querySelectorAll('.cart-item-controls').forEach(control => {
                const minusBtn = control.querySelector('.minus');
                const plusBtn = control.querySelector('.plus');
                const numberSpan = control.querySelector('.number');

                plusBtn.addEventListener('click', () => {
                    let count = parseInt(numberSpan.textContent);
                    numberSpan.textContent = count + 1;
                });

                minusBtn.addEventListener('click', () => {
                    let count = parseInt(numberSpan.textContent);
                    if (count > 0) {
                        numberSpan.textContent = count - 1;
                    }
                });
            });

            // Handle delete action
            document.querySelectorAll('.cart-item-remove').forEach(removeBtn => {
                removeBtn.addEventListener('click', () => {
                    const cartItem = removeBtn.closest('.cart-item');
                    cartItem.remove();
                });
            });
        });

        const changeAddressBtn = document.getElementById("changeAddressBtn");
        const addressBox = document.getElementById("addressSelectBox");
        const townshipSearch = document.getElementById("townshipSearch");
        const townshipList = document.getElementById("townshipList");
        const townshipItems = townshipList.getElementsByTagName("li");

        // Toggle visibility on click
        changeAddressBtn.addEventListener("click", (e) => {
            e.preventDefault();
            addressBox.classList.toggle("hidden");
            townshipSearch.focus();
        });

        // Filter townships as you type
        townshipSearch.addEventListener("input", function () {
            const query = this.value.toLowerCase();
            Array.from(townshipItems).forEach((item) => {
                item.style.display = item.textContent.toLowerCase().includes(query) ? "" : "none";
            });
        });

        // Select township
        Array.from(townshipItems).forEach((item) => {
            item.addEventListener("click", () => {
                townshipSearch.value = item.textContent;
                addressBox.classList.add("hidden");
            });
        });

        // Update township text
        document.querySelectorAll("#townshipList li").forEach((item) => {
            item.addEventListener("click", () => {
                const selected = item.textContent;
                document.getElementById("selectedTownship").textContent = selected;
                document.getElementById("addressSelectBox").classList.add("hidden");
            });
        });

        // Hide if clicked outside
        document.addEventListener("click", (e) => {
            if (!e.target.closest(".address-wrapper")) {
                addressBox.classList.add("hidden");
            }
        });


        document.addEventListener("DOMContentLoaded", function() {
            const scheduleRadio = document.getElementById('schedule');
            const otherRadios = document.querySelectorAll('input[name="delivery"]:not(#schedule)');
            const scheduleContainer = document.getElementById('schedule-date-container');
            const dateInput = document.getElementById('scheduled-date');
            const dateDisplay = document.getElementById('selected-date-display');
            const displayDateSpan = document.getElementById('display-date');
        
            // Set minimum date to tomorrow
            const today = new Date();
            const tomorrow = new Date(today);
            tomorrow.setDate(tomorrow.getDate() + 1);
            const minDate = tomorrow.toISOString().split('T')[0];
            dateInput.min = minDate;
        
            // Format date display
            function formatDate(dateString) {
                const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
                return new Date(dateString).toLocaleDateString('en-US', options);
            }
        
            // Update visibility based on selection
            function updateDeliveryUI() {
                if (scheduleRadio.checked) {
                    scheduleContainer.classList.add('active');
                    dateInput.value = minDate; // Set default to tomorrow
                    displayDateSpan.textContent = formatDate(minDate);
                    dateDisplay.classList.add('active');
                } else {
                    scheduleContainer.classList.remove('active');
                    dateDisplay.classList.remove('active');
                }
            }
        
            // Event listeners
            scheduleRadio.addEventListener('change', updateDeliveryUI);
            otherRadios.forEach(radio => radio.addEventListener('change', updateDeliveryUI));
            
            dateInput.addEventListener('change', (e) => {
                displayDateSpan.textContent = formatDate(e.target.value);
            });
        
            // Initialize
            updateDeliveryUI();
        });
