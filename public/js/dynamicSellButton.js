function setupDynamicSellButton() {
  const cells2 = document.querySelectorAll('table td.buy'); // Targeting cells2 with 'buy' class
  const sellButton = document.getElementById('dynamicSellButton');
  let isHoveringCell = false;
  let isHoveringButton = false;
  let hideButtonTimeout;
  let lastHoveredBuyCell = null; // To remember the last hovered 'buy' cell

  cells2.forEach(cell => {
    cell.addEventListener('mouseenter', function() {
      clearTimeout(hideButtonTimeout);
      isHoveringCell = true;
      lastHoveredBuyCell = this; // Remember this cell as the last hovered

      // Position the sell button based on the cell's position
      const rect = this.getBoundingClientRect();
      sellButton.style.left = `${rect.left - 61}px`;
      sellButton.style.top = `${rect.top + window.scrollY}px`;
      sellButton.style.display = 'block';
    });

    cell.addEventListener('mouseleave', function() {
      isHoveringCell = false;
      hideButtonTimeout = setTimeout(() => {
        if (!isHoveringButton) {
          sellButton.style.display = 'none';
        }
      }, 300);
    });
  });

  sellButton.addEventListener('mouseenter', function() {
    clearTimeout(hideButtonTimeout);
    isHoveringButton = true;
  });

  sellButton.addEventListener('mouseleave', function() {
    isHoveringButton = false;
    hideButtonTimeout = setTimeout(() => {
      if (!isHoveringCell) {
        sellButton.style.display = 'none';
      }
    }, 300);
  });

  // Update the click handler for the sellButton to fill both Price and Quantity
  sellButton.addEventListener('click', function() {
    if (lastHoveredBuyCell) {
      const row = lastHoveredBuyCell.parentNode;

      const metaDataCell = row.children[3]; // Assuming the metaDataCell is the first cell containing spans
      // Extracting individual span values from the metaDataCell
      const regionSpan = metaDataCell.querySelector("span#trade-region");
      const countySpan = metaDataCell.querySelector("span#trade-county");
      const localSpan = metaDataCell.querySelector("span#trade-local");

      // Extracting the text content from each span
      const regionValue = regionSpan ? regionSpan.textContent.trim() : "";
      const countyValue = countySpan ? countySpan.textContent.trim() : "";
      const localValue = localSpan ? localSpan.textContent.trim() : "";

      const quantityCell = row.children[1]; // Assuming the Quantity is in the second cell
      const quantityValue = quantityCell.textContent.trim();
      const buyValue = lastHoveredBuyCell.textContent.trim(); // Get the sell value

      const priceInput = document.getElementById('price_select');
      const quantityInput = document.getElementById('quantity_select');
      const actionInput = document.getElementById('action_select');
      const regionInput = document.getElementById('region_select');
      const countyInput = document.getElementById('county_select');
      const localInput = document.getElementById('local_select');

      // Set values to the inputs
      priceInput.value = quantityValue; // Corrected to match variable names
      quantityInput.value = buyValue; // Corrected to match variable names
      actionInput.value = "SELL"
      regionInput.value = regionValue;
      countyInput.value = countyValue;
      localInput.value = localValue;
    }
  });
}

setupDynamicSellButton();