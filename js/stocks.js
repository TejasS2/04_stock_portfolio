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

let amount = 0;

document.getElementById("amountInput").onchange = function () {
  initAmount();
};

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
function addStock () {

}
