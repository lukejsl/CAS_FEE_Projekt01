/**
 Gruppe 13 | n13
 */

var express = require('express');
var router = express.Router();
var notes = require('../controller/noteController.js');

router.get("/", notes.showIndex);
router.get("/notes", notes.getAll);
router.post("/notes", notes.add);
router.get("/notes/:id", notes.get);
router.delete("/notes/:id", notes.remove);
router.post("/sort", notes.sort);
router.post("/finished", notes.finished);

module.exports = router;
