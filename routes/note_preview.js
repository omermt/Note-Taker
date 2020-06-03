var express = require('express');
var router = express.Router();
const {fetchNotesByID} = require('../database/functions/noteHandler');
const showdown = require('showdown'), converter = new showdown.Converter();

  /* GET home page. */
router.get('/:number', function(req, res, next) {
  fetchNotesByID(req.params["number"]).then(note =>{
    res.render('noteView.hbs',{
      title: 'Edit Note | Note Taker',
      authenticated: true, //if not redirected, must be auth
      markdown: converter.makeHtml(note.body),
      noteTitle: note.title
    })

  }).catch(err =>{
    next(err);
  });
});

module.exports = router;
