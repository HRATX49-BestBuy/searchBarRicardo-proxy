const express = require('express');
const app = express();

//Middleware
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//Handle all request
app.all('*', (req, res) => {
    console.log(req.params);
    res.send('hello world');
});

app.listen(5001, () => {
    console.log('Proxy listening on port 5001');
});