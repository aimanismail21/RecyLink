//Write into Give Your Feedback database
i = 0;
function submitClick(){
    var name = document.getElementById("name");
    var email = document.getElementById("email");
    var message = document.getElementById("message");
    variable = name.value;
    firebase.database().ref("UserMsgs/" + variable).set({
        name: name.value,
        email: email.value,
        message: message.value
            });
        }

   