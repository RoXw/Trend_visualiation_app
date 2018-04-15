var express         = require('express');
var path            = require('path');
var cookieParser    = require('cookie-parser');
var bodyParser      = require('body-parser');
var requireFu       = require('require-fu');
var app = express();
app.set('trust proxy', 1);

// view engine setup
/*app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');*/

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

requireFu(__dirname + '/routes')(app);


app.disable('view cache');

app.use(function (req, res, next) {
    //if(req.url.indexOf("/js") < 0 && req.url.indexOf("/css") < 0 && req.url.indexOf("/fonts") < 0 && req.url.indexOf("/img") < 0
    //    && req.url.indexOf("/installapps") < 0) {
        res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
        res.header('Expires', '-1');
        res.header('Pragma', 'no-cache');
    //}
    next()
});


module.exports = app;
