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
  .controller('NavegacaoCtrl', ['$route', function($route) {
	  this.tab = 1;
	  
	  this.isActive = function(tab) {
		  return this.tab === tab;
	  }
	  
	  this.setActive = function(tab) {
		  this.tab = tab;
	  }
	  
	  this.refresh = function() {
		  $route.reload();
	  }
  }])
  .controller('EnquetesFinalizadasCtrl', ['$scope', 'enqueteService', function($scope, enqueteService) {
	  
  }])
  .controller('NovaEnqueteCtrl', ['$scope', 'enqueteService', function($scope, enqueteService) {

	  $scope.enquete = { 'opcoes' : [], 'inicio' : '', 'fim': '' };
	  
	  $scope.successMessage = null;
	  
	  $scope.errorMessage = null;
	  
	  $scope.newOptionText = null;
	  
	  function validate() {
		  var enquete = $scope.enquete;
		  
		  enquete.inicio = $('input#inicio').val();
		  enquete.fim = $('input#fim').val();
		  
		  if (!enquete.pergunta) {
			  $scope.errorMessage = 'Informe a pergunta da enquete!';
			  return false;
		  }
		  
		  if (!enquete.inicio) {
			  $scope.errorMessage = 'Informe a data/hora de início enquete!';
			  return false;
		  }
		  
		  if (!enquete.fim) {
			  $scope.errorMessage = 'Informe a data/hora de fim enquete!';
			  return false;
		  }
		  
		  if (moment(enquete.fim, 'DD/MM/YYYY HH:mm').isBefore(moment(enquete.inicio, 'DD/MM/YYYY HH:mm'))) {
			  $scope.errorMessage = 'A data de início da enquete deve ser menor que a data de fim!';
			  return false;
		  }
		  
		  if (!enquete.opcoes || enquete.opcoes.length < 2) {
			  $scope.errorMessage = 'Informe pelo menos duas opções para a enquete!';
			  return false;
		  }
		  
		  return true;
	  }
	  
	  $scope.criar = function() {
		  if (validate()) {
			  enqueteService.criar($scope.enquete).then(function(enquete) {
				  $scope.enquete = enquete;
				  $scope.successMessage = 'Sua enquete foi criada com sucesso!';
				  $scope.errorMessage = null;
			  }, function(errorMessage) {
				  $scope.errorMessage = errorMessage;
			  });
		  }
	  }

	  $scope.addOption = function() {
		  if ($scope.newOptionText) {
			  $scope.enquete.opcoes.push({ 'texto' : $scope.newOptionText });
			  $scope.newOptionText = null;
		  } else {
			  $scope.errorMessage = "O texto da opção não pode ser vazio!";
		  }
	  }
	  
	  $scope.removeOption = function(index) {
		  $scope.enquete.opcoes.splice(index, 1);
	  }
	  
	  $(function () {
		  moment.suppressDeprecationWarnings = true;
    	  var options = { language: 'pt-BR', minDate: moment().startOf('day') };
    	  $('#inicio').datetimepicker(options);
    	  $('#fim').datetimepicker(options);
    	  $('#inicio').on('dp.change',function (e) {
    		  var picker = $('#fim').data('DateTimePicker');
    		  picker.setMinDate(moment(e.date).startOf('day'));
    		  if (e.date > picker.getDate()) {
    			  picker.setDate(e.date);
    		  }
          });
          $('#fim').on('dp.change',function (e) {
        	  var picker = $('#inicio').data('DateTimePicker');
              picker.setMaxDate(e.date);
              if (e.date < picker.date) {
            	  picker.setDate(e.date);
              }
          });
      });
  }]);
