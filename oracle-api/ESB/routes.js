var express = require('express');
var esb = express.Router();
var oracledb = require('oracledb');
var cfg = require('../config');
var $ora = require('../services/oracle');
var fs = require('fs');
var _ = require('lodash'); 
var moment = require('moment'); 

module.exports = esb;


oracledb.maxRows = 150000;
oracledb.autoCommit = true; 
oracledb.outFormat = oracledb.OBJECT;

oracledb.createPool(cfg.connectionESB, defineRoutes);

var listSql = fs.readFileSync(__dirname + '/esb-log.sql').toString();

function defineRoutes (err, db){
    if (err) throw err;
    esb.route('/esb-log').get(getMessageMetaList(db));
}

function getMessageMetaList(db){
    var sql = listSql;
    return function(req, res){
        var params = {};
        // params.dttime = getDtTime(req.query.timeVal || 'today')

        $ora.executeSelect(db, sql, params).then(function(data){
            console.log("data.length",data.length);
            var response = calcTotals(data); 
            res.status(200).send(response);
            
            // res.status(200).send(response);
        }, function(err){
            res.status(500).send({message:err.message});
        })
    }
}


function getDtTime(val){
    var oneDay = 1440;
    var dttime = oneDay;
    switch(val){
        case '15min'   : dttime = 15;break;
        case '30min'   : dttime = 30;break;
        case '1hour'   : dttime = 60;break;
        case '1week'   : dttime =  7 * oneDay;break;
        case '2weeks'  : dttime = 14 * oneDay;break;
        case '1month'  : dttime = 30 * oneDay;break;
        case '2months' : dttime = 60 * oneDay;break;
        case '3months' : dttime = 90 * oneDay;break;
        default:
            console.log("%s is not supported yet so default is one day!", val);
            break;
    }
    return dttime;
}

function calcTotals (data) {
 var calc = data.map(function(item) {
       item.year    = moment(item.logTime).format('YYYY');
       item.month   = moment(item.logTime).format('MMMM');
       item.week    = moment(item.logTime).format('W');
       item.weekDay = moment(item.logTime).format('dddd');
       item.day     = moment(item.logTime).format('MMMM dddd D');
       item.hour    = moment(item.logTime).format('dddd H');
      
       return item; 
    }); 
 calc =  _.chain(calc)
               .groupBy("logProcess")
               .mapValues(function(val , key) {
                  var ret = {
                     // day:periodTotals(val, 'day'),
                     weekDay:periodTotals(val, 'weekDay'),
                     // week:periodTotals(val, 'week'),
                     // month:periodTotals(val, 'month'),
                  }; 
                  return {totals:ret}
               })
                .value(); 
 return calc; 
}; 

function periodTotals(collection, period){
 var totals =   _.chain(collection)
                  .groupBy( period)
                  .mapValues(function(val, key) {
                     var total = _.sum(val, function(item) {
                        return item.count; 
                     }); 
                     return {count:total}
                  })
                  .map(function(val ,  k ) {
                    var arr = {}; 
                    arr[k] = val.count; 
                    return arr; 
                  })
                  .value(); 
 // var ret = {}; 
 // ret[period] = totals; 
return totals;
 }; 
