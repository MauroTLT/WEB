'use strict'

window.addEventListener('load', function () {
	document.getElementById("para").addEventListener("click", paraVentana); 
	document.getElementById("mueve").addEventListener("click", mueveVentana); 
	window.addEventListener("resize", cambiaMax);	
});
let velocity = 10;
let upDown = 0;
let leftRight = 0;
var intervalo = null;
var ventana = window.open("", "_blank", "top="+(window.screenY+(window.outerHeight-window.innerHeight))+",left="+window.screenX+",width=200,height=150");
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
		intervalo = setInterval(mover, velocity);
		ventana.document.getElementById('text').innerHTML = "Me muevo";
	}
	ventana.focus();
}

function cambiaMax() {
	ventana.moveTo(window.screenX, window.screenY+(window.outerHeight-window.innerHeight));
	ventana.focus();
}

function cambiarVelocidad(num) {
	paraVentana();
	if (!(velocity < 1) || num > 0) {
		velocity += num;
		document.getElementById('vel').innerHTML = velocity;
	}
	mueveVentana();
}

function mover() {
	console.log(ventana.screenX+(ventana.outerWidth) + " _ " + (window.screenX+window.innerWidth));
	ventana.focus();
	if (ventana.screenY+(ventana.innerHeight) < (window.screenY+window.innerHeight) && upDown == 0 && leftRight == 0) {
		ventana.moveBy(0, 5);
		return;
	} else {
		upDown = 1;
	}

	if (ventana.screenX+(ventana.outerWidth+10) < (window.screenX+window.innerWidth) && upDown == 1 && leftRight == 0) {
		ventana.moveBy(5, 0);
		return;
	} else {
		leftRight = 1;
	}

	if (ventana.screenY > (window.screenY+(window.outerHeight-window.innerHeight)) && upDown == 1 && leftRight == 1) {
		ventana.moveBy(0, -5);
		return;
	} else {
		upDown = 0;
	}

	if (ventana.screenX > window.screenX && upDown == 0 && leftRight == 1) {
		ventana.moveBy(-5, 0);
		return;
	} else {
		leftRight = 0;
	}
}