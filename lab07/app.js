/* CS 336, Lab7
 * Professor: Keith Vanderlinden
 * Author: Zach Wibbenmeyer
 * Date: October 21, 2016
 */
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.use(express.static('public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

app.get("/fetch", function(req, res) {
	if (req.query.name) {
		res.send({"content" : req.query.name});
	}
});