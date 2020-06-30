"use strict";

var express = require('express');

var app = express();
var port = process.env.PORT || 5001;

var httpProxy = require('http-proxy'); //Middleware


app.use(express["static"]('public'));
app.use(express.json());
var ricardoBasePath = 'http://searchbarricardo2-dev.us-east-2.elasticbeanstalk.com';
var chrisBasePath = 'http://imagecomponent-env-1.eba-4mfwjdhg.us-east-2.elasticbeanstalk.com';
var joshBasePath = 'http://newcarousel-env.eba-irp2rurw.us-east-2.elasticbeanstalk.com/';
var benBasePath = 'http://111111-env.eba-9uquamkj.us-east-2.elasticbeanstalk.com'; //Create proxy server

var proxy = httpProxy.createProxyServer({}); //Handle all request

app.all('*', function (req, res) {
  var route = req.params[0];
  console.log("REQUEST MADE", route[0]);

  if (route === '/api/get/products') {
    proxy.web(req, res, {
      target: ricardoBasePath
    });
  } else if (route === '/display') {
    proxy.web(req, res, {
      target: chrisBasePath
    });
  } else if (route === '/products') {
    proxy.web(req, res, {
      target: joshBasePath
    });
  } else if (route === '/api/getReviews') {
    proxy.web(req, res, {
      target: benBasePath
    });
  } else {
    res.status(400).send(route);
  }
});
app.listen(port, function () {
  console.log("Proxy listening on port ".concat(port));
});
