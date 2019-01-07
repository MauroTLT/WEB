
import axios from 'axios';
const URL = 'http://localhost:3000';

export const STORE = {
	state: {
		almacen: [],
	},
	// Método que suma unidades a un producto del array en base a su codigo
	sumar(id) {
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
		let prod = this.state.almacen.filter((prod)=>prod.id == id)[0];
		if (confirm("¿Deseas borrar el producto " + prod.name + "?")) {
			axios.delete(URL+'/almacen/'+id).then(
				() => this.state.almacen.splice(this.state.almacen.indexOf(prod),1)
			).catch(response => alert('Error: no se ha borrado el registro. '+response.message));
		}
	},
	// Método que añade un nuevo producto al array
	newProd(producto) {
		// Comprobamos que no haya un producto con ese codigo
		let prod = this.state.almacen.filter((prod)=>prod.id == producto.id)[0];
		if (!prod) {
			axios.post(URL+'/almacen', producto).then(
				() => this.state.almacen.push(producto)
			).catch(response => alert('Error: no se ha añadido el registro. '+response.message));
		} else {
			alert("El codigo introducido ya está registrado");
		}
	},

	editProd(producto) {
		let prod = this.state.almacen.filter((prod)=>prod.id == producto.id)[0];
		axios.put(URL+'/almacen/'+producto.id, producto).then(
			() => {
				prod.name = producto.name;
				prod.units = producto.units;
				prod.price = producto.price;
			}
		).catch(response => alert('Error: no se ha actualizado el registro. '+response.message));
	},

	getProduct(cod) {
		return this.state.almacen.filter((prod)=>prod.id == cod)[0];
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