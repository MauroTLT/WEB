<template>
	<div class="container">
		<h1 align="center">Grupos del Centro</h1><br>
		<table class="table table-striped">
			<tr>
				<th>Codigo</th>
				<th>Nombre Cast.</th>
				<th>Nombre Val.</th>
				<th>Tutor</th>
				<th>Ciclo</th>
				<th>Grado</th>
				<th>Familia</th>
				<th>Acciones</th>
			</tr>
			<fila-grup v-for="(grup, index) in grups" :key="index" :grupo="grup" @borrar="borrar(grup)"></fila-grup>
			<tr>
				<td colspan="8">
					<button type="button" class="btn btn-lg btn-success btn-block" @click="$router.push('grupos/new');">Añadir Grupo</button>
				</td>
			</tr>
		</table>
	</div>
</template>

<script>
	import FilaGrup from './FilaGrup';
	import axios from 'axios';
	const URL = 'http://localhost:3000';

	export default {
		name: 'tabla-grup',
		components: {
			FilaGrup
		},
		data() {
			return {
				grups: [],
			}
		},
		created() {
			axios.get(URL+'/grupos').then(
				response => response.data.forEach((grup)=>this.grups.push(grup))
			).catch(response => {
				if (!response.status) {// Si el servidor no responde 'response' no es un objeto sino texto
					alert('Error: el servidor no responde');
				} else {
					alert('Error '+response.status+': '+response.message);          
				}
			});
		},
		methods: {
			borrar(grupo) {
				if (confirm('¿Seguro que quieres borrar el grupo con id ' + grupo.codi + ' llamado ' + grupo.nomcas + '?')) {
					axios.delete(URL+'/grupos/'+grupo.id).then(
						() => this.grups.splice(this.grups.indexOf(grupo),1)
					).catch(response => alert('Error: no se ha borrado el registro. '+response.message));
				}
			}
		}
	};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
