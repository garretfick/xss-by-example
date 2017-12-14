var express = require('express');
var exphbs  = require('express-handlebars');

// invoke an instance of express application.
var app = express();

// Set ourselves to use handlebars view engine
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

// Serve static files from public
app.use(express.static('public'))

// set our application port
app.set('port', 9000);

// route for Home-Page
app.get('/', (req, res) => {
  res.render('images');
});

// route for handling 404 requests(unavailable routes)
app.use(function (req, res, next) {
  res.status(404).send("Sorry can't find that!")
});

// start the express server
app.listen(app.get('port'), () => console.log(`App started on port ${app.get('port')}`));
