/**
 * Created by rene.ulrich on 22.06.2015.
 */

var note = require("../service/noteService.js");

module.exports.showIndex = function(req, res)
{
    note.getAll(function(err, notes) {
        //res.send(JSON.stringify(notes));
        res.render('showNotes', notes);
    });
};

module.exports.get = function(req, res)
{
    note.get(req.params.id, function(err, notes) {
        res.send(JSON.stringify(notes));
    });
};

module.exports.add = function(req, res)
{
    note.add(req.body, function(err, notes) {
        //res.send(JSON.stringify(notes));
        res.render('showNotes', notes);
    });
};


module.exports.getAll = function(req, res)
{
    note.getAll(function(err, notes) {
        //res.send(JSON.stringify(notes));
        res.render('showNotes', notes);
    });
};

module.exports.sort = function(req, res)
{
    note.sort(req.body, function(err, notes) {
        //res.send(JSON.stringify(notes));
        res.render('showNotes', notes);
    });
};


module.exports.finished = function(req, res)
{
    note.finished(req.body, function(err, notes) {
        //res.send(JSON.stringify(notes));
        res.render('showNotes', notes);
    });
};