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
        user_data = data.val()
        console.log(data.key);
        var a = document.getElementById('record');
        var b = document.getElementById('review');
        a.setAttribute("href","record.html?id="+data.key);
        b.setAttribute("href","review.html?id="+data.key);
    });
    console.log(user_data);
    console.log(user_data['name']);
    document.getElementById('log-in').style.display = "none";
const welcome = document.getElementById('welcome');
welcome.innerHTML = "Welcome, " + user_data['name'] + "!";
document.getElementById('mainMenu').style.display = "inline";

});
};
