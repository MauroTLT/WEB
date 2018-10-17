'use strict'
// 1514761200000, 1546210800000
const fechaCalc = new Date(new Date(rand(new Date("2018/1/1").getTime(), new Date("2018/12/31").getTime())).toDateString());
console.log(fechaCalc.toLocaleDateString());

window.addEventListener('load', function () {
	document.getElementById("form").addEventListener("submit", function (event) {
		event.preventDefault();
		let dato1 = ""; //MENOR o MAYOR
		let dato2 = ""; //Has acertado el mes
		let texto = document.getElementById('texto');
		let fecha = new Date(document.getElementById('fecha').value);
		fecha.setHours(0);
		fecha.setMinutes(0);
		fecha.setSeconds(0);
		if (!isNaN(fecha.getTime())) {
			if (fechaCalc.getMonth() == fecha.getMonth()) {
				dato2 = ". Has acertado el mes";
			}
			if (fechaCalc > fecha) {
				dato1 = "MAYOR";
			} else if (fechaCalc < fecha) {
				dato1 = "MENOR";
			} else {
				texto.innerHTML += "<h1>" + fechaCalc.toLocaleDateString() + " Es la fecha buscada!!!</h1>";
				return;
			}
			texto.innerHTML += "<br>La fecha que buscamos es " + dato1 + " que la que has introducido: " + fecha.toLocaleDateString() + dato2;
		} else {
			texto.innerHTML += "<br>La fecha introducida es invalida<br>Las fechas validas son AAAA/MM/DD o MM/DD/AAAA";
		}
	});
});

function rand(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}