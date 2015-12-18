(function() {
    'use strict';
    angular.module('systemManagement')
        .controller('QuantumController', QuantumController);

    /** @ngInject */
    function QuantumController($http, API) {
        var vm = this;
        vm.pending = [];
        vm.log = [];
        vm.getPending = getPending; 
        vm.getLog = getLog; 
        // var gridOptions =
       var dateTemplate = '<span>\n  {{data.dateUpdate | date:"dd-MM-yyyy HH:mm"}}\n</span>';
       var statusTemplate = '<status-icon status="{{data.response}}" ></status-icon>';

       var logDefs = [
         {'headerName':' '             , 'width':10      , 'template':statusTemplate}, 
         {'headerName':'Log Time'      , 'width':45      , 'template':dateTemplate}, 
         {'headerName':'Action'        , 'width':35      , 'field':'action'},
         // {'headerName':'Dest'          , 'width':25      , 'field':'destination'},
         {'headerName':'Key'          , 'width':25      , 'field':'key'},
         {'headerName':'Message'       , 'width':100      , 'field':'message', 'filter':'text'},
       ];
       var pendingDefs = [
         {'headerName':'Title'              , 'field':'title'},
         {'headerName':'Company'            , 'field':'companyAbbr'},
         {'headerName':'Bank'               , 'field':'bankAbbr'},
         {'headerName':'Client'             , 'field':'clientAbbr'},
         {'headerName':'Invoice'            , 'field':'invoiceNr'},
         {'headerName':'User'               , 'field':'userModified'},
       ];


        vm.logOptions =  {
            angularCompileRows: true,
            rowData: null,
            enableColResize: true,
            enableFilter: true,
            enableSorting: true,
        }; 
        vm.logOptions.columnDefs =logDefs; 

        vm.pendingOptions = {
            angularCompileRows: true,
            rowData: null,
            enableColResize: true,
            enableFilter: true,
            enableSorting: true,
        }; 
        vm.pendingOptions.columnDefs =pendingDefs; 
        
        activate();
        function getPending () {
            $http.get(API + '/quantum-pending-jobs').then(function(response) {
                vm.pending = response.data;
                vm.pendingOptions.rowData = response.data;
                vm.pendingOptions.api.onNewRows();
                vm.pendingOptions.api.sizeColumnsToFit();
            })
        }
        function getLog () {
            $http.get(API + '/quantum-log').then(function(response) {
                vm.log = response.data;
                vm.logOptions.rowData = response.data;
                vm.logOptions.api.onNewRows();
                vm.logOptions.api.sizeColumnsToFit();
                
            })
        }
        function activate() {
            getPending(); 
            getLog(); 
        }
    }


})();
