const NoteDB = require('../models/index').Note;
const debug = require('debug')('dbNoteFunction');
module.exports = {

  /*
    This function will verify is the given username is in the db
    return true if exist, false otherwise
  */
  fetchNotesByUserCat: async function (user){
    return {
      important: await user.getNotes({ where: {category: 'important'} }),
      extra: await user.getNotes({ where: {category: 'extra'} }),
      work: await user.getNotes({ where: {category: 'work'} }),
      todo: await user.getNotes({ where: {category: 'todo'} }),
      unclassified: await user.getNotes({ where: {category: 'unclassified'} })
    }
    //return array of notes, add a where: to filter by cat
  },

  /*
  This will check the password, it's a weak process
  */
  fetchNotesByID: async function (id) {
    return await NoteDB.findOne({
      where: {id: id }
    });
  },

  /*
    Create a new Note with the database
  */
  createNewNote: async function (obj) {
    return await NoteDB.create({
      title: obj.title,
      body: obj.body,
      category: obj.category,
      UserId: obj.userID
    })
  },

  updateNote: async function (obj){
    await NoteDB.findOne({
      where: {id: obj.id }
    }).then(note =>{
      note.update({
        title: obj.title,
        body: obj.body,
        category: obj.cat
      })
    })
  },

  deleteNote: async function(id){
    await NoteDB.findOne({
      where: {id: id }
    }).then(note =>{
      note.destroy();
    });
  },

  NoteDB: NoteDB
};
