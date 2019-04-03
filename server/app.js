const express = require('express');
const session = require('express-session');
const logger = require('morgan');
const cors = require('cors');
const flash = require('connect-flash');

 console.log('done fetching the petrol from the tank')
const app = express();
  console.log('starting the engine')

// Express body parser
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors())

console.log("middleware set")
// Express session
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  })
);

// Connect flash
app.use(flash());
console.log("session set")


console.log("encryption on")
// Global variables
app.use(function(req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

// Add routes
app.use(require('./routes/api/index'));

console.log("api  loaded")

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));
