<template>
	<div class="container">
		<h1 v-if="(editGroup === null)" align="center">Añadir Nuevo Grupo</h1>
		<h1 v-else align="center">Editar Grupo</h1>
		<br>
		<form id="new-group" method="POST" @submit.prevent="newGroup">
			<fieldset>
				<legend>Nuevo Grupo</legend>
				<div class="form-group">
					<label for="new-codi">Código:</label>
					<input v-if="(editGroup === null)" v-model="group.codi" type="text" class="form-control" id="new-codi" required>
					<input v-else :value="editGroup.codi" type="text" class="form-control" id="new-codi" required>
				</div>
				<div class="form-group">
					<label for="new-name-cas">Nombre Castellano:</label>
					<input v-if="(editGroup === null)" v-model="group.nomcas" type="text" class="form-control" id="new-name-cas" required>
					<input v-else :value="editGroup.nomcas" type="text" class="form-control" id="new-name-cas" required>
				</div>
				<div class="form-group">
					<label for="new-name-val">Nombre Valenciano:</label>
					<input v-if="(editGroup === null)" v-model="group.nomval" type="text" class="form-control" id="new-name-val" required>
					<input v-else :value="editGroup.nomval" type="text" class="form-control" id="new-name-val" required>
				</div>
				<div class="form-group">
					<label for="new-units">Tutor:</label>
					<select v-if="(editGroup === null)" v-model="group.tutor"  class="form-control" required>
						<option selected disabled>Selecciona un tutor</option>
						<option v-for="(profe, index) in profes" :key="index" :value="profe.id">{{profe.nom}}</option>
					</select>
					<select v-else class="form-control" required>
						<option selected disabled>Selecciona un tutor</option>
						<option v-for="(profe, index) in profes" :key="index" :selected="editGroup.tutor===profe.id" :value="profe.id">{{profe.nom}}</option>
					</select>
				</div>
				<div class="form-group">
					<label for="new-cicle">Ciclo:</label>
					<input v-if="(editGroup === null)" v-model="group.cicle" type="text" class="form-control" id="new-cicle" required>
					<input v-else :value="editGroup.cicle" type="text" class="form-control" id="new-cicle" required>
				</div>
				<div class="form-group">
					<label>Grado Medio: </label>
					<input v-if="(editGroup === null)" v-model="group.grau" type="radio" id="new-mitja" name="grado" value="Mitja" required>
					<input v-else :checked="editGroup.grau==='Mitja'" type="radio" id="new-mitja" name="grado" value="Mitja" required>
					<br>
					<label>Grado Superior: </label>
					<input v-if="(editGroup === null)" v-model="group.grau" type="radio" id="new-superior" name="grado" value="Superior">
					<input v-else :checked="editGroup.grau==='Superior'" type="radio" id="new-superior" name="grado" value="Superior" required>
				</div>
				<div class="form-group">
					<label for="new-fam">Familia:</label>
					<input v-if="(editGroup === null)" v-model="group.familia" type="text" class="form-control" id="new-fam" required>
					<input v-else :value="editGroup.familia" type="text" class="form-control" id="new-fam" required>
				</div>
				<button type="submit" class="btn btn-default">Añadir</button>
				<button type="reset" class="btn btn-default">Reset</button>
			</fieldset>
		</form>
	</div>
</template>

<script>
	import axios from 'axios';
	const URL = 'http://localhost:3000';

	export default {
		name: 'add-grup-form',
		props: ['id'],
		data() {
			return {
				profes: [],
				group: {
					codi: '',
					nomcas: '',
					nomval: '',
					tutor: '',
					cicle: '',
					grau: '',
					familia: ''
				},
				editGroup: null,
			}
		},
		created() {
			if (this.id) {
				axios.get(URL+'/grupos/'+this.id).then(
					response => this.editGroup = response.data
				).catch(response => {
					if (!response.status) {// Si el servidor no responde 'response' no es un objeto sino texto
						alert('Error: el servidor no responde');
					} else {
						alert('Error '+response.status+': '+response.message);
					}
				});
			}
			axios.get(URL+'/profesores').then(
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
			newGroup() {
				axios.post(URL+'/grupos', this.group).then(
					this.$router.push('/grupos')
				).catch(response => alert('Error: no se ha añadido el registro. '+response.message));
			}
		}
	};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
