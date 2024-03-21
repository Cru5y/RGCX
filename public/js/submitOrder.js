document.querySelector("#submit_btn").addEventListener("click", () => {
  openModal();
  const formContents = validateSubmit();
 /*  if(formContents){
    const symbolId = currentSymbol;
    fetch(`http://testapi.evotech.ro:8088/submitTradeOrder/${symbolId}/${formContents[0]}/${formContents[1]}/${formContents[3]}/${formContents[4]}`, {
      method: "POST"
    })
    .then(async (response) => {
      clearForm();
      openModal();
      const tradeInfo = await jsonResponse(response);
      setTradeConfContent(tradeInfo);
      generateOrderBook()
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  } */
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

async function jsonResponse(res) {
  return await res.json();
}