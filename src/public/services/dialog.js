angular.module('sprite').factory('DialogService', [function() {
  var _options = {
  	title: 'Tips',
  	animation: true,
  	size: 'lg',
  	templateUrl: '../template/defaultDialg.html',
  	controller: function() {

  	}
  };
  var modalInstance = null;
  var DialogService = function(options) {
    angular.extend(_options, options);
  };

  DialogService.prototype.open = function() {
    modalInstance = $uibModal.open({
      animation: true,
      templateUrl: '../template/configDialog.html',
      controller: function($scope, $modalInstance, items) {
        // console.log($modalInstance);
      },
      // backdrop: false,
      size: 'lg',
      resolve: {
        items: function() {
          return $scope.items;
        }
      }
    });
  };
  DialogService.prototype.close = function() {
  	modalInstance.close();
  };
  return DialogService;

}]);
