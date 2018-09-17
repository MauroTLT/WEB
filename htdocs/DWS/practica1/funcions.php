<?php
pintarCabecera();
pintarCuerpo();
pintarFooter();


function pintarCuerpo(){
	?>
	<h1>EJERCICIO 3 - FUNCIONES</h1>
	<h3>Parte 1</h3>
	<p>
		<?php
		$array = ["Nombre" => "Mauro", "Edad" => 19,"Color" => "Naranja"];
		insert("usuarios", $array);
		?>
	</p>
	<br><br>
	<h3>Parte 2</h3>
	<p>
		<?php
		$array = ["Nombre" => "Mauro", "Edad" => 19,"Color" => "Naranja"];
		$sentencia = "insert into taula (camps) values (valors)";
		insert2($sentencia, "usuarios", $array);
		?>
	</p>
	<br><br>
	<h3>Parte 3</h3>
	<p>
		<?php
		$calculadora = function($simbolo, $ope1, $ope2){
			if ($simbolo == "-") {
				return $ope1 - $ope2;
			} else if ($simbolo == "+") {
				return $ope1 + $ope2;
			} else if ($simbolo == "*") {
				return $ope1 * $ope2;
			} else if ($simbolo == "/") {
				return $ope1 / $ope2;
			}
		};
		parte3($calculadora, "-", 4, 3);
		?>
	</p>
	<br><br><br>
	<?php
}

function insert($tabla, $array){
	$sentencia = "insert into ".$tabla."(".implode(", ", array_keys($array)).") values (";
	foreach ($array as $key => $dato) {
		$sentencia .= ":".$dato.", ";
	}
	$sentencia = substr($sentencia, 0,-2);
	$sentencia .= ")";
	printf($sentencia);
}

function insert2($sentencia, $tabla, $array){
	$sentencia = str_replace("taula", $tabla, $sentencia);
	foreach ($array as $key => $dato) {
		$cadena .= ":".$dato.", ";
	}
	$cadena = substr($cadena, 0,-2);
	$sentencia = str_replace("camps", implode(", ", array_keys($array)), $sentencia);

	$sentencia = str_replace("valors", $cadena, $sentencia);
	echo $sentencia;
}

function parte3($funcion, $simbolo, $ope1, $ope2){
	echo $ope1." ".$simbolo." ".$ope2." = ".$funcion($simbolo, $ope1, $ope2);
}

function pintarCabecera($titulo = "DWS"){
	?>
<!DOCTYPE html>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
		<title><?php echo $titulo; ?></title>
	</head>
	<body>
<?php 
}

function pintarFooter(){
	?>
		<footer>
		
		</footer>
	</body>
</html>
	<?php
}
?>