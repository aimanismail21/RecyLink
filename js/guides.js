

//Event Listener for each accordion button
document.getElementById('paper').addEventListener('click', function(){pullFirebaseValue('panel_1', 'Paper')});
document.getElementById('plastic').addEventListener('click', function(){pullFirebaseValue('panel_2', 'Plastic')});
document.getElementById('aluminum').addEventListener('click', function(){pullFirebaseValue('panel_3', 'Aluminum')});
document.getElementById('foam').addEventListener('click', function(){pullFirebaseValue('panel_4', 'Foam')});
document.getElementById('glass').addEventListener('click', function(){pullFirebaseValue('panel_5', 'Glass')});
document.getElementById('clothing').addEventListener('click', function(){pullFirebaseValue('panel_6', 'Clothing')});
document.getElementById('electronics').addEventListener('click', function(){pullFirebaseValue('panel_7', 'Electronics')});
document.getElementById('furniture').addEventListener('click', function(){pullFirebaseValue('panel_8', 'Furniture')});
document.getElementById('organicWaste').addEventListener('click', function(){pullFirebaseValue('panel_9', 'OrganicWaste')});


// Updates element text with value in database
function pullFirebaseValue(output_id, key){
    var accordion_output = document.getElementById(output_id);
    var dbref = firebase.database().ref('Knowledgebase/Guides/' + key).child('value');
    dbref.on('value',
        function(snap){
            accordion_output.innerHTML = snap.val();
        })
}
// Drops down accordion button to show contents
var acc = document.getElementsByClassName("accordion");
var i;

for (i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function() {
        this.classList.toggle("active");
        var panel = this.nextElementSibling;
        if (panel.style.maxHeight){
            panel.style.maxHeight = null;
        } else {
            panel.style.maxHeight = panel.scrollHeight + "px";
        }
    });
}
