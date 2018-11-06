'use strict'
let rowName="ABCDEFGH";

window.addEventListener('load', () => {
	//let position = rowName.charAt(Math.floor((Math.random()*7)+1))+Math.floor((Math.random()*7)+1);
	//posicion = prompt("Indica la posición inicial del caballo",position);
	drawTable();
})

function drawTable() {

	let tabla='';
	// Dibujamos la tabla de 8x8 más la primera celda de cada fila que es el nombre de la fila de 8..1
	for (let i=8; i>0; i--) {
		tabla+=`<tr><th>${i}</th>`;
		for (let j=0; j<8; j++) {
			tabla+=`<td id="${rowName.charAt(j)+i}" class="${((i+j)%2)?'negra':'blanca'}">`;
			if (i == 1 || i == 2) {
				tabla+='<img id="'+(i)+(j+1)+'" class="white" src="images/caballo_W.png" width="50" draggable="true">';
			} else if (i == 7 || i == 8) {
				tabla+='<img id="'+(i)+(j+1)+'" class="black" src="images/caballo_B.png" width="50" draggable="true">';
			}
			tabla+='</td>';
		}
		tabla+='</tr><tr><th></th>';
	}
	// Dibujamos el encabezado de las columnas, A..H
	for (let i=0;i<8;i++) {
		tabla+=`<th>${rowName.charAt(i)}</th>`;
	}
	tabla+='</tr>';
	document.getElementById("tablero").innerHTML = tabla;
}

document.addEventListener("dragstart", function(event) {
	event.dataTransfer.setData("id", event.target.id);
	markNewPosition(event);
});

document.addEventListener("dragover", function(event) {
	event.preventDefault();
});

document.addEventListener("dragend", function(event) {
	event.preventDefault();
	Array.from(document.getElementsByClassName('dropable')).forEach((td)=> td.classList.remove("dropable"));
});

document.addEventListener("drop", function(event) {
	event.preventDefault();
	if (event.target.classList.contains('dropable') && event.target.tagName != 'IMG') {
		var data = event.dataTransfer.getData("id");
		event.target.appendChild(document.getElementById(data));
	}
});

function markNewPosition(event) {
	let caballo = document.getElementById(event.dataTransfer.getData("id"));
	let cell = caballo.parentNode.id;
	if (caballo.classList.contains('white')) {
		if (document.getElementById(rowName.charAt(rowName.indexOf(cell.charAt(0))+1)+(+cell.charAt(1)+1)) && document.getElementById(rowName.charAt(rowName.indexOf(cell.charAt(0))+1)+(+cell.charAt(1)+1)).children.length == 0) {
			document.getElementById(rowName.charAt(rowName.indexOf(cell.charAt(0))+1)+(+cell.charAt(1)+1)).classList.add("dropable");
		} else if (document.getElementById(rowName.charAt(rowName.indexOf(cell.charAt(0))+1)+(+cell.charAt(1)+1)).children[0].classList.contains('black')) {
			console.log("ATACA DERECHA");
		}
		if (document.getElementById(rowName.charAt(rowName.indexOf(cell.charAt(0))-1)+(+cell.charAt(1)+1)) && document.getElementById(rowName.charAt(rowName.indexOf(cell.charAt(0))-1)+(+cell.charAt(1)+1)).children.length == 0) {
			document.getElementById(rowName.charAt(rowName.indexOf(cell.charAt(0))-1)+(+cell.charAt(1)+1)).classList.add("dropable");
		} else if (document.getElementById(rowName.charAt(rowName.indexOf(cell.charAt(0))-1)+(+cell.charAt(1)+1)).children[0].classList.contains('black')) {
			console.log("ATACA IZQUIERDA");
		}
	} else {
		if (document.getElementById(rowName.charAt(rowName.indexOf(cell.charAt(0))+1)+(+cell.charAt(1)-1)) && document.getElementById(rowName.charAt(rowName.indexOf(cell.charAt(0))+1)+(+cell.charAt(1)-1)).children.length == 0) {
			document.getElementById(rowName.charAt(rowName.indexOf(cell.charAt(0))+1)+(+cell.charAt(1)-1)).classList.add("dropable");
		}
		if (document.getElementById(rowName.charAt(rowName.indexOf(cell.charAt(0))-1)+(+cell.charAt(1)-1)) && document.getElementById(rowName.charAt(rowName.indexOf(cell.charAt(0))-1)+(+cell.charAt(1)-1)).children.length == 0) {
			document.getElementById(rowName.charAt(rowName.indexOf(cell.charAt(0))-1)+(+cell.charAt(1)-1)).classList.add("dropable");
		}
	}
}