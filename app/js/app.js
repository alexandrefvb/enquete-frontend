'use strict';


// Declare app level module which depends on filters, and services
angular.module('myApp', [
  'ngRoute',
  'myApp.filters',
  'myApp.services',
  'myApp.directives',
  'myApp.controllers'
]).
value('build', 1).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/nova', {templateUrl: 'partials/nova.html', controller: 'NovaEnqueteCtrl'});
  $routeProvider.when('/ativas', {templateUrl: 'partials/ativas.html', controller: 'EnquetesAtivasCtrl'});
  $routeProvider.when('/finalizadas', {templateUrl: 'partials/finalizadas.html', controller: 'EnquetesFinalizadasCtrl'});
  $routeProvider.otherwise({redirectTo: '/ativas'});
}]);
