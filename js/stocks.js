var modal = document.getElementById("myModal");
var openModal = document.getElementById("openModal");
var span = document.getElementsByClassName("close")[0];
let amount = 0;

class Stock {
  constructor (name, share, date){
    this.name = name;
    this.share = share;
    this.date = date;
  }
}
while(!getCookie('apikey')){
  setCookie('apikey', prompt("API Key: "));
}
while(!getCookie('host')){
  setCookie('host', prompt("Host: "));
}

function getCookie(name){
  const cookies = document.cookie.split('; ');
  for(let i = 0; i < cookies.length; i++){
    const [cookieName, cookieValue] = cookies[i].split('=');
    if(cookieName === name){
      return decodeURIComponent(cookieValue);
    }
  }
  return null;
}
function initAmount() {
  var x = document.getElementById("amountInput");
  if (!isNaN(x.value) &&  x > 0 && x != "") {
    amount = x.value;
    document.getElementById("amountInput").disabled = true;
  } else {
    x.value = 100;
    alert("Please enter a number");
  }
}

document.getElementById("keyInput").value = getCookie("apikey");
document.getElementById("hostInput").value = getCookie("host");

openModal.onclick = function () {
  modal.style.display = "block";
};

span.onclick = function () {
  modal.style.display = "none";
};

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

function setCookie(name, value){
  document.cookie = name + "=" + encodeURIComponent(value) + "; path=/";
}

window.onload = function() {
  var modalSubmit = document.getElementById("modal_submit");
  modalSubmit.onclick = function (event) {
    event.preventDefault();

    let apikey = document.getElementById("keyInput").value;
    let host = document.getElementById("hostInput").value;

    setCookie('apikey', apikey);
    setCookie('host', host);


    modal.style.display = "none";
  };
}

const url = 'https://twelve-data1.p.rapidapi.com/stocks?exchange=NASDAQ&format=json';
const urlE = 'https://twelve-data1.p.rapidapi.com/stocks?exchange=NYSE&format=json';

let initVal = 1000000;
const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': getCookie("apikey"),
        'X-RapidAPI-Host': getCookie("host")
    }
};
const loadStockOptions = async function(){
  try {
    const response = await fetch(url, options);
    const result = await response.json();
    console.log(result.data);
    const responseE = await fetch(urlE, options);
    const resultE = await responseE.json();
    console.log(resultE.data);
    addStock(result.data, resultE.data);
  } catch (error) {
    console.error(error);
  }
}
var numStocks = 0;
function addStock (data, dataE) {
  result = `
  <div class="container mt-4">
      <div class="row">
        <div class="col-md-4">
          <div class="form-group">
            <label for="stocks">Select Stock:</label>
            <select class="form-control stocks" id="stockSelect-${numStocks}">`
  for (const stock of data) {
    let optionHtml = `<option value="${stock.symbol}">
    ${stock.symbol}</option>`;
    result += optionHtml;
  }
  for (const stock of dataE) {
    optionHtml = `<option value="${stock.symbol}">
    ${stock.symbol}</option>`;
    result += optionHtml;
  }
  result += `
  </select>
  </div>
</div>
<div class="col-md-4">
  <div class="form-group">
    <label for="shares">Shares:</label>
    <input type="number" class="form-control" id="shares-${numStocks}" placeholder="Enter shares">
  </div>
</div>
<div class="col-md-4">
  <div class="form-group">
    <label for="date_picker">Date Picker:</label>
    <input type="date" class="form-control" id="date-${numStocks}">
  </div>
</div>
</div>
</div>`
  document.querySelector(".stocks_list").insertAdjacentHTML("beforeend",result);
  numStocks++;
}

document.getElementById("add_stock").addEventListener("click", function() {
  loadStockOptions();
});


function generateDateArray(startDate, endDate) {
  var dateArray = [];
  var currentDate = new Date(startDate.getTime()); // Clone startDate to avoid mutating it

  while (currentDate <= endDate) {
    dateArray.push(currentDate.toISOString().split('T')[0]);
    currentDate = new Date(currentDate.setDate(currentDate.getDate() + 1));
  }

  return dateArray;
}

document.getElementById("results").addEventListener("click", async function(event) {
  event.preventDefault();
  document.getElementById('portfolioResults').querySelector('tbody').innerHTML = '';
  var earliestDate;
  var today = new Date();
  var currentDate = today.toISOString().split('T')[0];

  // Determine the earliest purchase date from your stock data
  for (var i = 0; i < numStocks; i++) {
    let stock_date = document.getElementById(`date-${i}`).value;
    if (!earliestDate || new Date(stock_date) < new Date(earliestDate)) {
      earliestDate = stock_date;
    }
  }

  // Generate an array of dates from earliestDate to currentDate
  let dates = generateDateArray(new Date(earliestDate), new Date(currentDate));

  // Initialize an object to store the portfolio value by date
  var portfolioValuesByDate = {};
  dates.forEach(date => portfolioValuesByDate[date] = { totalValue: 0, pnl: 0 });

  // Calculate initial investment and store it
  var totalInitialInvestment = 0;
  for (var i = 0; i < numStocks; i++) {
    let stock_name = document.getElementById(`stockSelect-${i}`).value;
    let stock_shares = parseInt(document.getElementById(`shares-${i}`).value);
    let stock_date = document.getElementById(`date-${i}`).value;
    let stockPrice = await fetchStockPrice(stock_name, stock_date);
    totalInitialInvestment += stock_shares * stockPrice;
  }

  // Fetch the daily stock values and calculate portfolio values
  for (var i = 0; i < numStocks; i++) {
    let stock_name = document.getElementById(`stockSelect-${i}`).value;
    let stock_shares = parseInt(document.getElementById(`shares-${i}`).value);

    for (const date of dates) {
      let stockPrice = await fetchStockPrice(stock_name, date);
      portfolioValuesByDate[date].totalValue += stock_shares * stockPrice;
    }
  }

  // Calculate daily P&L relative to the initial investment
  for (const date of dates) {
    let dailyValue = portfolioValuesByDate[date].totalValue;
    portfolioValuesByDate[date].pnl = dailyValue - totalInitialInvestment;

    // Insert row into table in descending order
    let tableBody = document.getElementById('portfolioResults').querySelector('tbody');
    let row = `<tr>
                  <td>${date}</td>
                  <td>${dailyValue.toFixed(2)}</td>
                  <td>${portfolioValuesByDate[date].pnl.toFixed(2)}</td>
               </tr>`;
    tableBody.insertAdjacentHTML("afterbegin", row);
  }
});


async function fetchStockPrice(stockSymbol, date) {
  try {
    const urlA = `https://twelve-data1.p.rapidapi.com/time_series?symbol=${stockSymbol}&interval=1day&outputsize=5000&format=json`;

    const responseA = await fetch(urlA, options);

    if (!responseA.ok) {
      throw new Error(`API call failed with status: ${responseA.status}`);
    }

    const dataA = await responseA.json();

    // Find the closing price for the specified date within the returned data
    const closingPrice = dataA.values.find(d => d.datetime === date)?.close;
    if(closingPrice) console.log(closingPrice)

    // Return the closing price, or null if not found
    return closingPrice ? parseFloat(closingPrice) : null;
  } catch (error) {
    console.error('Error fetching stock price:', error);
    return null;
  }
}
