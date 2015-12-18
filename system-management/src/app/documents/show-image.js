/**
 * Created by nrei1 on 24/06/2015.
 */
(function () {
  'use strict';
  angular.module('systemManagement').directive('showImage', showImage);
  function showImage() {
    return {
      replace: true,
      template: '<a class="btn btn-default btn-{{vm.size ||md }}" ng-click="vm.go()" ><i class="fa fa-2x fa-file-pdf-o red"></i></a>',
      scope: {
        "id": "@",
        "documentNr": "@",
        "transactionNr": "@",
        'size':'@'
      },
      controller: showImageCtrl,
      controllerAs: 'vm',
      bindToController: true

    };

    /** @ngInject */
    function showImageCtrl($state) {
      var dir = this;
      dir.go = go;
      dir.data = {};

      function go(){
        var params = {
          id:dir.id,
          transactionNr:dir.transactionNr,
          documentNr:dir.documentNr,
        };
        $state.go('documents.image', params);
      }
    }
  }
})();
