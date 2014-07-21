'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('myApp.services', []).
  value('version', '0.1').
  factory('enqueteService', ['$q', '$http', function($q, $http) {

  	var getEnquetesAtivas = function(href) {
  		href = href || '/enquetes/ativas?size=3';
  		var deferred = $q.defer();
  		$http.get(href).error(function() {
  			deferred.resolve({ erro: "Erro ao obter enquetes!" });
  		}).success(function(enquetesPage) {
  			deferred.resolve(enquetesPage);
  		});

  		return deferred.promise;
  	};

  	return { getEnquetesAtivas : getEnquetesAtivas }; 

  }]);
