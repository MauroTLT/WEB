<template>
	<div class="container">
		<h1 align="center">Profesores del Centro</h1><br>
		<table class="table table-striped">
			<tr>
				<th>Codigo</th>
				<th>Nombre</th>
				<th>Apellido 1</th>
				<th>Apellido 2</th>
				<th>Grupo</th>
				<th>Acciones</th>
			</tr>
			<fila-profes v-for="(profe, index) in profes" :key="index" :profe="profe" @borrar="borrar(profe)"></fila-profes>
		</table>
	</div>
</template>

<script>
	import FilaProfes from './FilaProfes';
	import axios from 'axios';
	const URL = 'http://localhost:3000';

	export default {
		name: 'tabla-profes',
		props: ['grupo'],
		components: {
			FilaProfes
		},
		data() {
			return {
				profes: [],
			}
		},
		created() {
			axios.get(URL+'/profesores'+((this.grupo !== undefined)? '?grup='+this.grupo : '')).then(
				response => response.data.forEach((profe)=>this.profes.push(profe))
			).catch(response => {
				if (!response.status) {// Si el servidor no responde 'response' no es un objeto sino texto
					alert('Error: el servidor no responde');
				} else {
					alert('Error '+response.status+': '+response.message);          
				}
			});
		},
		methods: {
			borrar(profe) {
				if (confirm('¿Seguro que quieres borrar el grupo con Codigo ' + profe.codi + ' llamado ' + profe.nom + '?')) {
					axios.delete(URL+'/profesores/'+profe.id).then(
						() => this.profes.splice(this.profes.indexOf(profe),1)
					).catch(response => alert('Error: no se ha borrado el registro. '+response.message));
				}
			}
		}
	};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
