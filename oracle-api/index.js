var config = require('./config');
var express = require('express');
var logger  = require('./services/utils').logger;
var xmlparser = require('express-xml-bodyparser');
var bodyParser = require('body-parser');
var app = express();

app.use(cors);
app.use(logger);
app.use(bodyParser.json({ type: 'application/json' }));
app.use(bodyParser.urlencoded({extended: true}));
app.use(xmlparser()); 
app.use('/api', require('./TRADING/routes'));
app.use('/api', require('./ESB/routes'));
app.use('/api', require('./FUSE/routes'));
app.listen(config.PORT, function(){
    console.log('Api started on port %s', config.PORT);
});



function cors(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Origin, Authorization, X-Requested-With, Content-Type, Accept');
    next();
}

