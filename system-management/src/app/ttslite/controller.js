(function() {
    'use strict';
    angular.module('systemManagement')
        .controller('TTSLiteController', TTSLiteController);

    /** @ngInject */
    function TTSLiteController($http, API) {
        var vm = this;
        vm.log = [];
        vm.refresh = refresh; 
        // var gridOptions =
       var dateUpdateTemplate = '<span>\n  {{data.dateUpdate | date:"dd-MM-yyyy HH:mm"}}\n</span>';
       var dateCreateTemplate = '<span>\n  {{data.creationDate | date:"dd-MM-yyyy HH:mm"}}\n</span>';
       var messagePopover = '<span style="width:100px; word-wrap: break-word;" popover="{{data.interfaceError}}" popover-placement="bottom"  popover-trigger="mouseenter">{{data.interfaceError}}</span>'; 

       var logDefs = [
         {'headerName' : 'Craetion date' , 'width':40   , 'template':dateCreateTemplate},
         {'headerName' : 'User'          , 'width':20   , 'field':'loginId'},
         {'headerName' : 'Object'        , 'width':50   , 'field':'objectId'},
         {'headerName' : 'Key'           , 'width':25   , 'field':'keyId'},
         {'headerName' : 'Last Update'   , 'width':40   , 'template':dateUpdateTemplate},
         {'headerName' : 'Error Message' , 'width':100  ,  'filter':'text' , 'template':messagePopover},
       ];


        vm.logOptions =  {
            angularCompileRows: true,
            rowData: null,
            enableColResize: true,
            enableFilter: true,
            enableSorting: true,
            // rowHeight:'auto'
        }; 
        vm.logOptions.columnDefs =logDefs; 

        
        activate();
        function refresh () {
            $http.get(API + '/ttslite').then(function(response) {
                
                vm.log = response.data;
                vm.logOptions.rowData = response.data;
                vm.logOptions.api.onNewRows();
                vm.logOptions.api.sizeColumnsToFit();
                
            })
        }
        function activate() {
            refresh(); 
        }
    }


})();
