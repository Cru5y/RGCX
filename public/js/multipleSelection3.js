// Function to toggle the specific dropdown
function toggleDropdown3(event) {
  // Stop propagation to prevent the window click handler from immediately closing the dropdown
  event.stopPropagation();

  // Get the dropdown element and toggle it
  var dropdown = document.getElementById("myDropdown3");
  dropdown.classList.toggle("show");
}

// Attach the toggle function only to the button for myDropdown3
var button3 = document.querySelector('.dropbtn[data-dropdown-id="myDropdown3"]');
button3.onclick = toggleDropdown3;

// Close only 'myDropdown3' if clicking outside of it
window.addEventListener('click', function(event) {
  let myDropdown3 = document.getElementById('myDropdown3');
  if (myDropdown3 && !myDropdown3.contains(event.target)) {
    myDropdown3.classList.remove('show');
  }
});

// This prevents clicks inside 'myDropdown3' from closing it
document.getElementById('myDropdown3').addEventListener('click', function(event) {
  event.stopPropagation();
});

// Function to update the display of selected options
function updateSelectedOptionsDisplay() {
  const checkboxes = document.querySelectorAll('#myDropdown3 .multipleSelectionOption input[type=checkbox]');
  const selectedOptionsContainer = document.getElementById('selectedOptions3');
  
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
document.querySelectorAll('#myDropdown3 .multipleSelectionOption input[type=checkbox]').forEach(checkbox => {
  checkbox.addEventListener('change', updateSelectedOptionsDisplay);
});