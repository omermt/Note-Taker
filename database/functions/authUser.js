const UserDB = require('../models/index').User;
const debug = require('debug')('authUser');
module.exports = {

  /*
    This function will verify is the given username is in the db
    return true if exist, false otherwise
  */
  isValidUser: async function (username) {
    const user = await UserDB.findOne({where: {user_name:username}});
    if (user){
      debug("User found", user);
      return user;
    }

    return false;
  },

  /*
  This will check the password, it's a weak process
  */
  isValidPassword: async function (user, password) {
    if(user.password == password){
      return user;
    }
    return false;
  },

  notesTaken: async (user) =>{
     return await user.getNotes()
     //getNotes return an array like object
  },

  UserDB: UserDB,

  updateUser: async (req, user) =>{
    if(user.password == req.body.password){
      if(req.body.password2){
        user.update({
          password: req.body.password2,
          email: req.body.email
        });
      }else{
        user.update({
          email: req.body.email
        });
      }
    }else{
      throw new Error("Invalid Password");
    }
  }
};
