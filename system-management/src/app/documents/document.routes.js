(function() {
  'use strict';

  angular
    .module('systemManagement')
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider, $urlRouterProvider) {
    $stateProvider      
      .state('documents.image', {
        url: '/image/:id/:documentNr/:transactionNr',
        //params:['id','documentNr', 'transactionNr' ],
        templateUrl: 'app/documents/image.html',
        controller: 'DocumentImageController',
        controllerAs: 'img',
        backdrop:' ',
        size:'lg',
        data:{
          auth:false,
          modal:true
        }
      })
      .state('documents.details', {
        url: '/details/:id/:documentNr/:transactionNr',
        templateUrl: 'app/documents/details.html',
        controller: 'DocumentDetailsController',
        controllerAs: 'details',
        backdrop:' ',
        size:'lg',
        data:{
          auth:false,
          modal:true
        }
      }); 
  }

})();
