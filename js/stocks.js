var modal = document.getElementById("myModal");
var btn = document.getElementById("myBtn");
var span = document.getElementsByClassName("close")[0];

btn.onclick = function() {
  modal.style.display = "block";
}

span.onclick = function() {
  modal.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
// const url = 'https://twelve-data1.p.rapidapi.com/stocks?exchange=NASDAQ&format=json';
// const options = {
// 	method: 'GET',
// 	headers: {
// 		'X-RapidAPI-Key': '554b60018emsha0343cd9e4c54ccp1af5b1jsn28e86cee8a6c',
// 		'X-RapidAPI-Host': 'twelve-data1.p.rapidapi.com'
// 	}
// };

// try {
// 	const response = await fetch(url, options);
// 	const result = await response.text();
// 	console.log(result);
// } catch (error) {
// 	console.error(error);
// }
// const urlE = 'https://twelve-data1.p.rapidapi.com/time_series?interval=1day&symbol=AMZN&format=json&outputsize=30';
// const optionsE = {
// 	method: 'GET',
// 	headers: {
// 		'X-RapidAPI-Key': '554b60018emsha0343cd9e4c54ccp1af5b1jsn28e86cee8a6c',
// 		'X-RapidAPI-Host': 'twelve-data1.p.rapidapi.com'
// 	}
// };
// try {
// 	const responseE = await fetch(urlE, optionsE);
// 	const resultE = await responseE.text();
// 	console.log(resultE);
// } catch (error) {
// 	console.error(error);
// }