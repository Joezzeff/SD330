// Function to turn on the display and show control buttons
function turnOnDisplay() {
	var temperature = '<input type="button" onclick="showTemperature(40)" id="tempButton" value="Temperature">';
	var insideFridge = '<input type="button" onclick="showIMG(\'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1iq9oRlotH9C0rUSiCMfveWxIQ0WOKIK6Hw&s\')" id="insideButton" value="INSIDE THE FRIDGE">';
	var netflix = '<input type="button" onclick="showIMG(\'https://aptokash.github.io/SD330-2/06-tv.jpg\')" id="netflixButton" value="NETFLIX">';
	var weather = '<input type="button" onclick="showIMG(\'https://cdn.discordapp.com/attachments/311944103804010496/1303760029966532678/image.png?ex=672ceca5&is=672b9b25&hm=50183b2ca42015992ecbcd0d34152f78b9c6048c35f783a837a66289f4b72e5e&\')" id="weatherButton" value="WEATHER">';
	var timer = '<input type="button" onclick="minuteTimer()" id="timerButton" value="TIMER">';
	var shoppingList = '<input type="button" onclick="createShoppingList()" id="shoppingButton" value="Shopping List">';
	var tvScreen = '<input type="button" onclick="showIMG(\'https://media.istockphoto.com/id/183025687/photo/cracked-lcd-screen.jpg?s=612x612&w=0&k=20&c=w2_TUlOUhYC6wL1tgMMYv2kSZw9wvLaWnSoBMC8l9zI=\')" id="tvButton" value="TV SCREEN">';
	var browser = '<input type="button" onclick="showIMG(\'https://aptokash.github.io/SD330-2/06-web.jpg\')" id="browserButton" value="BROWSER">';
	var musicPlayer = '<input type="button" onclick="aMusicPlayer(\'rio.mp3\')" id="musicButton" value="PLAY MUSIC">';
	
	
	var displayString = temperature + " " + insideFridge + " " + netflix + " " + weather + " " + timer + " " + shoppingList + " " + tvScreen + " " + browser + " "+ musicPlayer;
	var outputButtons = document.getElementById("fridgeArea");

	// Use innerHTML to inject buttons as HTML elements
	outputButtons.innerHTML = displayString;
}

// Function to turn off the display
function turnOffDisplay() {
	document.getElementById("fridgeArea").innerHTML = ""; // Clear the buttons
	document.getElementById("imageArea").innerHTML = ""; // Clear the image
}

// Function to display the image in the imageArea div
function showIMG(link) {
	var imgElement = '<img src="' + link + '" width="300px" height="300px">';
	document.getElementById("imageArea").innerHTML = imgElement; // Display the image
}

// Let the user play a sound!
function aMusicPlayer(songPath) {
	var audioPlayer = '<audio controls> <source src="' + songPath + '" type="audio/mpeg"> </audio>';
	document.getElementById("imageArea").innerHTML = audioPlayer;
}

// Autoplay a sound!
function playSound(songPath) {
	var audioElement = '<audio controls autoplay> <source src="' + songPath + '" type="audio/mpeg"> </audio>';
	document.getElementById("imageArea").innerHTML = audioElement;
}




// CLOCKS
var is24HourFormat = true;

function doStartClock() {
	setInterval(doClockTick, 1000);
}

function doClockTick() {
	var today = new Date();
	var hours = today.getHours();
	var mins = today.getMinutes();
	var secs = today.getSeconds();
	var timeString = checkTime(hours) + ":" + checkTime(mins) + ":" + checkTime(secs);
	
	// Check time format
	if (!is24HourFormat) {
		let period = hours >= 12 ? 'PM' : 'AM';
		hours = hours % 12 || 12; // Convert to 12-hour format, setting 0 as 12
		var timeString = checkTime(hours) + ":" + checkTime(mins) + ":" + checkTime(secs) + " " + period;
	} 
	else {
		var timeString = checkTime(hours) + ":" + checkTime(mins) + ":" + checkTime(secs);
	}

	var outputElement = document.getElementById("timePar");
	outputElement.textContent = timeString;
}

// Time toggler
function checkTime(i) {
	if (i < 10) { i = "0" + i }; //checks to see if the time is single digit, then adding a 0 if it is
	return i;
}

// Father time
function toggleTimeFormat() {
	is24HourFormat = !is24HourFormat;
	// Update button label
	document.getElementById("toggleFormatButton").value = is24HourFormat ? "12hr" : "24hr";
}




// TEMPERATURE
var isFahrenheit = true;
var fridgeTempF = 0;
var fridgeTempC = 0;

// Show temperature with toggleable format
function showTemperature(max) {
	fridgeTempF = Math.floor(Math.random() * max);
	fridgeTempC = ((fridgeTempF - 32) * 5) / 9;
	isFahrenheit = true; // Reset to Fahrenheit on each new temperature display

	displayTemperature();
}

// Update temperature display based on format
function displayTemperature() {
	var displayTemp = isFahrenheit ? formatFahrenheit() : formatCelsius();
	document.getElementById("imageArea").innerHTML =
		'<p>Temperature: ' + displayTemp + '</p>' +
		'<input type="button" onclick="toggleTempFormat()" id="tempFormatButton" value="°F/°C">' +
		'<input type="button" onclick="increaseTemperature()" id="increaseTempButton" value="+">' +
		'<input type="button" onclick="decreaseTemperature()" id="decreaseTempButton" value="-">';
}

// Convert temperature to Fahrenheit/Celcius format
function formatFahrenheit() {
	return fridgeTempF + '°F';
}

function formatCelsius() {
	return fridgeTempC.toFixed(1) + '°C';
}

function toggleTempFormat() {
	isFahrenheit = !isFahrenheit;
	displayTemperature();
}

// Increase/decrease temperature and update display
function increaseTemperature() {
	if (isFahrenheit) {
		fridgeTempF++;
		fridgeTempC = ((fridgeTempF - 32) * 5) / 9;
	} 
	else {
		fridgeTempC++;
		fridgeTempF = (fridgeTempC * 9) / 5 + 32;
	}
	displayTemperature();
}

function decreaseTemperature() {
	if (isFahrenheit) {
		fridgeTempF--;
		fridgeTempC = ((fridgeTempF - 32) * 5) / 9;
	} else {
		fridgeTempC--;
		fridgeTempF = (fridgeTempC * 9) / 5 + 32;
	}
	displayTemperature();
}


// TIMER

// Countdown timer function
function minuteTimer() {
	var timeRemaining = 60;
	var timerInterval = setInterval(function() {
		var minutes = Math.floor(timeRemaining / 60);
		var seconds = timeRemaining % 60;
		document.getElementById("imageArea").innerHTML = 
			'<p>Countdown: ' + formatTime(minutes) + ':' + formatTime(seconds) + '</p>';

		if (timeRemaining <= 0) {
			clearInterval(timerInterval); // Stop the timer
			playSound("metal_pipe.mp3"); // Play sound at the end
		} 
		else {
			timeRemaining--; 
		}
	}, 1000);
}

// Format time to display as two digits
function formatTime(time) {
	return time < 10 ? '0' + time : time;
}



// SHOPPING LIST

function createShoppingList() {
	// An array with the initial 5 items
	var shoppingList = [
		'Dr. Pepper',
		'More Dr. Pepper',
		'Dr. Pepper 3',
		'Dr. Pepper 4',
		'Eggs'
	];

	var listHTML = '<ul id="listItems">';

	// Add the current items to the list
	shoppingList.forEach(function(item) {
		listHTML += '<li>' + item + '</li>';
	});
	listHTML += '</ul>';

	// Create an input field to add a new item
	listHTML += 
		'<br><br><input type="text" id="newItem" placeholder="Add new item"><button onclick="addToList()">Add</button>';

	document.getElementById("imageArea").innerHTML = listHTML;
}

// Function to add new item to the shopping list
function addToList() {
	var newItem = document.getElementById('newItem').value;
	if (newItem) {
		var list = document.getElementById('listItems');
		var newListItem = document.createElement('li');
		newListItem.textContent = newItem;
		list.appendChild(newListItem);

		document.getElementById('newItem').value = ''; // Clear the input field
	}
}