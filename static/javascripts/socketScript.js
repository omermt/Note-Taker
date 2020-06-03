$(() =>{
  var socket = io();

  //Animations
  $('#dropdownButton').click(function(e){
    console.log('Clicked');
    $('#markdownPreview').toggle(500);
  });

  //Events
  $("#form").on('submit', function(e){
    const noteTitle = $('#noteTitle');
    const noteTitleFeedback = $('#noteTitleFeedback');
    if(!noteTitle.val()){
      noteTitleFeedback.addClass("invalid-feedback").
        removeClass('valid-feedback').text("You must fill this!");
        noteTitle.addClass('is-invalid').removeClass("is-valid");

        e.preventDefault();
      }
    });

    $(window).resize(function(e){
      console.log($(window).width());
      if($(window).width() >= 788){
        $('#markdownPreview').show();
      }else{
        $('#markdownPreview').hide();
      }
    })

  //Send the body of the textarea
  socket.emit('Markdown Text', $('#noteBody').val());
  $('#noteBody').bind('input propertychange', function (){
    socket.emit('Markdown Text', $('#noteBody').val());
  });

  socket.on('markdownPreview', (body) =>{
    console.log("Body Returned", $(body).html());
    $('#markdownPreview').html($(body));
  });

  /*$(window).keypress('', function(e){
    if(e.ctrlKey){
      //115 is the ASCII code for 's'
      e.preventDefault();
      console.log("Saved used");
      return false;
    }
  });*/
});
