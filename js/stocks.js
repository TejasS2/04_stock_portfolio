var modal = document.getElementById("myModal");
var btn = document.getElementById("myBtn");
var span = document.getElementsByClassName("close")[0];

btn.onclick = function () {
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


const input = document.getElementById("my-input");
const datepicker = new TheDatepicker.Datepicker(input);
datepicker.render();

var bttn = document.getElementById("modal_submit");
bttn.onclick = function () {
  var apikey = document.getElementById("keyInput").value;
  var hostkey = document.getElementById("hostInput").value;
  console.log(apikey);
  console.log(hostkey);
};