<template>
	<tr>
		<td>{{producto.cod}}</td>
		<td>{{producto.name}}</td>
		<td>{{producto.units}}</td>
		<td>{{producto.price}} €</td>
		<td>{{producto.units*producto.price}} €</td>
		<td>
			<button @click="sumar(producto.cod)" type="button" title="Añadir Unidades" class="btn btn-default btn-sm">
				<span class="glyphicon glyphicon-chevron-up" style="font-size: 25px;">↑</span>
			</button>
			<button v-if="producto.units > 0" @click="restar(producto.cod)" type="button" title="Restar Unidades" class="btn btn-default btn-sm">
				<span class="glyphicon glyphicon-chevron-down" style="font-size: 25px;">↓</span>
			</button>
			<button v-else disabled @click="restar(producto.cod)" type="button" title="Restar Unidades" class="btn btn-default btn-sm">
				<span class="glyphicon glyphicon-chevron-down" style="font-size: 25px;">↓</span>
			</button>
			<button @click="borrar(producto.cod)" type="button" title="Borrar producto" class="btn btn-default btn-sm">
				<span class="glyphicon glyphicon-trash" style="font-size: 25px;">🗑</span> 
			</button>
		</td>
	</tr>
</template>

<script>
	export default {
		name: 'fila-prod',
		props: ['producto'],
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
