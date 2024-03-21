  function setupDynamicBuyButton() {
    const cells = document.querySelectorAll('table td.sell'); // Targeting cells with 'sell' class
    const buyButton = document.getElementById('dynamicBuyButton');
    let isHoveringCell = false;
    let isHoveringButton = false;
    let hideButtonTimeout;
    let lastHoveredSellCell = null; // To remember the last hovered 'sell' cell
  
    cells.forEach(cell => {
      cell.addEventListener('mouseenter', function() {
        clearTimeout(hideButtonTimeout);
        isHoveringCell = true;
        lastHoveredSellCell = this; // Remember this cell as the last hovered
  
        // Position the buy button based on the cell's position
        const rect = this.getBoundingClientRect();
        buyButton.style.left = `${rect.right}px`;
        buyButton.style.top = `${rect.top + window.scrollY}px`;
        buyButton.style.display = 'block';

      });
  
      cell.addEventListener('mouseleave', function() {
        isHoveringCell = false;
        hideButtonTimeout = setTimeout(() => {
          if (!isHoveringButton) {
            buyButton.style.display = 'none';
          }
        }, 300);
      });
    });
  
    buyButton.addEventListener('mouseenter', function() {
      clearTimeout(hideButtonTimeout);
      isHoveringButton = true;
    });
  
    buyButton.addEventListener('mouseleave', function() {
      isHoveringButton = false;
      hideButtonTimeout = setTimeout(() => {
        if (!isHoveringCell) {
          buyButton.style.display = 'none';
        }
      }, 300);
    });
  
    // Update the click handler for the buyButton to fill both Price and Quantity
    buyButton.addEventListener("click", function () {
      if (lastHoveredSellCell) {
        const row = lastHoveredSellCell.parentNode;

        const metaDataCell = row.children[3]; // Assuming the metaDataCell is the first cell containing spans
        // Extracting individual span values from the metaDataCell
        const regionSpan = metaDataCell.querySelector("span#trade-region");
        const countySpan = metaDataCell.querySelector("span#trade-county");
        const localSpan = metaDataCell.querySelector("span#trade-local");

        // Extracting the text content from each span
        const regionValue = regionSpan ? regionSpan.textContent.trim() : "";
        const countyValue = countySpan ? countySpan.textContent.trim() : "";
        const localValue = localSpan ? localSpan.textContent.trim() : "";

        const quantityCell = row.children[1]; // Assuming the Quantity is in the third cell
        const quantityValue = quantityCell.textContent.trim();
        const sellValue = lastHoveredSellCell.textContent.trim(); // Get the sell value

        const priceInput = document.getElementById("price_select");
        const quantityInput = document.getElementById("quantity_select");
        const actionInput = document.getElementById("action_select");
        const regionInput = document.getElementById("region_select");
        const countyInput = document.getElementById("county_select");
        const localInput = document.getElementById("local_select");

        // Set values to the inputs
        priceInput.value = quantityValue; // Corrected to match variable names
        quantityInput.value = sellValue; // Corrected to match variable names
        actionInput.value = "BUY";
        regionInput.value = regionValue;
        countyInput.value = countyValue;
        localInput.value = localValue;
      }
    });
  }
  