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
		almacen.addProduct(cod, units, name, price);
		reload();
	}
}

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
	reload();
}

function validate(input) {
	if (input.nextSibling) {
		input.parentNode.removeChild(input.nextSibling);
	}
	if (!input.checkValidity()) {
		var div = document.createElement("DIV");
		var text = null;
		if (input.validity.valueMissing) {
			text = document.createTextNode("Error, campo vacío.");
		} else if (input.validity.rangeUnderflow) {
			text = document.createTextNode("Error, dato inferior a lo esperado.");
		} else if (input.validity.stepMismatch) {
			text = document.createTextNode("Error, patrón incorrecto.");
		} else {
			text = document.createTextNode("Error, el valor no es correcto.");
		}
		div.appendChild(text);
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