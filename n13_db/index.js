/**
 Gruppe 13 | n13
 */

var http = require('http');
var express = require('express');
var path = require( 'path' );
var bodyParser = require('body-parser');
//var hbs = require('express-hbs');


var app = express();

/*app.engine('hbs', hbs.express4());
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');*/

var router = express.Router();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(require("method-override")(function(req, res){
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        var method = req.body._method;
        delete req.body._method;
        return method;
    }
}));

app.use(require('./routes/noteRoutes.js'));
app.use(express.static(__dirname + '/'));
app.use(express.static(__dirname + '/sort'));
app.use(express.static(__dirname + '/finished'));
app.use( express.static( path.join( __dirname, '/views/' ) ) );

http.createServer(app).listen(3000);


