var functions = require('firebase-functions');
var firebase = require('firebase-admin');
var FCM = require('fcm-node');

var serviceAccount = require("./serviceAccountKey.json");

firebase.initializeApp({
    credential : firebase.credential.cert(serviceAccount),
    databaseURL: "YOUR_DATABASE_URL"
});

exports.notifications = functions.database.ref('/chat/{senderID}/{destinationID}/messages/{pushID}')
    .onWrite(event => {        
        var eventSnapshot = event.data;        
        var sender = eventSnapshot.child('sender').val();
        var message = eventSnapshot.child('message').val();
        var destination = eventSnapshot.child('destination').val();        
        if (event.params.senderID === sender) 
            sendMessage(message,sender,destination);    
    }
);

function sendMessage(message, sender, destination) {

    var serverKey = 'YOUR_FCM_API_KEY';
    var fcm = new FCM(serverKey);

    var senderUser = firebase.database().ref('/users/' + sender + '/name'); 
    var tokenUser = firebase.database().ref('/fcm/' + destination + '/token');
    tokenUser.once('value').then(function(tokenSnapshot) {
        var token = tokenSnapshot.val();        
        senderUser.once('value').then(function(userSnapshot) {
            var title = userSnapshot.val();        
            if (token !== null) {
                var notification = { 
                    to: token,
                
                    notification: {
                        title: title, 
                        body: message, 
                        click_action: "OPEN_CONVERSATION",
                        sound: "default"
                    },
                
                    data: {  
                        sender: destination,
                        destination: sender
                    }
                };

                fcm.send(notification, function(err, response){
                    if (err) {
                        console.log("Something has gone wrong: " + err + "\n\n");                        
                    } else {
                        console.log("Successfully sent with response: " + response + "\n\n");
                    }
                });
            }
        });
    });        

}
