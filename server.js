var cookieParser = require('cookie-parser');
var session = require('express-session');
var express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
var app = express();

app.use(cookieParser());
app.use(session({
    secret: 'cookie_secret',
    resave: true,
    saveUninitialized: true
}));
//define body parser to read request body
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

//set view engine to ejs
app.set('view engine', 'ejs');

// read environment variables
dotenv.config();

//define routes
require('./routes/authenticationRoutes')(app);
require('./routes/watchListRoutes')(app);

//about page
app.get('/about', function (req, res) {
    res.render('pages/about');
});

app.listen(8080);
console.log('server is listening on port 8080');