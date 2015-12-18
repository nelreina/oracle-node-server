/**
 * Created by nelsonreina on 5/16/15.
 */

(function () {
  'use strict';


  function authTokenService($window) {

    var storage = $window.localStorage;
    var cachedToken;

    function setToken(token) {
      cachedToken = token;
      storage.setItem('jabi', token);

    }

    function getToken() {
      if (!cachedToken) {
        cachedToken = storage.getItem('jabi');
      }

      return cachedToken;
    }

    function isAuthenticated() {
      return !!getToken();

    }

    function removeToken(){
        cachedToken = undefined;
        storage.removeItem('jabi');

    }
    function request(cfg) {
      var token = getToken();
      if (token) {
        cfg.headers = cfg.headers || {};
        cfg.headers.Authorization = 'Bearer ' + token;

      }

      return cfg;
    }


    var service = this;
    service.setToken = setToken;
    service.getToken = getToken;
    service.request = request;
    service.removeToken = removeToken;
    service.isAuthenticated = isAuthenticated;
    return service;
  }

  angular.module('dx.Services').factory('authTokenService', authTokenService);

})();
