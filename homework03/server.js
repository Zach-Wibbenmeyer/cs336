/**
 * This file provided by Facebook is for non-commercial testing and evaluation
 * purposes only. Facebook reserves all rights not expressly granted.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * FACEBOOK BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
 * ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

 /* CS336 - Web Development, Homework03
  * Professor: Keith Vanderlinden
  * Author: Zach Wibbenmeyer
  */

var fs = require('fs');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
var app = express();

// make a variable for the database
var db;

var COMMENTS_FILE = path.join(__dirname, 'comments.json');

app.set('port', (process.env.PORT || 3000));

app.use('/', express.static(path.join(__dirname, 'dist')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.get('/', function (req, res) {
  res.send('Hello World!');
});

// Create an object prototype for a Person
function Person(firstName, lastName, loginID, startDate) {
	this.firstName = firstName;
	this.lastName = lastName;
	this.loginID = loginID;
	this.startDate = startDate;
}

// var personOne = new Person("Zach", "Wibbenmeyer", 314, "07/11/1994");
// var personTwo = new Person("Caleb", "Postma", 616, "12/12/1994");
// var personThree = new Person("Jenny", "Bullis", 410, "02/27/1996");
//
// // push objects to Array
// var peopleObjects = new Array();
// peopleObjects.push(personOne);
// peopleObjects.push(personTwo);
// peopleObjects.push(personThree);

// connect to mongo
MongoClient.connect('mongodb://Caleb-Postma:bjarne@ds155727.mlab.com:55727/homework03', function (err, dbConnection) {
  if (err) throw err;
  db = dbConnection;
});


// return the array of people objects at the /people page
app.get('/people', function(req, res) {
  db.collection("homework03Collection").find({}).toArray(function(err, docs) {
		if (err) throw err;
		res.json(docs);
	});
});

// post a person like you would post a comment
app.post('/people', function(req,res) {
  var newPerson = {
    id: req.body.id,
		firstName: req.body.firstName,
		lastName: req.body.lastName,
		startDate: req.body.startDate
	};
	db.collection("homework03Collection").insertOne(newPerson, function(err, result) {
		if (err) throw err;
		db.collection("homework03Collection").find({}).toArray(function(err, docs) {
			if (err) throw err;
			res.json(docs);
		});
	});
});


/* getPerson() - function for mathing up the ID to a person
 * @param: ID (type -> req param)
 * @return: an array of an object
 * Precondition: the ID must match up to one of the ID's stored in the
 				peopleObjects array
 */
// var getPerson = function(ID) {
// 	for (var i = 0; i < peopleObjects.length; i++) {
// 		if (peopleObjects[i].loginID == ID) {
// 			return peopleObjects[i];
// 		}
// 	}
//
// 	return 0;
// }

/* getNames() - function for matching up a name to the ID of a people object
 * @param: ID (type -> req param)
 * @return: a string containing the name
 * Precondition: ID must match up
 */
// var getNames = function(ID) {
// 	for (var i = 0; i < peopleObjects.length; i++) {
// 		if (peopleObjects[i].loginID == ID) {
// 			return peopleObjects[i].firstName + " " + peopleObjects[i].lastName;
// 		}
// 	}
// }

/* getYears() - function for calculating the amount of years from the startDate
 * @param: ID (type -> req param)
 * @return: an int for the years since the start date
 * Precondition: the ID again must match up
 */
// var getYears = function(ID) {
// 	for (var i = 0; i < peopleObjects.length; i++) {
// 		if (peopleObjects[i].loginID == ID) {
// 			var today = new Date();
// 			var personDate = new Date(peopleObjects[i].startDate);
// 			var years = today.getFullYear() - personDate.getFullYear();
// 			var m = today.getMonth() - personDate.getMonth();
// 		    if (m < 0 || (m === 0 && today.getDate() < personDate.getDate())) {
// 		        years--;
// 		    }
// 		 return years;
// 		}
// 	}
// }

// return a person based on their id
app.get('/person/:id', function(req, res) {
  db.collection("homework03Collection").find({id: req.params.id}).toArray(function(err, docs) {
		if (err) throw err;
		res.json(docs);
	});
});

// update the information of a person
app.put('/person/:id', function(req, res) {
  db.collection("homework03Collection").update({id: req.params.id},
    {$set: {firstName: req.params.firstName, lastName: req.params.lastName, startDate: req.params.startDate}}, {multi: true});
	res.send("New person is " + req.body.firstName + " " + req.body.lastName + " " + req.body.startDate + '\n');
});

// delete a person
app.delete('/person/:id', function(req, res) {
  db.collection("homework03Collection").remove({id: req.params.id});
	res.send("Person deleted");
});

// return a name based on the person's loginID
app.get('/person/:id/name', function(req, res) {
  db.collection("homework03Collection").find({id: req.params.id}, {firstName: 1} ).toArray(function(err, docs) {
    if (err) throw err;
    res.json(docs);
  });
});

// return the amount of years from the start date based on the person'd loginID
app.get('/person/:id/years', function(req, res) {
  db.collection("homework03Collection").find({id: req.params.id}, {startDate: 1}).toArray(function(err, docs) {
		if (err) throw err;
		res.json(docs);
	});
});

// adds a new person to personObjects
// app.post('/newperson', function(req, res) {
//     var person = new Person(req.body.input_fname, req.body.input_lname, req.body.input_id, req.body.input_date);
//     peopleObjects.push(person);
//     res.send('Submitted form info<br>ID: <code>' + req.body.input_id
//     + '</code><br>First name: <code>' + req.body.input_fname
//     + '</code><br>Last name: <code>' + req.body.input_lname
//     + '</code><br>Here since: <code>'+ req.body.input_date + '</code>');
// });
//
// // Displays a person object, searched by their ID, passed from the form at search/index.html through $ajax()
// app.post("/search", function(req, res) {
//     var person = new Person();
//     person = getPerson(req.body.name);
//     var response = "First Name: " + person.firstName +
//              '\n' + "Last Name: " + person.lastName +
//              '\n' + "Login ID: " + person.loginID +
//              '\n' + "Start Date: " + person.startDate;
//     res.send({"content": response});
// });

// listen on port 3000
app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
