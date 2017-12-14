var express = require('express');
var exphbs  = require('express-handlebars');

// invoke an instance of express application.
var app = express();

// Set ourselves to use handlebars view engine
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

// set our application port
app.set('port', 9000);

// We want to disable some XSS protection since that's what we are demonstrating here
app.use((req, res, next) => {
  res.append('X-XSS-Protection', '0');
  next();
});

// route for Home-Page
app.get('/', (req, res) => {
  // Get the value that the user has supplied for the query
  var query = req.query && req.query.q;
  // We might do a query, but for our purposes here, no query
  // needed
  var results = [];
  res.render('search', { query, results });
});

// route for handling 404 requests(unavailable routes)
app.use(function (req, res, next) {
  res.status(404).send("Sorry can't find that!")
});

// start the express server
app.listen(app.get('port'), () => console.log(`App started on port ${app.get('port')}`));
