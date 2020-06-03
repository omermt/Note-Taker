const db = require('../database/models/index'); //Import the db to check user data.
const LocalStrategy = require('passport-local').Strategy;
const debug = require('debug')('passport:config');
const {isValidUser,
      isValidPassword,
      UserDB} = require('../database/functions/authUser');

module.exports = (passport) =>{
  //Just pass the passport instance and this function will
  //configure it.

  passport.serializeUser(function(user, done) {
    debug("serializeUser methods called!");
    done(null, user.user_name);
    //This will store the username of the user
    //According to the database.
  });

  passport.deserializeUser(function(user_name, done) {
    debug("deserializeUser methods called!");
    isValidUser(user_name).then(user =>{
      done(null, user)
    }).catch(err =>{
      done(err, false);
    })
  });
  debug("Serialization methods created!");

  //Strategy for loging in
  passport.use('login', new LocalStrategy({
    passReqToCallback : true  //Pass the req var to the callback function
  },function(req, username, password, done) {
    debug('Log In Strategy Used!');

    isValidUser(username).then(async (user) =>{
      debug("User Returned:", user);
      //Wait until the isValidPassword return the user
      //then return it to the next then
      return await isValidPassword(user, password)
    }).then(user =>{
      return done(null, user);
    }).catch(err =>{
      //Any error will land here
      return done(err, false);
    })

  }));

  //Strategy for signing up
  passport.use('signup', new LocalStrategy({
    passReqToCallback : true
  },function(req, username, password, done) {
    debug('Sign Up Strategy Used!');
    debug("username:", username);
    debug("password", password);
    debug("reques body", req.body);

    /*
      Since this is async code, the middleware won't return untill the database
      action is done, thanks to the .then function
    */
    UserDB.create({
      user_name: username,
      password: password,
      email: req.email
    }).then( user =>{
      //If everithing ok, pass the user to the callback function is the
      //passport.authenticate
      return done(null, user);
    }).catch(err =>{
      //If something bad happenend when creating the user, pass
      //the err object to the callback function, and false as the user.
      done(err, false);
    });
  }));

}

//Pass the passport instance, with the serialization methods configured.
