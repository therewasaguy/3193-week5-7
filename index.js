var express = require('express');
var hbs = require('express-handlebars');

var app = express();

var Mongoose = require('mongoose');

require('dotenv').config();

Mongoose.connect(process.env.DB_URL);

var Cat = require('./models/cat');

//var tabby = new Cat({
//  name: "Tabby"
//});
//
//tabby.save(function(err) {
//  if (err) console.log('error saving');
//  else console.log('saved successfully');
//});

// data must be an object
var myData = {
  "cats" : [
    {"name": "tabby"},
    {"name": "otis"},
    {"name": "albee"},
    {"name": "albee"}
  ]
};

var portNum = 8888;
app.set('port', portNum);

// tell express to use handlebars
app.engine('handlebars', hbs({defaultLayout: 'main'}) );
app.set('view engine', 'handlebars');

app.get('/', function(req, res) {
  res.locals.title = 'Cool Cats';
  // render 'views/home.handlebars' with myData
  res.render('home', myData);
});

app.use( express.static('public') );

// start server
app.listen(portNum, function() {
  console.log('listening on port ', portNum);
});