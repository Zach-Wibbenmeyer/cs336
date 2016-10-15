/* CS 336 - Web Development Lab06
 * Professor Vanderlinden
 * Author: Zach Wibbenmeyer
 * Date: October 14, 2016
 */

 /* Answers to questions in part 1.
  * 1. Only the GET request methods can be tested through the browser because they
  * are sent to the browser by default when a user enters in a URL.
  * Curl examples:
  *     curl -X PUT localhost:3000/request -d '{"arg":"value"}' -H 'Content-Type: application/json'
  *     curl -X POST localhost:3000/request -d '{"arg":"value"}' -H 'Content-Type: application/json'
  *     curl -X DELETE localhost:3000/request -d '{"arg":"value"}' -H 'Content-Type: application/json'
  * 2. I figured the 404 page not found was the best HTTP response code to load
  * when a page isn't found. 400 bad request may work as well.
  *
  * Answers to questions in part 2.
  * 1. Forms only support GET and POST.
  * 2. The form data is passed to the server encoded in url.
  */


var express = require('express');
var app = express();
var HttpStatus = require('http-status-codes');
var bodyParser = require('body-parser');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// REQUESTS
app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.get('/request', function (req, res) {
	res.send('Test GET request!');
});

app.post('/request', function (req, res) {
	res.send('Test POST request');
});

app.put('/request', function (req, res) {
	res.send('Test PUT request');
});

app.delete('/request', function (req, res) {
	res.send('Test DELETE request');
});

// implement http status code
app.all('*', function (req, res) {
	res.status(HttpStatus.NOT_FOUND).send('Sorry, this page was not found...');
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

// display post request for forms
app.post('/forms', function (req, res) {
	res.send("Name: " + req.body.user_name + "<br>" +
			 "Email: " + req.body.user_mail + "<br>" +
			 "Message: " + req.body.user_message);
});