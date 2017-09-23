$(document).ready(function() {
  console.log(moment());
	var config = {
    	apiKey: "AIzaSyBbG1bLNqEMUuKV-JAIOGZ4Spxphd5WF9o",
    	authDomain: "awesomearuna-6de91.firebaseapp.com",
    	databaseURL: "https://awesomearuna-6de91.firebaseio.com",
    	storageBucket: "awesomearuna-6de91.appspot.com",
  	};
  	firebase.initializeApp(config);

  	var database = firebase.database();

	$("#input-submit").on("click", function() {
		event.preventDefault();

		var name = $("#name-input").val();
      var dest = $("#dest-input").val();
      var time = $("#time-input").val();
      var freq = $("#freq-input").val();

      // Code for handling the push
	    database.ref("/trains").push({
        	name: name,
        	dest: dest,
        	time: time,
        	freq: freq,
        	dateAdded: firebase.database.ServerValue.TIMESTAMP
      	});
	});

	database.ref("/trains").on("child_added", function(childSnapshot) {

      // Log everything that's coming out of snapshot
      var name = childSnapshot.val().name;
      var dest = childSnapshot.val().dest;
      var time = childSnapshot.val().time;
      var freq = childSnapshot.val().freq;
      
      console.log(moment());
      
      var timeSplit = time.split(":");
      var now = moment();
      
      var trainTimeInMinutes = timeSplit[0]*60 + timeSplit[1]*1;
      var currentMins = now.hours()*60 + now.minutes();
      var diff = trainTimeInMinutes-currentMins;

      var row = $("<tr>");
      var c1 = $("<td>");
      var c2 = $("<td>");
      var c3 = $("<td>");
      var c4 = $("<td>");
      var c5 = $("<td>");

      c1.html(name);
      c2.html(dest);
      c3.html(time);
      c4.html(freq);
      c5.html(diff);

      row.append(c1);
      row.append(c2);
      row.append(c3);
      row.append(c4);
      row.append(c5);

      $("#employee-list-table").append(row);

    // Handle the errors
    }, function(errorObject) {
      console.log("Errors handled: " + errorObject.code);
    });
});