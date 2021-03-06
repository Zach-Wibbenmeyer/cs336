/************************************************
CS336 - Web Development
Professor: Keith Vanderlinden
Author: Zach Wibbenmeyer
Due Date: October 5, 2016
*************************************************/


var express = require('express');
var app = express();

app.get('/', function (req, res) {
  res.send('Hello World!');
});


// store an array of people objects
var peopleObjects = [{firstName: 'Zach', lastName: 'Wibbenmeyer', loginID: 314, startDate: '07/11/1994'},
					 {firstName: 'Caleb', lastName: 'Postma', loginID: 616, startDate: '12/12/1994'},
					 {firstName: 'Jenny', lastName: 'Bullis', loginID: 410, startDate: '02/27/1996'}];


// return the array of people objects at the /people page
app.get('/people', function(req, res) {
	res.json(peopleObjects);
});

/* getPerson() - function for mathing up the ID to a person
 * @param: ID (type -> req param)
 * @return: an array of an object
 * Precondition: the ID must match up to one of the ID's stored in the 
 				peopleObjects array
 */
var getPerson = function(ID) {
	for (var i = 0; i < peopleObjects.length; i++) {
		if (peopleObjects[i].loginID == ID) {
			return peopleObjects[i];
		}
	}
}
 
/* getNames() - function for matching up a name to the ID of a people object
 * @param: ID (type -> req param)
 * @return: a string containing the name
 * Precondition: ID must match up
 */
var getNames = function(ID) {
	for (var i = 0; i < peopleObjects.length; i++) {
		if (peopleObjects[i].loginID == ID) {
			return peopleObjects[i].firstName + " " + peopleObjects[i].lastName;
		}
	}
}

/* getYears() - function for calculating the amount of years from the startDate
 * @param: ID (type -> req param)
 * @return: an int for the years since the start date
 * Precondition: the ID again must match up
 */
var getYears = function(ID) {
	for (var i = 0; i < peopleObjects.length; i++) {
		if (peopleObjects[i].loginID == ID) {
			var today = new Date();
			var personDate = new Date(peopleObjects[i].startDate);
			var years = today.getFullYear() - personDate.getFullYear();
			var m = today.getMonth() - personDate.getMonth();
		    if (m < 0 || (m === 0 && today.getDate() < personDate.getDate())) {
		        years--;
		    }
		 return years;
		}
	}
}

// return a person based on their loginID
app.get('/person/:id', function(req, res) {
	if (getPerson(req.params.id) == 0) {
		// send a 404 error status message if they are not found
		res.sendStatus(404);
	} else {
		res.json(getPerson(req.params.id));
	}
});

// return a name based on the person's loginID
app.get('/person/:id/name', function(req, res) {
	if (getNames(req.params.id) == 0) {
		// send a 404 error status message if they are not found
		res.sendStatus(404);
	} else {
		res.json(getNames(req.params.id));
	}
});

// return the amount of years from the start date based on the person'd loginID
app.get('/person/:id/years', function(req, res) {
	if (getYears(req.params.id) == 0) {
		// send a 404 error status message if they are not found
		res.sendStatus(404);
	} else {
		res.json(getYears(req.params.id));
	}
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});