/**
 * Created by nrei1 on 22/06/2015.
 */
(function () {
  'use strict';
  /* global _ */
  angular
    .module('systemManagement')
    .controller('DocumentDetailsController', DocumentDetailsController);

  /** @ngInject */
  function DocumentDetailsController($modalInstance, $stateParams, $http, API, toastr) {
    var vm = this;
    //vm.data = [];
    vm.repossessedDocs = repossessedDocs;
    vm.title = '';
    vm.email = '';
    vm.id = $stateParams.id;
    vm.transactionNr = $stateParams.transactionNr;
    vm.documentNr = $stateParams.documentNr;
    vm.metaNrs = '';
    vm.getMetaNrs = getMetaNrs;
    activate();

    function activate() {
      vm.redoDocs = false;
      $http.get(API + '/message-meta-details/' + vm.id)
        .then(function (res) {
          var data = _.groupBy(res.data, 'aggregatorId');
          data = _.mapValues(data, function (v, k) {
            var mf = {};
            mf.id = k;
            mf.esbMessageMetaNr = '';
            mf.redo = false;
            v.forEach(function (o) {
              for (var k in o) {
                switch (k) {
                  case 'emailaddressRequestor':
                    vm.email = o[k];
                    break;
                  case 'msgDescription':
                    vm.title = o[k];
                    break;
                  case 'esbMessageMetaNr':
                    mf[k] += o[k] + ';';
                    break;
                  default :
                    mf[k] = o[k];

                }
              }
            });
            return mf;
          });
          vm.data = data;

        });
    }

    function repossessedDocs(){
      var metaArray = vm.metaNrs; //.substring(0, vm.metaNrs.length - 1);
      $http.post(API + '/message-redo', {'metaNrArray':metaArray})
        .then(function(response){
          toastr.success(vm.id + ' is send to ESB to be repossessed! ')
          close();
        }, function(err){
          toastr.error(vm.id + ' could not be repossessed! ');
          close();
        });
    }

    function getMetaNrs(){
      vm.metaNrs = '';
      _.mapValues(vm.data, function(v){
        vm.metaNrs += v.redo ? v.esbMessageMetaNr :'';
      });
      console.log(vm.metaNrs);
      vm.redoDocs = (vm.metaNrs.length > 0 );
    }

    function close() {
      $modalInstance.close({});
    }


  }
})();
