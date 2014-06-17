'use strict';
var cluster = require('cluster');
var os      = require('os');
var i;

if (cluster.isMaster) {
  console.log('I am the master!');
  console.log(process.pid);
  var numToSpin = process.env.WORKERS || os.cpus().length;
  for(i=0; i < numToSpin; i++) {
    cluster.fork();
  }
  cluster.on('exit', function(worker){
    cluster.fork();
  });
} else {
  console.log('I am a server worker, pid:'+ process.pid);
  require('./server');
}
