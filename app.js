  // Initialize Firebase
    var config = {
      apiKey: "AIzaSyCZlcHVy691_k_QLR8EdzrUg6vs2N5rivw",
      authDomain: "train-schedule-a32c3.firebaseapp.com",
      databaseURL: "https://train-schedule-a32c3.firebaseio.com",
      projectId: "train-schedule-a32c3",
      storageBucket: "train-schedule-a32c3.appspot.com",
      messagingSenderId: "734773044283"
    };
    firebase.initializeApp(config);

  // Create a variable to reference the database
    var database = firebase.database();

  // Initial values
    var trainName = "";
    var destination = "";
    var firstTrain = 0;
    var frequency = 0;
    var remainder = 0;
    var arrival = 0;

  // To prevent page from refreshing when user presses enter
    $("#submit-btn").on("click", function(event) {
      event.preventDefault();

  // Grab values from text boxes
    trainName = $("#trainName-input").val().trim();
    destination = $("#destination-input").val().trim();
  // Push back 1 year to get current time  
    firstTrain = moment($("#firstTrain-input").val().trim(), "HH:mm").subtract(1, "years").format("X");
    frequency = $("#frequency-input").val().trim();

  // Pushing informatation into database
    database.ref().push({
      trainName: trainName,
      destination: destination,
      firstTrain: firstTrain,
      frequency: frequency,
      dateAdded: firebase.database.ServerValue.TIMESTAMP
    });  

    alert("Train successfully added!");

  // Clear text input
    $("#trainName-input").val("");
    $("#destination-input").val("");
    $("#firstTrain-input").val("");
    $("#frequency-input").val("");
  });

  // Creating childs in Firebase
    database.ref().on("child_added", function(childSnapshot, prevChildKey) {

  // Console log childSnapshot
    console.log(childSnapshot.val().trainName);
    console.log(childSnapshot.val().destination);
    console.log(childSnapshot.val().firstTrain);
    console.log(childSnapshot.val().frequency);

// Store train information
  var tTrainName = childSnapshot.val().trainName;
  var tDestination = childSnapshot.val().destination;
  var tFirstTrain = childSnapshot.val().firstTrain;
  var tFrequency = childSnapshot.val().frequency;
 


// Using Momentsjs to calculate times
  
  var diffTime = moment().diff(moment.unix(firstTrain), "minutes");
  console.log("Difference in Time: " + diffTime);
  var tRemainder = moment().diff(moment.unix(diffTime), "minutes") % tFrequency;
  console.log(tRemainder);
  var tMinutesTillTrain = tFrequency - tRemainder;
  console.log("Minutes Until Train: " + tMinutesTillTrain);
  var tArrival = moment().add(tMinutesTillTrain, "m").format("hh.mm A");
  console.log(tArrival);
  // Have train information display on page
    // $("#train-display").html(childSnapshot.val().trainName);
    //  $("#destination-display").html(childSnapshot.val().destination);
    //  $("#firstTrain-display").html(childSnapshot.val().firstTrain);
    //  $("#frequency-display").html(childSnapshot.val().frequency);

  // // Change the HTML
  //   $("#name-display").html(childSnapshot.val().trainName);
  //   $("#destination-display").html(childSnapshot.val().destination);
  //   $("#frequency-display").html(childSnapshot.val().frequency);


  // Train schedule list
    $("#trainTable").append("<tr><td>" + tTrainName + "</td><td>" + tDestination + "</td><td>" + tFirstTrain + "</td><td>" + tFrequency + "</td><td>" + tMinutesTillTrain + "</td><td>" + tArrival + "</td></tr>");
    
  // Handle errors
   }, function(errorObject) {
      console.log("Errors handled: " + errorObject.code);
    
  });

  
