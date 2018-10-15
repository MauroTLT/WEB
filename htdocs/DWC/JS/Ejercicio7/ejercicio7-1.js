'use strict'
const fechaCalc = new Date(rand(1514761200000, 1546210800000));
fechaCalc.setHours(0);
fechaCalc.setMinutes(0);
fechaCalc.setSeconds(0);
console.log(fechaCalc);
window.addEventListener('load', function () {
	document.getElementById("form").addEventListener("submit", function (event) {
		event.preventDefault();
	});
	document.getElementById("comprobar").addEventListener("click", function (event) {
		let dato1 = "";
		let dato2 = ""; //Has acertado el mes
		let texto = document.getElementById('texto');
		let fecha = new Date(document.getElementById('fecha').value);

		if (fechaCalc.getMonth() == fecha.getMonth()) {
			dato2 = ". Has acertado el mes";
		}

		if (fechaCalc > fecha) {
			dato1 = "mayor";
		} else if (fechaCalc < fecha) {
			dato1 = "menor";
		} else {
			texto.innerHTML += "<h1>" + fechaCalc.toLocaleDateString() + " Es la fecha buscada!!!</h1>";
			return;
		}
		texto.innerHTML += "<br>La fecha que buscamos es " + dato1 + " que la que has introducido: " + fecha.toLocaleDateString() + dato2;
	});	
});

function rand(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}