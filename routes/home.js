var express = require('express');
var router = express.Router();
const {fetchNotesByUserCat} = require('../database/functions/noteHandler');

  /* GET home page. */
router.get('/', function(req, res, next) {
  fetchNotesByUserCat(req.user).then(notes =>{
    res.render('note_list.hbs', {
      title: "Home Page | Note Taker",
      authenticated: true,
      important: notes.important,
      extra: notes.extra,
      work: notes.work,
      todo: notes.todo,
      unclassified: notes.unclassified
    });
  });
});

module.exports = router;
