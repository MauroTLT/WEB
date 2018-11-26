'use strict'
let tareas = null;

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

var miApp = new Vue({
	el: "#app",
	data: {
		user: '',
		task: '',
		prio: '',
		tareas: getStorage(),
	},
	methods: {
		saveToStorage() {
			localStorage.setItem('tareas', JSON.stringify(this.tareas));
		},
		deleteTask(index) {
			this.tareas.splice(index,1);
		},
		newTask(index) {
			if (this.user && this.task && this.prio) {
				console.log("hola");
				this.tareas.push({date: new Date(), user: this.user, task: this.task, prio: this.prio});
			}
		}
	}
});

window.addEventListener('load', () => {
	document.getElementById("new-task").setAttribute('novalidate', 'novalidate');
	document.body.onbeforeunload = function () {
		miApp.saveToStorage();
	};
});