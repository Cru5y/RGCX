// Function to toggle the specific dropdown
function toggleDropdown1(event) {
  // Stop propagation to prevent the window click handler from immediately closing the dropdown
  event.stopPropagation();

  // Get the dropdown element and toggle it
  var dropdown = document.getElementById("myDropdown1");
  dropdown.classList.toggle("show");
}

// Attach the toggle function only to the button for myDropdown1
var button = document.querySelector('.dropbtn[data-dropdown-id="myDropdown1"]');
button.onclick = toggleDropdown1;

// Close the dropdown if clicking outside of it
window.onclick = function(event) {
  var dropdown = document.getElementById("myDropdown1");
  // Check if the click is outside the dropdown
  if (!dropdown.contains(event.target)) {
    dropdown.classList.remove('show');
  }
};

// Prevent myDropdown1 from closing when clicking inside it
var dropdownContent1 = document.getElementById("myDropdown1");
dropdownContent1.addEventListener('click', function(event) {
  event.stopPropagation(); // Prevent clicks within the dropdown from propagating to the window
});

// Function to update the display of selected options
function updateSelectedOptionsDisplay() {
  const checkboxes = document.querySelectorAll('#myDropdown1 .multipleSelectionOption input[type=checkbox]');
  const selectedOptionsContainer = document.getElementById('selectedOptions1');
  
  // Collect the values of checked checkboxes
  const selectedValues = Array.from(checkboxes).filter(checkbox => checkbox.checked).map(checkbox => checkbox.value);
  
  // Check if any options are selected and update the display accordingly
  if (selectedValues.length > 0) {
    // Display the selected values
    selectedOptionsContainer.innerHTML = "" + selectedValues.join(", ");
  } else {
    // Display a default message when nothing is selected
    selectedOptionsContainer.innerHTML = "Select an option.";
  }
}



// Attach a change event listener to each checkbox within the dropdown
document.querySelectorAll('#myDropdown1 .multipleSelectionOption input[type=checkbox]').forEach(checkbox => {
  checkbox.addEventListener('change', updateSelectedOptionsDisplay);
});
