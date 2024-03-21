// Function to toggle the specific dropdown
function toggleDropdown2(event) {
  // Stop propagation to prevent the window click handler from immediately closing the dropdown
  event.stopPropagation();

  // Get the dropdown element and toggle it
  var dropdown = document.getElementById("myDropdown2");
  dropdown.classList.toggle("show");
}

// Attach the toggle function only to the button for myDropdown2
var button2 = document.querySelector('.dropbtn[data-dropdown-id="myDropdown2"]');
button2.onclick = toggleDropdown2;

// Close only 'myDropdown2' if clicking outside of it
window.addEventListener('click', function(event) {
  let myDropdown2 = document.getElementById('myDropdown2');
  if (myDropdown2 && !myDropdown2.contains(event.target)) {
    myDropdown2.classList.remove('show');
  }
});

// This prevents clicks inside 'myDropdown2' from closing it
document.getElementById('myDropdown2').addEventListener('click', function(event) {
  event.stopPropagation();
});

// Function to update the display of selected options
function updateSelectedOptionsDisplay() {
  const checkboxes = document.querySelectorAll('#myDropdown2 .multipleSelectionOption input[type=checkbox]');
  const selectedOptionsContainer = document.getElementById('selectedOptions2');
  
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
document.querySelectorAll('#myDropdown2 .multipleSelectionOption input[type=checkbox]').forEach(checkbox => {
  checkbox.addEventListener('change', updateSelectedOptionsDisplay);
});