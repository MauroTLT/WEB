<template>
	<div id="app">
		<div class="row">
			<div class="col-md-4">
				<add-prod-form></add-prod-form>
			</div>
		</div>
		<br><br>
		<div class="row">
			<div class="col-sm-6 col-md-6 col-lg-12">
				<tabla-prod></tabla-prod>
			</div>
		</div>
	</div>
</template>

<script>
	import TablaProd from './components/TablaProd';
	import AddProdForm from './components/AddProdForm';

	export default {
		name: 'app',
		components: {
			TablaProd,
			AddProdForm
		}
	};
</script>

<style>
	#app {
		font-family: 'Avenir', Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-align: center;
		color: #2c3e50;
		margin-top: 60px;
	}
</style>
