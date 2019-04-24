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
const foodRef = dbRef.child('foodlog');
const foodLog = document.getElementById("foodLog");

function getUrlVars() {
 var vars = {};
 var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
     vars[key] = value;
 });
 return vars;
};

var vars = getUrlVars();

foodRef.orderByChild('id')
       .equalTo(vars['id'])
       .on("child_added", function(snapshot) {
           let entry = snapshot.val();

           let $trEntry = document.createElement("tr");
           let $tdFood = document.createElement("td");
           let $tdServing = document.createElement("td");
           let $tdEdit = document.createElement("td");
           let $tdRemove = document.createElement("td");

           $tdEdit.innerHTML = "✎";
           $tdRemove.innerHTML = "x";

           $tdEdit.setAttribute("entryID", snapshot.key);
           $tdEdit.setAttribute("data-toggle", "modal");
           $tdEdit.setAttribute("data-target", "#myModal");

           $tdRemove.setAttribute("entryID", snapshot.key);

           $tdFood.style.textAlign = "center";
           $tdServing.style.textAlign = "center";
           $tdEdit.style.textAlign = "center";
           $tdEdit.style.cursor = "pointer";
           $tdRemove.style.textAlign = "center";
           $tdRemove.style.cursor = "pointer";

           $tdEdit.addEventListener("click", editEntry);
           $tdRemove.addEventListener("click", removeEntry);

           $tdFood.innerHTML = entry.food;
           $tdServing.innerHTML = entry.serving_size;
           $trEntry.append($tdFood);
           $trEntry.append($tdServing);
           $trEntry.append($tdEdit);
           $trEntry.append($tdRemove);
           foodLog.append($trEntry);
         });

function editEntry(e) {
  console.log("You're going to edit")
  document.querySelector(".edit-entryid").value = e.target.getAttribute("entryID");
  const entryRef = dbRef.child('foodlog/' + e.target.getAttribute("entryID"));
  const editInputsUI = document.querySelectorAll(".edit-user-input");
  console.log(editInputsUI);
  entryRef.on("value", snap => {
    for(var i = 0, len = editInputsUI.length; i < len; i++) {
      var key = editInputsUI[i].getAttribute("data-key");
      editInputsUI[i].value = snap.val()[key];
 }
});
};

// Select the edit user submit button
const saveBtn = document.querySelector("#edit-user-btn");
saveBtn.addEventListener("click", saveUserBtnClicked)

// Define the function to run when the edit user submit button is clicked
function saveUserBtnClicked() {
  const entryID = document.querySelector(".edit-entryid").value;
  const entryRef = dbRef.child('foodlog/' + entryID);
  var editedEntryObject = {}
  const editInputsUI = document.querySelectorAll(".edit-user-input");
  editInputsUI.forEach(function(textField) {
  let key = textField.getAttribute("data-key");
  let value = textField.value;
   editedEntryObject[textField.getAttribute("data-key")] = textField.value
   });
   entryRef.update(editedEntryObject, function(){
     location.reload();
    console.log("entry has been updated");

  });
};

function removeEntry(e) {
  e.stopPropagation();
  const entryID = e.target.getAttribute("entryID");
  console.log(entryID);
  const entryRef = dbRef.child('foodlog/' + entryID);
    if (window.confirm("Are you sure you want to delete this food log entry?"))
    {
      entryRef.remove();
      location.reload();
    }
    console.log("user has been deleted");

};
            // console.log(snapshot.val());
            // snapshot.forEach(function(data) {
            // // user_data = data.val();
            // // weight = user_data.weight;
            // console.log(data.val().weight);
            // weights.push(data.val().weight);

            // return weights;
             // console.log(data.key);
        // var a = document.getElementById('record');
        // a.setAttribute("href","record.html?id="+data.key);
    // })
    // console.log(weights);
    // var total = 0;
    // for(var i = 0; i < weights.length; i++) {
    //     total += weights[i];
    // }
    // var avg = total / weights.length;
    // console.log('Average weight: ', Math.round(avg));
    // console.log('Minimum weight: ', Math.min(...weights));
    // console.log('Maximum weight: ', Math.max(...weights));
    // console.log('Number of records: ', weights.length);
    // document.getElementById('avg').innerHTML = Math.round(avg);
    // document.getElementById('min').innerHTML = Math.min(...weights);
    // document.getElementById('max').innerHTML = Math.max(...weights);
    // document.getElementById('cnt').innerHTML = weights.length;

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

    // ;});

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

// function generateTimestamp() {
// var currentdate = new Date();
// var date = currentdate.getDate() + "/"
//         + (currentdate.getMonth()+1)  + "/"
//         + currentdate.getFullYear()
// var time = currentdate.getHours() + ":"
//          + currentdate.getMinutes() + ":"
//          + currentdate.getSeconds();
//   return [date, time];
// };
//
//
//
var a = document.getElementById('record');
var b = document.getElementById('review');
a.setAttribute("href","record.html?id="+vars['id']);
b.setAttribute("href","review.html?id="+vars['id']);
console.log(a);
