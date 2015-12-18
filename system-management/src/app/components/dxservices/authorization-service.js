/**
 * Created by nelsonreina on 5/17/15.
 */

(function () {
  'use strict';


  function AuthorizationService(API, $http, toastr, authTokenService, $state) {


    function register(user) {
      $http.post(API + '/register', user).then(function(resp){
        if (resp.data.token){
          authTokenService.setToken(resp.data.token);
          toastr.success('Registration is successful! ');
          $state.go('member');
        } else {
          toastr.error('Cannot get Token from server! ','Unable to register');

        }
      }, function(err){
        toastr.error(err.data, 'Unable to register');
      });
    }

    function signIn(credentials) {
      $http.post(API + '/signin', credentials).then(function(resp){
        //console.log('resp', resp);
        toastr.success('Welcome ' + resp.data.user.email + ' !');
        authTokenService.setToken(resp.data.token);
        $state.go('member');


      }, function(err){
        toastr.error(err.data, 'Unable to sign in');
      });

    }

    function logout() {
      authTokenService.removeToken();
      $state.go('home');
    }

    var service = this;
    service.register = register;
    service.signIn = signIn;
    service.logout = logout;
    return service;
  }

  AuthorizationService.$inject = ['API', '$http', 'toastr', 'authTokenService', '$state'];

  angular.module('dx.Services').factory('AuthorizationService', AuthorizationService);


})();
