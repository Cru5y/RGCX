// Get modal element
var mapModal1 = document.getElementById("mapModal1");

// Get the button that opens the modal
var btn1 = document.getElementById("openModalButton1");

// Get the <span1> element that closes the modal
var span1 = document.getElementById("close-button1");

// When the user clicks the button, open the modal 
btn1.onclick = function() {
  mapModal1.style.display = "block";
}

// When the user clicks on <span1> (x), close the modal
span1.onclick = function() {
  mapModal1.style.display = "none";
}

window.addEventListener('click', onclick);
// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == mapModal1) {
      mapModal1.style.display = "none";
    }
}

////////

// Get modal element
var mapModal2 = document.getElementById("mapModal2");

// Get the button that opens the modal
var btn2 = document.getElementById("openModalButton2");

// Get the <span2> element that closes the modal
var span2 = document.getElementById("close-button2");

// When the user clicks the button, open the modal 
btn2.onclick = function() {
  mapModal2.style.display = "block";
}

// When the user clicks on <span2> (x), close the modal
span2.onclick = function() {
  mapModal2.style.display = "none";
}

window.addEventListener('click', onclick);
// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == mapModal2) {
      mapModal2.style.display = "none";
    }
}

///////////

// Get modal element
var mapModal3 = document.getElementById("mapModal3");

// Get the button that opens the modal
var btn3 = document.getElementById("openModalButton3");

// Get the <span3> element that closes the modal
var span3 = document.getElementById("close-button3");

// When the user clicks the button, open the modal 
btn3.onclick = function() {
  mapModal3.style.display = "block";
}

// When the user clicks on <span3> (x), close the modal
span3.onclick = function() {
  mapModal3.style.display = "none";
}

window.addEventListener('click', onclick);
// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == mapModal3) {
      mapModal3.style.display = "none";
    }
}