"use strict";

var express = require('express');

var app = express();
var port = process.env.PORT || 5001; //Middleware

app.use(express["static"]('public'));
app.use(express.json());
app.use(express.urlencoded({
  extended: true
})); //Handle all request

app.all('*', function (req, res) {
  console.log(req.params);
  res.send('hello world');
});
app.listen(port, function () {
  console.log("Proxy listening on port ".concat(port));
});
