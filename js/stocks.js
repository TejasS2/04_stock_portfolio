var modal = document.getElementById("myModal");
var openModal = document.getElementById("openModal");
var span = document.getElementsByClassName("close")[0];

class Stock {
  constructor (name, share, date){
    this.name = name;
    this.share = share;
    this.date = date;
  }
}

function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for(let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}
function initAmount() {
  var x = document.getElementById("amountInput");
  if (!isNaN(x.value)) {
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

window.onload = function() {
  var modalSubmit = document.getElementById("modal_submit");
  modalSubmit.onclick = function (event) {
    event.preventDefault();

    let apikey = document.getElementById("keyInput").value;
    let host = document.getElementById("hostInput").value;

    document.cookie = `apikey=${apikey}`;
    document.cookie = `host=${host}`;

    modal.style.display = "none";
  };
}

const datepickerElements = document.querySelectorAll('#date_picker');
datepickerElements.forEach(function (element) {
    const datepicker = new TheDatepicker.Datepicker(element);
    datepicker.render();
});

const url = 'https://twelve-data1.p.rapidapi.com/stocks?exchange=NASDAQ&format=json';
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
    addStock(result.data);
  } catch (error) {
    console.error(error);
  }
}

var stocks = [];

function addStock (data) {
  result = `
  <div class="container mt-4">
      <div class="row">
        <div class="col-md-4">
          <div class="form-group">
            <label for="stocks">Select Stock:</label>
            <select class="form-control stocks" id="stockSelect">`
  for (const stock of data) {
    let optionHtml = `<option value="${stock.name}">
    ${stock.name}</option>`;
    result += optionHtml;
  }
  result += `
  </select>
  </div>
</div>
<div class="col-md-4">
  <div class="form-group">
    <label for="shares">Shares:</label>
    <input type="number" class="form-control" id="shares" placeholder="Enter shares">
  </div>
</div>
<div class="col-md-4">
  <div class="form-group">
    <label for="date_picker">Date Picker:</label>
    <input type="text" class="form-control" id="date_picker">
  </div>
</div>
</div>
</div>`
  document.querySelector(".stocks_list").insertAdjacentHTML("beforeend",result);
}

document.getElementById("add_stock").addEventListener("click", function() {
  loadStockOptions();
});
document.getElementById("results").addEventListener("click", function(event) {
  event.preventDefault();
  
});