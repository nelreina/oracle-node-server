/**
 * Created by nrei1 on 30/05/2015.
 */
require('string-format-js');
var $q =  require('q');
var _  =  require('lodash');

function execute(db, sql, params, type){
    var deferred = $q.defer();
    db.getConnection(function(err, connection){
        if (err){
            deferred.reject(err);
        }
        connection.execute(sql, params, function (err, result) {
            if (err){
                deferred.reject(err);
            } else {
                switch (type){
                    case 'select':
                        deferred.resolve(result.rows);
                        break;
                    case 'function':
                        deferred.resolve(result.rows[0]);
                        break;
                    case 'procedure':
                        deferred.resolve(result.outBinds);
                        break;
                    case 'insert':
                    case 'delete':
                    case 'update':
                        deferred.resolve(result.rowsAffected);
                        break;
                    default:

                        deferred.reject(new Error('No supported type: ' + type));
                        break;
                }
            }
            connection.release(function(err){
                if (err) console.log('err', err);
            });
        });
    });
    return deferred.promise;
}

function executeSelect(db, sql, params){
    var deferred = $q.defer();
    if (_.startsWith(sql, 'SELECT')){
        execute(db, sql, params, 'select')
            .then(function(data){
                deferred.resolve(data);
            },function(err){
                deferred.reject(err);
            }
        );
    } else {
        var err = new Error('Only select statements are allowed !')
        deferred.reject(err);
    }

    return deferred.promise;
}
function executeFunction(db, functionName, params){
    var deferred = $q.defer();
    var sql = 'SELECT %s from dual'.format(functionName);
    execute(db, sql, params, 'function')
        .then(function(data){
            deferred.resolve(data);
        },function(err){
            deferred.reject(err);
        }
    );

    return deferred.promise;
}
function executeProcedure(db, procedureName, params){
    var deferred = $q.defer();
    var sql = buildProcedureCall(procedureName, params); 
    execute(db, sql, params, 'procedure')
        .then(function(data){
            deferred.resolve(data);
        },function(err){
            deferred.reject(err);
        }
    );

    return deferred.promise;
}
function routeSimpleFunction(pool, functionName){
    return function(req, res){
        var params = {};
        executeFunction(pool, functionName, params).then(function(data){
            res.status(200).send(data);
        }, function(err){
            res.status(500).send({message:err.message});
        })
    }
}
function routeSimpleProcedure(pool, procedureName){
    return function(req, res){
        var params = {};
        executeFunction(pool, procedureName, params).then(function(data){
            res.status(200).send(data);
        }, function(err){
            res.status(500).send({message:err.message});
        })
    }
}

function buildProcedureCall (procedureName, params) {
    var text = 'BEGIN ' + procedureName + '(';
    var keys = _.keys(params);
    var i = 1;
    keys.forEach(function(key) {
        text += i === 1 ? '' : ', ';
        text += ':' + key;
        i++;
    });
    text += ');  END; ';
console.log("text",text);

    return text; 
}

exports.executeSelect = executeSelect;
exports.executeFunction = executeFunction;
exports.executeProcedure = executeProcedure;
exports.routeSimpleFunction = routeSimpleFunction;
