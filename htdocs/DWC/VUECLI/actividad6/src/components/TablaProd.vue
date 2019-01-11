<template>
	<div class="container">
		<h1 align="center">Productos del Almacen</h1><br>
		<table class="table table-striped">
			<tr>
				<th>Código</th>
				<th>Nombre</th>
				<th>Uds.</th>
				<th>Precio/u</th>
				<th>Importe</th>
				<th>Acciones</th>
			</tr>
			<fila-prod v-for="(prod, index) in prods" :key="index" :producto="prod" @borrar="borrar(prod)"></fila-prod>
		</table>
	</div>
</template>

<script>
	import FilaProd from './FilaProd';
	import axios from 'axios';
	const URL = 'http://localhost:3000';

	export default {
		name: 'tabla-prod',
		components: {
			FilaProd
		},
		data() {
			return {
				prods: [],
			}
		},
		created() {
			axios.get(URL+'/almacen').then(
				response => response.data.forEach((prod)=>this.prods.push(prod))
			).catch(response => {
				if (!response.status) {// Si el servidor no responde 'response' no es un objeto sino texto
					alert('Error: el servidor no responde');
				} else {
					alert('Error '+response.status+': '+response.message);          
				}
			});
		},
		methods: {
			borrar(producto) {
				if (confirm("¿Deseas borrar el producto " + producto.name + "?")) {
					axios.delete(URL+'/almacen/'+producto.id).then(
						() => this.prods.splice(this.prods.indexOf(producto),1)
					).catch(response => alert('Error: no se ha borrado el registro. '+response.message));
				}
			},
		}
	};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
