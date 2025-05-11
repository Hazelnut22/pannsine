function setupMultiSelectableGrid(gridId, maxSelection, type) {
    const items = document.querySelectorAll(`#${gridId} .item`);
    let selectedItems = [];

    items.forEach(item => {
        item.addEventListener("click", () => {
            const itemName = item.dataset.name;

            if (item.classList.contains("selected")) {
                // Deselect if already selected
                item.classList.remove("selected");
                selectedItems = selectedItems.filter(i => i !== itemName);
            } else {
                if (selectedItems.length < maxSelection) {
                    item.classList.add("selected");
                    selectedItems.push(itemName);
                } else {
                    showCustomAlert(`You can select up to ${maxSelection} ${type}`);
                }
            }

            console.log(`Selected ${type}`, selectedItems);
            updateSummaryAndTotal();
        });
    });
}

function showCustomAlert(message) {
    const alertBox = document.getElementById('customAlert');
    const alertMessage = document.getElementById('customAlertMessage');
    alertMessage.textContent = message;
    alertBox.classList.remove('hidden');
}

document.getElementById('customAlertClose').addEventListener('click', () => {
    document.getElementById('customAlert').classList.add('hidden');
});

// Apply to flower combo grid with a limit of 10
setupMultiSelectableGrid("flower-combo", 10, "flowers");

setupMultiSelectableGrid("bouquet-style", 1, "wrapper");


setupMultiSelectableGrid("bouquet-color", 1, "color");

setupMultiSelectableGrid("ribbon-color", 1, "color");



function updateSummaryAndTotal() {
    const summaryList = document.getElementById("summary-list");
    summaryList.innerHTML = "";
    let total = 0;

    // --- Flowers Section ---
    const flowerItems = document.querySelectorAll("#flower-combo .item.selected");
    if (flowerItems.length > 0) {
        const flowerHeader = document.createElement("h4");
        flowerHeader.textContent = "Flowers";
        summaryList.appendChild(flowerHeader);

        flowerItems.forEach(item => {
            const name = item.dataset.name;
            const price = parseFloat(item.dataset.price) || 0;
            const li = document.createElement("li");
            li.textContent = `${name} - ${price.toFixed(2)}`;
            summaryList.appendChild(li);
            total += price;
        });
    }

    // --- Wrapper Section ---
    const wrapperItem = document.querySelector("#bouquet-style .item.selected");
    if (wrapperItem) {
        const header = document.createElement("h4");
        header.textContent = "Bouquet Material";
        summaryList.appendChild(header);

        const name = wrapperItem.dataset.name;
        const price = parseFloat(wrapperItem.dataset.price) || 0;
        const li = document.createElement("li");
        li.textContent = `${name} - ${price.toFixed(2)}`;
        summaryList.appendChild(li);
        total += price;
    }

    // --- Color Section ---
    const colorItem = document.querySelector("#bouquet-color .item.selected");
    if (colorItem) {
        const header = document.createElement("h4");
        header.textContent = "Bouquet Color";
        summaryList.appendChild(header);

        const name = colorItem.dataset.name;
        const price = parseFloat(colorItem.dataset.price) || 0;
        const li = document.createElement("li");
        li.textContent = `${name} - ${price.toFixed(2)}`;
        summaryList.appendChild(li);
        total += price;
    }

    // --- Ribbon Section ---
    const ribbonItem = document.querySelector("#ribbon-color .item.selected");
    if (ribbonItem) {
        const header = document.createElement("h4");
        header.textContent = "Ribbon Color";
        summaryList.appendChild(header);

        const name = ribbonItem.dataset.name;
        const price = parseFloat(ribbonItem.dataset.price) || 0;
        const li = document.createElement("li");
        li.textContent = `${name} - ${price.toFixed(2)}`;
        summaryList.appendChild(li);
        total += price;
    }

    // --- Total ---
    document.getElementById("price-total").textContent = `${total.toFixed(2)}`;
}


document.getElementById("clear-all-btn").addEventListener("click", () => {
    // Deselect all selected items
    document.querySelectorAll(".item.selected").forEach(item => {
        item.classList.remove("selected");
    });

    // Reset selection state in setupMultiSelectableGrid
    // Optionally, you could refactor to store selectedItems globally per grid if needed

    // Clear textarea
    document.querySelector(".request-box textarea").value = "";

    // Reset the summary and total
    updateSummaryAndTotal();
});

  