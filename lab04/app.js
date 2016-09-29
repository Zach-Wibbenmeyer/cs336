/***********************************
 * app.js - basic server express app
 * CS336 - Web Development
 * Instructor: Keith Vanderlinden
 * Author: Zach Wibbenmeyer
 * Date: September 28, 2016
 ***********************************/

var express = require('express');
var app = express();

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

app.use(express.static('public'));