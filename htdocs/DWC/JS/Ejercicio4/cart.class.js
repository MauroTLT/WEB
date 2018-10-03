class Cart extends Store {

    constructor (id, user) {
        super(id);
        this.user = user;
    }

    toDiv() {
        let sentencia = '<div class="cart col-md-4"><p>Carro ' + this.id + ' - ' + this.user + '</p><ul id="cart-2" class="list-group">';
        sentencia += this.products.reduce((linea, prod) => linea += '<li class="list-group-item">' + prod.toString() + '</li>', "");
        sentencia += '<li class="list-group-item">Importe total: ' + this.totalImport() + ' €</li>';
        sentencia += '</ul></div>';
        return sentencia;
    }
}
