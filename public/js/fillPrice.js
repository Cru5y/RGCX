function fillPriceAndQuantity(element) {
    // Navigate up to the parent `tr` element
    const row = element.closest('tr');
  
    // Extract the quantity (assuming it's in the first `td`)
    const quantity = row.children[1].textContent.trim();
    
    // Extract the price (assuming it's the direct parent of the clicked 'Buy' label)
    const price = element.parentNode.textContent.trim().split(/\s+/)[0]; // Extracting the numeric part before "Buy"
  
    // Set the extracted values into the respective input fields
    document.getElementById('price_select').value = price;
    document.getElementById('quantity_select').value = quantity;
  }
  