'use-strict';
$(document).ready(function () {
    $(".hamburger").click(function () {
        $(this).toggleClass("is-active");
        $("#navAside li.menu").toggleClass("is-active");
    });
});