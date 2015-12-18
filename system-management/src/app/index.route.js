(function() {
  'use strict';

  angular
    .module('systemManagement')
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('main', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainController',
        controllerAs: 'main',
        data:{
          auth:false
        }
      })
      .state('documents', {
        url: '/documents',
        templateUrl: 'app/documents/grid.html',
        controller: 'DocumentController',
        controllerAs: 'doc',
        data:{
          auth:false
        }
      })
      .state('quantum', {
        url: '/quantum',
        templateUrl: 'app/quantum/main.html',
        controller: 'QuantumController',
        controllerAs: 'qtm',
        data:{
          auth:false
        }
      })
      .state('ttslite', {
        url: '/ttslite',
        templateUrl: 'app/ttslite/main.html',
        controller: 'TTSLiteController',
        controllerAs: 'ttsl',
        data:{
          auth:false
        }
      })


    ;

    $urlRouterProvider.otherwise('/');
  }

})();
