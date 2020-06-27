"use strict";

var express = require('express');

var app = express();
var port = process.env.PORT || 5001;

var Axios = require('axios'); //Middleware


app.use(express["static"]('public'));
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
var ricardoBasePath = 'http://searchbarricardo2-dev.us-east-2.elasticbeanstalk.com'; //Handle all request

app.all('*', function (req, res) {
  var currentQuery = req.params[0];
  console.log('params', req.params[0]);

  if (currentQuery.includes('products')) {
    console.log(currentQuery, "ricardo");
    Axios.get("".concat(ricardoBasePath, "/api/get/products")).then(function (products) {
      console.log(products);
      res.send(products);
    })["catch"](function (err) {
      console.log("Oopss something went wrong");
    });
  }

  res.send('hello world');
});
app.listen(port, function () {
  console.log("Proxy listening on port ".concat(port));
});
