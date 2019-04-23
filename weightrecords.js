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
const weightRef = dbRef.child('weight');
const recordResults = document.getElementById("recordResults");

function getUrlVars() {
 var vars = {};
 var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
     vars[key] = value;
 });
 return vars;
};

var vars = getUrlVars();
// var td_avg = document.getElementById('avg');
// var td_min = document.getElementById('min');
// var td_max = document.getElementById('max');
// var td_cnt = document.getElementById('cnt');

// user_data = {};
weights = [];
weightRef.orderByChild('id')
         .equalTo(vars['id'])
         .on("value", function(snapshot) {
            console.log(snapshot.val());
            snapshot.forEach(function(data) {
            // user_data = data.val();
            // weight = user_data.weight;
            console.log(data.val().weight);
            weights.push(data.val().weight);

            // return weights;
             // console.log(data.key);
        // var a = document.getElementById('record');
        // a.setAttribute("href","record.html?id="+data.key);
    })
    console.log(weights);
    var total = 0;
    for(var i = 0; i < weights.length; i++) {
        total += weights[i];
    }
    var avg = total / weights.length;
    console.log('Average weight: ', Math.round(avg));
    console.log('Minimum weight: ', Math.min(...weights));
    console.log('Maximum weight: ', Math.max(...weights));
    console.log('Number of records: ', weights.length);
    document.getElementById('avg').innerHTML = Math.round(avg);
    document.getElementById('min').innerHTML = Math.min(...weights);
    document.getElementById('max').innerHTML = Math.max(...weights);
    document.getElementById('cnt').innerHTML = weights.length;

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
a.setAttribute("href","record.html?id="+vars['id']);
console.log(a);
