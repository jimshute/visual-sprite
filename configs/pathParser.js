var path = require('path');

var pathParser = {
  getAbsolutePath: function(p) {
  	console.log(p);
  	if (!p) {
  		return process.cwd();
  	}
  	if (path.isAbsolute(p)) {
  		return p;
  	}
  	return path.normalize(process.cwd() + '/' + p);
  }
};

module.exports = pathParser;
