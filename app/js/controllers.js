'use strict';

/* Controllers */

angular.module('myApp.controllers', [])
  .controller('EnquetesAtivasCtrl', ['$scope', 'enqueteService', function($scope, enqueteService) {
  	var votos = [];

  	$scope.enqueteErrorMessages = [];

  	$scope.enqueteSuccessMessages = [];

  	$scope.selecionarOpcao = function(enqueteIndex, opcaoIndex) {
  		votos[enqueteIndex] = $scope.enquetesPage.content[enqueteIndex].opcoes[opcaoIndex];
  		delete $scope.enqueteErrorMessages[enqueteIndex];
  	}

  	$scope.votar = function(enqueteIndex) {
  		if (votos[enqueteIndex] == undefined) {
  			$scope.enqueteErrorMessages[enqueteIndex] = "Selecione uma opção antes de votar!";
  		} else {
  			enqueteService.votar($scope.enquetesPage.content[enqueteIndex], votos[enqueteIndex])
  				.then(function(msgSucesso) {
  					$scope.enqueteSuccessMessages[enqueteIndex] = msgSucesso;
  				}, function(msgErro) {
  					$scope.enqueteErrorMessages[enqueteIndex] = msgErro;
  				});
  		}
  	}

  	$scope.getEnquetesAtivas = function(href, event) {
  		if (event) {
  			event.preventDefault();
  		}
  		enqueteService.getEnquetesAtivas(href).then(function(enquetesPage) {
  			$scope.enquetesPage = enquetesPage;
  		});
  	}

  	$scope.getEnquetesAtivas();

  }])
  .controller('NavegacaoCtrl', function() {
	  this.tab = 1;
	  
	  this.isActive = function(tab) {
		  return this.tab === tab;
	  }
	  
	  this.setActive = function(tab) {
		  this.tab = tab;
	  }
  })
  .controller('EnquetesFinalizadasCtrl', ['$scope', 'enqueteService', function($scope, enqueteService) {
	  
  }])
  .controller('NovaEnqueteCtrl', ['$scope', 'enqueteService', function($scope, enqueteService) {
	  $scope.enquete = {};
	  
	  $scope.successMessage = null;
	  
	  $scope.errorMessage = null;
	  
	  $scope.criar = function() {
		  enqueteService.criar(enquete).then(function(enquete) {
			  $scope.enquete = enquete;
			  $scope.successMessage = 'Sua <a href="' + enquete.links.self + '" class="alert-link">enquete</a> foi criada com sucesso!';
		  }, function(errorMessage) {
			  $scope.errorMessage = errorMessage;
		  });
	  }
  }]);
