/**
 * Created by nelsonreina on 5/16/15.
 */
(function () {
	'use strict';
	/* global _:false, console:false */
	angular.module('dx.Services').factory('StateWatcherService', StateWatcherService);
	var publicStates = ['sign-in', 'register'];
	/** @ngInject */
	function StateWatcherService($rootScope,
	                             $state,
	                             $modal,
	                             authTokenService,
	                             AUTH_HOME) {

		function run() {
			$rootScope.$on('$stateChangeStart', stateChangeStart);
		}

		function stateChangeStart(event, toState, toStateParams) {
			if (toState.data) {
				if (isPublicState(toState.name)) {
					if (authTokenService.isAuthenticated()) {
						$state.go(AUTH_HOME);
						event.preventDefault();
					} else {
						showState(event, toState, toStateParams);
					}
				} else {
					if ('auth' in toState.data) {
						if (toState.data.auth) {
							if (authTokenService.isAuthenticated()) {
								showState(event, toState, toStateParams);
							} else {
								console.log('Not Authorized to go to state!');
								$state.go('home');
								event.preventDefault();
							}
						} else {
							showState(event, toState, toStateParams);
						}
					} else {
						console.error('Must Provide authentication data');
						event.preventDefault();
					}
				}
			} else {
				console.error('Data property is mandatory!!!');
				event.preventDefault();
			}

		}

		function isPublicState(stateName) {
			return (_.indexOf(publicStates, stateName) >= 0 );

		}

		function showState(event, state, stateParams) {
			if (state.data.modal) {
				state.backdrop = state.backdrop || 'static';
				//state.animation = false;
				if (!state.resolve){
					state.resolve = {};
				}
				state.resolve.$stateParams = function (){return stateParams;};
				$modal.open(state).result.then(function (data) {
					if ('toState' in data) {
						$state.go(data.toState, data.params);
					}
				}, function () {
					//console.log('"Modal dismissed!!!"');
				});

				event.preventDefault();
			}
		}

		var service = {};
		service.run = run;

		return service;
	}


})();
