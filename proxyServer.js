const express = require('express');
const app = express();
const port = process.env.PORT || 5001;
const Axios = require('axios');

//Middleware
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

const ricardoBasePath = 'http://searchbarricardo2-dev.us-east-2.elasticbeanstalk.com';

//Handle all request
app.all('*', (req, res) => {
    let currentQuery = req.params[0];
    console.log('params',req.params[0]);
    if(currentQuery.includes('products')){
       console.log(currentQuery, "ricardo");
       Axios.get(`${ricardoBasePath}/api/get/products`)
       .then((products) => {
           console.log(products);
           res.send(products);
       })
       .catch((err) => {
           console.log("Oopss something went wrong");
       });
    }
    res.send('hello world');
});

app.listen(port, () => {
    console.log(`Proxy listening on port ${port}`);
});