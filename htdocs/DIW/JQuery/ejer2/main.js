'use strict';

$(function () {
	$('#new').on('click', function () {
		if ($('#content').val()) {
			$('#list').append('<li class="list-group-item">' + $('#content').val() + '</li>');
			if ($('#list li').length % 2 !== 0 && $('#colorear').text() === "Descolorear") {
				$('#list li').last().addClass('bg-secondary').addClass('text-white');
			}
		}
	});
	$('#deleteLast').on('click', function () {
		$('#list li').last().remove();
	});
	$('#deleteAll').on('click', function () {
		$('#list li').remove();
	});
	$('#colorear').on('click', function () {
		$('#list li').filter(':even').toggleClass('bg-secondary').toggleClass('text-white');
		$('#colorear').text((($('#colorear').text() === "Colorear") ? 'Descolorear' : 'Colorear'));
	});
});