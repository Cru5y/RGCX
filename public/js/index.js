const orderbook_btn = document.querySelector("#orderbook_btn");
const prices_btn = document.querySelector("#prices_btn");
const topgraph = document.querySelector(".topgraph-wrapper");
const bottomgraph = document.querySelector(".bottomgraph-wrapper");
const sel = document.querySelector("#select_commodity");
const odbWrapper = document.querySelector(".orderbook-wrapper");


window.addEventListener("load", () => {
  fetch('http://testapi.evotech.ro:8088/getDate/E,%20MMM%20dd,%20yyyy')
  .then((response) => response.text())
  .then((data) => {
      document.querySelector("#date_label").innerText = `Prices for ${data}`;
  });

  fetch('http://testapi.evotech.ro:8088/symbols')
  .then((response) => response.json())
  .then((data) => {
    data.forEach(element => {
      let opt = document.createElement("option");
      opt.value = element;
      opt.text = element.charAt(0) + element.substring(1).toLowerCase(); // lowercase all but first character of word
      sel.add(opt);
    });
  });
});

sel.addEventListener("change", () => {
  clearForm();
  updateSymbol(sel.value);
});

function updateSymbol(newSymbol) {
  currentSymbol = newSymbol;
  fetch(`http://testapi.evotech.ro:8088/symbols/${newSymbol}`)
  .then((response) => response.json())
  .then((data) => {
    //update symbol img
    // console.log(data);
    document.querySelector("#symbol_title").innerText = currentSymbol;
    document.querySelector("#symbol_subtitle").innerText = `BRCX.RO ${currentSymbol} PRICES`;
    document.querySelector("#current_price").innerText = `${String(data.lastPrice)} RON`;
    document.querySelector("#price_change").innerText = `+${String(data.change)} (${String(data.changePercentage)}%)`;
    // check positivity of change for cond. formatting
    // change other date
    document.querySelector("#volume_val").innerText = `${String(data.volume)}t`;
    document.querySelector("#year_high_val").innerText = `${String(data.fiftyTwoWHigh)}`;
    document.querySelector("#day_high_val").innerText = `${String(data.dayHigh)}`;
    document.querySelector("#bid_ask_vals").innerText = `${String(data.bidPrice)}/${String(data.askPrice)}`;
    document.querySelector("#day_low_val").innerText = `${String(data.dayLow)}`;
    document.querySelector("#year_low_val").innerText = `${String(data.fiftyTwoWLow)}`;
    if(newSymbol === "SUNFLOWER") {
      document.querySelector(".symbol-img").src = "/img/sunflower.png"
      //document.querySelector(".orderbook-image").src = "/img/orderbok.png"
    }
    else if (newSymbol === "WHEAT") {
      document.querySelector(".symbol-img").src = "/img/wheat.png"
    }
    else if (newSymbol === "CORN") {
      document.querySelector(".symbol-img").src = "/img/corn.png"
    }
    else {
      document.querySelector(".symbol-img").src = "/img/rapeseed.png"
    }
  });

  generateOrderBook(); // generates orderbook with new symbol
  syncToInterval(intervals[3]); // sync historical chart with new symbol
  syncToInterval1(intervals1[2]); //sync estimate chart with new symbol
}

orderbook_btn.addEventListener("click", () => {
  prices_btn.classList.remove("hidden");
  orderbook_btn.classList.add("hidden");
  document.querySelectorAll(".graph-wrapper").forEach((el) => {
    el.style.display = "none";
  });
  odbWrapper.style.display = "flex";
  odbWrapper.style.flexDirection = "column";
});

prices_btn.addEventListener("click", () => {
  prices_btn.classList.add("hidden");
  orderbook_btn.classList.remove("hidden");
  odbWrapper.style.display = "none";
  document.querySelectorAll(".graph-wrapper").forEach((el) => {
    el.style.display = "block";
  });
});

// document.querySelector("#trade_again_btn").addEventListener("click", () => {
//   if (document.querySelector("#orderbook_btn").classList.contains("hidden")) {
//     window.location.reload();
//     document.querySelector("orderbook_btn").click();
//   }
//   else {
//     window.location.reload();
//   }
// });

function clearForm() {
  document.querySelector("form").reset();
}