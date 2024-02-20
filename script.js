document.addEventListener("DOMContentLoaded", function () {
  const amountInput = document.getElementById("amount");
  const fromSelect = document.getElementById("from");
  const toSelect = document.getElementById("to");
  const resultDiv = document.getElementById("result");
  const reverseButton = document.getElementById("reverseButton");

  // Set default message
  resultDiv.textContent = "Please fill in all fields.";

  amountInput.addEventListener("input", convert);
  fromSelect.addEventListener("change", convert);
  toSelect.addEventListener("change", convert);
  reverseButton.addEventListener("click", reverse);

  function convert() {
    const amount = amountInput.value;
    const fromCurrency = fromSelect.value;
    const toCurrency = toSelect.value;

    // Check if any field is empty
    if (amount === "" || fromCurrency === "" || toCurrency === "") {
      resultDiv.textContent = "Please fill in all fields.";
      return;
    }

    // Fetch exchange rate and perform conversion
    fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`)
      .then((response) => response.json())
      .then((data) => {
        const exchangeRate = data.rates[toCurrency];
        if (exchangeRate) {
          const convertedAmount = amount * exchangeRate;
          resultDiv.textContent = `${amount} ${fromCurrency} = ${convertedAmount.toFixed(
            2
          )} ${toCurrency}`;
        } else {
          resultDiv.textContent = "Currency conversion not available.";
        }
      })
      .catch((error) => {
        console.log(error);
        resultDiv.textContent = "An error occurred while fetching data.";
      });
  }

  function reverse() {
    const temp = fromSelect.value;
    fromSelect.value = toSelect.value;
    toSelect.value = temp;
    convert();
  }
});
