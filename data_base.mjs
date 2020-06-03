import db from "./models/index"

var getNotes = async () =>{
  db.Note.create().then((note) => {
  //db.User.create().then((note) => { This will throw a not null violation error.
    console.log(note.toJSON());
  }).catch((err) =>{
    console.log(err);
  })
}

getNotes()
console.log("Running after the notes retrieval");
