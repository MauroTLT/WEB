'use strict'

pedirFrase();

function pedirFrase() {
	let frase = prompt("Escribe una frase");
	//Obligamos a que se escriba algo
	while(frase === null || frase === "") {
		frase = prompt("Debes escribir una frase");
	}
	let arrayPalabras = frase.split(" ");
	//Si no tiene espacios, es solo una palabra
	if (arrayPalabras === undefined) {
		arrayPalabras = frase;
	}

	console.log("La frase tiene: " + frase.length + " letras");
	console.log("La frase contiene: " + arrayPalabras.length + " palabras");
	console.log("La frase en mayusculas: " + frase.toLocaleUpperCase());

	firstUpper(arrayPalabras);

	alReves(frase);

	alRevesFrase(arrayPalabras);

	palindromo(frase);
}

function firstUpper(arrayPalabras) {
	let firstUp = "La frase con la primera letra en mayusculas: ";
	//Recorremos palabra a palabra
	for (let i = 0; i < arrayPalabras.length; i++) {
		let palabra = arrayPalabras[i].split("");
		//Recorremos letra por letra
		for (let j = 0; j < palabra.length; j++) {
			if(j == 0) {
				firstUp += palabra[j].toLocaleUpperCase();
			} else {
				firstUp += palabra[j];
			}
		}
		firstUp += " ";
	}
	console.log(firstUp);
}

function alReves(frase) {
	let reverse = "La frase con las palabras al reves: ";
	//Leemos la cadena desde el final
	for (let i = frase.length-1; i >= 0; i--) {
		reverse += frase[i];
	}
	console.log(reverse);
}

function alRevesFrase(arrayPalabras) {
	let reverse = "La frase al reves:";
	//Leemos el array desde el final
	for (let i = arrayPalabras.length-1; i >= 0; i--) {
		reverse += " " + arrayPalabras[i];
	}
	console.log(reverse);
}

function palindromo(frase) {
	let fraseTrim = frase.replace(" ", "");
	//Quitamos todos los posible espacios en blanco
	while (fraseTrim.search(" ") >= 0) {
		fraseTrim = fraseTrim.replace(" ", "");
	}
	let j = fraseTrim.length - 1;
	//Comprobamos la primera con la ultima, la segunda con la penultima etc...
	for (let i = 0; i < fraseTrim.length; i++) {
		if (!(fraseTrim[i].toLocaleUpperCase() === fraseTrim[j].toLocaleUpperCase())) {
			console.log("La frase NO es un palíndromo.");
			return;
		}
		j--;
	}
	console.log("La frase SI es un palíndromo.");
}