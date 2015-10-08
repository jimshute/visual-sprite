"use strict";
var fs = require('fs');
var sprity = require('sprity');

exports.getImageList = function(req, res, next) {
  // var path = req.params.path;
  var path = req.params.path || global.resourcePath;
  fs.readdir(path, function(error, files) {
    if (error) {
      console.error('error');
      res.end(200, []);
      return;
    }
    var imgArray = [];
    for (var i = 0; i < files.length; i++) {
      var reg = /\.png$/gi;
      if (reg.test(files[i])) {
        imgArray.push({
          src: '/imgResources/' + files[i],
          imageName: files[i]
        });
      }
    }
    res.status(200).send(imgArray);
  });
  // res.send(200, [{
  //   src: 'http://avatar.csdn.net/7/B/A/1_violet_day.jpg',
  //   imageName: 'test1'
  // }, {
  //   src: 'http://avatar.csdn.net/7/B/A/1_violet_day.jpg',
  //   imageName: 'test2'
  // }, {
  //   src: 'http://avatar.csdn.net/7/B/A/1_violet_day.jpg',
  //   imageName: 'test3'
  // }, {
  //   src: 'http://avatar.csdn.net/7/B/A/1_violet_day.jpg',
  //   imageName: 'test4'
  // }]);
};

exports.renderIndex = function(req, res, next) {
  res.render('index', {});
};

exports.generate = function(req, res, next) {
  var path = global.resourcePath;
  console.log(req.body);
  var options = {
  	src: (req.body.path || global.resourcePath) + '/*.png',
  	out: req.body.dist || global.resourcePath + '/dist',
  	name: req.body.name || 'sprite',
    style: req.body.style || 'style.css'
  };
  console.log(options);
  sprity.create(options, function() {
    // console.log(arguments);
    res.status(200).send({
      code: 200
    });
  });
};
