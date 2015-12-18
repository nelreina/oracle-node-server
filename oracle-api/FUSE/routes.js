var express = require('express');
var jboss = express.Router();
var request = require('request');
var esb = require('../config').fuse;
var js2xmlparser = require("js2xmlparser");

var keyfile = '/dms-service/export'; 
var contract = '/preview/contract'; 


// PROXY FOR JBOSS FUSE



jboss.route('/keyfile/:docReg').get(getKeyfileDoc);
jboss.route('/contract/:transactionNr').get(getPreviewDoc);
jboss.route('/test/foutedo').get(foute);
jboss.route('/test/foutedo').post(foute);

function getKeyfileDoc (req, res) {
     var url = esb.host + keyfile + '/' + req.params.docReg;     
     req.pipe(request(url)).pipe(res);
}
function getPreviewDoc (req, res) {
     var url = esb.host + contract;    
     url += '?transaction_nr=' + req.params.transactionNr;
     url += '&transaction_subnr&transaction_exnr&language_code';
     url += '&user_id=SYSTEM&document_nr=25';
     req.pipe(request(url)).pipe(res);
}

function foute (req, res) {
   var data =  {
      Code:2,
      Text:"Delivery can't be changed anymore. State = 610"
   }
   var xml = js2xmlparser("ProcessingResult", data) 
   // console.log(req.body);
   res.set('Content-Type', 'application/xml');
   res.send(xml); 
   // return  ; 
}



module.exports = jboss;
