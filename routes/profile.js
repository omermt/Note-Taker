var express = require('express');
var router = express.Router();
const {updateUser, notesTaken} = require('../database/functions/authUser');

  /* GET home page. */
router.get('/', function(req, res, next) {
  notesTaken(req.user).then(notesTaken =>{
    res.render('profile.hbs', {
      title: 'Profile | Note Taker',
      user: req.user,
      authenticated: true, //if not redirected, must be auth
      notesTaken: notesTaken.length
    });
  }).catch(err =>{
    next(err);
  })
});

router.post('/', (req, res, next) =>{
  updateUser(req, req.user).then(() =>{
    res.redirect('/profile')
  }).catch(err =>{
    next(err);
  });
});

module.exports = router;
