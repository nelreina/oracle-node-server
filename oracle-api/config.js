//ORACLE DB SETTINGS/ CONFIG
var trading = {
    dev: {
        user: 'TRADING',
        password: 'history',
        connectString: 'rx-ucs-0-03.nl.glencore.com:1521/ttsd01pw.nl.glencore.com',
        poolMin: 1,
        poolMax: 3,
        poolIncrement: 1
    },
    test: {
        user: 'TRADING',
        password: 'history',
        connectString: 'db-ucs-1-03.nl.glencore.com:1521/ttst01pw.nl.glencore.com',
        poolMin: 1,
        poolMax: 3,
        poolIncrement: 1
    },
    prod: {
        user: 'IT_NREI1',
        connectString: 'nlrtd01ora003.nl.glencore.com:1521/ttsp01pw.nl.glencore.com',
        password: 'Nman77.0715',
        poolMin: 1,
        poolMax: 3,
        poolIncrement: 1
    }
};

var connectionESB = {
    user: 'ESB',
    connectString: 'rx-ucs-0-02.nl.glencore.com:1521/esbp01pw.nl.glencore.com',
    password: '78GHsd98',
    poolMin: 1,
    poolMax: 3,
    poolIncrement: 1

};

var fuse = {
    dev: {
        'host': 'http://vm-srv-155.nl.glencore.com:9191',
    },
    test: {
        'host': 'http://vm-srv-158.nl.glencore.com:9191'
    },
    prod: {
        'host': 'http://10.40.21.140:9191',
        // 'host': 'http://vm-srv-162.nl.glencore.com:9191',
        'ip':'10.40.21.140'
    }
}
var env = 'dev'; 
// var env = 'test'; 
var env = 'prod'; 
console.log("Connecting to %s enviroment!", env);

exports.fuse = fuse[env];
exports.connectionTrading = trading[env];

exports.connectionESB = connectionESB;

exports.HOST = '0.0.0.0';
exports.PORT = 8081;
