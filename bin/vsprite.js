#!/usr/bin/env node

var entry = require('../index.js');
var program = require('commander');
var pathParser = require('../configs/pathParser');

program
  .version(require('../package').version)
  //.version(require('../version')())
  .usage('[options] <keywords>')
  .option('-p, --port [port]', 'set port')
  .option('-s, --src [src]', 'src')
  .option('-c, --css-dist [css dist]', 'css dist')
  .option('-i, --img-dist [img dist]', 'img dist')
  // .option('-m, --mockPort [mockPort]', 'set listen mock port') 
  // .option('-s, --interfaceSuffix [interfaceSuffix]', 'set interfaceSuffix') 
  .parse(process.argv);
// console.log(process.cwd());

require('../index.js')({
  port: program.port || 3000,
  path: pathParser.getAbsolutePath(program.src),
  cssDist: pathParser.getAbsolutePath(program.cssDist || ((program.src || process.cwd()) + '/cssDist')),
  imgDist: pathParser.getAbsolutePath(program.imgDist || ((program.src || process.cwd()) + '/imgDist'))
});
// console.log(program['cssDist'] || ((program.src || process.cwd()) + '/cssDist'));
// console.log("Hello world!!");
