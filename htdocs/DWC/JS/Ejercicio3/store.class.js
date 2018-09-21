'use strict'

class Store {
    constructor(id) {
        this.id = id;
        this.products = [];
    }

    findProduct(id) {
        return this.products.find(product => product.cod == id);
    }

    addProduct(cod, units, nombre = "", precio = 0) {
        if (nombre == "" || precio == 0) {
            this.products.push(new Product(cod,units,nombre,precio));
        } else {
            findProduct(cod).changeUnit(units);
        }
    }

    delProduct(cod, units) {
        findProduct(cod).changeUnit(units);
    }

    totalImport() {
        return this.products.reduce((total,product) => total = Number(product.valueOf()) + Number(product.valueOf()));
    }
}