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
			//Quitamos espacios y cambiamos ',' por '.'
			frase = frase.replace(/\s/g,"");
			frase = frase.replace(/,/g,".");
			//Comprobamos si es mas de un valor a la vez o solo uno
			if (frase.search("-") != -1) {
				frase = frase.split("-");
				notas = notas.concat(frase);
			} else {
				notas.push(frase);
			}
		}
	}
	
	if (notas.length == 0) {
		console.log("No ha introducido ninguna nota");
		return;
	} else {
		console.log("Datos suministrados por el usuario: " + notas);

		notas = notas.filter(nota => !isNaN(nota) && nota != "" && nota >= 0 && nota <= 10);

		if (!notas.length == 0) {

			console.log("Array limpio: " + notas);

			console.log("Aprobados: " + notas.filter(nota => nota >= 5));

			console.log("Suspendidos: " + notas.filter(nota => nota < 5));

			console.log("Nota y posición del primer suspenso: Nota: " + (notas.find(nota => nota < 5) || "Ninguna") + " Posición: " + ((notas.findIndex(nota => nota < 5)>0) ? notas.findIndex(nota => nota < 5) : "Ninguna"));

			console.log("Media de las notas: " + (notas.reduce((total,nota) => total = Number(total) + Number(nota))) / notas.length);
		} else {
			console.log("Después de limpiar el array, este se ha quedado vacio");
		}
	}
}
