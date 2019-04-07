//Write into newsletter
i = 1;
function newsletterClick(){
    var email = document.getElementById("email_1");
    let input = email.value;
    let variable = 'email' + i;
    console.log(email.value);

    firebase.database().ref("Newsletter/" + variable).set({
        email: input
            });
    i++;
    }

