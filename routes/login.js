var express = require('express');
var router = express.Router();
const debug = require('debug')('express:login');

module.exports = function (passport, app){
  /* GET home page. */
  router.get('/', function(req, res, next) {
    res.render('login.hbs', {
      title: "Log In | Note Taker",
      authenticated: req.isAuthenticated()
    });
  });

  router.post('/', function (req, res, next) {
    debug("Creadentials Passed:", req.body);
    passport.authenticate('login', function(error, user, info){
      debug("Error", error);
      debug("User", user);
      debug("Info", info);

      if(!(error || info) && user){
        //Auth correctly done
        req.logIn(user, (err) =>{
          //Because using a callback function, the loin must be done manually
          if (err){
            return next(err);
          }
          res.redirect("/notes");
        });
      }else{
        //Some tipe of error
        res.redirect("/login");
      }
    })(req, res);
  });

  return router;
};
