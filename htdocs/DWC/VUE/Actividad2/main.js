'use strict'

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
'        <button type="submit" class="btn btn-default">Añadir</button>'+
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
});

Vue.component('tabla-prod', {
	template: 
'	<table class="table table-striped">'+
'	    <tr>'+
'	        <th>Código</th>'+
'	        <th>Nombre</th>'+
'	        <th>Uds.</th>'+
'	        <th>Precio/u</th>'+
'	        <th>Importe</th>'+
'	        <th>Acciones</th>'+
'	    </tr>'+
'		<fila-prod v-for="(prod, index) in prods" :producto="prod"></fila-prod>'+
'	</table>',
	data() {
		return {
			prods: getStorage(),
		}
	},
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
'		<td>COSAS</td>'+
'	</tr>',
});

var miApp = new Vue({
	el: "#app",
});