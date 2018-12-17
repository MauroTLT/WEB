<template>
	<tr>
		<td>{{producto.id}}</td>
		<td v-if="edit" width="200">
			<input style="width: 100%;" type="text" name="editPrice" v-model="nameEdit" :placeholder="producto.name">
		</td>
		<td v-else>
			{{producto.name}}
		</td>
		<td v-if="edit" width="150">
			<input style="width: 100%;" type="number" name="editPrice" v-model="unitsEdit" :placeholder="producto.units">
		</td>
		<td v-else>
			{{producto.units}}
		</td>
		<td v-if="edit" width="150">
			<input style="width: 100%;" type="number" name="editPrice" v-model="precioEdit" :placeholder="producto.price">
		</td>
		<td v-else>
			{{producto.price}} €
		</td>
		<td>{{producto.units*producto.price}} €</td>
		<td>
			<button @click="sumar(producto.id)" type="button" title="Añadir Unidades" class="btn btn-default btn-sm">
				<span class="glyphicon glyphicon-chevron-up" style="font-size: 25px;">↑</span>
			</button>
			<button v-if="producto.units > 0" @click="restar(producto.id)" type="button" title="Restar Unidades" class="btn btn-default btn-sm">
				<span class="glyphicon glyphicon-chevron-down" style="font-size: 25px;">↓</span>
			</button>
			<button v-else disabled @click="restar(producto.id)" type="button" title="Restar Unidades" class="btn btn-default btn-sm">
				<span class="glyphicon glyphicon-chevron-down" style="font-size: 25px;">↓</span>
			</button>
			<button @click="borrar(producto.id)" type="button" title="Borrar producto" class="btn btn-default btn-sm">
				<span class="glyphicon glyphicon-trash" style="font-size: 25px;">🗑</span> 
			</button>
			<span v-if="edit">
				<button @click="editar(producto.id)" type="button" title="Guardar Cambios" class="btn btn-success">Guardar</button>
				<button @click="edit = false" type="button" title="Borrar Cambios" class="btn btn-danger">Descartar</button>
			</span>
			<span v-else>
				<button @click="edit = true" type="button" title="Editar Producto" class="btn btn-warning">Editar</button>
			</span>
		</td>
	</tr>
</template>

<script>
	import { STORE } from './store.js';
	
	export default {
		name: 'fila-prod',
		props: ['producto'],
		data() {
			return {
				edit: false,
				nameEdit: '',
				unitsEdit: '',
				precioEdit: '',
			}
		},
		methods: {
			// Metodos que llaman al almacen
			sumar(cod) {STORE.sumar(cod);},
			restar(cod) {STORE.restar(cod);},
			borrar(cod) {STORE.borrar(cod);},
			editar(cod) {
				STORE.editProd({id: cod, name: this.nameEdit, units: +this.unitsEdit, price: +this.precioEdit});
				this.edit = false;
			}
		}
	};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
