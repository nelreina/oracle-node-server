/* global malarkey:false, toastr:false, moment:false */
(function() {
  'use strict';

  angular
    .module('systemManagement')
    .constant('malarkey', malarkey)
    .constant('toastr', toastr)
    .constant('moment', moment)
    .constant('AUTH_HOME', 'main')
    .value('API', 'http://nlrtdwks09271:8081/api')
    .value('ESB', {
      'host':'http://vm-srv-155.nl.glencore.com:9191',
      'keyfile':'/dms-service/export',
      'contract':'/preview/contract'
    })

  ;

})();
