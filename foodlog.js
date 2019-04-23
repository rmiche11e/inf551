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
const dbRef = firebase.database().ref();

const foodLog = document.getElementById("foodlog");
console.log(foodLog);
// Create new "event listener" when submit button is clicked
foodLog.addEventListener("click", recordFoodLog);

function generateTimestamp() {
var currentdate = new Date();
var date = currentdate.getDate() + "/"
        + (currentdate.getMonth()+1)  + "/"
        + currentdate.getFullYear()
var time = currentdate.getHours() + ":"
         + currentdate.getMinutes() + ":"
         + currentdate.getSeconds();
  return [date, time];
};

function getUrlVars() {
 var vars = {};
 var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
     vars[key] = value;
 });
 return vars;
};
var vars = getUrlVars();

function recordFoodLog(){
   const foodLogRef = dbRef.child('foodlog');
   var id = vars['id'];
   var [date, time] = generateTimestamp()
   // var x = document.getElementById("weight");
   var y = document.getElementById("message");
   var foodinput = document.getElementsByClassName("foodinput");
   var food = foodinput[0].value;
   var serving = foodinput[1].value;
   console.log(food);
   console.log(serving);
   var foodData = {'id': id, 'date': date, 'time': time, 'food': food, 'serving_size': serving};
   console.log(foodData)
   // x.innerHTML = weight;
   y.style.display = "inline";
   foodLogRef.push(foodData, function(){
     console.log("data has been inserted");
     window.alert("Your food has been recorded.");
     // location.reload(true);
   })
};

var a = document.getElementById('reviewRecords');
a.setAttribute("href","review_weight.html?id="+vars['id']);
console.log(a);
