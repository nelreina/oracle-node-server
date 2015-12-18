(function () {
  'use strict';

  angular
    .module('systemManagement')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log, StateWatcherService) {
    StateWatcherService.run();
    $log.debug('runBlock end');
  }

})();
