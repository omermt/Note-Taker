$(function (){
  
var usernameFlag2 = false;

  $('#form').on('submit', function(e){

    var socket = io();

    var usernameFlag = false,//To check if the username was checked against empty field
    otherThingBad = false;

    console.log("Submitted");
    if($('#password').val().length < 5){
      e.preventDefault();
      otherThingBad = true;
      $('#password').addClass("is-invalid").removeClass("is-valid");
      $('#inpassFeedback').text("Password must be 5 digits long, or more");
      console.log("Short Password");
    }else{
      $('#password').addClass("is-valid").removeClass("is-invalid");
      $('#passFeedback').text("Looking Good");
      console.log("Good Password");
    }

    if(($('#password').val() != $('#password_2').val()) || !$('#password').val()){
      e.preventDefault();
      otherThingBad = true;
      $('#password_2').addClass("is-invalid").removeClass("is-valid");
      $('#inpass2Feedback').text("Passwords don't match");
      console.log("Bad pass2");
    }else{
      $('#password_2').addClass("is-valid").removeClass("is-invalid");
      $('#pass2Feedback').text("Looking Good");
      console.log("Good Pass2");
    }

    if(!($('#username').val())){
      e.preventDefault();
      otherThingBad = true;
      $('#username').addClass("is-invalid").removeClass("is-valid");
      $('#inusernameFeedback').text("Password must be 5 digits long, or more");
      console.log("Bad Username");
    }else{
      usernameFlag = true;
      if(!usernameFlag2){
          e.preventDefault(); //Wait to username validation ahead
      }
      console.log("Good username");
    }

    if($("#nastyCheck").prop('checked') != true){
      e.preventDefault();
      otherThingBad = true;
      $('#nastyCheck').addClass("is-invalid").removeClass("is-valid");
      $('#incheckFeedback').text("You must check this");
      console.log("Bad Check");
    }else {
      $('#nastyCheck').addClass("is-valid").removeClass("is-invalid");
      $('#checkFeedback').text("Niceee");
      console.log("Good Check");
    }

    if(usernameFlag){
      //If the field isn't empty, check if it was already taken
      socket.emit('username Exist', $('#username').val());
    }

    socket.on('username Exist Answer', function(exist){
      if(!exist){
        console.log('Username not in use');
        $('#username').addClass("is-valid").removeClass("is-invalid");
        $('#usernameFeedback').text("Looking Good");
        if(!usernameFlag2){ //Check if it's the first time cheking existence
          usernameFlag2 = true;
          if (!otherThingBad) return $('#form').submit();
        }
      }else{
        console.log('Username in use');
        $('#username').addClass("is-invalid").removeClass("is-valid");
        $('#inusernameFeedback').text("Username already taken, choose anther one.");
      }
    })
  });
});
