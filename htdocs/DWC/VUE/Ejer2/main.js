'use strict'

Vue.component('todo-list', {
	props: ['title'],
	template:
		'<div>'+
			'<h2>{{ title }}</h2>'+
			'<ul>'+
				'<todo-item v-for="item in todos" :key="item.id" :todo="item"></todo-item>'+
			'</ul>'+
			'<add-item></add-item>'+
			'<br>'+
			'<del-all></del-all>'+
		'</div>',
	data() {
		return {
			todos: [
				{ 
					id: 1,
					title: "Learn JavaScript", 
					done: false 
				}, { 
					id: 2,
					title: "Learn Vue", 
					done: false 
				}, { 
					id: 3,
					title: "Play around in JSFiddle", 
					done: true 
				}, { 
					id: 4,
					title: "Build something awesome", 
					done: true 
				}
			]
		}
	},
	methods: {
		delTodo(index){
			this.todos.splice(index, 1);
		},
		addTodo() {
			if (this.newTodo) {
				this.todos.push({title: this.newTodo, done: false});
				this.newTodo = '';      
			}
		},
		delTodos() {
			if (confirm('¿Deseas borrar toda la lista de cosas a hacer?')) {
				this.todos = [];
			}
		}
	}
});

Vue.component('todo-item', {
	props: ['todo'],
	template: 
		'<li @dblclick="delTodo">'+
			'<label>'+
				'<input type="checkbox" v-model="todo.done">'+
				'<del v-if="todo.done">'+
					'{{ todo.title }}'+
				'</del>'+
				'<span v-else>'+
					'{{ todo.title }}'+
				'</span>'+
			'</label>'+
		'</li>',
	methods: {
		delTodo() {
			alert('Quiero borrar "'+this.todo.title+'"');
		}
	}
});

Vue.component('add-item', {
	data() {
		return {
			newTodo: ''
		}
	},
	template:
		'<div>'+
			'<input v-model="newTodo">'+
			'<button @click="addTodo">Añadir</button>'+
		'</div>',
	methods: {
		addTodo() {
			if (this.newTodo) {
				alert('Quiero añadir "'+this.newTodo+'"');
			}
		}
	}
});

Vue.component('del-all', {
	template:
		'<button @click="delTodo">Borrar Todo</button>',
	methods: {
		delTodo() {
			alert('Quiero borrar todo');
		}
	}
});

var miApp = new Vue({
	el: "#app",
});