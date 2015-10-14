angular.module('sprite', [
  'ngRoute',
  'ngResource',
  'ui.bootstrap',
  'angularFileUpload'
]).config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/cssSprite', {
      controller: 'cssSpriteCtrl',
      templateUrl: 'views/cssSprite.html'
    })
    .otherwise({
      redirectTo: '/cssSprite'
    });

}]);
