///////////////////Firebase Initialization////////////////////////////
// This is the configuration needed to connect to our instance of firebase
var config = {
    apiKey: "AIzaSyDl4UOJ4os_0povQ4wsIk46rMc1jC83g0M",
    authDomain: "inf551-5220d.firebaseapp.com",
    databaseURL: "https://inf551-5220d.firebaseio.com",
    projectId: "inf551-5220d",
    storageBucket: "inf551-5220d.appspot.com",
    messagingSenderId: "681284838767"
  };
// Initialize firebase using our config
firebase.initializeApp(config);
const logInBtnUI = document.getElementById("log-in-btn");
const dbRef = firebase.database().ref();
const usersRef = dbRef.child('users');

const logInUserName = document.getElementsByClassName("user-name");
// Create new "event listener" when submit button is clicked
logInBtnUI.addEventListener("click", logInBtnClicked);

// Defining event that will happen when submit button is clicked
function logInBtnClicked() {

// Create connection to firebase db
user_data = {};
usersRef.orderByChild('name')
        .equalTo(logInUserName[0].value)
        .on("value", function(snapshot) {
    console.log(snapshot.val());
    snapshot.forEach(function(data) {
        user_data = data.val();
        userID = data.key;
        console.log(data.key);
        var a = document.getElementById('record');
        var b = document.getElementById('review');
        a.setAttribute("href","record.html?id="+data.key);
        b.setAttribute("href","review.html?id="+data.key);
    return userID;
    });
    console.log(user_data);
    console.log(user_data['name']);
    document.getElementById('log-in').style.display = "none";
const welcome = document.getElementById('welcome');
welcome.innerHTML = "Welcome, " + user_data['name'] + "!";
document.getElementById('mainMenu').style.display = "inline";

});
};

const deleteButton = document.getElementById("delete");
deleteButton.addEventListener("click", deleteAllRecords);

function deleteAllRecords(e) {

  e.stopPropagation();
  // const foodRef = dbRef.child('foodlog')
  //                      .orderByChild('name')
  //                      .equalTo(userID);
  //
  // const weightRef = dbRef.child('weight')
  //                        .orderByChild('name')
  //                        .equalTo(userID);
  //
  // const heartRef = dbRef.child('heartrate')
  //                       .orderByChild('name')
  //                       .equalTo(userID);
    if (window.confirm("Are you sure you want to delete all of your health records?"))
    {
      dbRef.orderByChild('foodlog')
           .equalTo(userID)
           .once('value')
           .then(function(snapshot) {
            snapshot.forEach(function(childSnapshot) {
              console.log(childSnapshot);
              dbRef.child(childSnapshot.key).remove();
            });
});
//       dbRef.child('foodlog')
//            .orderByChild('name')
//            .equalTo(userID)
//            .remove();
//       dbRef.child('weight')
//            .orderByChild('name')
//            .equalTo(userID)
//            .remove();
//       dbRef.child('heartrate')
//            .orderByChild('name')
//            .equalTo(userID)
//            .remove();
      alert("You have deleted all of your health records from this system.")
    }
    console.log("all data has been deleted");

};
console.log(deleteButton);
