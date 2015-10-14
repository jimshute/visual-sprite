angular.module('sprite').factory('CssSpriteService', ['$resource', function($resource) {
  return $resource('/images/:fileName', {
    fileName: '@fileName'
  }, {
  	generate: {
  		url: '/generate',
  		method: 'post'
  	}
  });
}]);
