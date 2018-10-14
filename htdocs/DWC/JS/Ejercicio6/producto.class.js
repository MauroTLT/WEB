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
            this.units += Number(cantidad);
            return true;
        }
        return false;
    }

    productImport() {
        return (this.price * this.units);
    }

    toString() {
        return this.units + " x " + this.name + "(" + this.price + ") = " + this.productImport() + " €";
    }

    valueOf() {
        return this.price;
    }

    toTR() {
        return /*'<tr id="' + this.cod + '">*/'<td>' + this.cod + '</td><td>' + this.name + '</td><td>' + this.units + '</td><td>' + this.price + ' €/u</td><td>' + this.productImport().toFixed(2) + ' €</td>'/*</tr>'*/;
    }
}