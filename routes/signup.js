var express = require('express');
var router = express.Router();
const debug = require('debug')('express:signup');

module.exports = function (passport){
  /* GET home page. */
  router.get('/', function(req, res, next) {
    res.render("signup.hbs", {
      title: "Sign Up | Note Taker"
    });
  });

  router.post('/', (req, res, next) =>{
    debug("Creadentials Passed:", req.body);
    passport.authenticate('signup', function(error, user, info){
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
        res.redirect("/signup");
      }
    })(req, res);
  });

  return router;
};
