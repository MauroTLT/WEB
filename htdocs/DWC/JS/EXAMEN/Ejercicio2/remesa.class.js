'use strict'

class Remesa {

    constructor(id, descrip, cuentaAbono, fechaCargo = new Date()) {
        this.id = +id;
        this.descrip = descrip;
        this.cuentaAbono = +cuentaAbono;
        this.fechaCargo = fechaCargo.toLocaleDateString();
        this.recibos = [];
    }

    addRecibo(cuenta, importe) {
        let recibo = this.recibos.find((recibo)=> recibo.cuentaCargo == cuenta);
        if (!recibo) {
            console.log("hola");
            this.recibos.push({cuentaCargo: cuenta, importe: importe});
        } else {
            recibo.importe = +recibo.importe + importe;
        }
    }

    importeRemesa() {
        return this.recibos.reduce((total, recibo)=> total += recibo.importe, 0);
    }

    recibosRechazados() {
        let cuentasDesconocidas = this.recibos.filter((recibo)=> !getCuenta(recibo.cuentaCargo));
        cuentasDesconocidas.forEach((recibo)=> recibo.causa = 'Cuenta Desconocida');

        let noAdmitenDomiciliacion = this.recibos.filter((recibo)=> !getCuenta(recibo.cuentaCargo).domicilia(this.cuentaAbono));
        noAdmitenDomiciliacion.forEach((recibo)=> recibo.causa = 'La cuenta no admite Domiciliaciones');

        let saldoInsuficiente = this.recibos.filter((recibo)=> getCuenta(recibo.cuentaCargo).saldo() < recibo.importe);
        saldoInsuficiente.forEach((recibo)=> recibo.causa = 'Saldo Insuficiente');

        return cuentasDesconocidas.concat(noAdmitenDomiciliacion).concat(saldoInsuficiente);
    }
}