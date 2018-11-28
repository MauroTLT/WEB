'use strict'

const STORE = {
	state: {
		almacen: getStorage(),
	},
	sumar(cod) {
		this.state.almacen.filter((prod)=>prod.cod == cod)[0].units += 1;
	},
	restar(cod) {
		let prod = this.state.almacen.filter((prod)=>prod.cod == cod)[0].units -= 1;
	},
	borrar(cod) {
		let prod = this.state.almacen.filter((prod)=>prod.cod == cod)[0];
		if (confirm("¿Deseas borrar el producto " + prod.name + "?")) {
			this.state.almacen.splice(this.state.almacen.indexOf(prod),1);
		}
	},
	newProd(producto) {
		let prod = this.state.almacen.filter((prod)=>prod.cod == producto.cod)[0];
		if (!prod) {
			this.state.almacen.push(producto);
		}
	}
}

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
'		<fila-prod @sumar="sumar" @restar="restar" @borrar="borrar" v-for="(prod, index) in prods" :key="index" :producto="prod"></fila-prod>'+
'	</table>',
	data() {
		return {
			prods: STORE.state.almacen,
		}
	},
	methods: {
		sumar(cod) {
			STORE.sumar(cod);
		},
		restar(cod) {
			STORE.restar(cod);
		},
		borrar(cod) {
			STORE.borrar(cod);
		},
	}
});

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
'			<button @click="$emit(\'sumar\', producto.cod)" type="button" title="Añadir Unidades" class="btn btn-default btn-sm">'+
'				<span class="glyphicon glyphicon-chevron-up" style="font-size: 25px;">↑</span>'+
'			</button>'+
'			<button v-if="producto.units > 0" @click="$emit(\'restar\', producto.cod)" type="button" title="Restar Unidades" class="btn btn-default btn-sm">'+
'				<span class="glyphicon glyphicon-chevron-down" style="font-size: 25px;">↓</span>'+
'			</button>'+
'			<button v-else disabled @click="$emit(\'restar\', producto.cod)" type="button" title="Restar Unidades" class="btn btn-default btn-sm">'+
'				<span class="glyphicon glyphicon-chevron-down" style="font-size: 25px;">↓</span>'+
'			</button>'+
'			<button @click="$emit(\'borrar\', producto.cod)" type="button" title="Borrar producto" class="btn btn-default btn-sm">'+
'				<span class="glyphicon glyphicon-trash" style="font-size: 25px;">🗑</span> '+
'			</button>'+
'		</td>'+
'	</tr>',
});

var miApp = new Vue({
	el: "#app",
});