<?php
pintarCabecera();
pintarCuerpo();
pintarFooter();


function pintarCuerpo(){
	?>
	<h1>PARTE 1</h1>
	<p><?php parte1();?></p>
	<br><br><br>
	<h1>PARTE 2</h1>
	<p><?php parte2();?></p>
	<?php
}

function parte2(){
	$url = 'http://username:password@hostname:9090/path?arg=value';

	echo "<h3>Query String: ".parse_url($url, PHP_URL_QUERY)."</h3>";

	echo "<h3>Protocolo: ".parse_url($url, PHP_URL_SCHEME)."</h3>";

	echo "<h3>Usuario: ".parse_url($url, PHP_URL_USER)."</h3>";

	echo "<h3>Path: ".parse_url($url, PHP_URL_PATH)."</h3>";
}

function parte1(){
	$texto = $_GET['nom'];
	$prefijo = $_GET['prefix'];
	echo "<h2>Cadena original: ".$texto."</h2><br>";
	if ($texto == null) {
		$texto = "Mauro";
	}
	$texto = str_replace("/", "", $texto);
	echo "<h3>Cadena sin '/': ".$texto."</h3>";

	echo "<h3>Longitud de la cadena: ".strlen($texto)."</h3>";

	echo "<h3>Texto en Mayuscula: ".strtoupper($texto)."</h3>";

	echo "<h3>Texto en Minuscula: ".strtolower($texto)."</h3>";

	echo "<h3>Cambio de O por 0: ".str_ireplace("o", "0", $texto)."</h3>";

	if ($prefijo != null) {
		$aux = strpos($texto, $prefijo);
		if ($aux === 0) {
			echo "<h3>El prefijo coincide con el nombre.</h3>";
		} else {
			echo "<h3>El prefijo NO coincide con el nombre.</h3>";
		}
	} else {
		printf("Prefijo no encontrado");
	}

	$total = substr_count(strtoupper($texto), "A");

	echo "<h3>Cantidad de letras A: ".$total."</h3>";

	if (($aux = (stripos($texto, "A"))) !== false) {
		echo "<h3>La primera letra A esta en la posición: ".($aux + 1)."</h3>";
	} else {
		echo "<h3>No hay letras A</h3>";
	}
	
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