angular.module('sprite', [
  'ngRoute',
  'ngResource',
  'ui.bootstrap',
  'angularFileUpload',
  'checklist-model'
]).config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/cssSprite', {
      controller: 'cssSpriteCtrl',
      templateUrl: 'views/cssSprite.html'
    })
    .otherwise({
      redirectTo: '/cssSprite'
    });

}]);
