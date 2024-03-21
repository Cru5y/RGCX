document.querySelector("#submit_btn").addEventListener("click", () => {
  const popupScreen = document.getElementById("popupScreen");
  const closeButton = document.getElementsByClassName("close-btn")[0];
  const formContents = validateSubmit();

  // Show the popup if form validation passes
  if(formContents) {
    popupScreen.style.display = "flex";
  }

  // Close the popup when the close button is clicked
  closeButton.addEventListener("click", function () {
    popupScreen.style.display = "none";
  });

  // Also close the popup when clicking outside of it
  window.onclick = function (event) {
    if (event.target == popupScreen) {
      popupScreen.style.display = "none";
    }
  };
});

function validateSubmit() {
  const fields = document.querySelectorAll(".form-item");
  let values = [];
  for (let field of fields) {
    if(!field.value) { // check if form has been given value
      alert("Could not submit form: not all fields filled");
      return false;
    }
    values.push(field.value);
  }
  return values;
}
