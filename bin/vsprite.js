#!/usr/bin/env node

var entry = require('../index.js');
var program = require('commander');
var pathParser = require('../configs/pathParser');

program
  .version(require('../package').version)
  .usage('[options] <keywords>')
  .option('-p, --port [port]', 'set port')
  .option('-s, --src [src]', 'src')
  .option('-d, --dist [dist]', 'output dist')
  .option('-i, --img-src [img src]', 'img src in css')
  .parse(process.argv);

require('../index.js')({
  port: program.port || 3000,
  src: pathParser.getAbsolutePath(program.src||process.cwd()),
  dist: pathParser.getAbsolutePath(program.dist || ((program.src || process.cwd()) + '/dist')),
  imgSrc: pathParser.getAbsolutePath(program.dist || 'dist')
});
