var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var exphbs  = require('express-handlebars');
var Post = require('./models/post');

// invoke an instance of express application.
var app = express();

// Set ourselves to use handlebars view engine
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

// set our application port
app.set('port', 9000);

// set morgan to log info about our requests for development use.
app.use(morgan('dev'));

// initialize body-parser to parse incoming parameters requests to req.body
app.use(bodyParser.urlencoded({ extended: true }));

app.route('/')
    .get((req, res) => {
        Post.findAll().then(posts => {
            res.render('posts', { posts });
        })
    })
    .post((req, res) => {
        var content = req.body.content;
        console.log(content);
        if (content.length > 0) {
            Post.create({
                content: req.body.content
            })
            .then(() => {
                res.redirect('/');
            })
            .catch(error => {
                res.redirect('/');
            })
        } else {
            res.redirect('/');
        }
    })


// route for handling 404 requests(unavailable routes)
app.use(function (req, res, next) {
  res.status(404).send("Sorry can't find that!")
});


// start the express server
app.listen(app.get('port'), () => console.log(`App started on port ${app.get('port')}`));