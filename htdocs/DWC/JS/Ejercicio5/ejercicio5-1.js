'use strict'

window.addEventListener('load', function () {
	document.getElementById("para").addEventListener("click", paraVentana); 
	document.getElementById("mueve").addEventListener("click", mueveVentana); 
	window.addEventListener("resize", cambiaMax);	
});
let upDown = 0;
let leftRight = 0;
var ventana = window.open("", "_blank", "top=1,left=1,width=200,height=150");
ventana.document.write("<p>Me muevo</p>");

function paraVentana() {
	// body...
}

function mueveVentana() {
	var intervalo = setInterval(mover, 25);
}

function cambiaMax() {
	// body...
}

function mover() {
	if (ventana.screenY+(ventana.innerHeight) < window.innerHeight && leftRight == 0) {
		ventana.moveBy(0, 10);
		leftRight = 0;
	} else if (ventana.screenX+(ventana.innerWidth) < (window.innerWidth-10)) {
		ventana.moveBy(10, 0);
		leftRight = 1;
	} else if (ventana.screenY > 1 && leftRight == 1) {
		ventana.moveBy(0, -10);
		console.log(ventana.screenY);
	} else if (ventana.screenX > 1) {
		ventana.moveBy(-10, 0);
		inferiorDerecha = 0;
	} else {
		console.log("quieto");
		return;
	}
	ventana.focus();
}