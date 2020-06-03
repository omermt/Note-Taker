module.exports = (handlebars) =>{
  handlebars.registerHelper('noteURL', (id)=>{
    return ("/note?num=" + id);
  });

  handlebars.registerHelper('deleteURL', (id)=>{
    return ("/note/delete/?num=" + id);
  });

  handlebars.registerHelper('viewURL', (id)=>{
    return ("/note-view/" + id);
  });
}
