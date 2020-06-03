$(function (){

  const socket = io();

  setInterval(function(){
    //Animation will just stack
    $(".toggleHide").fadeOut('normal').fadeIn('normal');
  }, 1000);

  const usernameInput = $('#username'), usernameFeedback = $('#usernameFeedback'),
        password = $("#password"), passwordFeedback = $('#passwordFeedback')
        form = $('#form');

var checkedFlag = false;

  form.on('submit', function(e){
    if(!checkedFlag){
      e.preventDefault();
      socket.emit('username Exist', usernameInput.val());
    }
  });

  socket.on('username Exist Answer', function(value){
    if(value){
      //IF username is ok, let the user know
      usernameFeedback.addClass("valid-feedback").
        removeClass('invalid-feedback').text("Username checked, everything ok!");;
      usernameInput.addClass('is-valid').removeClass("is-invalid");
      //In case the user has it bad first
      console.log("username exist");
      socket.emit('check password', {
        username: usernameInput.val(),
        password: password.val()
      });
    }else{
      usernameFeedback.addClass("invalid-feedback").removeClass('valid-feedback')
      .text("Username not found, check it again!");;
      usernameInput.addClass('is-invalid').removeClass("is-valid")
      //In case the user has it bad first
        //Don't emit anything
      console.log("Username, doesn't exist");
    }
  });

  socket.on('check password answer', function(value){
    if (value) {
      //Submit form here!
      console.log('Username and Password correct');
        checkedFlag = true;
      form.submit();
    } else {
      passwordFeedback.addClass("invalid-feedback").removeClass('valid-feedback').text("Password incorrect, check it again.");
      password.addClass('is-invalid').removeClass("is-valid");
      //In case the user has it good first
    }
  });
});
