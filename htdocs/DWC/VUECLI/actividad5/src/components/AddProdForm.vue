<template>
	<div class="container">
		<h1 align="center">Productos del Almacen</h1><br>
		<form id="new-prod" method="POST">
			<fieldset>
				<legend>Nuevo producto</legend>
				<div class="form-group">
					<label for="new-id">Código:</label>
					<input v-model="id" type="text" class="form-control" id="new-id" required>
				</div>
				<div class="form-group">
					<label for="new-name">Nombre:</label>
					<input v-model="name" type="text" class="form-control" id="new-name" required>
				</div>
				<div class="form-group">
					<label for="new-units">Unidades:</label>
					<input v-model="units" type="number" class="form-control" id="new-units" required min="0" step="1">
				</div>
				<div class="form-group">
					<label for="new-price">Precio/u.:</label>
					<input v-model="price" type="number" class="form-control" id="new-price" required min="0" step="0.01">
				</div>
				<button @click="newProd" type="button" class="btn btn-default">Añadir</button>
				<button type="reset" class="btn btn-default">Reset</button>
			</fieldset>
		</form>
	</div>
</template>

<script>
	import { STORE } from './store.js';

	export default {
		name: 'add-prod-form',
		data() {
			return {
				id: '',
				name: '',
				units: '',
				price: '',
			}
		},
		methods: {
			newProd() {
				if (this.id && this.name && this.units && this.price) {
					STORE.newProd({id: +this.id, name: this.name, units: +this.units, price: +this.price});
				}
			},
		}
	};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
