(function() {
  'use strict';

  angular
    .module('systemManagement')
    .controller('DocumentController', DocumentController);

  /** @ngInject */
  function DocumentController($http, API) {
    var vm = this;
    vm.title = 'ESB TTS Documents';
    vm.query = {};
    vm.query.timeVal = '15min';
    vm.tolalCount = 0;
    vm.showToolPanel = false;
    //vm.query.main_doc_registration_nr = 8100115;

    vm.searchDocReg = function(){
      return false;
      //return vm.query.main_doc_registration_nr.length > 0 ;
    };

    var dateTemplate = '<span>\n  {{data.datetimeRequested | date:"dd-MM-yyyy HH:mm"}}\n</span>';
    var destination  = '<destination name="{{data.userDestination}}" type="{{data.userDestinationType}}"></destination>';
    var statusTemplate = '<status-icon status="{{data.processStatus}}" ></status-icon>';
    var viewImage = '<a class="btn btn-default btn-sm" \n   ui-sref="documents.details({\n    id:data.mainDocRegistrationNr,\n    documentNr:data.documentNr,\n    transactionNr:data.transactionNr\n   })">\n  <i class="fa fa-info-circle fa-2x"></i>\n</a>\n<show-image size="sm"\n            id="{{data.mainDocRegistrationNr}}"\n            document-nr="{{data.documentNr}}"\n            transaction-nr="{{data.transactionNr}}">\n  \n</show-image>\n';
    var columnDefs = [
      {'headerName':''                    , 'width': 25 , 'template':statusTemplate},
      {'headerName':'Doc'                 , 'width': 80 , 'field':'mainDocRegistrationNr'},
      {'headerName':'User'                , 'width': 70 , 'field':'userIdRequester'},
      {'headerName':'User Setup'          , 'width': 200 , 'field':'userDestination', 'template':destination },
      {'headerName':'Doc Descrition'      , 'width':600 , 'field':'msgDescription', 'filter':'text'},
      {'headerName':'Action'              , 'width': 80 , 'template':viewImage , filter:false},
      {'headerName':'Site'                , 'width':110 , 'field':'userSite'},
      {'headerName':'Date Time Requested' , 'width':150 , 'template':dateTemplate}
    ];

    vm.gridOptions = {
      angularCompileRows: true,
      columnDefs: columnDefs,
      rowData: null,
      enableColResize: true,
      enableFilter: true,
      enableSorting:true,
      showToolPanel: vm.showToolPanel
    };

    vm.search = function(){
      if (vm.query.user_id){
        vm.query.user_id = vm.query.user_id.toUpperCase();
      }
      if (vm.query.main_doc_registration_nr){
        vm.query.timeVal = null;
      }
      //vm.gridOptions.api.refreshView();
      $http.get(API + '/message-meta-list', {params:vm.query})
        .success(function(data){
          var msgs = data.map(function(r){
            if (r.documentNr === 25){
              r.msgDescription += ' / ' + r.contractReference;
            }
            return r;
          })
          vm.tolalCount = msgs.length;
          vm.gridOptions.rowData = msgs;
          vm.gridOptions.api.onNewRows();
          vm.gridOptions.api.sizeColumnsToFit();


        });
    };

    vm.search(true);


  }
})();
