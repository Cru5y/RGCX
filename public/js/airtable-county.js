document.addEventListener("DOMContentLoaded", function () {
  fetch(
    "https://api.airtable.com/v0/appFafNlx9CAnh6Ze/Trades?view=Grid%20view",
    {
      headers: {
        Authorization:
          "Bearer pat4qqUM50niUvVEG.84035f92a245e4295f2b6082cbe7eea110b436153d363e8b9c5fa6bcb20e9047",
      },
    }
  )
    .then((response) => response.json())
    .then((data) => {
      // Filter records into "Sell" and "Buy" arrays
      const sellRecords = data.records.filter(
        (record) => record.fields.Type === "Sell"
      );
      const buyRecords = data.records.filter(
        (record) => record.fields.Type === "Buy"
      );

      // Sort "Sell" records by price in ascending order, slice the first 8, then reverse the array
      const sortedSellRecords = sellRecords
        .sort((a, b) => parseFloat(a.fields.Price) - parseFloat(b.fields.Price))
        .slice(0, 8)
        .reverse();

      // Sort "Buy" records by price in descending order to get the ones with the highest prices and slice the first 8
      const sortedBuyRecords = buyRecords
        .sort((a, b) => parseFloat(b.fields.Price) - parseFloat(a.fields.Price))
        .slice(0, 8);

      // Combine the sorted and sliced records
      const finalRecordsToShow = sortedSellRecords.concat(sortedBuyRecords);

      updateTable2(finalRecordsToShow); // Update the table with these records
      setupDynamicBuyButton();
      setupDynamicSellButton();
    })
    .catch((error) => console.error("Error fetching data: ", error));
});

let selectedCounties = [];

// This event listener is specifically for the dropdown with ID 'myDropdown2'
document.querySelector('#myDropdown2').addEventListener('change', function(event) {
  if (event.target.type === 'checkbox') {
    // Update selectedCounties only within this dropdown
    selectedCounties = Array.from(this.querySelectorAll('.multipleSelectionOption input[type=checkbox]:checked'))
                            .map(checkbox => checkbox.value);
    // Call the function to update the table based on the newly selected counties
    updateTable2BasedOnCounties();
  }
});

  function updateTable2BasedOnCounties() {
  fetch(
    "https://api.airtable.com/v0/appFafNlx9CAnh6Ze/Trades?view=Grid%20view",
    {
      headers: {
        Authorization:
          "Bearer pat4qqUM50niUvVEG.84035f92a245e4295f2b6082cbe7eea110b436153d363e8b9c5fa6bcb20e9047",
      },
    }
  )
    .then((response) => response.json())
    .then((data) => {
      // Filter records by selected Counties first
      const filteredRecords = data.records.filter(
        (record) =>
          selectedCounties.length === 0 ||
          selectedCounties.includes(record.fields.County)
      );

      // Separate filtered records into "Sell" and "Buy"
      const sellRecords = filteredRecords
        .filter((record) => record.fields.Type === "Sell")
        .sort((a, b) => parseFloat(a.fields.Price) - parseFloat(b.fields.Price))
        .slice(0, 8)
        .reverse();

      const buyRecords = filteredRecords
        .filter((record) => record.fields.Type === "Buy")
        .sort((a, b) => parseFloat(b.fields.Price) - parseFloat(a.fields.Price))
        .slice(0, 8);

      // Combine "Sell" and "Buy" records after processing
      const finalRecordsToShow = sellRecords.concat(buyRecords);

      updateTable2(finalRecordsToShow); // Use this function to update the table
    })
    .catch((error) => console.error("Error fetching data: ", error));
    console.log("Selected counties for updateTable2BasedOnCounties:", selectedCounties);
  }

function updateTable2(records) {
    const tbody = document.querySelector(".orderbook-container2 .orderbook-table2 tbody");
    tbody.innerHTML = ""; // Clear existing table rows
  
    // Ensure we always have 16 rows in the table
    const totalRowsNeeded = 16;
    const recordsToShow = records.slice(0, totalRowsNeeded); // Take up to 16 records, if available
  
    for (let i = 0; i < totalRowsNeeded; i++) {
      const row = document.createElement("tr");
  
      // Create cells for each row
      const buyCell = document.createElement("td");
      const priceCell = document.createElement("td");
      const sellCell = document.createElement("td");
      const metaDataCell = document.createElement("td");
      metaDataCell.className = "metadata";
  
      if (i < recordsToShow.length) {
        // If there is a record to show, populate the cells accordingly
        const record = recordsToShow[i];
        if (record.fields.Type === "Buy") {
          buyCell.textContent = record.fields.Quantity;
          buyCell.classList.add("buy");
          priceCell.textContent = record.fields.Price || "";
          // Keeping the sell cell empty for Buy records
        } else if (record.fields.Type === "Sell") {
          sellCell.textContent = record.fields.Quantity;
          sellCell.classList.add("sell");
          priceCell.textContent = record.fields.Price || "";
          // Keeping the buy cell empty for Sell records
        }

          // Create a cell for the metadata and append span elements for each piece of information
          const regionSpan = document.createElement("span");
          regionSpan.id = "trade-region";
          regionSpan.textContent = record.fields.Region || "";

          const countySpan = document.createElement("span");
          countySpan.id = "trade-county";
          countySpan.textContent = record.fields.County || "";

          const localSpan = document.createElement("span");
          localSpan.id = "trade-local";
          localSpan.textContent = record.fields.Local || "";

          // Append spans to the metaDataCell
          metaDataCell.appendChild(regionSpan);
          metaDataCell.appendChild(document.createTextNode(" ")); // Space between spans
          metaDataCell.appendChild(countySpan);
          metaDataCell.appendChild(document.createTextNode(" ")); // Space between spans
          metaDataCell.appendChild(localSpan);
          metaDataCell.className = "metadata";
      }
  
      // Append the cells to the row
      row.appendChild(buyCell);
      row.appendChild(priceCell);
      row.appendChild(sellCell);
      row.appendChild(metaDataCell);
      metaDataCell.className = "metadata";

  
      // Append the row to the table body
      tbody.appendChild(row);
    }
    setupDynamicBuyButton();
    setupDynamicSellButton();
  }
  