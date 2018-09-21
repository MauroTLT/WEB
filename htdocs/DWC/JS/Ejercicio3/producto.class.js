'use strict'

class Product {
    constructor(cod, name, price, units = 1) {
        this.cod = cod;
        this.name = name;
        this.price = price;
        this.units = units;
    }

    changeUnit(cantidad) {
    	if (!((this.units+cantidad) < 0)) {
    		this.units += cantidad;
    		return true;
    	}
    	return false;
    }

    productImport() {
    	return this.price * this.units;
    }

    toString() {
    	return this.name + "(" + this.cod + "): " + this.price + " €/u => " + this.productImport();
    }

    valueOf() {
        return this.price;
    }
}