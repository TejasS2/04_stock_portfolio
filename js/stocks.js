var modal = document.getElementById("myModal");
var openModal = document.getElementById("openModal");
var span = document.getElementsByClassName("close")[0];
class Stock {
  
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

const datepickerElements = document.querySelectorAll('#date_picker');
datepickerElements.forEach(function (element) {
    const datepicker = new TheDatepicker.Datepicker(element);
    datepicker.render();
});


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


const input = document.getElementById("date_picker");
const datepicker = new TheDatepicker.Datepicker(input);
datepicker.render();

var bttn = document.getElementById("modal_submit");
bttn.onclick = function () {
  var apikey = document.getElementById("keyInput").value;
  var hostkey = document.getElementById("hostInput").value;
  console.log(apikey);
  console.log(hostkey);
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

let stockContainer = document.querySelector(".stockSelect");
const url = 'https://twelve-data1.p.rapidapi.com/stocks?exchange=NASDAQ&format=json';
document.cookie="key=e64bc78181msh84af989eb88db6bp175393jsnb6a8429b02ed";
document.cookie="host=twelve-data1.p.rapidapi.com";
let initVal = 1000000;
const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': 'e64bc78181msh84af989eb88db6bp175393jsnb6a8429b02ed',
        'X-RapidAPI-Host': 'twelve-data1.p.rapidapi.com'
    }
};
const initialize = async function(){
    try {
        const response = await fetch(url, options);
        const result = await response.json();
        console.log(result.data[0]);
    } catch (error) {
        console.error(error);
    }
}


$(function () {
  $('.date_picker').date_picker({
    language: "es",
    autoclose: true,
    format: "yyyy-mm-dd"
  });
});





function addStock () {

}
