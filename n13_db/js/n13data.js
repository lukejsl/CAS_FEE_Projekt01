/**
 Gruppe 13 | n13
 */


$( document ).ready(function() {
    $(function () {
        // AddNote open/close
        $("#btnAddNote").on("click", function () {
                $("#inputNote").slideToggle();
            }
        );
        // changeStyle
        $('#stylePicker').change(function () {
            if ($(this).find(':selected').val() === '2') {
                $(".nav").addClass("navModern");
                $("button").addClass("navModern");
                $(".board").removeClass("displayNone");
            } else {
                $(".nav").removeClass("navModern");
                $("button").removeClass("navModern");
                $(".board").addClass("displayNone");
            }
        });
    });

    // Variabeln Definition SortDir
    var sortNotesCreated = new SortDir;
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
        $('#outputNotes').append(html, {id: "#newNote"});
    }

    // Rendern der Notes beim Seitenladen
    function renderNotesInit () {
        var sort = {};
        sort.by = "Created";
        sort.dir = 1;
        ajax("POST", "/sort/", sort, function (data) {
            renderNotes(data)
        });
    }

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
        $('#inputNote').slideToggle( 300 );
        $('#statSaved').slideDown(800).delay(2000).slideUp(800);
    });

    // Editieren einer Note: Button wird nicht erkannt
    $(".btnEdit").on("click", function(){
        $("#inputNote").slideToggle();
    });

    // Sortiert die Notelist nach: Created
    $("#btnSortNotesCreated").on("click", function () {
        var sort = {};
        sort.by = "Created";
        sort.dir = sortNotesCreated.dir();
        ajax("POST", "/sort/", sort, function (data) {
            renderNotes(data);
        });
    });

    // Sortiert die Notelist nach: EndDate
    $("#btnSortNotesEndDate").on("click", function () {
        var sort = {};
        sort.by = "End Date";
        sort.dir = sortNotesFinished.dir();
        ajax("POST", "/sort/", sort, function (data) {
            renderNotes(data);
        });
    });

    //Sortiert die Notelist nach: Title
    $("#btnSortNotesTitle").on("click", function () {
        var sort = {};
        sort.by = "Title";
        sort.dir = sortNotesTitle.dir();
        ajax("POST", "/sort/", sort, function (data) {
            renderNotes(data);
        });
    });

    // Test loeschen einzelner Eintrag : Button wird nicht erkannt im Handlebar-Template!!
    $(".btnDelete").on("click", function() {
        alert('test');
        //var clickedId= $(this).attr("id");
        //alert(clickedId);
    });

    // Löschen aller Einträge
    $(".btnDeleteAll").on("click", function () {
        for (var i = 0; i <= 10; i++)
        {
           // var boxID = $(this).attr('id');
           // alert(boxID);
            $('#noteArticle-'+i).slideUp( 500 );
            ajax("DELETE", "/notes/"+i, null, function (data) {
                renderNotes(data);
            });
        }
        $('#statDeleted').slideDown(200).delay(3000).slideUp(200);
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
    $('#statInit').slideDown(200).delay(2000).slideUp(200);

});
