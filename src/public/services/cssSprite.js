angular.module('sprite').factory('CssSpriteService', ['$resource', function($resource) {
  return $resource('/images/:path', {
    path: '@path'
  }, {
  	generate: {
  		url: '/generate',
  		method: 'post'
  	}
  });
}]);
