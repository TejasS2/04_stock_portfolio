var modal = document.getElementById("myModal");
var btn = document.getElementById("myBtn");
var span = document.getElementsByClassName("close")[0];
var stockList = [];

while(!getCookie('apikey')){
  setCookie('apikey', '7f81426e23mshb5fa5f2285ccabap1c7873jsn4d251859dcde');
}
while(!getCookie('hostkey')){
  setCookie('hostkey', 'twelve-data1.p.rapidapi.com');
}

if(btn){
  btn.onclick = function (){
    modal.style.display = "block";
  };
}

if(span){
  span.onclick = function (){
    modal.style.display = "none";
  };
}

window.onclick = function (event){
  if(event.target == modal){
    modal.style.display = "none";
  }
};

let amount = 0;
var amountInput = document.getElementById("amountInput");
if(amountInput){
  amountInput.onchange = function (){
    var x = this.value;
    if(!isNaN(x) && x > 0 && x !== ""){
      amount = x;
      this.disabled = true;
    }else{
      alert("Please enter a valid number for the amount.");
    }
  };
}

// const input = document.getElementById("my-input");
// if(input){
//   const datepicker = new TheDatepicker.Datepicker(input);
//   datepicker.options.setMinDate("2013-12-03")
//   datepicker.render();
// }

async function fetchData(url){
  const apikey = getCookie('apikey');
  const hostkey = getCookie('hostkey');

  const options ={
    method: 'GET',
    headers:{
      'X-RapidAPI-Key': apikey,
      'X-RapidAPI-Host': hostkey
    }
  };

  try{
    const response = await fetch(url, options);
    const result = await response.json();
    return result;
  }catch (error){
    console.error(error);
  }
}

function setCookie(name, value){
  document.cookie = name + "=" + encodeURIComponent(value) + "; path=/";
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

var bttn = document.getElementById("modal_submit");
if(bttn){
  bttn.onclick = function (){
    let apikey = document.getElementById("keyInput").value.trim();
    let hostkey = document.getElementById("hostInput").value.trim();
    setCookie('apikey', apikey);
    setCookie('hostkey', hostkey);

    modal.style.display = "none";

  };
}

//const NASDAQListUrl = 'https://twelve-data1.p.rapidapi.com/stocks?exchange=NASDAQ&format=json';
//const NYSEListUrl = 'https://twelve-data1.p.rapidapi.com/stocks?exchange=NYSE&format=json';

//alert(fetchData(NASDAQListUrl));
//alert(fetchData(NYSEListUrl));

var addButton = document.getElementById("addStock");

addButton.addEventListener("click", function (){
  var stockName = ""
  var numberOfShares = ""
  var purchaseDate = ""

  var newStock ={
    name: stockName,
    shares: numberOfShares,
    date: purchaseDate,
  };

  stockList.push(newStock);

  const index = stockList.length - 1;
  
  const stockHTML = generateStockHTML(newStock, index);
  const stockContainer = document.getElementById("stockList");
  stockContainer.insertAdjacentHTML("beforeend", stockHTML);

  setupDateChangeHandler(index);
});

document.addEventListener('DOMContentLoaded', function() {
  displayStocks();
  stockList.forEach((_, index) => {
    setupDateChangeHandler(index);
  });
});

function generateStockHTML(stock, index){
  const dropdownId = `stock-dropdown-${index}`;
  const dateInputId = `date-input-${index}`;
  const formattedDate = stock.purchaseDate ? stock.purchaseDate.split('/').reverse().join('-') : '';

  fetchAndPopulateStocks(dropdownId);

  return `
    <div class="stockItem">
      <div id="${dropdownId}" class="dropdown-content">
        <select class="form-select stock-select" onchange="updateStockName(this, ${index})">
          <!-- Stock options will be dynamically populated here -->
        </select>
      </div>
      <div>
        <label for="date-input-${index}" class="form-label">Number of Shares:</label>
        <input type="number" class="form-control numberOfShares" value="${stock.shares}" onchange="editStock('numberOfShares', this, ${index})">
      </div>
      <div>
        <label for="${dateInputId}" class="form-label">Purchase Date:</label>
        <input type="date" id="${dateInputId}" value="${formattedDate}" class="form-control datepicker">
      </div>
    </div>
    <br>
  `;
}
async function fetchAndPopulateStocks(dropdownId) {
  const stockListUrl = 'https://twelve-data1.p.rapidapi.com/stocks?exchange=NASDAQ&format=json';
  try {
    const response = await fetchData(stockListUrl);
    if (response && response.data) {
      populateDropdown(dropdownId, response.data);
    } else {
      console.error('Stock data is not available in the response');
    }
  } catch (error) {
    console.error('Failed to fetch stocks:', error);
  }
}

function populateDropdown(dropdownId, stocks) {
  const dropdown = document.getElementById(dropdownId);
  dropdown.innerHTML = '';

  dropdown.appendChild(new Option('Select a stock', ''));

  stocks.forEach(stock => {
    const option = new Option(`${stock.name} (${stock.symbol})`, stock.symbol);
    dropdown.appendChild(option);
  });
}
function updateStockName(selectElement, index){
  const selectedStockName = selectElement.options[selectElement.selectedIndex].text;
  const selectedStockSymbol = selectElement.value;

  stockList[index].name = selectedStockName;
  stockList[index].symbol = selectedStockSymbol;

  const stockNameSpan = document.querySelector(`#stock-dropdown-${index} .stockName`);
  if(stockNameSpan){
    stockNameSpan.textContent = selectedStockName;
  }
}

function toggleDropdown(dropdownId){
  const dropdown = document.getElementById(dropdownId);
  dropdown.style.display = dropdown.style.display === 'none' ? 'block' : 'none';
}

function updateStockName(selectElement, index){
  const selectedStockName = selectElement.value;
  stockList[index].name = selectedStockName;
  displayStocks();
}

function initializeDatePicker(index) {
  const dateInputId = `date-input-${index}`;
  const dateInput = document.getElementById(dateInputId);

  if(dateInput){
    const datepicker = new TheDatepicker.Datepicker(dateInput);
    datepicker.options.setMinDate(new Date(new Date().setFullYear(new Date().getFullYear() - 10)));
    datepicker.options.onSelect((selectedDate, datepicker) => {
      alert(selectedDate)
      stockList[index].date = datepicker.getSelectedDate();
    });
    datepicker.render();
  }
}

function setupDateChangeHandler(index) {
  const dateInput = document.getElementById(`date-input-${index}`);
  dateInput.addEventListener('change', function(event) {
    stockList[index].purchaseDate = event.target.value;
  });
}







function displayStocks(){
  const stockContainer = document.getElementById("stockList");
  stockContainer.innerHTML = "";
  stockList.forEach((stock, index) =>{
    const stockHTML = generateStockHTML(stock, index);
    stockContainer.insertAdjacentHTML("beforeend", stockHTML);
    //initializeDatePicker(index);
    setupDateChangeHandler(index);
  });
}


function editStock(infoType, element, index){
  var newValue = prompt(`Enter new ${infoType}:`);

  if(newValue === null || newValue.trim() === ""){
    return;
  }

  if(infoType === 'stockName'){
    stockList[index].name = newValue;
  } else if(infoType === 'numberOfShares'){
    stockList[index].shares = newValue;
  }

  //displayStocks();
}
