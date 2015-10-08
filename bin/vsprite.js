#! /usr/bin/env node

var entry = require('../index.js');
var program = require('commander');

program
  .version(require('../package').version)
  //.version(require('../version')())
  .usage('[options] <keywords>')
  .option('-p, --port [port]', 'set port')
  // .option('-m, --mockPort [mockPort]', 'set listen mock port') 
  // .option('-s, --interfaceSuffix [interfaceSuffix]', 'set interfaceSuffix') 
  .parse(process.argv);
  // console.log(process.cwd());
require('../index.js')(program.port || 3000, process.cwd());
console.log("Hello world!!");
