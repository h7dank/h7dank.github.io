var express = require('express');
var path = require('path');
var fs = require('fs');
var _ = require('underscore');
var port = process.env.PORT || 3000;
var app = express();

var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');

app.use(cookieParser());

app.use(session({
  secret: 'imooc',
  resave: false,
  saveUninitialized: true

}))
mongoose.connect("mongodb://localhost/movie"); 
app.set('views', './app/views/pages');
app.set('view engine', 'jade');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(require('connect-multiparty')());
app.locals.moment = require('moment');
app.listen(port);
require('./config/routes')(app);
if('development' === app.get('env')){
	app.set('showStackError', true);
	app.use(logger(':method :url :status'));
	app.locals.pretty = true;
	mongoose.set('debug', true);
}
console.log('success connected ' + port);








