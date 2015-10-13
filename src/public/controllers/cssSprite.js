angular.module('sprite').controller('cssSpriteCtrl', ['$scope', 'CssSpriteService', function($scope, CssSpriteService) {
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
    }
  });
  $scope.loadImages();
}]);
