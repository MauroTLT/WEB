<?php
ini_set('display_errors',1);
require_once('Unidad.class.php');
require_once('Soldado.class.php');
require_once('Arquero.class.php');
require_once('Armadura.class.php');
require_once('Arma.class.php');

?>
<form>
    <table border="1">
        <tr>
            <td align="center">
                <h1>Oponente 1</h1>
                <label>Nombre: </label>
                <input type="text" name="1nombre">
                <br><br>
                <label>Tipo: </label>
                <select name="1tipo">
                    <option selected disabled value="">Selecciona el tipo de Unidad</option>
                    <option value="1">Soldado</option>
                    <option value="2">Arquero</option>
                </select>
                <br><br>
                <label>Arma: </label>
                <select name="1arma">
                    <option selected disabled value="">Selecciona el Arma</option>
                    <option value="0">Sin arma</option>
                    <option value="1">Espada</option>
                    <option value="2">Hacha</option>
                    <option value="3">Arco Largo</option>
                </select>
                <br><br>
                <label>Armadura: </label>
                <select name="1armadura">
                    <option selected disabled value="">Selecciona el Armadura</option>
                    <option value="0">Sin armadura</option>
                    <option value="1">Armadura de Plata</option>
                    <option value="2">Armadura de Bronze</option>
                    <option value="3">Armadura de Malla</option>
                </select>
            </td>
            <td align="center">
                <h1>Oponente 2</h1>
                <label>Nombre: </label>
                <input type="text" name="1nombre">
                <br><br>
                <label>Tipo: </label>
                <select name="2tipo">
                    <option selected disabled value="">Selecciona el tipo de Unidad</option>
                    <option value="1">Soldado</option>
                    <option value="2">Arquero</option>
                </select>
                <br><br>
                <label>Arma: </label>
                <select name="2arma">
                    <option selected disabled value="">Selecciona el Arma</option>
                    <option value="0">Sin arma</option>
                    <option value="1">Espada</option>
                    <option value="2">Hacha</option>
                    <option value="3">Arco Largo</option>
                </select>
                <br><br>
                <label>Armadura: </label>
                <select name="2armadura">
                    <option selected disabled value="">Selecciona el Armadura</option>
                    <option value="0">Sin armadura</option>
                    <option value="1">Armadura de Plata</option>
                    <option value="2">Armadura de Bronze</option>
                    <option value="3">Armadura de Malla</option>
                </select>
            </td>
        </tr>
        <tr>
            <td colspan="2" align="center">
                <br><button style="transform: scale(2);" type="submit" name="enviar">EMPEZAR</button><br><br>    
            </td>
        </tr>
    </table>
</form>

<?php
if (isset($_POST['enviar'])) {
    $personajes = array();
    for ($i=1; $i < 3; $i++) {
        $nombre = $_POST[$i.'nombre'];
        $tipo = $_POST[$i.'tipo'];
        $arma = $_POST[$i.'arma'];
        $armadura = $_POST[$i.'armadura'];

        if ($arma == 1) {
            $arma = new ArmaduradePlata();
        } else if ($arma == 2) {
            $arma = new ArmaduradeBronze();
        } else if ($arma == 3) {
            $arma = new ArmaduradeMalla();
        }

        if ($armadura == 1) {
            $armadura = new Espada(25);
        } else if ($armadura == 2) {
            $armadura = new Hacha(30);
        } else if ($armadura == 3) {
            $armadura = new ArcoLargo(20);
        }

        if ($tipo == 1) {
            $personajes[$i] = new Soldado($nombre, $armadura, $arma);
        } else {
            $personajes[$i] = new Arquero($nombre, $armadura, $arma);
        }
    }
    printf($personajes[1]);
    printf($personajes[2]);
    /*
    $u1->ataque($u2);
    $u1->ataque($u2);
    $u2->ataque($u1);
    $u2->ataque($u1);
    */
}