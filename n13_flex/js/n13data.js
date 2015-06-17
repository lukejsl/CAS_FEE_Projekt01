/**
 * Created by Lukejsl on 04.06.2015.
 */
//Data
$(function(){
    var notesData = [
        {id:"03", title:"03", finished:"checked", dateCreated:"01.01.2015", dateFinished:"20.07.2015", grade:"5", content:"Butter, Eier bio, Rahm, Speck, Parmesan, Milch, Kopfsalat, Radischen"},
        {id:"02", title:"02 lernen", finished:"", dateCreated:"01.01.2015", dateFinished:"20.07.2015", grade:"5", content:"Butter, Eier bio, Rahm, Speck, Parmesan, Milch, Kopfsalat, Radischen"},
        {id:"01", title:"01 lernen", finished:"checked", dateCreated:"01.01.2015", dateFinished:"20.07.2015", grade:"5", content:"Butter, Eier bio, Rahm, Speck, Parmesan, Milch, Kopfsalat, Radischen"},
        {id:"04", title:"04 lernen", finished:"", dateCreated:"01.01.2015", dateFinished:"20.07.2015", grade:"5", content:"Butter, Eier bio, Rahm, Speck, Parmesan, Milch, Kopfsalat, Radischen"},
        {id:"05", title:"05 lernen", finished:"", dateCreated:"01.01.2015", dateFinished:"20.07.2015", grade:"5", content:"Butter, Eier bio, Rahm, Speck, Parmesan, Milch, Kopfsalat, Radischen"}
    ];

//Sort Numeric
    function compareNotes(s1, s2) {
        return s1.id - s2.id;
    }

//Get HTML from the n13-handlebar-template (im script-tag)
    var theTemplateScript = $("#n13-handlebar-template").html();
//Compile Template
    var theTemplate = Handlebars.compile (theTemplateScript);
//Append the resulting HTML
    $("#outputNotes").append(theTemplate(notesData));
    function renderNotes(){
        $("#outputNotes").html(theTemplate(notesData.sort(compareNotes)));
    }
    $( "#title" ).on("click", function() {
        renderNotes();
    });
});

// Animation on load
$( document ).ready(function() {
    $( "#n13postit" ).fadeIn( 3000, function() {
    });
    $( "#n13postit_2" ).fadeIn( 6000, function() {
    });
});