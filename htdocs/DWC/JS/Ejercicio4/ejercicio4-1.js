'use strict'

let carritos = [];
let almacen = new Store(1);
almacen.addProduct(1, 4, 'TV Samsung MP45', 345.95);
almacen.addProduct(2, 8, 'Portátil Acer Travelmate 200', 245.95);
almacen.addProduct(3, 15, 'Impresora Epson LX-455', 45.95);
almacen.addProduct(4, 25, 'USB Kingston 16GB', 5.95);

console.log('\nLISTADO DEL ALMACÉN');
almacen.products.forEach(prod=>console.log(prod.toString()));

almacen.addProduct(5, 15, 'USB Kingston 64GB', 15.95);
almacen.delProduct(3, 11);
almacen.delProduct(3, 7);
almacen.addProduct(6, 9);

console.log('\nLISTADO DEL ALMACÉN');
almacen.products.forEach(prod=>console.log(prod.toString()));

console.log('Importe total del almacen: ' + almacen.totalImport());

console.log('\nLISTADO DEL ALMACÉN ORDENADO POR UNIDADES');
almacen.orderByUnits().forEach(prod=>console.log(prod.toString()));

console.log('\nLISTADO DEL ALMACÉN ORDENADO POR NOMBRE');
almacen.orderByDescrip().forEach(prod=>console.log(prod.toString()));

console.log('\nParte Final');
almacen.products.filter(product=>product.units < 5 || product.productImport() < 150).forEach(prod=>console.log(prod.toString()));



carritos[0] = new Cart(1, "TOPO");
addToCart(carritos[0], 1, 4);
removeFromCart(carritos[0], 1, 1);


carritos[1] = new Cart(2, "Mauro");
addToCart(carritos[1], 4, 5);
removeFromCart(carritos[1], 4, 1);

console.log(carritos[0].products);
console.log(carritos[1].products);
console.log(almacen.products);

reload();

function addToCart(carro, cod, units) {
	let productoA = almacen.findProduct(cod);
	if (productoA) {
		let productoC = carro.findProduct(cod);
		if (productoC) {
			productoC.changeUnits(units);
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

	document.getElementById('carritos').innerHTML += carritos.reduce((lista, carro) => lista += carro.toDiv(),"");
}
