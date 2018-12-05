
export const STORE = {
	debug: true, // Modo debug (Si esta activado manda mensajes por cada acción que se ejecuta)
	state: {
		almacen: getStorage(),
	},
	// Método que suma unidades a un producto del array en base a su codigo
	sumar(cod) {
		if (this.debug) {console.log('sumar triggered with', cod);}
		this.state.almacen.filter((prod)=>prod.cod == cod)[0].units += 1;
	},
	// Método que resta unidades a un producto del array en base a su codigo
	restar(cod) {
		if (this.debug) {console.log('restar triggered with', cod);}
		let prod = this.state.almacen.filter((prod)=>prod.cod == cod)[0].units -= 1;
	},
	// Método que borra un producto del array en base a su codigo
	borrar(cod) {
		if (this.debug) {console.log('borrar triggered with', cod);}
		let prod = this.state.almacen.filter((prod)=>prod.cod == cod)[0];
		if (confirm("¿Deseas borrar el producto " + prod.name + "?")) {
			this.state.almacen.splice(this.state.almacen.indexOf(prod),1);
		}
	},
	// Método que añade un nuevo producto al array
	newProd(producto) {
		if (this.debug) {console.log('newProd triggered with', producto);}
		// Comprobamos que no haya un producto con ese codigo
		let prod = this.state.almacen.filter((prod)=>prod.cod == producto.cod)[0];
		if (!prod) {
			this.state.almacen.push(producto);
		} else {
			alert("El codigo introducido ya está registrado");
		}
	},
	// Método que guarda los cambios antes de cerrar la página
	saveToStorage() {
		localStorage.setItem('productos', JSON.stringify(this.state.almacen));
	},
};

/*
	Función que rellena el array de tareas desde el localStorage
	Si este está vacio devuelve un array con datos de prueba
*/

function getStorage() {
	if (localStorage.getItem('productos')) {
		return JSON.parse(localStorage.getItem('productos'));
	} else {
		return [	
			{cod: 1, name: "Tele", units: 10, price: 200},
			{cod: 2, name: "Topo", units: 500, price: 1},
			{cod: 3, name: "Toporch", units: 1, price: 5}
		];
	}
}