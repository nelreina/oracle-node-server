(function () {
    'use strict';
    angular.module('systemManagement').directive('statusIcon', statusIcon);

    /** @ngInject */
    function statusIcon () {
        return {
            replace: true,
            transclude: true,
            templateUrl: 'app/components/directives/statusIcon.tpl.html',
            scope: {
                "status": "@",
                'isNumber': '@'
            },
            controller: directiveCtrl,
            controllerAs: 'vm',
            bindToController: true

        };

        function directiveCtrl() {
            var dir = this;
            console.log("dir.isNumber",dir.isNumber);
            
        }
    }
})(); 
