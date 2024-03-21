
// Get DOM Elements
const modal = document.querySelector('.modal');
const modalBtn = document.querySelector('#submit_btn');
const closeBtn = document.querySelector('.close');

// Events
closeBtn.addEventListener('click', closeModal);
window.addEventListener('click', outsideClick);

// Open
function openModal() {
  modal.style.display = 'block';
  document.querySelectorAll(".graph-wrapper").forEach(e => {
    e.style.pointerEvents = "none";
  });
}

/* function setTradeConfContent(tradeInfo) {
  let action = "";
  let duration = "";
  if (tradeInfo.action === "SELL") {
    action = "Selling";
  } else {
    action = "Buying";
  }
  if (tradeInfo.duration === "GTC") {
    duration = "Good 'Til Cancelled";
  } else {
    duration = "Day Only"
  }
  document.querySelector(".modal-body").innerHTML = `<div class="tradeconf-heading">
        <div>
          <h4>${action}</h4>
          <h3>${tradeInfo.symbol}</h3>
        </div>
        <div>
          <h4>Quantity</h4>
          <h3>${tradeInfo.quantity} TONS</h3>
        </div>
      </div>
      <table class="tradeconf-table">
        <tr style="border-bottom: 1px solid #5F5F5F;">
          <td>Duration</td>
          <td>${duration}</td>
        </tr>
        <tr style="border-bottom: 1px solid #5F5F5F;">
          <td>Price</td>
          <td>${tradeInfo.price} RON</td>
        </tr>
        <tr style="border-bottom: 1px solid #5F5F5F;">
          <td>Quantity</td>
          <td>${tradeInfo.quantity} TONS</td>
        </tr>
        <tr style="border-bottom: 2px solid #5F5F5F;">
          <td>Commission</td>
          <td>0.0%</td>
        </tr>
        <tr>
          <td>Total Volume</td>
          <td>${tradeInfo.price * tradeInfo.quantity} RON</td>
        </tr>
      </table>`;
} */

// Close
function closeModal() {
  modal.style.display = 'none';
  document.querySelectorAll(".graph-wrapper").forEach(e => {
    e.style.pointerEvents = "initial";
  });
}

// Close If Outside Click
function outsideClick(e) {
  if (e.target == modal) {
    modal.style.display = 'none';
    document.querySelectorAll(".graph-wrapper").forEach(e => {
      e.style.pointerEvents = "initial";
    });
  }
}
