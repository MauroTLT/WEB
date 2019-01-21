<template>
	<tr>
		<td>{{profe.codi}}</td>
		<td>{{profe.nom}}</td>
		<td>{{profe.ape1}}</td>
		<td>{{profe.ape2}}</td>
		<td>{{profe.grup}}</td>
		<td>
			<button type="button" title="Editar" class="btn btn-sm btn-default" @click="$router.push('profesores/edit/'+profe.id);">
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
		props: ['profe'],
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
