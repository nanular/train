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





	$("#train_name").on("input", function()
	{

		var input = $(this);
		var isNameValid = input.val();

		if (isNameValid)
		{
			input.removeClass("invalid").addClass("valid");
		} else
		{
			input.removeClass("valid").addClass("invalid");
		}
	});

	$("#train_destination").on("input", function()
	{
		var input = $(this);
		var isDestinationValid = input.val();
		if (isDestinationValid)
		{
			input.removeClass("invalid").addClass("valid");
		} else
		{
			input.removeClass("valid").addClass("invalid");
		}
	});

	$("#train_time").on("input", function()
	{
		var input = $(this);
		var military_regex = /^([01]\d|2[0-3]):?([0-5]\d)$/;
		var isTimeValid = military_regex.test(input.val());

		if (isTimeValid)
		{
			input.removeClass("invalid").addClass("valid");
		} else
		{
			input.removeClass("valid").addClass("invalid");
		}
	});

	$("#train_frequency").on("input", function()
	{
		var input = $(this);
		var integer_regex = /^\d*$/;
		var isFrequencyValid = integer_regex.test(input.val());
		var input_data = input.val();

		if (isFrequencyValid && input_data != 0)
		{
			input.removeClass("invalid").addClass("valid");
		} else
		{
			input.removeClass("valid").addClass("invalid");
		}
	});




$("#train_submit").click(function()
{
	event.preventDefault();

	if ($("#train_name").hasClass("valid"))
	{
		currentTrain.name = $("#train_name").val().trim();
		isNameValid = true;
	} else
	{
		isNameValid = false;
		alert("Please enter a name for your train.");
	}

	if ($("#train_destination").hasClass("valid"))
	{
		currentTrain.destination = $("#train_destination").val().trim();
		isDestinationValid = true;
	} else
	{
		isDestinationValid = false;
		alert("Please enter a destination for your train.");
	}

	if ($("#train_time").hasClass("valid"))
	{
		currentTrain.time = $("#train_time").val().trim();
		isTimeValid = true;
	} else
	{
		isTimeValid = false;
		alert("Please enter a valid arrival time for your train using military time.");
	}

	if ($("#train_frequency").hasClass("valid"))
	{
		currentTrain.frequency = $("#train_frequency").val().trim();
		isFrequencyValid = true;
	} else
	{
		isFrequencyValid = false;
		alert("Please enter an interger greater than zero to set the frequency of your train.");
	}	

	if (isNameValid && isDestinationValid && isTimeValid && isFrequencyValid)
	{
		database.ref().push(currentTrain);
		$("form").trigger("reset");
	}

})

$("#clear_button").click(function()
{
	$("form").trigger("reset");
})


database.ref().on("child_added", function(snapshot)
{
	//console.log(snapshot.val());

	var currentHours = moment().hours();
  	var currentMinutes = moment().minutes();
  	var totalMinutes = currentHours * 60 + currentMinutes;
  	//console.log(totalMinutes);

	var firstArrival = snapshot.val().time;
	firstArrival = moment(firstArrival, "HH:mm");
	var firstTrainHours = firstArrival.hours();
	var firstTrainMin = firstArrival.minutes();
	var firstTrainTotalMin = (firstTrainHours * 60) + firstTrainMin;
	//console.log(firstTrainTotalMin);

	var nextArrival = "";
	var minutesUntilArrival = "";

	if(totalMinutes < firstTrainTotalMin)
	{
		nextArrival = firstTrainTotalMin;
	} else
	{
		var completedTrips = Math.floor((totalMinutes - firstTrainTotalMin)/snapshot.val().frequency);
		nextArrival = ((completedTrips + 1) * snapshot.val().frequency) + firstTrainTotalMin;
	}

	//console.log(nextArrival);
	minutesUntilArrival = nextArrival - totalMinutes;
	var nextArrivalHours = Math.floor(nextArrival / 60);
	var nextArrivalMin = nextArrival % 60;
	if (nextArrivalMin < 10)
	{
		var nextArrivalMinEdit = "0" + nextArrivalMin;
	} else
	{
		nextArrivalMinEdit = nextArrivalMin;
	}
	var nextArrivalTime = nextArrivalHours + ":" + nextArrivalMinEdit;


	$("#train_table").append("<tr><td>" + snapshot.val().name + "</td><td>" + snapshot.val().destination +
		"</td><td>" + snapshot.val().frequency + "</td><td>" + nextArrivalTime + "</td><td>" +
		minutesUntilArrival + "</td></tr>")
})









})	