'use strict'

let carritos = [];
let almacen = new Store(1);

//CREAMOS LOS EVENTOS
window.addEventListener('load', function () {
	//AÑADIR PRODUCTO
	document.getElementById("new-prod").addEventListener("submit", function () {
		event.preventDefault();
		almacen.addProduct(document.getElementById('new-cod').value, +document.getElementById('new-units').value,document.getElementById('new-name').value,document.getElementById('new-price').value);
		reload();
	});
	//BORRAR PRODUCTO
	document.getElementById("del-prod").addEventListener("submit", function () {
		event.preventDefault();
		almacen.delFullProduct(document.getElementById('del-cod').value);
		reload();
	});
	//MODIFICAR PRODUCTO
	document.getElementById("mod-prod").addEventListener("submit", function () {
		event.preventDefault();
		almacen.addProduct(document.getElementById('mod-cod').value, +document.getElementById('mod-units').value);
		reload();
	});
	//CREAR NUEVO CARRITO
	document.getElementById("new-cart").addEventListener("submit", function () {
		event.preventDefault();
		let cod = document.getElementById('new-cart-cod').value;
		if (carritos.length == 0 || !carritos.find(cart => cart.id == cod)) {
			carritos.push(new Cart(cod, document.getElementById('new-cart-user').value));
		}
		reload();
	});
	//AÑADIR PRODUCTO A CARRITO
	document.getElementById("add-cart").addEventListener("submit", function () {
		event.preventDefault();
		let cart = findCart(document.getElementById('add-cart-cod').value);
		addToCart(cart, document.getElementById('add-cart-prod').value, +document.getElementById('add-cart-units').value);
		reload();
	});
	//QUITAR PRODUCTO DE CARRITO
	document.getElementById("del-cart").addEventListener("submit", function () {
		event.preventDefault();
		let cart = findCart(document.getElementById('del-cart-cod').value);
		removeFromCart(cart, document.getElementById('del-cart-prod').value, +document.getElementById('del-cart-units').value);
		reload();
	});
});

//DEVUELVE EL CARRITO EN BASE AL ID
function findCart(cod) {
	return carritos.find(cart => cart.id == cod);
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
	reload();
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

function reload() {
	document.getElementById('almacen').innerHTML = almacen.toTable2();

	document.getElementById('carritos').innerHTML = carritos.reduce((lista, carro) => lista += carro.toDiv(),"");
}