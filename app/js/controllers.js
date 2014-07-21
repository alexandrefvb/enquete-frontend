'use strict';

/* Controllers */

angular.module('myApp.controllers', [])
  .controller('EnquetesAtivasCtrl', ['$scope', 'enqueteService', function($scope, enqueteService) {
  	var votos = [];

  	$scope.errorMessages = [];

  	$scope.selectOption = function(enqueteIndex, opcaoIndex) {
  		votos[enqueteIndex] = $scope.enquetesPage.enquetes[enqueteIndex].opcoes[opcaoIndex];
  		delete $scope.errorMessages[enqueteIndex];
  	}

  	$scope.vote = function(enqueteIndex) {
  		if (votos[enqueteIndex] == undefined) {
  			$scope.errorMessages[enqueteIndex] = "Selecione uma opção antes de votar";
  		} else {
  			alert('Voto: ' +  enqueteIndex + ' opcao: ' + votos[enqueteIndex].texto );
  		}
  	}

  	$scope.getEnquetesAtivas = function(href) {
  		enqueteService.getEnquetesAtivas(href).then(function(enquetesPage) {
  			$scope.enquetesPage = enquetesPage;
  		});
  	}

  	$scope.getEnquetesAtivas();

  }]);
