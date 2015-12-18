(function () {
    'use strict';
    angular.module('systemManagement').directive('destination', destination);

    /** @ngInject */
    function destination () {
        return {
            replace: true,
            transclude: true,
            templateUrl: 'app/components/directives/destination.tpl.html',
            scope: {
                "type": "@",
                "name": "@",
                "fileName": "@",
            },
            controller: directiveCtrl,
            controllerAs: 'vm',
            bindToController: true

        };

        function directiveCtrl() {
            var dir = this;
        }
    }
})(); 
