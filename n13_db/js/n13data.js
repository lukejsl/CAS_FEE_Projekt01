/**
 * Created by Lukejsl on 04.06.2015.
 */

;
(function ($, window, document, undefined ) {

    /*$("#toggleAddNote").on("click", function () {
        $('#addNote').toggle( 200 );
    });

    $("#saveNote").on("click", function () {
        $('#addNote').hide( 200 );
    });

    $( "#datepicker" ).datepicker({dateFormat: 'yy-mm-dd'});

    $.ajax({
        dataType:  "json",
        method: "GET",
        url: "/notes/"
    }).done(function( data, err ) {
        var source = $("#n13-handlebar-template").html();
        var template = Handlebars.compile(source);
        var html = template(data);

        $('#note-list').remove();
        $('body').append(html, {id: "#newNote"});
    });*/

})(jQuery, window, document);

// Animation on load
$( document ).ready(function() {

    $("#toggleAddNote").on("click", function () {
        $('#addNote').toggle( 200 );
    });

    $("#saveNote").on("click", function () {
        $('#addNote').hide( 200 );
    });

    $( "#datepicker" ).datepicker({dateFormat: 'yy-mm-dd'});

    $.ajax({
        dataType:  "json",
        method: "GET",
        url: "/notes/"
    }).done(function( data, err ) {
        var source = $("#n13-handlebar-template").html();
        var template = Handlebars.compile(source);
        var html = template(data);

        $('#note-list').remove();
        $('body').append(html, {id: "#newNote"});
    });

    $( "#n13postit" ).fadeIn( 3000, function() {
    });
    $( "#n13postit_2" ).fadeIn( 6000, function() {
    });
});