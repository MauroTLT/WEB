<template>
	<table class="table table-striped">
		<tr>
			<th>Código</th>
			<th>Nombre</th>
			<th>Uds.</th>
			<th>Precio/u</th>
			<th>Importe</th>
			<th>Acciones</th>
		</tr>
		<fila-prod v-for="(prod, index) in prods" :key="index" :producto="prod"></fila-prod>
	</table>
</template>

<script>
	import FilaProd from './FilaProd';
	import { STORE } from './store.js';

	export default {
		name: 'tabla-prod',
		components: {
			FilaProd
		},
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
	};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
