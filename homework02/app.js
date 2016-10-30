/************************************************
CS336 - Web Development
Professor: Keith Vanderlinden
Author: Zach Wibbenmeyer
Due Date: October 5, 2016
*************************************************/


var express = require('express');
var app = express();
var bodyParser = require("body-parser");
var HttpStatus = require('http-status-codes');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', function (req, res) {
  res.send('Hello World!');
});

function Person(firstName, lastName, loginID, startDate) {
	this.firstName = firstName;
	this.lastName = lastName;
	this.loginID = loginID;
	this.startDate = startDate;
}

var personOne = new Person("Zach", "Wibbenmeyer", 314, "07/11/1994");
var personTwo = new Person("Caleb", "Postma", 616, "12/12/1994");
var personThree = new Person("Jenny", "Bullis", 410, "02/27/1996");

var peopleObjects = new Array();
peopleObjects.push(personOne);
peopleObjects.push(personTwo);
peopleObjects.push(personThree);


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

	return 0;
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
		res.status(HttpStatus.NOT_FOUND).send('Sorry, this page was not found...');
	} else {
		res.json(getPerson(req.params.id));
	}
});

// update the information of a person
app.put('/person/:id', function(req, res) {
	if (getPerson(req.params.id) == 0) {
		res.status(HttpStatus.NOT_FOUND).send('Sorry, this page was not found...');
	} else {
		for (var i = 0; i < peopleObjects.length; i++) {
			if (peopleObjects[i].loginID == req.params.id) {
				peopleObjects[i].firstName = req.body.firstName;
				peopleObjects[i].lastName = req.body.lastName;
				peopleObjects[i].startDate = req.body.startDate;
			}
		}
		res.send("Welcome, my name is " + req.body.firstName + " " + req.body.lastName + " and I started on " + req.body.startDate);
	}
});

// delete a person
app.delete('/person/:id', function(req, res) {
	if (getPerson(req.params.id) == 0) {
		res.status(HttpStatus.NOT_FOUND).send('Sorry, this page was not found...');
	} else {
		for (var i = 0; i < peopleObjects.length; i++) {
			if (peopleObjects[i] != null && req.params != null) {
				if (peopleObjects[i].loginID == req.params.id) {
					delete peopleObjects[i];
					res.send("Deleted person with the loginID " + req.params.id);
				}
			}
		}
	}
});

// return a name based on the person's loginID
app.get('/person/:id/name', function(req, res) {
	if (getNames(req.params.id) == 0) {
		// send a 404 error status message if they are not found
		res.status(HttpStatus.NOT_FOUND).send('Sorry, this page was not found...');
	} else {
		res.json(getNames(req.params.id));
	}
});

// return the amount of years from the start date based on the person'd loginID
app.get('/person/:id/years', function(req, res) {
	if (getYears(req.params.id) == 0) {
		// send a 404 error status message if they are not found
		res.status(HttpStatus.NOT_FOUND).send('Sorry, this page was not found...');
	} else {
		res.json(getYears(req.params.id));
	}
});

app.post('/form', function(req, res) {
	var person = new Person();
	person = getPerson(req.body.loginID);
	var response = "First Name: " + person.firstName + "\n"
					+ "Last Name: " + person.lastName + "\n"
					+ "Login ID: " + person.loginID + "\n"
					+ "Start Date: " + person.startDate;
	res.send({"content": response});
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});