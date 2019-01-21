<template>
	<tr>
		<td>{{grupo.codi}}</td>
		<td>{{grupo.nomcas}}</td>
		<td>{{grupo.nomval}}</td>
		<td>{{tutor}}</td>
		<td>{{grupo.cicle}}</td>
		<td>{{grupo.grau}}</td>
		<td>{{grupo.familia}}</td>
		<td>
			<button type="button" title="Editar" class="btn btn-sm btn-default" @click="$router.push('grupos/edit/'+grupo.id);">
				Edit
			</button>
			<button type="button" title="Eliminar" class="btn btn-sm btn-default" @click="$emit('borrar')">
				Elim
			</button>
			<button type="button" title="Alumnos" class="btn btn-sm btn-default" @click="$router.push('alumnos/grupo/'+grupo.id);">
				Alum
			</button>
			<button type="button" title="Profesores" class="btn btn-sm btn-default" @click="$router.push('profesores/grupo/'+grupo.id);">
				Prof
			</button>
			<button type="button" title="Tutor" class="btn btn-sm btn-default" @click="$router.push('profesores/'+grupo.tutor);">
				Tut
			</button>
		</td>
	</tr>
</template>

<script>
	import axios from 'axios';
	const URL = 'http://localhost:3000';
	
	export default {
		name: 'fila-grup',
		props: ['grupo'],
		data() {
			return {
				tutor: null,
			}
		},
		created() {
			axios.get(URL+'/profesores/'+this.grupo.tutor).then(
				response => this.tutor = response.data.nom
			).catch(response => {
				if (!response.status) {// Si el servidor no responde 'response' no es un objeto sino texto
					alert('Error: el servidor no responde');
				} else {
					alert('Error '+response.status+': '+response.message);
				}
			});
		},
		methods: {

		}
	};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
