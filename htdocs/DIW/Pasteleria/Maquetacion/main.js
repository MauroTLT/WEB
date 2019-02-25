'use-strict';

$(document).ready(function () {
    $("#hamburger").click(function () {
        $(this).toggleClass("is-active");
        $("#navAside li.menu").toggleClass("is-active");
    });
    $('main img:not(main #fotos .linea a div img):not(img.icono)').click(function (e) {
        var image_href = $(this).attr("src");
        if ($('#foco-img').length > 0) {
            $('#content').html('<img src="' + image_href + '" />');
            $('#barraNav').css("z-index", 0);
            $('#foco-img').show();
        } else {
            var focoImg =
                '<div id="foco-img">' +
                '<p>Haz clic para cerrar</p>' +
                '<div id="content">' + //insert clicked link's href into img src
                '<img src="' + image_href + '" />' +
                '</div>' +
                '</div>';
            $('body').append(focoImg);
            $('#barraNav').css("z-index", 0);
            $('#foco-img').hide();
            $('#foco-img').show();
        }
    });
    $('body').on('click', '#foco-img', function () {
        $('#foco-img').hide();
        $('#barraNav').css("z-index", 10);
    });
});