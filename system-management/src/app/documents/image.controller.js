/**
 * Created by nrei1 on 22/06/2015.
 */
(function() {
  'use strict';

  angular
    .module('systemManagement')
    .controller('DocumentImageController', DocumentImageController);

  /** @ngInject */
  function DocumentImageController($modalInstance, $stateParams, API, $sce) {
    var vm = this;
    vm.valid = _.has($stateParams, 'id') ;
    vm.close = close;
    activate();

    function activate() {
      console.log( $stateParams.transactionNr);
      console.log( $stateParams.documentNr);

      var url = API ;
      if ($stateParams.transactionNr && $stateParams.documentNr === "25"){
        url += '/contract/' + $stateParams.transactionNr;
      } else {
        url += '/keyfile/' + $stateParams.id;
      }
      vm.imageUrl = $sce.trustAsResourceUrl( url) ;
    }

    function close(){
      $modalInstance.close({});
    }


  }
})();
