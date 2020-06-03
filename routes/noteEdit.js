var express = require('express');
var router = express.Router();
const {fetchNotesByID,
        createNewNote,
        updateNote,
        deleteNote } = require('../database/functions/noteHandler');

  /* GET home page. */
router.get('/', function(req, res, next) {
  var num = req.query.num;
  if (num){
    fetchNotesByID(num).then(note =>{
      res.render('noteEdit.hbs',{
        noteTitle: note.title,
        body: note.body,
        title: 'Edit Note | Note Taker',
        authenticated: true, //if not redirected, must be auth
        id: note.id,
        category: note.category
      });
    });
  }else{
    res.render('noteEdit.hbs',{
      title: 'Edit Note | Note Taker',
      authenticated: true, //if not redirected, must be auth
      id: num,
      category: req.query.cat
    });
  }
});

router.post('/new', function (req, res, next) {
  console.log("--------- id passed before created", req.body.id);
  createNewNote({
    title: req.body.title,
    body: req.body.body,
    category: req.body.cat,
    userID: req.user.id
  }).then((note)=>{
    console.log("The note created:", note);
    res.redirect("/notes");
  }).catch(err =>{
    next(err)
  });
});

router.post('/save', function (req, res, next) {
  updateNote({
    id: req.body.id,
    title: req.body.title,
    body: req.body.body,
    cat: req.body.cat
  }).then(()=>{
    res.redirect('/notes');
  }).catch(err =>{
    next(err)
  });
})

router.get('/delete', function (req, res, next){
  deleteNote(req.query.num).then(() =>{
    res.redirect('/notes');
  }).catch(err =>{
    next(err);
  });
})
module.exports = router;
