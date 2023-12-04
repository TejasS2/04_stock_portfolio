var modal = document.getElementById("myModal");
var btn = document.getElementById("myBtn");
var span = document.getElementsByClassName("close")[0];
var stockList = [];

setCookie('apikey', prompt("API Key: "));
setCookie('hostkey', prompt("Host: "));
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
    const result = await response.text();
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

    const stockListUrl = 'https://twelve-data1.p.rapidapi.com/stocks?exchange=NASDAQ&format=json';
    const timeSeriesUrl = 'https://twelve-data1.p.rapidapi.com/time_series?symbol=AMZN&interval=1day&outputsize=5000&format=json';

    fetchData(stockListUrl);
    fetchData(timeSeriesUrl);
    console.log("hello")
  };
}

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

  displayStocks();
});

function generateStockHTML(stock, index){
  const dropdownId = `stock-dropdown-${index}`;
  const dateInputId = `date-input-${index}`;

  return `
    <div class="stockItem">
      <button onclick="toggleDropdown('${dropdownId}')" class="btn btn-primary">
        Stock Name: <span class="stockName">${stock.name}</span>
      </button>
      <div id="${dropdownId}" class="dropdown-content" style="display: none;">
        <select class="form-select stock-select" onchange="updateStockName(this, ${index})">
          <!-- Stock options will be dynamically populated here -->
        </select>
      </div>
      <button onclick="editStock('numberOfShares', this, ${index})" class="btn btn-primary">Number of Shares: <span class="numberOfShares">${stock.shares}</span></button>
      <div>
        <label for="${dateInputId}" class="form-label">Purchase Date:</label>
        <input type="text" id="${dateInputId}" value="${stock.date}" class="form-control datepicker">
      </div>
      </div>
    <br>
  `;
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

function initializeDatePicker(index){
  const dateInputId = `date-input-${index}`;
  const dateInput = document.getElementById(dateInputId);

  if(dateInput){
    const datepicker = new TheDatepicker.Datepicker(dateInput);
    datepicker.render();
    datepicker.options.setMinDate(new Date(new Date().setFullYear(new Date().getFullYear() - 10)));
    datepicker.options.onSelect((selectedDate, datepicker) =>{
      stockList[index].purchaseDate = datepicker.options.getInputFormat()(selectedDate, datepicker);
    });
  }
}






function displayStocks(){
  const stockContainer = document.getElementById("stockList");
  stockContainer.innerHTML = "";
  stockList.forEach((stock, index) =>{
    initializeDatePicker(index);
    const stockHTML = generateStockHTML(stock, index);
    stockContainer.insertAdjacentHTML("beforeend", stockHTML);
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

  displayStocks();
}
