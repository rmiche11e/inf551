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
const heartRef = dbRef.child('heartrate');
const recordResults = document.getElementById("recordResults");

function getUrlVars() {
 var vars = {};
 var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
     vars[key] = value;
 });
 return vars;
};

var vars = getUrlVars();

rates = [];
heartRef.orderByChild('id')
         .equalTo(vars['id'])
         .on("value", function(snapshot) {
            console.log(snapshot.val());
            snapshot.forEach(function(data) {
            console.log(data.val().heart_rate);
            rates.push(data.val().heart_rate);

            // return weights;
             // console.log(data.key);
        // var a = document.getElementById('record');
        // a.setAttribute("href","record.html?id="+data.key);
    })
    console.log(rates);
    var total = 0;
    for(var i = 0; i < rates.length; i++) {
        total += rates[i];
    }
    var avg = total / rates.length;
    console.log('Average rate: ', Math.round(avg));
    console.log('Minimum rate: ', Math.min(...rates));
    console.log('Maximum rate: ', Math.max(...rates));
    console.log('Number of records: ', rates.length);
    document.getElementById('avg').innerHTML = Math.round(avg);
    document.getElementById('min').innerHTML = Math.min(...rates);
    document.getElementById('max').innerHTML = Math.max(...rates);
    document.getElementById('cnt').innerHTML = rates.length;

//     var svg = d3.select("body").append("svg")
//           .attr("height","100%")
//           .attr("width","100%");
//
// svg.selectAll("rect")
//     .data(weights)
//     .enter().append("rect")
//           .attr("class", "bar")
//           .attr("height", function(d, i) {return (d * 10)})
//           .attr("width","40")
//           .attr("x", function(d, i) {return (i * 60) + 25})
//           .attr("y", function(d, i) {return 400 - (d * 10)});

    ;});

// console.log(weights);
// var total = 0;
// for(var i = 0; i < weights.length; i++) {
//     total += weights[i];
// }
// var avg = total / weights.length;
// console.log('Average weight: ', avg)

    // for (var i = 0; i < arrayLength; i++) {
    //     console.log(user_data[i].weight);
    //     //Do something
    // };

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



var a = document.getElementById('record');
var b = document.getElementById('review');
a.setAttribute("href","record.html?id="+vars['id']);
b.setAttribute("href","review.html?id="+vars['id']);
console.log(a);
