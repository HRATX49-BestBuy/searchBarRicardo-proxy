const express = require('express');
const app = express();
const port = process.env.PORT || 5001;
const httpProxy = require('http-proxy');

//Middleware
app.use(express.static('public'));
app.use(express.json());


const ricardoBasePath = 'http://searchbarricardo2-dev.us-east-2.elasticbeanstalk.com';
const chrisBasePath = 'http://imagecomponent-env-1.eba-4mfwjdhg.us-east-2.elasticbeanstalk.com';
const joshBasePath = 'http://newcarousel-env.eba-irp2rurw.us-east-2.elasticbeanstalk.com/';
const benBasePath = 'http://111111-env.eba-9uquamkj.us-east-2.elasticbeanstalk.com';

//Create proxy server
const proxy = httpProxy.createProxyServer({});

//Handle all request
app.all('*',(req,res)=>{
    let route = req.params[0];
    console.log("REQUEST MADE",route[0])
    if (route === '/api/get/products'){
      proxy.web(req, res, { target: ricardoBasePath });
    } else if (route === '/display') {
      proxy.web(req, res, { target: chrisBasePath });
    } else if (route === '/products'){
      proxy.web(req, res, { target: joshBasePath });
    } else if (route === '/api/getReviews'){
      proxy.web(req,res,{target: benBasePath });
    } else {
      res.status(400).send(route);
    }
  });

app.listen(port, () => {
    console.log(`Proxy listening on port ${port}`);
});