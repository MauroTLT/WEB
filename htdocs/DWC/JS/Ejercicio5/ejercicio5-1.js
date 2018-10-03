'use strict'

window.addEventListener('load', function () {
	document.getElementById("para").addEventListener("click", paraVentana); 
	document.getElementById("mueve").addEventListener("click", mueveVentana); 
	window.addEventListener("resize", cambiaMax);	
});

let upDown = 0;
let leftRight = 0;
var intervalo = null;
var ventana = window.open("", "_blank", "top=1,left=1,width=200,height=150");
ventana.document.write("<p id='text'>Me muevo</p>");


function paraVentana() {
	if (intervalo != null) {
		clearInterval(intervalo);
		intervalo = null;
		ventana.document.getElementById('text').innerHTML = "Quieto";
	}
	ventana.focus();
}

function mueveVentana() {
	if (intervalo == null) {
		intervalo = setInterval(mover, 10);
		ventana.document.getElementById('text').innerHTML = "Me muevo";
	}
	ventana.focus();
}

function cambiaMax() {
	ventana.moveTo(1, 1);
	ventana.focus();
}

function mover() {
	ventana.focus();
	if (ventana.screenY+(ventana.innerHeight) < window.innerHeight && upDown == 0 && leftRight == 0) {
		ventana.moveBy(0, 5);
		return;
	} else {
		upDown = 1;
	}

	if (ventana.screenX+(ventana.innerWidth) < (window.innerWidth-20) && upDown == 1 && leftRight == 0) {
		ventana.moveBy(5, 0);
		return;
	} else {
		leftRight = 1;
	}

	if (ventana.screenY > 100 && upDown == 1 && leftRight == 1) {
		ventana.moveBy(0, -5);
		return;
	} else {
		upDown = 0;
	}

	if (ventana.screenX > 1 && upDown == 0 && leftRight == 1) {
		ventana.moveBy(-5, 0);
		return;
	} else {
		leftRight = 0;
	}
}