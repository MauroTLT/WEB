'use strict'

let almacen = new Store(1);
almacen.addProduct(1, 4, 'TV Samsung MP45', 345.95);
almacen.addProduct(2, 8, 'Portátil Acer Travelmate 200', 245.95);
almacen.addProduct(3, 15, 'Impresora Epson LX-455', 45.95);
almacen.addProduct(4, 25, 'USB Kingston 16GB', 5.95);

console.log('');
console.log('LISTADO DEL ALMACÉN');
almacen.products.forEach(prod=>console.log(prod.toString()));

almacen.addProduct(5, 15, 'USB Kingston 64GB', 15.95);
almacen.delProduct(3, 11);
almacen.delProduct(3, 7);
almacen.addProduct(6, 9);

console.log('');
console.log('LISTADO DEL ALMACÉN');
almacen.products.forEach(prod=>console.log(prod.toString()));

console.log('Importe total del almacen: ' + almacen.totalImport());

console.log('');
console.log('LISTADO DEL ALMACÉN ORDENADO POR UNIDADES');
almacen.orderByUnits().forEach(prod=>console.log(prod.toString()));

console.log('');
console.log('LISTADO DEL ALMACÉN ORDENADO POR NOMBRE');
almacen.orderByDescrip().forEach(prod=>console.log(prod.toString()));

console.log('');
console.log('Parte Final');
almacen.products.filter(product=>product.units < 5 || product.productImport() < 150).forEach(prod=>console.log(prod.toString()));