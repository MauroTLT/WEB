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
        if (!nombre == "" || !precio == 0) {
            this.products.push(new Product(cod,nombre,precio,units));
        } else {
            if (!this.findProduct(cod)) {
                console.log("Producto no encontrado, si quiere añadir indique nombre y precio");
                return false;
            } else {
                this.findProduct(cod).changeUnit(units);
            }
        }
        return true;
    }

    delProduct(cod, units) {
        return this.findProduct(cod).changeUnit(-units);
    }

    totalImport() {
        return this.products.reduce((total,product) => total += Number(product.productImport()),0);
    }

    orderByUnits() {
        return this.products.sort((a,b) => b.units - a.units);
    }

    orderByDescrip() {
        return this.products.sort((a,b) => a.name.localeCompare(b.name));
    }
}