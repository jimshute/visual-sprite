"use strict";
var fs = require('fs');
var config = require('../../configs/config');
var sprity = require('sprity');

exports.getImageList = function(req, res, next) {
  // var path = req.params.path;
  var path = req.params.path || config.resourcePath;
  fs.readdir(path, function(error, files) {
    if (error) {
      console.error(error);
      if (error.code == 'ENOENT') {
        fs.mkdir(path, function(error, dir) {
          if (error) {
            res.status(200).send([]);
          }
        });
        return;
      }
      res.status(200).send([]);
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
};

exports.renderIndex = function(req, res, next) {
  res.render('index', {});
};

exports.generate = function(req, res, next) {
  var path = config.resourcePath;
  var options = {
    src: (req.body.path || config.resourcePath) + '/*.png',
    out: req.body.dist || config.cssDist, // path of directory to write sprite file to.
    cssPath: req.body.dist || config.imgDist,
    name: req.body.name || 'sprite', // Name of sprite file with out file extension
    style: req.body.style || 'sprite.css' // file to write css to.
  };
  if (req.body.dimension && req.body.dimension.length > 0) {
    options.dimension = req.body.dimension;
  }
  options.style = req.body.style || 'sprite.css';
  // options.processor = 'less';
  sprity.create(options, function() {
    res.status(200).send({
      code: 200
    });
  });
};

exports.upload = function(req, res, next) {
  var fstream;
  req.pipe(req.busboy);
  req.busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
    console.log(fieldname, filename);
    fstream = fs.createWriteStream(config.resourcePath + '/' + filename);
    file.pipe(fstream);
    fstream.on('close', function() {
      res.status(200).send({});
    });
  });
  // req.busboy.on('field', function(key, value, keyTruncated, valueTruncated) {
  //   console.log(key, value);
  // });
  // res.status(200).send(req.busboy);
};

exports.deleteFile = function(req, res, next) {
  console.log(req.params);
  var tmp = req.params.fileName.split('/');
  var fileName = tmp[tmp.length-1];
  fs.unlink(config.resourcePath + '/' + fileName, function() {
    console.log(arguments);
    res.status(200).send({});
  });
  // var fileName = '';
};
