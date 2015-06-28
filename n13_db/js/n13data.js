/**
 Gruppe 13 | n13
 */

;(function ($, window, document, undefined) {

    "use strict";

    // Variabeln Definition SortDir
    var sortNotesCreated = new SortDir;
    var sortNotesFinished = new SortDir;
    var sortNotesTitle = new SortDir;
    var sortNotesGrade = new SortDir;

    // Speichert die Richtung der Array Sortierung
    function SortDir() {
        var dir = -1;

        function direction() {
            dir = dir * -1;
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
    function ajax(method, url, data, callback) {
        $.ajax({
            dataType: "json",
            method: method,
            url: url,
            data: data
        }).done(function (data, err) {
            if (typeof(callback) === "function") {
                callback(data);
            }
        });
    }

    // Rendern des Notes array mit handlebars Template
    function renderNotes(data) {
        var source = $("#n13-handlebar-template").html();
        var template = Handlebars.compile(source);
        var html = template(data);

        $('#note-list').remove();
        $('#outputNotes').append(html, {id: "#newNote"});
    }

    // Rendern des Input formulars mit handlebars Template
    function renderInput(data) {
        var source = $("#n13-handlebar-template-input").html();
        var template = Handlebars.compile(source);
        var html = template(data);

        $('#input-field').remove();
        $('#inputNote').append(html, {id: "#newNote"});
        // Datepicker für datumseingabe bei der Notes Erstellung
        $("#datepicker").datepicker({dateFormat: 'yy-mm-dd'});
    }

    // Rendern der Notes beim Seitenladen
    function renderNotesInit() {
        sortNotes("Created", 1);
    }

    function sortNotes(by, dir) {
        var sort = {};
        sort.by = by;
        sort.dir = dir;
        ajax("POST", "/sort/", sort, function (data) {
            renderNotes(data)
        });
    }

    // Speichert Note unter einer freien id, muss auf document level geschehen, da sonst aus
    // dem Handlebars Template kein Event erzeugt wird
    $(document).on('click', '#saveNote', function () {
        var entry = {};
        entry.title = $('#title-New').val();
        entry.content = $('#content').val();
        entry.grade = $('#grade').val();
        entry.dateFinished = $('#datepicker').val();
        if ($('#check:checked').val() === undefined) {
            entry.finished = "";
        } else {
            entry.finished = "checked";
        }
        entry.id = 0;
        ajax("GET", "/notes/", null, function (data) {
            // Freie id suchen
            for (var i = 0; i < data.length; i++) {
                if (getId(data, i) === null) {
                    entry.id = i;
                    break;
                }
                entry.id = data.length;
            }
            ajax("POST", "/notes/", entry, function (data) {
                renderNotes(data);
            });
        });
        $('#inputNote').slideToggle(300);
        $('#statSaved').slideDown(800).delay(2000).slideUp(800);
    });

    // Speichern einer editierten Note, muss auf document level geschehen, da sonst aus
    // dem Handlebars Template kein Event erzeugt wird
    $(document).on('click', '#saveNoteEdit', function () {
        var noteId = $(this).attr("value");
        ajax("DELETE", "/notes/" + noteId, null, function () {
            var entry = {};
            entry.title = $('#title-' + noteId).val();
            entry.content = $('#content').val();
            entry.grade = $('#grade').val();
            entry.dateFinished = $('#datepicker').val();
            if ($('#check:checked').val() === undefined) {
                entry.finished = "";
            } else {
                entry.finished = "checked";
            }
            entry.id = noteId;
            ajax("POST", "/notes/", entry, function (data) {
                renderNotes(data);
            });
            $('#inputNote').slideToggle(300);
            $('#statSaved').slideDown(800).delay(2000).slideUp(800);
        });
    });

    // Input formular schliessen
    $(document).on('click', '#cancel', function () {
            $("#inputNote").slideToggle();
            renderInput([{
                title: "",
                content: "",
                grade1: "selected",
                dateFinished: "",
                finished: "",
                saveNoteId: "saveNote",
                id: "New"
            }]);
            ajax("GET", "/notes/", null, function (data) {
                renderNotes(data);
            });
        }
    );

    // Sortiert die Notelist nach: Created
    $("#btnSortNotesCreated").on("click", function () {
        sortNotes("Created", sortNotesCreated.dir());
    });

    // Sortiert die Notelist nach: EndDate
    $("#btnSortNotesEndDate").on("click", function () {
        sortNotes("End Date", sortNotesFinished.dir());
    });

    //Sortiert die Notelist nach: Title
    $("#btnSortNotesTitle").on("click", function () {
        sortNotes("Title", sortNotesTitle.dir());
    });

    //Sortiert die Notelist nach: Grade
    $("#btnSortNotesGrade").on("click", function () {
        sortNotes("Grade", sortNotesGrade.dir());
    });

    //Sortiert die Notelist nach: Finished
    //Sortiert die Notelist nach: Grade
    $("#btnSortNotesFinish").on("click", function () {
        sortNotes("Finished", sortNotesGrade.dir());
    });

    // Delete einer Note, muss auf document level geschehen, da sonst aus
    // dem Handlebars Template kein Event erzeugt wird
    $(document).on('click', '.btnDelete', function () {
        var noteId = $(this).attr("id").slice(7);
        $('#noteArticle-' + noteId).slideUp(300, function () {
            ajax("DELETE", "/notes/" + noteId, null, function () {
                ajax("GET", "/notes/", null, function (data) {
                    renderNotes(data);
                });
            });
        });
    });

    // Bearbeiten einer Note, muss auf document level geschehen, da sonst aus
    // dem Handlebars Template kein Event erzeugt wird
    $(document).on('click', '.btnEdit', function () {
        var noteId = $(this).attr("id").slice(8);
        ajax("GET", "/notes/" + noteId, null, function (data) {
            renderNotes([data]);
            switch (Number(data.grade)) {
                case 1:
                    data.grade1 = "selected";
                    break;
                case 2:
                    data.grade2 = "selected";
                    break;
                case 3:
                    data.grade3 = "selected";
                    break;
                case 4:
                    data.grade4 = "selected";
                    break;
                case 5:
                    data.grade5 = "selected";
                    break;
            }
            data.saveNoteId = "saveNoteEdit";
            renderInput([data]);
        });
        $("#inputNote").toggle();
    });

    // Löschen aller Einträge
    $(".btnDeleteAll").on("click", function () {
        ajax("GET", "/notes/", null, function (data) {
            data.forEach(function (element) {
                $('#noteArticle-' + element.id).slideUp(100, function () {
                    ajax("DELETE", "/notes/" + element.id, null, function (data) {
                        renderNotes(data);
                    });
                });
            });
        });
        $('#statDeleted').slideDown(200).delay(3000).slideUp(200);
    });

    // AddNote open/close
    $("#btnAddNote").on("click", function () {
            $("#inputNote").slideToggle();
            renderInput([{
                title: "",
                content: "",
                grade1: "selected",
                dateFinished: "",
                finished: "",
                saveNoteId: "saveNote",
                id: "New"
            }]);
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

    // Render Notes input form:
    renderInput([{
        title: "",
        content: "",
        grade1: "selected",
        dateFinished: "",
        finished: "",
        saveNoteId: "saveNote",
        id: "New"
    }]);
    // Notes array rendern beim site load
    renderNotesInit();
    $('#statInit').slideDown(200).delay(2000).slideUp(200);

})($, window, document, undefined);
