<?php

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

function alert($text){
	echo "<script>alert('".$text."');</script>";
}

function recargaPagina($page){
	echo "<script>window.location='".$page."'</script>";
}

?>