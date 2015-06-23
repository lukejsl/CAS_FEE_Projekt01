/**
 * Created by Lukejsl on 04.06.2015.
 */
//Data
$(function(){

    $("#toggleAddNote").on("click", function () {
        $('#addNote').toggle( 200 );
    });

    $("#saveNote").on("click", function () {
        $('#addNote').hide( 200 );
    });

    $( "#datepicker" ).datepicker({dateFormat: 'yy-mm-dd'});

});

// Animation on load
$( document ).ready(function() {
    $( "#n13postit" ).fadeIn( 3000, function() {
    });
    $( "#n13postit_2" ).fadeIn( 6000, function() {
    });
});