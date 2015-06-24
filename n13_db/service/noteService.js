/**
 * Created by rene.ulrich on 22.06.2015.
 */

var Datastore = require('nedb');
var db = new Datastore({filename: './data/notes.db', autoload: true});
var dirTitle = new SortDir;
var dirGrade = new SortDir;
var dirFinished = new SortDir;
var dirCreated = new SortDir;
var dirEndDate = new SortDir;

function Note(entry) {
    this.id = entry.id || 0;
    this.title = entry.title;
    this.finished = "";
    this.dateCreated = new Date().toISOString().slice(0, 10);
    this.dateFinished = entry.dateFinished;
    this.grade = entry.grade || 1;
    this.content = entry.content || '';
}

function addNote(entry, callback) {
    var data = new Note(entry);
    db.insert(data, function (err, newDoc) {
        db.find({}, function (err, docs) {
            db.find({}).sort({dateFinished: 1}).exec(function (err, docs){
                if (callback) {
                    callback(err, docs);
                }
            });
        });
    });
}

function removeNote(id, callback) {
    db.update({_id: id}, {$set: {"state": "DELETED"}}, {}, function (err, doc) {
        publicGet(id, callback);
    });
}

function getNote(id, callback) {
    db.findOne({_id: id}, function (err, doc) {
        callback(err, doc);
    });
}

function getAllNotes(callback) {
    db.find({}, function (err, docs) {
        callback(err, docs);
    });
}

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

function sort(idx, callback) {
    var element = {};
    switch (idx.sort) {
        case 'End Date':
            element = {dateFinished: dirEndDate.dir()}; break;
        case 'Created':
            element = {dateCreated: dirCreated.dir()}; break;
        case 'Finished':
            element = {finished: dirFinished.dir()}; break;
        case 'Grade':
            element = {grade: dirGrade.dir()}; break;
        case 'Title':
        default:
            element = {title: dirTitle.dir()};
    }
    db.find({}).sort(element).exec(function (err, docs){
        if (callback) {
            callback(err, docs);
        }
    });
}

function finished(id, callback) {
    db.update({_id: id}, {$set: {"finished": "checked"}}, {}, function (err, docs) {
        if (callback) {
            callback(err, docs);
        }
    });
}

module.exports = {add: addNote, remove: removeNote, get: getNote, getAll: getAllNotes, sort: sort, finished: finished};
