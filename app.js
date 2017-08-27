let express = require('express');
let path = require('path');
let fs = require('fs');
let bodyParser = require('body-parser');
let compression = require('compression');
// Morgan logger
let morgan = require('morgan')
let routes = require('./routes');

// create a write stream (in append mode) file to which logs will be written
var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), {flags: 'a'});

let logger = morgan("combined");


let app = express();

// compression middleware
app.use(compression());

// Set port 
app.set("port", process.env.PORT || 3000);

// setup the logger
app.use(morgan("combined", {stream: accessLogStream}));

// Configure bodyParser middleware
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// Configure static files middleware
app.use(express.static(path.resolve(__dirname, 'public')));

// Configure view engine --Embedded javaScript
app.set('view engine', 'ejs');
app.set('views', path.resolve(__dirname,'views'));
app.use('/', routes);

// "page not found" middleware
app.use(function (req, res, next) {
  res.status(404).render("404", {
      title: "Page not found - Joel Wilson"
  });
  next();
})

// Start application on port provided by hosting environment.
app.listen(app.get("port"), () => {
    console.log("Application started on port " + app.get("port") + ".");
});
