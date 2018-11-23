var miApp = new Vue({
	el: "#app",
	data: {
		newToDo: "",
		todos: [
			{id: 1, title: "Decir Poto", check: false},
			{id: 2, title: "Decir ToPope", check: false },
			{id: 3, title: "Hacer este ejercicio", check: true}
		]
	},
	methods: {
		delToDos() {
			if (confirm("¿Borrar todos los elementos de la lista?")) {
				this.todos = [];
			}
		},
		addToDo() {
			if (this.newToDo != '') {
				this.todos.push({title: this.newToDo, check: false});
				this.newToDo = '';
			}
		},
		delToDo(index) {
			this.todos.splice(index,1);
		}
	}
});