angular.module('sprite').controller('cssSpriteCtrl', [
  '$scope', 'CssSpriteService', '$uibModal', 'FileUploader',
  function($scope, CssSpriteService, $uibModal, FileUploader) {
    console.log('It works!!!');
    angular.extend($scope, {
      imageList: {},
      dimensions: [{
        ratio: 1,
        dpi: 72,
        placeholder: '@1 image dpi'
      }, {
        ratio: 2,
        dpi: 192,
        placeholder: '@2 image dpi'
      }, {
        ratio: 3,
        dpi: 300,
        placeholder: '@3 image dpi'
      }],
      configs: window.defaultData,
      fileUploader: new FileUploader({
        url: '/upload',
        autoUpload: true,
        formData: 'aaaaaaa',
        onCompleteAll: function() {
          $scope.loadImages();
        }
      }),
      loadImages: function() {
        $scope.imageList = [];
        CssSpriteService.query($scope.configs).$promise.then(function(data) {
          $scope.imageList = data;
        });
      },
      deleteFile: function(fileName) {
        var result = CssSpriteService.delete({
          fileName: fileName,
          path: $scope.configs.path
        });
        result.$promise.then(function(data) {
          $scope.loadImages();
        });
      },
      generate: function() {
        var result = CssSpriteService.generate($scope.configs);
        result.$promise.then(function(data) {
          if (data.code == '200') {
            alert('success!');
          }
          else {
            alert('failed!');
          }
        });
      },
      showCfgDialog: function() {
        var modalInstance = $uibModal.open({
          animation: true,
          templateUrl: '../template/configDialog.html',
          controller: function($scope, $modalInstance, items) {
            console.log($modalInstance);
            $scope.ok = function() {
              $modalInstance.close($scope.selected.item);
            };

            $scope.cancel = function() {
              $modalInstance.dismiss('cancel');
            };
          },
          // backdrop: false,
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
    $scope.configs.dimension = [$scope.dimensions[0]];
    console.log($scope.fileUploader);
  }
]);
