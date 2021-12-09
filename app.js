var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require ("mongoose");
var hbs = require('hbs');
var session = require('express-session');
var mongoose = require ("mongoose");
var routes = require ("./routes/index");
var index = require('./routes/index');
var product = require ('./models/product');
var products = require('./routes/products');


mongoose.connect('mongodb+srv://admin:admin@cluster0.9rut7.mongodb.net/TiendaDB?retryWrites=true&w=majority', function (error){
if (error) {

throw error;

}else{
console.log('listo la conexion a la base de datos');
}

});


var app = express();

// view engine setup
app.use(favicon(path.join(__dirname, 'favicon.png')));
app.set('views', path.join(__dirname, 'views'));
hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs','ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: true
}))
app.use(express.static(path.join(__dirname, 'public')));

// res.locals is an object passed to hbs engine
app.use(function(req, res, next) {
    res.locals.session = req.session;
    next();
});


app.use('/', index);
app.get('/saveitem', products.create);
app.post('/additem', products.store);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
