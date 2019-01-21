<template>
	<tr>
		<td>{{alumno.nif}}</td>
		<td>{{alumno.nom}}</td>
		<td>{{alumno.ape1}}</td>
		<td>{{alumno.ape2}}</td>
		<td>{{alumno.grup}}</td>
		<td>
			<button type="button" title="Editar" class="btn btn-sm btn-default" @click="$router.push('alumnos/edit/'+alumno.id);">
				Edit
			</button>
			<button type="button" title="Eliminar" class="btn btn-sm btn-default" @click="$emit('borrar')">
				Elim
			</button>
		</td>
	</tr>
</template>

<script>	
	export default {
		name: 'fila-grup',
		props: ['alumno'],
		data() {
			return {

			}
		},
		methods: {

		}
	};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
