<template>
	<div>
		<div class="jumbotron">
			<h1 align="center">Producto con Codigo: {{product.id}}</h1>
		</div>
		<div class="container" align="center">
			<div class="row">
				<div class="col-md-4">
					<h1>Nombre</h1>
					<h2>{{product.name}}</h2>
				</div>
				<div class="col-md-4">
					<h1>Unidades</h1>
					<h2>{{product.units}} uds</h2>
				</div>
				<div class="col-md-4">
					<h1>Precio</h1>
					<h2>{{product.price}} €</h2>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import axios from 'axios';
	const URL = 'http://localhost:3000';

	export default {
		name: 'AppAbout',
		props: ['id'],
		data() {
			return {
				product: {},
			}
		},
		created() {
			axios.get(URL+'/almacen/'+this.id).then(
				response => this.product = response.data
			).catch(response => alert('Error: no se ha borrado el registro. '+response.message));
		}
	};

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
