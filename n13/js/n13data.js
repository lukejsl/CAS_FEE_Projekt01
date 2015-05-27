/**
 * Created by Lukejsl on 27.05.2015.
 */
function SortableTableCtrl() {
    var scope = this;

    // data
    scope.head = {
        a: "Finish Date",
        b: "Title",
        c: "Created Date",
        d: "Imp"
    };
    scope.body = [{
        a: "05-05-2015",
        b: "CAS FEE Selbststudium / Projekt Aufgabe erledigen",
        c: "Rapperswil",
        d: "1"
    }, {
        a: "06-05-2015",
        b: "Einkaufen Migros fuers Fest",
        c: "Rapperswil",
        d: "2"
    }, {
        a: "07-05-2015",
        b: "Snowboard-Weekend",
        c: "Obersaxen",
        d: "2"
    }, {
        a: "12-12-2015",
        b: "Mami anrufen",
        c: "Baden",
        d: "3"
    }, {
        a: "08-05-2015",
        b: "Konzert organisieren / Artists fixen",
        c: "Baden",
        d: "3"
    }];

    scope.sort = {
        column: 'a',
        descending: false
    };

    scope.selectedCls = function(column) {
        return column == scope.sort.column && 'sort-' + scope.sort.descending;
    };

    scope.changeSorting = function(column) {
        var sort = scope.sort;
        if (sort.column == column) {
            sort.descending = !sort.descending;
        } else {
            sort.column = column;
            sort.descending = false;
        }
    };
}

$( document ).ready(function() {
    $( "#n13postit" ).fadeIn( 3000, function() {
        // Animation complete
    });
    $( "#n13postit_2" ).fadeIn( 6000, function() {
        // Animation complete
    });
});

