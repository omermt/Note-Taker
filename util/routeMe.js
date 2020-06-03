module.exports = (app, passport) =>{

  const indexRouter = require('../routes/index');
  const logInRouter = require('../routes/login')(passport, app);
  const signupRouter = require('../routes/signup')(passport);
  const homeRouter = require('../routes/home');
  const profileRouter = require('../routes/profile');
  const noteEditRouter = require('../routes/noteEdit');
  const notePreviewRouter = require('../routes/note_preview');
  const logoutRouter = require('../routes/logout');
  const debug = require('debug')("routerModule");

  //As a full middleware function
  const isLoggedIn = function(req, res, next){
    debug("Request object:", req.user);
    if(req.user){
      debug("User Authenticated");
      return next();
    }
    debug("User not Authenticated");
    res.redirect('/login');
  }

  app.use('/', indexRouter)
  app.use('/login', logInRouter);
  app.use('/signup', signupRouter);
  app.use('/notes', isLoggedIn, homeRouter);
  app.use('/note', isLoggedIn, noteEditRouter);
  app.use('/profile', isLoggedIn, profileRouter);
  app.use('/note-view', isLoggedIn, notePreviewRouter);
  app.use('/logout', logoutRouter);
};
