/**
 * Created by nrei1 on 08/06/2015.
 */

require('string-format-js');
require('colors');
moment = require('moment');

exports.logger = function(req, res, next){
    var time = '%s'.gray.format(moment().format('hh:mm:ss'));
    var method = req.method;
    var path = req.path;
    var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    var logText = '[%s] %s %s %s'.format(time, ip,  method, path);
    console.log(logText);
    next();
}