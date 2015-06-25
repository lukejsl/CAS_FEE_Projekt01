/*
 Allgemeine Informationen zum Projekt
 Um die Grundlagen bewerten zu k�nnen, sind gr�ssere �Frameworks" wie Bootstrap nicht erlaubt.
 �ltere Browser m�ssen nicht unterst�tzt werden. Flex-Layout darf verwendet werden.
 Das erste Projekt sollte keine Single Page Application sein. Wird aber nicht explizit �verboten"

 Informationen zur Projektabgabe
 Abgabe des Projektes bis 28 Juni.
 Mit Begr�ndung bis 05 Juli m�glich.
 Erstellen eines �Branch" mit dem Namen �Abgabe".
 E-Mail erstellen mit folgendem Inhalt:
 Header: [CAS FEE] Abgabe {{Gruppennummer}}
 Link zum Branch
 Ein ReadMe auf GitHub, falls dieses notwendig ist.

 Folgende Kriterien bilden die Basis f�r die Endabgabe (leichte �nderungen noch m�glich):

 Funktionsumfang
 Editieren und erfassen von Notizen
 Sortieren von Notizen
 Filtern von �abgeschlossenen" Notizen
 Abspeichern der Daten auf dem Server
 Wechseln des Styles
 Besonders n�tzliche Zusatz-�Features"

 JavaScript Qualit�t
 Kein Copy & Paste Code
 �this" richtig verwendet
 Keine globalen Variablen
 jQuery Best Practices verwendet.
 Kein JavaScript im HTML
 Besonders sch�ne Konstrukte
 Besonders schlechte Konstrukte

 HTML / CSS Qualit�t
 Keine (wenige) Inline Styles verwendet
 �bersichtliche CSS-Files
 Komplexit�t des HTML Layouts.
 Verwenden einer Template Engine zum Erstellen der *dynamischen" Daten

 Sonstiges
 Projektstruktur
 JavaScript Errors
 */

var noteStorage = (function () {
    "use strict";

    var Notes = [];

    // Note Prototype
    var noteEntry = function (entry) {
        this.id = entry.id || 0;
        this.title = entry.title;
        this.finished = null;
        this.dateCreated = new Date();
        this.dateFinished = entry.dateFinished;
        this.grade = entry.grade || 1;
        this.content = entry.content || '';
        return this;
    };

    // Initialisieren der Notes
    function initNote() {
        /** create note session */
        var notes = localStorage.getItem("notes");
        /** if notes does not exists, create new notes */
        if (!notes) {
            localStorage.setItem("notes", JSON.stringify([]));
            notes = localStorage.getItem("notes");
        }
        /** notes string in array umwandeln */
        Notes = JSON.parse(notes);
    }

    // Neuen Notes Eintrag generieren
    function addNewNote(entry) {
        /** Constructor */
        Notes.push(new noteEntry(entry));
        /** Save Notes in localStorage */
        localStorage.setItem("notes", JSON.stringify(Notes));
    }

    // Gibt Notes zur�ck
    function getNotes() {
        //return JSON.parse(localStorage.getItem("notes"));
        return Notes;
    }

    // Gibt Eintrag aus Notes zur�ck
    function getNoteById(id) {
        var notes = localStorage.getItem("notes");
        if (notes[id]) {
            return notes[id];
        } else {
            return {};
        }
    }

    // L�scht alle Notes
    function clearAllNotes() {
        Notes = [];
        localStorage.setItem("notes", JSON.stringify(Notes));
    }

    // L�scht einzelnen Eintrag in Notes
    function clearNoteById(id) {
        Notes.splice(id, 1);
        localStorage.setItem("notes", JSON.stringify(Notes));
    }

    // Sortiert Notes nach
    function sortNotes(by) {
        if (by[0] === '-') {
            by[0] = '';
            Notes = _.sortBy(Notes, by).reverse();
        } else {
            Notes = _.sortBy(Notes, by);
        }
    }

    return {
        addNote: addNewNote,
        notes: getNotes,
        getNote: getNoteById,
        clear: clearAllNotes,
        clearNote: clearNoteById,
        init: initNote,
        sort: sortNotes
    };

}());


;
(function ($, window, document, undefined) {

    "use strict";

    noteStorage.init();
    var title = '-title';
    var dateFinished = '-dateFinished';

    $(function () {
        // AddNote
        $("#btnAddNote").on("click",
            function() {
                $("#inputNote").slideToggle();
            }
        );
        // changeStyle
        $('#stylePicker').change(function() {
            if ($(this).find(':selected').val() === '2') {
                $(".nav").addClass("navModern");
                $("button").addClass("navModern");
            } else {
                $(".nav").removeClass("navModern");
                $("button").removeClass("navModern");
            }
        });


        $("#saveNote").on("click",
            function () {
                var entry = {},
                    save = true;
                if ($("#title").val()) {
                    entry.title = $("#title").val();
                } else {
                    alert("Du hast den Titel vergessen ;)");
                    save = false;
                }
                entry.content = $("#content").val();
                entry.grade = $("#grade").val();
                entry.dateFinished = $("#datepicker").val();
                if (save === true) {
                    noteStorage.addNote(entry);
                    window.location.replace("index.html");
                }
                showNotes();
            }
        );

        $("#clearNotes").on("click",
            function () {
                noteStorage.clear();
                showNotes();
            }
        );

        $("#sortNotesTitle").on("click",
            function () {
                if (title === 'title') {
                    title = '-title';
                } else {
                    title = 'title';
                }
                noteStorage.sort(title);
                showNotes();
            }
        );

        $("#sortNotesFinish").on("click",
            function () {
                if (dateFinished === 'dateFinished') {
                    dateFinished = '-dateFinished';
                } else {
                    dateFinished = 'dateFinished';
                }
                noteStorage.sort(dateFinished);
                showNotes();
            }
        );

        $("#datepicker").datepicker({dateFormat: 'dd-mm-yy'});

        /*Handlebars.registerHelper("makeDate", function(timestamp) {
         return (new Date(timestamp)).format("dd-MM-yyyy");
         });*/

        function showNotes() {

            var source = $("#n13-handlebar-template").html();
            var template = Handlebars.compile(source);
            var data = noteStorage.notes();
            var notes = [];

            data.forEach(function (entry) {
                notes.push(entry);
            });

            $('#note-list').remove();
            $('#outputNotes').append(template(notes), {id: "#newNote"});
        }

        showNotes();

        $("#n13postit").fadeIn(3000, function () {
        });
        $("#n13postit_2").fadeIn(6000, function () {
        });
    });

})(jQuery, window, document);




