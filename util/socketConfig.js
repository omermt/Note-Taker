module.exports = (http) =>{
  const debug = require('debug')('socketConfig');
  const showdown = require('showdown'), converter = new showdown.Converter();
  const io = require('socket.io')(http); //Import and create a io tie to the server
  const {isValidUser, isValidPassword} = require('../database/functions/authUser.js');

  debug("Socket IO Configuration Starting...");

  io.on('connection', (socket) =>{
    debug("A new user has connected");
    //To render new markdown
    socket.on('Markdown Text', (body) =>{
      debug('Body of the Text File:', String(converter.makeHtml(body)));
      socket.emit('markdownPreview', String(converter.makeHtml(body)));
    });

    //To check if a username exist, for log in / sign up
    socket.on('username Exist', (username) =>{
      isValidUser(username).then(usernameExist =>{
          //socket.emit('username Exist Answer', usernameExist);
          if(usernameExist){
            socket.emit('username Exist Answer', true);
            //the username will be provided, if it exist, the
            //true will be sent
            //if the username is incorrect, return false
            debug("Username does exist");
          }else{
            socket.emit('username Exist Answer', false);
            debug("Username doesn't exist");
          }
      }).catch(err =>{
        socket.emit('username Exist Answer', false);
        //If any error, better not let the person log/sign
        debug("Error checking for username:", err);
      });
    });

    /*
    To make the code reusable, a single function is used only to,
    check if the user exist, that way, it can be used for log or sign
    if the user exist, procide, if not, cut the process to improve peformance
    */
    socket.on('check password', (data) =>{
      isValidUser(data.username).then(async (user) =>{
        var val = await isValidPassword(user, data.password);
        if (val) return socket.emit("check password answer", true);      
        return socket.emit("check password answer", false);
      }).catch(err =>{
        //If anythin bad happen, better not let the user log
        socket.emit("check password answer", false);
      });
    })
  });
}
