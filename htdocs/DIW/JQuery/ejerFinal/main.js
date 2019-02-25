'use strict';

const SERVER = 'http://localhost:3000/productos';

$(function () {
	$.getJSON(SERVER).done((data) => {
		$.each(data, (index, articulo) => {
			$('#escaparate').append(`
				<article id="${articulo.codigo}">
					<img src="${articulo.img}" alt="">
					<div class="datos-producto">
						<div class="borrar">x</div>
						<div class="nombre">${articulo.nombre}</div>
						<div class="precio">${articulo.precio}€</div>
						<ul class="colores">
							${articulo.colores.reduce((total, color)=> total += `<li style="background-color:rgb(${parseInt(color.substr(1, 2), 16)},${parseInt(color.substr(3, 2), 16)},${parseInt(color.substr(5, 2), 16)});"></li>`, '')}
						</ul>
					</div>
				</article>`
			);
		});

		$('.borrar').click((event) => {
			if (confirm('¿Seguro que deseas borrar el producto?')) {
				$(event.target).parent().parent().remove();
				/*
				 * La llamada al ajax no funciona ya que el atributo id no existe
				 * y aunque busque por codigo no lo encuentra aunque el GET si que lo hace 
				 *
				$.ajax({
				    url: (SERVER + '?codigo='+$(event.target).parent().parent().attr('id')), type: 'DELETE',
				}).then(function (response) {
					$(event.target).parent().parent().remove();
				}, function (response) {
					console.log("Ha ocurrido un error al borrar el articulo");
				});
				*/
			}
		});
	});
});