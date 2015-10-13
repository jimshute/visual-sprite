angular.module('sprite').controller('cssSpriteCtrl', ['$scope', 'CssSpriteService', '$uibModal', function($scope, CssSpriteService, $uibModal) {
  console.log('It works!!!');
  angular.extend($scope, {
    imageList: {},
    configs: {
      path: '',
      dist: '', // path of directory to write sprite file to 
      name: '', // name of sprite file without file extension
      style: ''
    },
    loadImages: function() {
      $scope.imageList = CssSpriteService.query($scope.configs);
      console.log($scope.imageList);
    },
    generate: function() {
      var result = CssSpriteService.generate($scope.configs);
      result.$promise.then(function(data) {
        if (data.code == '200') {
          alert('success!');
        } else {
          alert('failed!');
        }
      });
    },
    showCfgDialog: function() {
      var modalInstance = $uibModal.open({
        animation: true,
        templateUrl: '../template/configDialog.html',
        windowTemplateUrl: '../template/windowModal.html',
        controller: function($scope, $modalInstance, items) {
          console.log($modalInstance);
        },
        backdrop: false,
        size: 'lg',
        resolve: {
          items: function() {
            return $scope.items;
          }
        }
      });
    }
  });
  $scope.loadImages();
}]);
