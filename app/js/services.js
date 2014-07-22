'use strict';

/* Services */

angular.module('myApp.services', []).
  value('version', '0.1').
  factory('enqueteService', ['$q', '$http', 'urlDiscoveryService', function($q, $http, urlDiscoveryService) {

  	var getEnquetesAtivas = function(href) {
  		href = href || (urlDiscoveryService.links['enquetes-ativas'].href + '?size=3');
  		var deferred = $q.defer();
  		$http.get(href).error(function() {
  			deferred.resolve({ erro: "Erro ao obter enquetes ativas!" });
  		}).success(function(enquetesPage) {
  			deferred.resolve(enquetesPage);
  		});

  		return deferred.promise;
  	};

  	var votar = function(enquete, opcao) {
  		var deferred = $q.defer();
  		
  		$http.post(enquete.links.votar.href, opcao).error(function(errorMessage) {
  			deferred.reject(errorMessage);
  		}).success(function() {
  			deferred.resolve("Seu voto foi registrado obrigado!");
  		});
  		
  		return deferred.promise;
  	};
  	
  	var criar = function(enquete) {
  		var deferred = $q.defer();
  		
  		$http.post(urlDiscoveryService.links['nova-enquete'].href, enquete).error(function(errorMessage) {
  			deferred.reject(errorMessage);
  		}).success(function(enqueteResource) {
  			deferred.resolve(enqueteResource);
  		});
  		
  		return deferred.promise;
  	};
  	
  	return { 
  		getEnquetesAtivas : getEnquetesAtivas, 
  		votar: votar,
  		criar: criar
  	}; 

  }]).
  factory('urlDiscoveryService', ['$q', '$http', function($q, $http) {
	  var urlDiscoveryService;
	  $.ajax({ 
		  url: '/api/',
		  success: function(data) {
			  urlDiscoveryService = data;
		  },
		  async: false
	  });
	  return urlDiscoveryService;
  }]);
