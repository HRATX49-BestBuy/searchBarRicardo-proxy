const express = require('express');
const app = express();
const port = process.env.PORT || 5001;

//Middleware
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//Handle all request
app.all('*', (req, res) => {
    console.log(req.params);
    res.send('hello world');
});

app.listen(port, () => {
    console.log(`Proxy listening on port ${port}`);
});