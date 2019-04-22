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

///////////////////Firebase Database Retrieval////////////////////////////
// Get the root of the firebase database
const dbRef = firebase.database().ref();
// Get the database at 'food' child
// const foodRef = dbRef.child('food');
const foodRef = dbRef.child('patients');

// Get reference to HTML item "foodList"
const foodListUI = document.getElementById("foodList");

// When a value is added at the child node of "food", this command will be excuted
foodRef.on("child_added", snap => {
  // Getting the value of "food" child
   let food = snap.val();
  // Create a new HTML element (in this case, an "a") for the value to live in
   let $a = document.createElement("a");

   // edit icon (Allows you to edit)
   // Create a span element
    let editIconUI = document.createElement("span");
   // Give span element class of "edit-user"
    editIconUI.class = "edit-user";
   // Make edit icon a cute little pencil
    editIconUI.innerHTML = " ✎";
   // Create an attribute of "userid" and set it to the current key
    editIconUI.setAttribute("userid", snap.key);
   // Add an event listener that allows you to edit content (function code under UPDATE section below)
    editIconUI.addEventListener("click", editButtonClicked);

    // delete icon (allows you to delete child)
    // create a span element
    let deleteIconUI = document.createElement("span");
    // give span element a class of "delete-user"
    deleteIconUI.class = "delete-user";
    // make the icon an 'X'
    deleteIconUI.innerHTML = " ☓";
    // create attribute "userid" and set it to current key
    deleteIconUI.setAttribute("userid", snap.key);
    // add an event listener that allows you to delete child when icon is clicked (function code under DELETE section below)
    deleteIconUI.addEventListener("click", deleteButtonClicked);

  // Give new element a class name (because it's a bootstrap dropdown menu)
   $a.className = "dropdown-item";
  // Select which value to display on site (here, food and serving)
   // $a.innerHTML = food.food_and_serving;
      $a.innerHTML = food.LastName + ', ' + food.FirstName;
      // append edit icon
      $a.append(editIconUI);
      // append delete icon
      $a.append(deleteIconUI);
  // Create an attribute named "child-key" to hold the key for the child
   $a.setAttribute("child-key", snap.key);
  // Add event listenr "userClicked" when the child is cllicked (will show details)
   $a.addEventListener("click", userClicked)
  // Append created element for child to the HTML element (so it's visible!)
   foodListUI.append($a);

});

// When a value is added at the child node of "food", this command will be excuted
foodRef.on("child_added", snap => {
  // Getting the value of "food" child
   let food = snap.val();
  // Create a new HTML element (in this case, an "a") for the value to live in
   let $a = document.createElement("a");

   // edit icon (Allows you to edit)
   // Create a span element
    let editIconUI = document.createElement("span");
   // Give span element class of "edit-user"
    editIconUI.class = "edit-user";
   // Make edit icon a cute little pencil
    editIconUI.innerHTML = " ✎";
   // Create an attribute of "userid" and set it to the current key
    editIconUI.setAttribute("userid", snap.key);
   // Add an event listener that allows you to edit content (function code under UPDATE section below)
    editIconUI.addEventListener("click", editButtonClicked);

    // delete icon (allows you to delete child)
    // create a span element
    let deleteIconUI = document.createElement("span");
    // give span element a class of "delete-user"
    deleteIconUI.class = "delete-user";
    // make the icon an 'X'
    deleteIconUI.innerHTML = " ☓";
    // create attribute "userid" and set it to current key
    deleteIconUI.setAttribute("userid", snap.key);
    // add an event listener that allows you to delete child when icon is clicked (function code under DELETE section below)
    deleteIconUI.addEventListener("click", deleteButtonClicked);

  // Give new element a class name (because it's a bootstrap dropdown menu)
   $a.className = "dropdown-item";
  // Select which value to display on site (here, food and serving)
   // $a.innerHTML = food.food_and_serving;
      $a.innerHTML = food.LastName + ', ' + food.FirstName;
      // append edit icon
      $a.append(editIconUI);
      // append delete icon
      $a.append(deleteIconUI);
  // Create an attribute named "child-key" to hold the key for the child
   $a.setAttribute("child-key", snap.key);
  // Add event listenr "userClicked" when the child is cllicked (will show details)
   $a.addEventListener("click", userClicked)
  // Append created element for child to the HTML element (so it's visible!)
   foodListUI.append($a);

});
// Define userClicked function added to child element above
function userClicked(e) {
  // Get the child key from the attribute we created earlier
  var foodID = e.target.getAttribute("child-key");
  // Get the values for the child by calling the key to firebase
  // const foodRef = dbRef.child('food/' + foodID);
  const foodRef = dbRef.child('patients/' + foodID);

  // Get reference HTML element we will be inserting information from firebase into
  const foodDetailUI = document.getElementById("foodDetail");
  // Initialize to blank
  foodDetailUI.innerHTML = ""
  // When value (child) is added to the selected item, add to the list using following function
  foodRef.on("child_added", snap => {
    // Create a 'p' element for value
    var $p = document.createElement("p");
    // Make the text of 'p' be the key - value information
    // $p.innerHTML = snap.key + " - " + snap.val()

    if (snap.key == 'AlcoholinBlood(%)') {$p.innerHTML = "Alcohol in Blood(%): " + snap.val(); }
    if (snap.key == 'BloodPressure-Diastolic') {$p.innerHTML = "Blood Pressure - Diastolic: " + snap.val(); }
    if (snap.key == 'BloodPressure-Systolic') {$p.innerHTML = "Blood Pressure - Systolic: " + snap.val(); }
    if (snap.key == 'COinBlood(%)') {$p.innerHTML = "CO in Blood(%): " + snap.val(); }
    if (snap.key == 'HeartRate') {$p.innerHTML = "Heart Rate: " + snap.val(); }
    if (snap.key == 'Smokestatus') {$p.innerHTML = "Smoke Status: " + snap.val(); }
    if (snap.key == 'Weight(lb)') {$p.innerHTML = "Weight (lb): " + snap.val(); }
    // Append this element to the HTML element in our index.html file
    foodDetailUI.append($p);
  // This bit of code makes the selected item be retained as the content in the dropdown
    // ie, when the "asparagus" is selected, it will read "asparagus"
    // Get the selected text
    var selText = $(this).text();
    // Add the selected text to the HTML of the dropdown menu
    $(this).parents('.btn-group').find('.dropdown-toggle').html(selText+' <span class="caret"></span>');
  });

}

///////////////////Firebase Database Insertion////////////////////////////
// "Cache" or collect input submit button by ID
const addUserBtnUI = document.getElementById("add-user-btn");
// Create new "event listener" when submit button is clicked
addUserBtnUI.addEventListener("click", addUserBtnClicked);

// Defining event that will happen when submit button is clicked
function addUserBtnClicked() {
// Create connection to firebase db
const usersRef = dbRef.child('patients');
// Grab all input elements with class of "user-input"
const addUserInputsUI = document.getElementsByClassName("user-input");
// Create object to hold information to be eventually sent to firebase
let newUser = {};

// loop through all input elements to retrieve the data for the model
for (let i = 0, len = addUserInputsUI.length; i < len; i++) {
// Get the attribute 'data-key' from the current input
let key = addUserInputsUI[i].getAttribute('data-key');
// Get the input value (entered by the user)
let value = addUserInputsUI[i].value;
// Create key-value dictionary (prep for JSON delivery to firebase)
newUser[key] = value;
}

// Push input data to firebase, log successful insertion to console
usersRef.push(newUser, function(){
  console.log("data has been inserted");
  window.alert("The patient has been added to the database.");
  location.reload(true);
})
};

///////////////////Firebase Database UPDATE////////////////////////////
// Define event listener function from above that is attached to pencil icon
function editButtonClicked(e) {
  var selText = $(this).text();
  // Add the selected text to the HTML of the dropdown menu
  $(this).parents('.btn-group').find('.dropdown-toggle').html(selText+' <span class="caret"></span>');
  // show the Edit User Form
 document.getElementById('edit-user-module').style.display = "block";
 // set user id to the hidden input field
 document.querySelector(".edit-userid").value = e.target.getAttribute("userid");
 // query firebase for the specfic child
 const userRef = dbRef.child('patients/' + e.target.getAttribute("userid"));
 // select all input fields with the class "edit-user-input"
 const editUserInputsUI = document.querySelectorAll(".edit-user-input");
 // Look up child values and set them in the update form
 userRef.on("value", snap => {
 // Loop through each input item
 for(var i = 0, len = editUserInputsUI.length; i < len; i++) {
   // Get key to look up child from input item
  var key = editUserInputsUI[i].getAttribute("data-key");
   // For the specific input item (based on i index), use the key to grab the value from firebase
   editUserInputsUI[i].value = snap.val()[key];
 }
});
};

// Select the edit user submit button
const saveBtn = document.querySelector("#edit-user-btn");

// Create an event listener for the edit user submit button
saveBtn.addEventListener("click", saveUserBtnClicked)

// Define the function to run when the edit user submit button is clicked
function saveUserBtnClicked() {
  // Grab user id from hidden userid input field
  const userID = document.querySelector(".edit-userid").value;
  // Query the "users" root from firebase
  const userRef = dbRef.child('patients/' + userID);
  // Initialize empty object
  var editedUserObject = {}
  // Grab all inputs for edit user
  const editUserInputsUI = document.querySelectorAll(".edit-user-input");
  // Create loop for every edit user input
  editUserInputsUI.forEach(function(textField) {
  // Get key name for input attribute
  let key = textField.getAttribute("data-key");
  // Get value from input (user input)
  let value = textField.value;
  // Add key, value pair to edited user input object
   editedUserObject[textField.getAttribute("data-key")] = textField.value
   });
  // Send edited object to indicated child to update contents
   userRef.update(editedUserObject, function(){
  // Log that changes have been updated
    console.log("user has been updated");
  });
  // Hide the "edit-user-module" block (you no longer need it)
  document.getElementById('edit-user-module').style.display = "none";

  // Get the values for the child by calling the key to firebase
  // const foodRef = dbRef.child('food/' + foodID);
  const foodRef = dbRef.child('patients/' + userID);

  // Get reference HTML element we will be inserting information from firebase into
  const foodDetailUI = document.getElementById("foodDetail");
  // Initialize to blank
  foodDetailUI.innerHTML = ""
  // When value (child) is added to the selected item, add to the list using following function
  foodRef.on("child_added", snap => {
    // Create a 'p' element for value
    var $p = document.createElement("p");
    // Make the text of 'p' be the key - value information
    // $p.innerHTML = snap.key + " - " + snap.val()

    if (snap.key == 'AlcoholinBlood(%)') {$p.innerHTML = "Alcohol in Blood(%): " + snap.val(); }
    if (snap.key == 'BloodPressure-Diastolic') {$p.innerHTML = "Blood Pressure - Diastolic: " + snap.val(); }
    if (snap.key == 'BloodPressure-Systolic') {$p.innerHTML = "Blood Pressure - Systolic: " + snap.val(); }
    if (snap.key == 'COinBlood(%)') {$p.innerHTML = "CO in Blood(%): " + snap.val(); }
    if (snap.key == 'HeartRate') {$p.innerHTML = "Heart Rate: " + snap.val(); }
    if (snap.key == 'Smokestatus') {$p.innerHTML = "Smoke Status: " + snap.val(); }
    if (snap.key == 'Weight(lb)') {$p.innerHTML = "Weight (lb): " + snap.val(); }
    // Append this element to the HTML element in our index.html file
    foodDetailUI.append($p); })


};

///////////////////Firebase Database DELETE////////////////////////////
// Create event listener function for delete child event
function deleteButtonClicked(e) {
  // Aparently stops the event from being called multiple times (has something to do with "bubbling", who knows LOL)
  e.stopPropagation();
    // Get the ID to be deleted by using the "userid" attribute for the delete span element
    const userID = e.target.getAttribute("userid");
    // Call the specific user from firebase using corresponding userid
    const userRef = dbRef.child('patients/' + userID);
    // Delete it!
    if (window.confirm("Are you sure you want to delete this patient?"))
    {
      userRef.remove();
      window.alert("The patient has been deleted from the database.")
    }
    console.log("user has been deleted");
};

///////////////////Firebase Database Mock Log In////////////////////////////
// "Cache" or collect input submit button by ID
