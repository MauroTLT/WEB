<template>
	<div class="container">
		<h1 align="center">Alumnos del Centro</h1><br>
		<table class="table table-striped">
			<tr>
				<th>NIF</th>
				<th>Nombre</th>
				<th>Apellido 1</th>
				<th>Apellido 2</th>
				<th>Grupo</th>
				<th>Acciones</th>
			</tr>
			<fila-alumnos v-for="(alumno, index) in alumns" :key="index" :alumno="alumno" @borrar="borrar(alumno)"></fila-alumnos>
		</table>
	</div>
</template>

<script>
	import FilaAlumnos from './FilaAlumnos';
	import axios from 'axios';
	const URL = 'http://localhost:3000';

	export default {
		name: 'tabla-alumnos',
		props: ['grupo'],
		components: {
			FilaAlumnos
		},
		data() {
			return {
				alumns: [],
			}
		},
		created() {
			axios.get(URL+'/alumnos'+((this.grupo !== undefined)? '?grup='+this.grupo : '')).then(
				response => response.data.forEach((alumn)=>this.alumns.push(alumn))
			).catch(response => {
				if (!response.status) {// Si el servidor no responde 'response' no es un objeto sino texto
					alert('Error: el servidor no responde');
				} else {
					alert('Error '+response.status+': '+response.message);          
				}
			});
		},
		methods: {
			borrar(alumno) {
				if (confirm('¿Seguro que quieres borrar el grupo con NIF ' + alumno.nif + ' llamado ' + alumno.nom + '?')) {
					axios.delete(URL+'/alumnos/'+alumno.id).then(
						() => this.alumns.splice(this.alumns.indexOf(alumno),1)
					).catch(response => alert('Error: no se ha borrado el registro. '+response.message));
				}
			}
		}
	};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
