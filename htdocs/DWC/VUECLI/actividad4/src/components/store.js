
import axios from 'axios';
const URL = 'http://localhost:3000';

export const STORE = {
	debug: true, // Modo debug (Si esta activado manda mensajes por cada acción que se ejecuta)
	state: {
		almacen: [],
	},
	// Método que suma unidades a un producto del array en base a su codigo
	sumar(id) {
		if (this.debug) {console.log('sumar triggered with', id);}
		
		let prod = this.state.almacen.filter((prod)=>prod.id == id)[0];
		prod.units += 1;

		axios.put(URL+'/almacen/'+id, prod).then(
		).catch(
			response => {
				alert('Error: no se ha borrado el registro. '+response.message)
				prod.units -= 1
			}
		);
	},
	// Método que resta unidades a un producto del array en base a su codigo
	restar(id) {
		if (this.debug) {console.log('restar triggered with', id);}

		let prod = this.state.almacen.filter((prod)=>prod.id == id)[0];
		prod.units -= 1;

		axios.put(URL+'/almacen/'+id, prod).then(
		).catch(
			response => {
				alert('Error: no se ha borrado el registro. '+response.message)
				prod.units += 1
			}
		);
	},
	// Método que borra un producto del array en base a su codigo
	borrar(id) {
		if (this.debug) {console.log('borrar triggered with', id);}
		let prod = this.state.almacen.filter((prod)=>prod.id == id)[0];
		if (confirm("¿Deseas borrar el producto " + prod.name + "?")) {
			axios.delete(URL+'/almacen/'+id).then(
				() => this.state.almacen.splice(this.state.almacen.indexOf(prod),1)
			).catch(response => alert('Error: no se ha borrado el registro. '+response.message));
		}
	},
	// Método que añade un nuevo producto al array
	newProd(producto) {
		if (this.debug) {console.log('newProd triggered with', producto);}
		// Comprobamos que no haya un producto con ese codigo
		let prod = this.state.almacen.filter((prod)=>prod.id == producto.id)[0];
		if (!prod) {
			axios.post(URL+'/almacen', producto).then(
				() => this.state.almacen.push(producto)
			).catch(response => alert('Error: no se ha añadido el registro. '+response.message));
		} else {
			alert("El codigo introducido ya está registrado");
		}
	}
};
getStorage();
/*
	Función que rellena el array de tareas desde el localStorage
	Si este está vacio devuelve un array con datos de prueba
*/

function getStorage() {
	axios.get(URL+'/almacen').then(
		response => response.data.forEach((prod)=>STORE.state.almacen.push(prod))
	).catch(response => {
		if (!response.status) {// Si el servidor no responde 'response' no es un objeto sino texto
			alert('Error: el servidor no responde');
		} else {
			alert('Error '+response.status+': '+response.message);          
		}
	});
}