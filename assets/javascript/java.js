$(document).ready(function()
{
	
var config =
{
	apiKey: "AIzaSyCSAWsanixG4wQmVMGfgscaqfcl57et_XY",
	authDomain: "train-67d4a.firebaseapp.com",
	databaseURL: "https://train-67d4a.firebaseio.com",
	projectId: "train-67d4a",
	storageBucket: "",
	messagingSenderId: "315319093054"
};
  
firebase.initializeApp(config);
var database = firebase.database();

var currentTrain = 
{
	name: "",
	destination: "",
	time: "",
	frequency: 0
};



$("#train_submit").click(function()
{
	event.preventDefault();

	currentTrain.name = $("#train_name").val().trim();
	currentTrain.destination = $("#train_destination").val().trim();
	currentTrain.time = $("#train_time").val().trim();
	currentTrain.frequency = $("#train_frequency").val().trim();

	database.ref().push(currentTrain);

	$("form").trigger("reset");


})

$("#clear_button").click(function()
{
	$("form").trigger("reset");
})


database.ref().on("child_added", function(snapshot)
{
	console.log(snapshot.val());

	$("#train_table").append("<tr><td>" + snapshot.val().name + "</td><td>" + snapshot.val().destination +
		"</td><td>" + snapshot.val().frequency + "</td></tr>")
})









})	