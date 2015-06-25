/**
 * Created by Lukejsl on 04.06.2015.
 */


$( document ).ready(function() {
    var sortNotesFinished = new SortDir;
    var sortNotesTitle = new SortDir;

    // Speichert die Richtung der Array Sortierung
    function SortDir () {
        var dir = -1;
        function direction(){
            dir = dir*-1;
            return dir;
        }
        return {
            dir: direction
        }
    }

    // Sucht id in Array und gibt diese zurück, ansonsten null
    function getId(array, id) {
        for (var i = 0, len = array.length; i < len; i++) {
            if (Number(array[i].id) === id) {
                return array[i];
            }
        }
        return null; //nothing found
    }

    // Ajax methode für zugriff auf REST
    function ajax (method, url, data, callback) {
        $.ajax({
            dataType:  "json",
            method: method,
            url: url,
            data: data
        }).done(function( data, err ) {
            if ( typeof(callback) === "function" ) {
                callback(data);
            }
        });
    }

    // Rendern des Notes array mit handlebars Template
    function renderNotes (data) {
        var source = $("#n13-handlebar-template").html();
        var template = Handlebars.compile(source);
        var html = template(data);

        $('#note-list').remove();
        $('body').append(html, {id: "#newNote"});
    }

    // Rendern der Notes beim Seitenladen
    function renderNotesInit () {
        var sort = {};
        sort.by = "Created";
        sort.dir = -1;
        ajax("POST", "/sort/", sort, function (data) {
            renderNotes(data)
        });
    }

    // Dialog zum notes eingeben und speichern auf und zu fahren
    $("#toggleAddNote").on("click", function () {
        $('#addNote').toggle( 200 );
    });

    // Speichert Note unter einer freien id
    $("#saveNote").on("click", function () {
        var entry = {};
        entry.title = $('#title').val();
        entry.content = $('#content').val();
        entry.grade = $('#grade').val();
        entry.dateFinished = $('#datepicker').val();
        entry.id = 0;
        ajax("GET", "/notes/", null, function(data) {
            // Freie id suchen
            for (var i= 0; i<data.length; i++) {
                if (getId(data, i) === null){
                    entry.id = i;
                    break;
                }
                entry.id = data.length;
            }
            ajax("POST", "/notes/", entry, function (data) {
                renderNotes(data);
            });
        });
        $('#addNote').hide( 200 );
    });

    // Sortiert den Notes array nach end Datum
    $("#sortNotesFinish").on("click", function () {
        var sort = {};
        sort.by = "End Date";
        sort.dir = sortNotesFinished.dir();
        ajax("POST", "/sort/", sort, function (data) {
            renderNotes(data)
        });
    });

    // Sortiert den Notes array nach Title
    $("#sortNotesTitle").on("click", function () {
        var sort = {};
        sort.by = "Title";
        sort.dir = sortNotesTitle.dir();
        ajax("POST", "/sort/", sort, function (data) {
            renderNotes(data)
        });
    });

    // Löschen eines Eintrags
    $("#clearNotes").on("click", function () {
        ajax("DELETE", "/notes/:id", null, function (data) {
            renderNotes(data)
        });
    });

    // Anzeigen einer einzigen note
    $("#showNote").on("click", function () {
        ajax("GET", "/notes/7", null, function (data) {
            renderNotes([data])
        });
    });

    // Datepicker für datumseingabe bei der Notes Erstellung
    $( "#datepicker" ).datepicker({dateFormat: 'yy-mm-dd'});

    // Notes array rendern beim site load
    renderNotesInit();

    // Effekte
    $( "#n13postit" ).fadeIn( 3000, function() {
    });
    $( "#n13postit_2" ).fadeIn( 6000, function() {
    });
});
