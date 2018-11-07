'use strict'
let rowName="ABCDEFGH";

window.addEventListener('load', () => {
	let test = /^[A-Z]{1}[1-8]{1}$/;
	let position = rowName.charAt(Math.floor((Math.random()*7)+1))+Math.floor((Math.random()*7)+1);
	let pos = prompt("Indica la posición inicial del caballo",position);
	while (!test.test(pos)) {
		pos = prompt("Debes indicar una posición inicial del caballo CORRECTA",position);
	}
	document.getElementById("posicion").innerHTML = pos;
	drawTable(pos);
})

function drawTable(initPos) {

	let tabla='';
	// Dibujamos la tabla de 8x8 más la primera celda de cada fila que es el nombre de la fila de 8..1
	for (let i=8; i>0; i--) {
		tabla+=`<tr><th>${i}</th>`;
		for (let j=0; j<8; j++) {
			tabla+=`<td id="${rowName.charAt(j)+i}" class="${((i+j)%2)?'negra':'blanca'}"></td>`;
		}
		tabla+='</tr><tr><th></th>';
	}
	// Dibujamos el encabezado de las columnas, A..H
	for (let i=0;i<8;i++) {
		tabla+=`<th>${rowName.charAt(i)}</th>`;
	}
	tabla+='</tr>';
	document.getElementById("tablero").innerHTML = tabla;
	drawPiece(initPos);
}

function drawPiece(initPos) {
	let img = document.createElement("img");
	img.id = "img";
	img.setAttribute("src", "images/caballo.png");
	img.setAttribute("width", "50");
	img.setAttribute("draggable", "true");
	img.className = "img";
	document.getElementById(initPos).appendChild(img);
	markNewPosition();
}

document.addEventListener("dragstart", function(event) {
	event.dataTransfer.setData("id", event.target.id);
});

document.addEventListener("dragover", function(event) {
	event.preventDefault();
});

document.addEventListener("drop", function(event) {
	event.preventDefault();
	if (event.target.classList.contains('dropable') && event.dataTransfer.getData("id") == "img") {
		var data = event.dataTransfer.getData("id");
		event.target.appendChild(document.getElementById(data));
		document.getElementById("posicion").innerHTML = document.getElementById("img").parentNode.id;
		markNewPosition();
	}
});

function markNewPosition() {
	Array.from(document.getElementsByClassName('dropable')).forEach((td)=> td.classList.remove("dropable"));
	let cell = document.getElementById("img").parentNode.id;
	if (document.getElementById(rowName.charAt(rowName.indexOf(cell.charAt(0))+2)+(+cell.charAt(1)+1))) {
		document.getElementById(rowName.charAt(rowName.indexOf(cell.charAt(0))+2)+(+cell.charAt(1)+1)).classList.add("dropable");
	}
	if (document.getElementById(rowName.charAt(rowName.indexOf(cell.charAt(0))+2)+(+cell.charAt(1)-1))) {
		document.getElementById(rowName.charAt(rowName.indexOf(cell.charAt(0))+2)+(+cell.charAt(1)-1)).classList.add("dropable");
	}
	if (document.getElementById(rowName.charAt(rowName.indexOf(cell.charAt(0))-2)+(+cell.charAt(1)+1))) {
		document.getElementById(rowName.charAt(rowName.indexOf(cell.charAt(0))-2)+(+cell.charAt(1)+1)).classList.add("dropable");
	}
	if (document.getElementById(rowName.charAt(rowName.indexOf(cell.charAt(0))-2)+(+cell.charAt(1)-1))) {
		document.getElementById(rowName.charAt(rowName.indexOf(cell.charAt(0))-2)+(+cell.charAt(1)-1)).classList.add("dropable");
	}
	if (document.getElementById(rowName.charAt(rowName.indexOf(cell.charAt(0))-1)+(+cell.charAt(1)-2))) {
		document.getElementById(rowName.charAt(rowName.indexOf(cell.charAt(0))-1)+(+cell.charAt(1)-2)).classList.add("dropable");
	}
	if (document.getElementById(rowName.charAt(rowName.indexOf(cell.charAt(0))-1)+(+cell.charAt(1)+2))) {
		document.getElementById(rowName.charAt(rowName.indexOf(cell.charAt(0))-1)+(+cell.charAt(1)+2)).classList.add("dropable");
	}
	if (document.getElementById(rowName.charAt(rowName.indexOf(cell.charAt(0))+1)+(+cell.charAt(1)+2))) {
		document.getElementById(rowName.charAt(rowName.indexOf(cell.charAt(0))+1)+(+cell.charAt(1)+2)).classList.add("dropable");
	}
	if (document.getElementById(rowName.charAt(rowName.indexOf(cell.charAt(0))+1)+(+cell.charAt(1)-2))) {
		document.getElementById(rowName.charAt(rowName.indexOf(cell.charAt(0))+1)+(+cell.charAt(1)-2)).classList.add("dropable");
	}	
}