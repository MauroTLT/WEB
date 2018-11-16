'use strict'

function getPromise(method = '', tabla = 'tasks', objeto = null) {
	let id = (method === 'DELETE' || method === 'PUT')? ('/'+objeto.id) : '';
	return new Promise(function(resolve, reject) {
		let peticion = new XMLHttpRequest();
		peticion.open(method, 'http://localhost:3000/' + tabla + '' + id);
		peticion.setRequestHeader("Content-Type", "application/json");
		peticion.send((objeto != null && method != 'DELETE')? JSON.stringify(objeto) : null);
		peticion.addEventListener('load', function() {
			if (peticion.status === 200 || peticion.status === 201) {
				resolve(JSON.parse(peticion.responseText));
			} else {
				reject("Error "+this.status+" ("+this.statusText+") en la petición");
			}
		});
		peticion.addEventListener('error', ()=>reject('Error en la petición HTTP'));
	});
}

window.addEventListener('load', () => {
	document.getElementById("new-task").addEventListener("submit", newTask);
	document.getElementById("new-task").setAttribute('novalidate', 'novalidate');
	Array.from(document.getElementById("new-task").getElementsByTagName('INPUT')).forEach(function (input) {
		if (input.type != "radio") {
			input.addEventListener('blur', (event)=>validate(event.target));
		}
	});
	recogerDatos();
});

document.addEventListener("dragstart", function(event) {
	event.dataTransfer.setData("id", event.target.id);
});

document.addEventListener("dragover", function(event) {
	event.preventDefault();
});

document.addEventListener("drop", function(event) {
	event.preventDefault();
	if (event.target.id == 'papelera') {
		let data = event.dataTransfer.getData("id");
		let row = document.getElementById(data);
		let tarea = row.children[4].innerHTML;

		if (confirm("¿Deseas borrar la tarea "+data+" '"+tarea+"'?")) {
			getPromise('DELETE', "tasks", {id: data})
				.then(function (respuesta) {
					row.parentNode.removeChild(row);
				}).catch(function (err) {
					console.log(err);
				});
		}
	}
});

function recogerDatos() {
	let datos = null;
	getPromise('GET', "tasks", null)
		.then(function (respuesta) {
			datos = respuesta;
			pintarTabla(datos);
		}).catch(function (err) {
			console.log(err);
		});

}

function pintarTabla(datos) {
	let tabla = "";
	datos.forEach((dato)=> tabla += getRow(dato));
	document.getElementsByTagName('TBODY')[0].innerHTML = tabla;
}

function getRow(dato) {
	let image = (dato.prio === "H")? 'task-high.png' : 'task.png';
	let hoy = new Date();
	let fecha = new Date(dato.date);
	if (fecha.getDate() == hoy.getDate() && fecha.getMonth() == hoy.getMonth() && fecha.getFullYear() == hoy.getFullYear()) {
		fecha = fecha.toLocaleTimeString();
	} else {
		fecha = fecha.toLocaleDateString();
	}
	return "<tr id='"+dato.id+"' draggable='true'><td><img src='./img/"+image+"'></td><td>"+dato.id+"</td><td>"+fecha+"</td><td>"+dato.user+"</td><td>"+dato.task+"</td></tr>";
}

function newTask(event) {
	event.preventDefault();
	let user = validate(document.getElementById('task-user'));
	let task = validate(document.getElementById('task-name'));
	let priority = Array.from(document.getElementsByName('task-prio')).find((input)=>input.checked == true);
	if (priority == null) {
		priority = document.getElementsByName('task-prio')[0];
	}
	priority = validate(priority);
	if (user && task && priority) {
		let object = {user: user, task: task, date: new Date(), prio: priority};
		getPromise('POST', "tasks", object)
		.then(function (respuesta) {
			object.id = respuesta.id;
			document.getElementsByTagName('TBODY')[0].innerHTML += getRow(object);
			document
		}).catch(function (err) {
			console.log(err);
		});
		document.getElementById("new-task").reset();
	}
	
}

function validate(input) {
	if (input.previousSibling && input.previousSibling.tagName === "P") {
		input.parentNode.removeChild(input.previousSibling);
		input.setCustomValidity('');
	}

	if (input.validity.valueMissing) {
		input.setCustomValidity("Este campo es obligatorio.");
	} else if (input.validity.patternMismatch) {
		input.setCustomValidity("El formato del usuario es 8 números y 1 letra mayúscula.");
	} else if (input.validity.tooLong) {
		input.setCustomValidity("La longitud máxima del campo son "+input.maxlength);
	} else if (input.type == "radio" && input.checked === false) {
		input.setCustomValidity("Ningún input seleccionado");
	}

	if (!input.checkValidity()) {
		let parrafo = document.createElement("P");
		parrafo.className = 'error';
		parrafo.appendChild(document.createTextNode(input.validationMessage));
		input.parentNode.insertBefore(parrafo, input);
		return false;
	} else {
		return input.value;
	}
}