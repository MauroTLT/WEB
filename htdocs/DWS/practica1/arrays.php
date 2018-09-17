<?php
pintarCabecera();
pintarCuerpo();
pintarFooter();


function pintarCuerpo(){
	?>
	<h1>EJERCICIO 2 - ARRAYS</h1>
	<p><?php parte1();?></p>
	<br><br><br>
	<?php
}

function parte1(){
	$noms = ['Eustaquio','Manolox','Topo','Mauro','Penkkles', 'Papi'];
	echo "<h3>Numero de Elementos: ".count($noms)."</h3>";

	echo "<h3>Nombres: ".implode(" ", $noms)."</h3>";

	$nomsOrd = $noms;
	asort($nomsOrd);

	echo "<h3>Array ordenado: ".implode(" ", $nomsOrd)."</h3>";
	
	$nomsRev = $noms;
	array_reverse($nomsRev);

	echo "<h3>Array invertido: ".implode(" ", array_reverse($noms))."</h3>";

	echo "<h3>Mauro está en la posición: ".array_search("Mauro", $noms)."</h3>";

	$matriz = crearTabla($noms);

	echo "<br>".implode(", ", array_column($matriz, 1));

	$nums = [22,8,17,254,666,89,5,88,777,14];

	echo "<br><br><h3>Suma de valores del Array: ".array_sum($nums)."</h3>";
	echo implode(", ", $nums);
}

function crearTabla(){
	$array = [
		['12345678R','Eustaquio','88'],
		['87654321W','Manolox','43'],
		['12563478R','Topo','7'],
		['87436521W','Mauro','19'],
		['12785634R','Eustaquio','88'],
		['89213465W','Penkkles','20'],
		['12785634R','Papi','36']
	];
	echo "<br><br>";
	echo "<table border='1'>";
	echo "<tr>";
	echo "<th>DNI</th>";
	echo "<th>Nombre</th>";
	echo "<th>Edad</th>";
	echo "</tr>";
	for ($i=0; $i < count($array); $i++) { 
		echo "<tr>";
		for ($j=0; $j < count($array[$i]); $j++) { 
			echo "<td>".$array[$i][$j]."</td>";
		}
		echo "</tr>";
	}
	echo "</table>";

	return $array;
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