'use strict'

pedirNotas();

function pedirNotas() {
	let semaforo = false;
	let notas = [];
	let frase = "";
	//Obligamos a que se escriba algo
	while(!semaforo) {
		frase = prompt("Escribe notas o haz click en cancelar");
		if (frase == null) {
			semaforo = true;
		} else {
			while (frase.search(",") >= 0 || frase.search(" ") >= 0) {
				frase = frase.replace(",", ".");
				frase = frase.replace(" ", "");
			}
			if (frase.search("-") != -1) {
				frase = frase.split("-");
				notas = notas.concat(frase);
			} else {
				notas.push(frase);
			}
		}
	}

	console.log("Datos suministrados por el usuario: " + notas);

	console.log("Array limpio: " + notas.filter(nota => !isNaN(nota) && nota != "" && nota >= 0 && nota <= 10));

	console.log("Aprobados: " + notas.filter(nota => nota >= 5));

	console.log("Suspendidos: " + notas.filter(nota => nota < 5));

	console.log("Nota y posición del primer suspenso: Nota: " + notas.find(nota => nota < 5) + " Posición: " + notas.findIndex(nota => nota < 5));

	let total = notas.reduce((total,nota) => total = +total + (+notas));
	console.log("Nota y posición del primer suspenso: Nota: " + total);

}
