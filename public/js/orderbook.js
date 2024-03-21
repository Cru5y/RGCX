//document
//  .querySelector("#orderbook_btn")
//  .addEventListener("click", generateOrderBook);

async function generateOrderBook() {
  const symbol = currentSymbol;
  // console.log("orderbook gen:", symbol);
  let sellData = [];
  await fetch(
    `http://testapi.evotech.ro:8088/getOrderBookDataByOrderAction/${symbol}/SELL`
  )
    .then((response) => response.json())
    .then((data) => {
      sellData = data;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
  let buyData = [];
  await fetch(
    `http://testapi.evotech.ro:8088/getOrderBookDataByOrderAction/${symbol}/BUY`
  )
    .then((response) => response.json())
    .then((data) => {
      buyData = data;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
  sellTableFromJson(sellData, "sellTable");
  buyTableFromJson(buyData, "buyTable");
}

function sellTableFromJson(jsonData, targetDivClass) {
  // Extract value from table header.
  let columns = [];
  for (let i = 0; i < jsonData.length; i++) {
    for (let key in jsonData[i]) {
      if (!columns.includes(key)) {
        columns.push(key);
      }
    }
  }
  // Create table.
  const table = document.createElement("table");

  // Create table header row using the extracted headers above.
  let tr = table.insertRow(-1); // table row.

  for (let i = 0; i < columns.length; i++) {
    th = document.createElement("th"); // table header.
    if (columns[i] === "price") {
      th.innerHTML = "Sell Price";
    } else {
      th.innerHTML = capitaliseFirstLetter(columns[i]);
    }
    tr.appendChild(th);
  }

  // add json data to the table as rows.
  for (let i = 0; i < jsonData.length; i++) {
    tr = table.insertRow(-1);

    for (let j = 0; j < columns.length; j++) {
      let tabCell = tr.insertCell(-1);
      tabCell.innerHTML = jsonData[i][columns[j]];
      tabCell.classList.add(`col-${columns[j]}`);
    }
  }

  // Now, add the newly created table with json data, to a container.
  const tableContainer = document.querySelector(`.${targetDivClass}`);
  tableContainer.innerHTML = "";
  tableContainer.appendChild(table);
}

function buyTableFromJson(jsonData, targetDivClass) {
  // Extract value from table header.
  let columns = [];
  for (let i = 0; i < jsonData.length; i++) {
    for (let key in jsonData[i]) {
      if (!columns.includes(key)) {
        columns.push(key);
      }
    }
  }
  // Create table.
  const table = document.createElement("table");

  // Create table header row using the extracted headers above.
  let tr = table.insertRow(-1); // table row.

  // add json data to the table as rows.
  for (let i = 0; i < jsonData.length; i++) {
    tr = table.insertRow(-1);

    for (let j = 0; j < columns.length; j++) {
      let tabCell = tr.insertCell(-1);
      tabCell.innerHTML = jsonData[i][columns[j]];
      tabCell.classList.add(`col-${columns[j]}`);
    }
  }

  tr = table.insertRow(-1);

  for (let i = 0; i < columns.length; i++) {
    let th = document.createElement("th"); // table header.
    if (columns[i] === "price") {
      th.innerHTML = "Buy Price";
    } else {
      th.innerHTML = capitaliseFirstLetter(columns[i]);
    }
    tr.appendChild(th);
  }

  // Now, add the newly created table with json data, to a container.
  const tableContainer = document.querySelector(`.${targetDivClass}`);
  tableContainer.innerHTML = "";
  tableContainer.appendChild(table);
}

function capitaliseFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
