'use strict'

/*
	Función que devuelve el array de tareas desde el localStorage
	Si este está vacio devuelve un array con datos de prueba
*/
function getStorage() {
	if (localStorage.getItem('tareas')) {
		return JSON.parse(localStorage.getItem('tareas'));
	} else {
		return [	
			{date: new Date(), user: '12345678R', task: "Tarea Prueba 1", prio: "H"},
			{date: new Date(), user: '56781234R', task: "Tarea Prueba 2", prio: "L"},
			{date: new Date(), user: '87654321R', task: "Tarea Prueba 3", prio: "H"}
		];
	}
}

/*
	Aplicación VUE
*/
var miApp = new Vue({
	el: "#app",
	data: {
		user: '', // Variable para el dni del usuario
		task: '', // Variable para el texto de a tarea
		prio: '', // Variable para la prioridad
		tareas: getStorage(), // Cogemos el array de tareas
		dayList: [], // Variable con las tareas del dia
	},
	methods: {
		// Método que guarda los cambios antes de cerrar la página
		saveToStorage() {
			localStorage.setItem('tareas', JSON.stringify(this.tareas));
		},
		// Método que borra una tarea del array pasandole el índice de la tarea
		deleteTask(index) {
			this.tareas.splice(index,1);
			this.getDayList();
		},
		// Método que añade una nueva tarea al array
		newTask(index) {
			// Comprobamos que todos los datos tengan valor
			if (this.user && this.task && this.prio) {
				this.tareas.push({date: new Date(), user: this.user, task: this.task, prio: this.prio});
				this.getDayList();
			}
		},
		// Método que filtra las tareas que sean para el dia actual y las guarda en una variable
		getDayList() {
			this.dayList = this.tareas.filter(function (tarea) {
				let hoy = new Date();
				let date = new Date(tarea.date);
				if (date.getDate() == hoy.getDate() && date.getMonth() == hoy.getMonth() && date.getFullYear() == hoy.getFullYear()) {
					return true;
				}
				return false;
			});
		}
	}
});

// Comprobamos si hay tareas para hoy
miApp.getDayList();

window.addEventListener('load', () => {
	document.getElementById("new-task").setAttribute('novalidate', 'novalidate');
	// Evento que se activa justo antes de cerrar la página
	document.body.onbeforeunload = function () {
		miApp.saveToStorage();
	};
});