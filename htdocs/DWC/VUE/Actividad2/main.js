'use strict'

/**
	Variable donde almacenaremos todo lo referente a la aplicación
*/
const STORE = {
	debug: true, // Modo debug (Si esta activado manda mensajes por cada acción que se ejecuta)
	state: {
		almacen: getStorage(),
	},
	// Método que suma unidades a un producto del array en base a su codigo
	sumar(cod) {
		if (this.debug) {console.log('sumar triggered with', cod);}
		this.state.almacen.filter((prod)=>prod.cod == cod)[0].units += 1;
	},
	// Método que resta unidades a un producto del array en base a su codigo
	restar(cod) {
		if (this.debug) {console.log('restar triggered with', cod);}
		let prod = this.state.almacen.filter((prod)=>prod.cod == cod)[0].units -= 1;
	},
	// Método que borra un producto del array en base a su codigo
	borrar(cod) {
		if (this.debug) {console.log('borrar triggered with', cod);}
		let prod = this.state.almacen.filter((prod)=>prod.cod == cod)[0];
		if (confirm("¿Deseas borrar el producto " + prod.name + "?")) {
			this.state.almacen.splice(this.state.almacen.indexOf(prod),1);
		}
	},
	// Método que añade un nuevo producto al array
	newProd(producto) {
		if (this.debug) {console.log('newProd triggered with', producto);}
		// Comprobamos que no haya un producto con ese codigo
		let prod = this.state.almacen.filter((prod)=>prod.cod == producto.cod)[0];
		if (!prod) {
			this.state.almacen.push(producto);
		} else {
			alert("El codigo introducido ya está registrado");
		}
	},
	// Método que guarda los cambios antes de cerrar la página
	saveToStorage() {
		localStorage.setItem('productos', JSON.stringify(this.state.almacen));
	},
}

/*
	Función que rellena el array de tareas desde el localStorage
	Si este está vacio devuelve un array con datos de prueba
*/

function getStorage() {
	if (localStorage.getItem('productos')) {
		return JSON.parse(localStorage.getItem('productos'));
	} else {
		return [	
			{cod: 1, name: "Tele", units: 10, price: 200},
			{cod: 2, name: "Topo", units: 500, price: 1},
			{cod: 3, name: "Toporch", units: 1, price: 5}
		];
	}
}

/*
	COMPONENTE VUE - Formulario de Nuevo producto
*/
Vue.component('add-prod-form', {
	template:
'  <form id="new-prod" method="POST">'+
'    <fieldset>'+
'        <legend>Nuevo producto</legend>'+
'        <div class="form-group">'+
'            <label for="new-cod">Código:</label>'+
'            <input v-model="cod" type="text" class="form-control" id="new-cod" required>'+
'        </div>'+
'        <div class="form-group">'+
'            <label for="new-name">Nombre:</label>'+
'            <input v-model="name" type="text" class="form-control" id="new-name" required>'+
'        </div>'+
'        <div class="form-group">'+
'            <label for="new-units">Unidades:</label>'+
'            <input v-model="units" type="number" class="form-control" id="new-units" required min="0" step="1">'+
'        </div>'+
'        <div class="form-group">'+
'            <label for="new-price">Precio/u.:</label>'+
'            <input v-model="price" type="number" class="form-control" id="new-price" required min="0" step="0.01">'+
'        </div>'+
'        <button @click="newProd" type="button" class="btn btn-default">Añadir</button>'+
'        <button type="reset" class="btn btn-default">Reset</button>'+
'    </fieldset>'+
'  </form>',
	data() {
		return {
			cod: '',
			name: '',
			units: '',
			price: '',
		}
	},
	methods: {
		newProd() {
			if (this.cod && this.name && this.units && this.price) {
				STORE.newProd({cod: this.cod, name: this.name, units: this.units, price: this.price});
			}
		},
	}
});

/*
	COMPONENTE VUE - Tabla de Productos
*/

Vue.component('tabla-prod', {
	template: 
'	<table class="table table-striped">'+
'		<tr>'+
'			<th>Código</th>'+
'			<th>Nombre</th>'+
'			<th>Uds.</th>'+
'			<th>Precio/u</th>'+
'			<th>Importe</th>'+
'			<th>Acciones</th>'+
'		</tr>'+
'		<fila-prod v-for="(prod, index) in prods" :key="index" :producto="prod"></fila-prod>'+
'	</table>',
	data() {
		return {
			prods: STORE.state.almacen,
		}
	},
	created() {
		// Evento que se activa justo antes de cerrar la página
		window.addEventListener('beforeunload', event => {
			STORE.saveToStorage();
		});
	}
});

/*
	COMPONENTE VUE - Fila de Producto
*/

Vue.component('fila-prod', {
	props: ['producto'],
	template:
'	<tr>'+
'		<td>{{producto.cod}}</td>'+
'		<td>{{producto.name}}</td>'+
'		<td>{{producto.units}}</td>'+
'		<td>{{producto.price}} €</td>'+
'		<td>{{producto.units*producto.price}} €</td>'+
'		<td>'+
'			<button @click="sumar(producto.cod)" type="button" title="Añadir Unidades" class="btn btn-default btn-sm">'+
'				<span class="glyphicon glyphicon-chevron-up" style="font-size: 25px;">↑</span>'+
'			</button>'+
'			<button v-if="producto.units > 0" @click="restar(producto.cod)" type="button" title="Restar Unidades" class="btn btn-default btn-sm">'+
'				<span class="glyphicon glyphicon-chevron-down" style="font-size: 25px;">↓</span>'+
'			</button>'+
'			<button v-else disabled @click="restar(producto.cod)" type="button" title="Restar Unidades" class="btn btn-default btn-sm">'+
'				<span class="glyphicon glyphicon-chevron-down" style="font-size: 25px;">↓</span>'+
'			</button>'+
'			<button @click="borrar(producto.cod)" type="button" title="Borrar producto" class="btn btn-default btn-sm">'+
'				<span class="glyphicon glyphicon-trash" style="font-size: 25px;">🗑</span> '+
'			</button>'+
'		</td>'+
'	</tr>',
	methods: {
		// Metodos que llaman al almacen
		sumar(cod) {STORE.sumar(cod);},
		restar(cod) {STORE.restar(cod);},
		borrar(cod) {STORE.borrar(cod);},
	}
});

/*
	Aplicación VUE
*/

var miApp = new Vue({
	el: "#app",
});