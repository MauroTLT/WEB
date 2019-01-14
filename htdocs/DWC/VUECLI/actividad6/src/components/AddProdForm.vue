<template>
	<div class="container">
		<h1 align="center">Añadir Nuevo Producto</h1><br>
		<h2 align="center">Idioma: </h2>
		<div class="row">
			<div class="col-md-6">
				<button @click="changeIdiom(1)" type="button" class="btn btn-primary btn-block">Español</button>
			</div>
			<div class="col-md-6">
				<button @click="changeIdiom(0)" type="button" class="btn btn-primary btn-block">Valenciano</button>
			</div>
		</div>
		<br><br>
		<form id="new-prod" method="POST">
			<fieldset>
				<legend>Nuevo producto</legend>
				<div class="form-group">
					<label for="new-id">Código:</label>
					<input v-validate="'required'" v-model="id" type="text" class="form-control" id="new-id" name="Codigo">
					<span class="error">{{ errors.first('Codigo') }}</span>
				</div>
				<div class="form-group">
					<label for="new-name">Nombre:</label>
					<input v-validate="'required|min:5|max:50'" v-model="name" type="text" class="form-control" id="new-name" name="Nombre">
					<span class="error">{{ errors.first('Nombre') }}</span>
				</div>
				<div class="form-group">
					<label for="new-units">Unidades:</label>
					<input v-validate="'required|min_value:0'" v-model="units" type="number" class="form-control" id="new-units" name="Unidades">
					<span class="error">{{ errors.first('Unidades') }}</span>
				</div>
				<div class="form-group">
					<label for="new-price">Precio/u.:</label>
					<input v-validate="'required|min_value:0.01'" v-model="price" type="number" class="form-control" id="new-price" name="Precio">
					<span class="error">{{ errors.first('Precio') }}</span>
				</div>
				<button @click="newProd" type="button" class="btn btn-default">Añadir</button>
				<button type="reset" class="btn btn-default">Reset</button>
			</fieldset>
		</form>
	</div>
</template>

<script>
	import axios from 'axios';
	const URL = 'http://localhost:3000';

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
			changeIdiom(value) {
				this.$validator.localize((value)? "es" : "ca");
			},
			newProd() {
				this.$validator.validateAll()
				.then(result => {
					if (result) {
						axios.post(URL+'/almacen', {id: this.id, name: this.name, units: this.units, price: this.price}).then(
							this.$router.push('products')
						).catch(response => alert('Error: no se ha añadido el registro. '+response.message));
					}
				}).catch(result=>alert(result));
			},
		}
	};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.error {color: red;}
</style>
