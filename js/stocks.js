var modal = document.getElementById("myModal");
var btn = document.getElementById("myBtn");
var span = document.getElementsByClassName("close")[0];

if(btn){
  btn.onclick = function () {
    modal.style.display = "block";
  };
}

if(span){
  span.onclick = function () {
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
  amountInput.onchange = function () {
    var x = this.value;
    if(!isNaN(x) && x !== ""){
      amount = x;
      this.disabled = true;
    }else{
      alert("Please enter a valid number for the amount.");
    }
  };
}

const input = document.getElementById("my-input");
if(input){
  const datepicker = new TheDatepicker.Datepicker(input);
  datepicker.render();
}

async function fetchData(url){
  const apikey = getCookie('apikey');
  const hostkey = getCookie('hostkey');

  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': apikey,
      'X-RapidAPI-Host': hostkey
    }
  };

  try{
    const response = await fetch(url, options);
    const result = await response.text();
    console.log(result);
  }catch (error){
    console.error(error);
  }
}

function setCookie(name, value) {
  document.cookie = name + "=" + encodeURIComponent(value) + "; path=/";
  console.log(`Cookie set: ${name}=${value}; path=/`);
}

function getCookie(name) {
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
  };
}
