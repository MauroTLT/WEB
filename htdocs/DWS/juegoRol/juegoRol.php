<?php
ini_set('display_errors',1);
require_once('Unidad.class.php');
require_once('Soldado.class.php');
require_once('Arquero.class.php');
require_once('Armadura.class.php');
require_once('Arma.class.php');

?>
<form method="POST">
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
                <input type="text" name="2nombre">
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
    $personajes = [];
    for ($i=1; $i < 3; $i++) {
        $nombre = $_POST[$i.'nombre'];
        $tipo = $_POST[$i.'tipo'];
        $arma = $_POST[$i.'arma'];
        $armadura = $_POST[$i.'armadura'];

        if ($armadura == 1) {
            $armadura = new ArmaduradePlata();
        } else if ($armadura == 2) {
            $armadura = new ArmaduradeBronze();
        } else if ($armadura == 3) {
            $armadura = new ArmaduradeMalla();
        }  else {
            $armadura = null;
        }

        if ($arma == 1) {
            $arma = new Espada(25);
        } else if ($arma == 2) {
            $arma = new Hacha(30);
        } else if ($arma == 3) {
            $arma = new ArcoLargo(20);
        } else {
            $arma = new ManosDesnudas(5);
        }

        if ($tipo == 1) {
            $personajes[$i] = new Soldado($nombre, $armadura, $arma);
        } else {
            $personajes[$i] = new Arquero($nombre, $armadura, $arma);
        }
    }

    echo $personajes[1]->toString();
    echo $personajes[2]->toString();

    for ($i=0; $i < 5; $i++) {
        echo "<br><br><b>PELEA NUMERO ".($i+1)."</b>";
        if (rand(0,1)) {
            while ($personajes[1]->getPuntos() > 0 && $personajes[2]->getPuntos() > 0) {
                $personajes[1]->ataque($personajes[2]);
                if ($personajes[2]->getPuntos() > 0) {
                    $personajes[2]->ataque($personajes[1]);
                }
            }
        } else {
            while ($personajes[1]->getPuntos() > 0 && $personajes[2]->getPuntos() > 0) {
                $personajes[2]->ataque($personajes[1]);
                if ($personajes[1]->getPuntos() > 0) {
                    $personajes[1]->ataque($personajes[2]);
                }
            }
        }
        $personajes[1]->revivir();
        $personajes[2]->revivir();
    }
}