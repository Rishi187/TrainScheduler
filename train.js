


  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCkxdFfRLw-S3QZXdUxTKH8kljp0S1iRPw",
    authDomain: "trainscheduler87.firebaseapp.com",
    databaseURL: "https://trainscheduler87.firebaseio.com",
    projectId: "trainscheduler87",
    storageBucket: "trainscheduler87.appspot.com",
    messagingSenderId: "989026000813"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

  // 2. Button for adding Employees
  $("#add-train-btn").on("click", function(event) {
    event.preventDefault();
  
    // Grabs user input
    var trName = $("#train-name-input").val().trim();
    var trDes = $("#destination-input").val().trim();
    // var trTime = moment($("#time-input").val().trim(), "00.00").format("X");
    var trTime = $("#time-input").val().trim();
    var trFreq = $("#frequency-input").val().trim();
    
  
    // Creates local "temporary" object for holding employee data
    var newTr = {
      name: trName,
      destination: trDes,
      time: trTime,
      frequency: trFreq,
     
    };
  
    // Uploads employee data to the database
    database.ref().push(newTr);
  
    // Logs everything to console
    console.log(newTr.name);
    console.log(newTr.destination);
    console.log(newTr.time);
    console.log(newTr.frequency);
  
    // Alert
    alert("Train successfully added");
  
    // Clears all of the text-boxes
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#time-input").val("");
    $("#frequency-input").val("");
  });
  
  // 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
  database.ref().on("child_added", function(childSnapshot, prevChildKey) {
  
    console.log(childSnapshot.val());
  
    // Store everything into a variable.
    var trName = childSnapshot.val().name;
    var trDes = childSnapshot.val().destination;
    var trTime = childSnapshot.val().time;
    var trFreq = childSnapshot.val().frequency;
  
    // Employee Info
    console.log(trName);
    console.log(trDes);
    console.log(trTime);
    console.log(trFreq);

    // Assumptions
    var tFrequency = parseInt(trFreq);

    // Time is 3:30 AM
    var firstTime = trTime;

    // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
    console.log(firstTimeConverted);

    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % tFrequency;
    console.log(tRemainder);

    // Minute Until Train
    tMinutesTillTrain = tFrequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // Next Train
    nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

    nextTrain =  moment(nextTrain).format("hh:mm");

    // Add each train's data into the table
    $("#train-table > tbody").append("<tr><td>" + trName + "</td><td>" + trDes + "</td><td>" +
    trFreq + "</td><td>" + nextTrain + "</td><td>" + tMinutesTillTrain + "</td>");
  });
 

    
    
  