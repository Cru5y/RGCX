document.addEventListener("DOMContentLoaded", function() {
  const submitBtn = document.getElementById("submit_btn");
  const closeBtn = document.querySelector(".close-btn");
  const popupScreen = document.getElementById("popupScreen");
  const modalBuyBtn = document.getElementById("modalBuyBtn"); // Get the modal buy button

  submitBtn.addEventListener("click", function() {
    const actionSelect = document.getElementById("action_select").value;
    const priceInput = document.getElementById("price_select").value;
    const quantityInput = document.getElementById("quantity_select").value;
    const regionSelect = document.getElementById("region_select").value;
    const countySelect = document.getElementById("county_select").value;
    const localSelect = document.getElementById("local_select").value;

    // Fill the modal with form data
    document.getElementById("modalQuantity").textContent = "Quantity: " + quantityInput;
    document.getElementById("modalPrice").textContent = "Price: " + priceInput;
    document.getElementById("modalRegion").textContent = "Region: " + regionSelect;
    document.getElementById("modalCounty").textContent = "County: " + countySelect;
    document.getElementById("modalPod").textContent = "PoD: " + localSelect;

    // Update the modal buy button text with the action selected
    modalBuyBtn.textContent = actionSelect; // Set the button text to the selected action

    // Show the modal
    popupScreen.style.display = "block";
  });

  // Close the modal when the close button is clicked
  closeBtn.addEventListener("click", function() {
    popupScreen.style.display = "none";
  });

  // Close the modal when clicking outside of it
  window.addEventListener("click", function(event) {
    if (event.target == popupScreen) {
      popupScreen.style.display = "none";
    }
  });
});
