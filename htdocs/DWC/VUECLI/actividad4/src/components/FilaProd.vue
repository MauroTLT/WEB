<template>
	<tr>
		<td v-if="edit" contenteditable>
			{{producto.id}}
		</td>
		<td v-else>
			{{producto.id}}
		</td>
		<td>{{producto.name}}</td>
		<td>{{producto.units}}</td>
		<td>{{producto.price}} €</td>
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
			<button v-if="edit" @click="alert('hola')" type="button" title="Editar producto" class="btn btn-default btn-sm">
				<span class="glyphicon glyphicon-trash" style="font-size: 25px;">🗑</span> 
			</button>
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
				edit: true,
			}
		},
		methods: {
			// Metodos que llaman al almacen
			sumar(cod) {STORE.sumar(cod);},
			restar(cod) {STORE.restar(cod);},
			borrar(cod) {STORE.borrar(cod);},
		}
	};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
