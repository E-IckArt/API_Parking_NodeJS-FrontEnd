// Code d'import de jsdom et jquery après 'npm install' des deux
// Source : https://www.npmjs.com/package/jquery

// const { JSDOM } = require('jsdom');
// const { window } = new JSDOM('');
// const $ = require('jquery')(window);

// Fonction de recherche des réservations et des parkings à l'aide de la barre de recherche
$(document).ready(function () {
    $('#searchInput').on('keyup', function () {
        let value = $(this).val().toLowerCase();
        $('#tbody tr').filter(function () {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
        });
    });
});
