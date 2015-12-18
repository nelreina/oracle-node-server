var express  = require('express');
var trading  = express.Router();
var oracledb = require('oracledb');
var cfg      = require('../config');
var $ora     = require('../services/oracle');
var fs       = require('fs');

module.exports = trading;


oracledb.maxRows    = 1000;
oracledb.autoCommit = true;
oracledb.outFormat  = oracledb.OBJECT;

oracledb.createPool(cfg.connectionTrading, defineRoutes);

var listSql        = fs.readFileSync(__dirname + '/message-meta-list.sql').toString();
var detailsSql     = fs.readFileSync(__dirname + '/message-meta-details.sql').toString();
var quantumPending = fs.readFileSync(__dirname + '/quantum-pending-jobs.sql').toString();
var quantumLog     = fs.readFileSync(__dirname + '/quantum-log.sql').toString();
var ttslite        = fs.readFileSync(__dirname + '/ttslite-interface.sql').toString();

function defineRoutes (err, db){
    if (err) throw err;
    trading.route('/message-meta-list'       ).get(getMessageMetaList(db));
    trading.route('/message-meta-details/:id').get(getMessageDetails(db));
    trading.route('/message-redo'            ).post(updateMessageStatus(db));
    trading.route('/quantum-pending-jobs'    ).get(getQuantumPending(db));
    trading.route('/quantum-log'             ).get(getQuantumLog(db));
    trading.route('/ttslite'                 ).get(getTTSLite(db));
}

function updateMessageStatus(db) {
    return function (req, res) {
        var params = req.body; 
        params.processStatus = '00';  
        $ora.executeProcedure(db, 'trading.pck_esb.sp_update_message_status', params).then(function(data){
            res.status(200).send(data);
        }, function(err){
            console.log("err",err);
            res.status(500).send({message:err.message});
        })
    }
    
}

function getMessageMetaList(db){
    var sql = listSql;
    return function(req, res){
        var params                      = {};
        params.site_nr                  = req.query.site_nr || null;
        params.user_id                  = req.query.user_id || null;
        params.process_status           = req.query.process_status || null;
        params.main_doc_registration_nr = req.query.main_doc_registration_nr || null;
        params.message_type             = req.query.message_type || 'DOCUMENT';
        params.dttime                   = getDtTime(req.query.timeVal || 'today')

        $ora.executeSelect(db, sql, params).then(function(data){
            console.log("data.length",data.length);
            
            res.status(200).send(data);
        }, function(err){
            console.log("err",err);
            
            res.status(500).send({message:err.message});
        })
    }
}
function getMessageDetails(db){
    var sql = detailsSql;
    return function(req, res){
        var params = {};
        params.main_doc_registration_nr = req.params.id ;

        $ora.executeSelect(db, sql, params).then(function(data){
            res.status(200).send(data);
        }, function(err){
            res.status(500).send({message:err.message});
        })
    }
}
function getQuantumPending(db){
    var sql = quantumPending;
    return function(req, res){
        var params = {};
        //params.main_doc_registration_nr = req.params.id ;

        $ora.executeSelect(db, sql, params).then(function(data){
            res.status(200).send(data);
        }, function(err){
            res.status(500).send({message:err.message});
        })
    }
}
function getQuantumLog(db){
    var sql = quantumLog;
    return function(req, res){
        var params = {};
        //params.main_doc_registration_nr = req.params.id ;

        $ora.executeSelect(db, sql, params).then(function(data){
            res.status(200).send(data);
        }, function(err){
            res.status(500).send({message:err.message});
        })
    }
}
function getTTSLite(db){
    var sql = ttslite;
    return function(req, res){
        var params = {};
        //params.main_doc_registration_nr = req.params.id ;

        $ora.executeSelect(db, sql, params).then(function(data){
            res.status(200).send(data);
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