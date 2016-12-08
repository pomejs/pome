  var Emitter = require('emitter');
  window.EventEmitter = Emitter;

  var protocol = require('pome-protocol');
  window.Protocol = protocol;
  
  var protobuf = require('pome-protobuf');
  window.protobuf = protobuf;
  
  var pome = require('pome-jsclient-websocket');
  window.pome = pome;
