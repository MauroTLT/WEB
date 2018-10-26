'use strict'

let carritos = [];
let almacen = new Store(1);

//CREAMOS LOS EVENTOS
window.addEventListener('load', function () {
	//AÑADIR PRODUCTO
	document.getElementById("new-prod").addEventListener("submit", newProdAlmacen);
	//BORRAR PRODUCTO
	document.getElementById("del-prod").addEventListener("submit", delProdAlmacen);
	//MODIFICAR PRODUCTO
	document.getElementById("mod-prod").addEventListener("submit", modProdAlmacen);
	//CREAR NUEVO CARRITO
	document.getElementById("new-cart").addEventListener("submit", newCart);
	//AÑADIR PRODUCTO A CARRITO
	document.getElementById("add-cart").addEventListener("submit", addCart);
	//QUITAR PRODUCTO DE CARRITO
	document.getElementById("del-cart").addEventListener("submit", delCart);

	//Quitamos la validacion de la API del navegador
	document.getElementById("new-prod").setAttribute('novalidate', 'novalidate');
	document.getElementById("del-prod").setAttribute('novalidate', 'novalidate');
	document.getElementById("mod-prod").setAttribute('novalidate', 'novalidate');
	document.getElementById("new-cart").setAttribute('novalidate', 'novalidate');
	document.getElementById("add-cart").setAttribute('novalidate', 'novalidate');
	document.getElementById("del-cart").setAttribute('novalidate', 'novalidate');
});


function newProdAlmacen(event) {
	event.preventDefault();
	let cod = validate(document.getElementById('new-cod'));
	let units = validate(document.getElementById('new-units'));
	let name = validate(document.getElementById('new-name'));
	let price = validate(document.getElementById('new-price'));
	if (cod && units && name && price) {
		almacen.addProduct(cod, +units, name, +price);
		reload();
	}
}

function delProdAlmacen(event) {
	event.preventDefault();
	let cod = validate(document.getElementById('del-cod'));
	if (cod) {
		if (confirm("¿Está seguro de que desea eliminar el Producto?")) {
			almacen.delFullProduct(cod);
			reload();
		}
	}
}

function modProdAlmacen(event) {
	event.preventDefault();
	let cod = validate(document.getElementById('mod-cod'));
	let units = validate(document.getElementById('mod-units'));

	if (cod && units) {
		almacen.addProduct(cod, +units);
		reload();
	}
}

function newCart(event) {
	event.preventDefault();
	let cod = validate(document.getElementById('new-cart-cod'));
	let user = validate(document.getElementById('new-cart-user'));
	if (cod && user) {
		if (carritos.length == 0 || !carritos.find(cart => cart.id == cod)) {
			carritos.push(new Cart(cod, user));
			reload();
		}
	}
}

function addCart(event) {
	event.preventDefault();
	let cod = validate(document.getElementById('add-cart-cod'));
	let prod = validate(document.getElementById('add-cart-prod'));
	let units = validate(document.getElementById('add-cart-units'));
	if (cod && prod && units) {
		if (cod = findCart(cod)) {
			addToCart(cod, prod, +units);
			reload();
		}
	}
}

function delCart(event) {
	event.preventDefault();
	let cod = validate(document.getElementById('del-cart-cod'));
	let prod = validate(document.getElementById('del-cart-prod'));
	let units = validate(document.getElementById('del-cart-units'));
	if (cod && prod && units) {
		if (cod = findCart(cod)) {
			removeFromCart(cod, prod, +units);
			reload();
		}
	}
}

//Función que añade a un carrito tantas unidades de un producto
function addToCart(carro, cod, units) {
	let productoA = almacen.findProduct(cod);
	if (productoA) {
		let productoC = carro.findProduct(cod);
		if (productoC) {
			if (almacen.delProduct(cod, units)) {
				productoC.changeUnit(units);
			} else {
				console.log("No se pueden añadir tantas unidades");
			}
		} else {
			if (almacen.delProduct(cod, units)) {
				carro.addProduct(cod, units, productoA.name, productoA.price);
			} else {
				console.log("No se pueden añadir tantas unidades");
			}
		}
	} else {
		console.log("Codigo no encontrado en ALMACEN");
	}
}

//Función que quita de un carrito tantas unidades de un producto
function removeFromCart(carro, cod, units) {
	let productoC = carro.findProduct(cod);
	if (productoC) {
		if (carro.delProduct(cod, units)) {
			if (carro.findProduct(cod).units == 0) {
				carro.products = carro.products.filter(prod=>prod.cod !== cod);
			}
			almacen.addProduct(cod, units);
		}
	} else {
		console.log("Codigo no encontrado en CARRITO");
	}
}


/*
Función que recibe un input de cualquier formulario y valida si su contenido es correcto
Si tiene algun error muestra un mensaje con el error encontrado
*/
function validate(input) {
	//Si ya he tenido un error antes de entrar se lo quitamos, para que vuelva a pasar por la validación entera
	if (input.nextSibling) {
		input.parentNode.removeChild(input.nextSibling);
		input.setCustomValidity('');
	}

	//Comprobamos todos los posible errores
	//Error de campo vacio
	if (input.validity.valueMissing) {
		input.setCustomValidity("Error, campo vacío.");
	}
	//Error de por debajo del MIN
	else if (input.validity.rangeUnderflow) {
		input.setCustomValidity("Error, dato inferior a lo esperado.");
	}
	//Error de STEP incorrecto
	else if (input.validity.stepMismatch) {
		input.setCustomValidity("Error, patrón incorrecto.");
	}
	//Error no se encuentra el producto
	else if (((input.id == "del-cod" || input.id == "mod-cod" || input.id == "add-cart-prod") && !almacen.findProduct(input.value))) {
		input.setCustomValidity("Error, producto no encontrado.");
	}
	//Error no se encuentra el carrito
	else if (((input.id == "add-cart-cod" || input.id == "del-cart-cod") && !findCart(input.value))) {
		input.setCustomValidity("Error, carrito no encontrado.");
	}
	//Error no se encuentra ese producto en el carrito
	else if (input.id == "del-cart-prod") {
		let cart = findCart(document.getElementById('del-cart-cod').value);
		if (cart !== undefined) {
			if (!cart.findProduct(input.value)) {
				input.setCustomValidity("Error, producto no encontrado en almacen.");
			}
		} else {
			input.setCustomValidity("Error, producto no se puede buscar, carrito no encontrado.");
		}
	}
	//Conjunto de errores de el input "mod-units" en base al estado de los otros campos de su formulario
	else if (input.id == "mod-units") {
		let prod = almacen.findProduct(document.getElementById('mod-cod').value);
		if (prod !== undefined) {
			if ((prod.units + (+input.value)) < 0) {
				input.setCustomValidity("Error, no se pueden quitar tantas unidades.");
			}
		} else {
			input.setCustomValidity("Error, codigo erroneo.");
		}
	}
	//Conjunto de errores de el input "add-cart-units" en base al estado de los otros campos de su formulario
	else if (input.id == "add-cart-units") {
		let cart = findCart(document.getElementById('add-cart-cod').value);
		let prod = almacen.findProduct(document.getElementById('add-cart-prod').value);
		if (cart !== undefined) {
			if (prod !== undefined) {
				if ((prod.units - (+input.value)) < 0) {
					input.setCustomValidity("Error, no se pueden añadir tantas unidades.");
				}
			} else {
				input.setCustomValidity("Error, producto no encontrado en carrito.");
			}
		} else {
			input.setCustomValidity("Error, producto no se puede buscar, carrito no encontrado.");
		}
	}
	//Conjunto de errores de el input "del-cart-units" en base al estado de los otros campos de su formulario
	else if (input.id == "del-cart-units") {
		let cart = findCart(document.getElementById('del-cart-cod').value);
		if (cart !== undefined) {
			let prod = cart.findProduct(document.getElementById('del-cart-prod').value);
			if (prod !== undefined) {
				if ((prod.units - (+input.value)) < 0) {
					input.setCustomValidity("Error, no se pueden quitar tantas unidades.");
				}
			} else {
				input.setCustomValidity("Error, producto no encontrado en carrito.");
			}
		} else {
			input.setCustomValidity("Error, producto no se puede buscar, carrito no encontrado.");
		}
	}
	
	//Si ha saltado algun error se crea el div con el mensaje de error
	//En caso contrario se devuelve el valor del input
	if (!input.checkValidity()) {
		let div = document.createElement("DIV");
		div.appendChild(document.createTextNode(input.validationMessage));
		input.parentNode.insertBefore(div, input.nextSibling);
		return false;
	} else {
		return input.value;
	}
}

//DEVUELVE EL CARRITO EN BASE AL ID
function findCart(cod) {
	return carritos.find(cart => cart.id == cod);
}

function reload() {
	document.getElementById('almacen').innerHTML = almacen.toTable2();

	document.getElementById('carritos').parentNode.innerHTML = carritos.reduce((lista, carro) => lista += carro.toDiv(),"") + '<div id="carritos"></div>';
}