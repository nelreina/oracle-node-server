/**
 * Created by nrei1 on 22/06/2015.
 */
(function () {
  'use strict';
  angular.module('dx.Services').directive('dateTime', dateTime);
  function dateTime () {
    return {
      replace: true,
      templateUrl: '<span>{{date | date:"dd-MM-yyyy HH:mm"}}</span>',
      scope: {
        "date": "=",
      },
    };

  }
})();
