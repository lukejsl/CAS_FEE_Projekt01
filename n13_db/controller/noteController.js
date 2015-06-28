/**
  Gruppe 13 | n13
 */

var note = require("../service/noteService.js");
var path = require( 'path' );

module.exports.showIndex = function(req, res)
{
    note.getAll(function(err, notes) {
        // sendFile funktioniert nicht ?
        res.sendfile('./views/index.html');
    });
};

module.exports.get = function(req, res)
{
    note.get(req.params.id, function(err, notes) {
        res.send(JSON.stringify(notes));
    });
};


module.exports.remove = function(req, res)
{
    note.remove(req.params.id, function(err, notes) {
        res.send(JSON.stringify(notes));
    });
};

module.exports.add = function(req, res)
{
    note.add(req.body, function(err, notes) {
        res.send(JSON.stringify(notes));
    });
};


module.exports.getAll = function(req, res)
{
    note.getAll(function(err, notes) {
        res.send(JSON.stringify(notes));
    });
};

module.exports.sort = function(req, res)
{
    note.sort(req.body, function(err, notes) {
        res.send(JSON.stringify(notes));
    });
};


module.exports.finished = function(req, res)
{
    note.finished(req.body, function(err, notes) {
        res.send(JSON.stringify(notes));
    });
};
