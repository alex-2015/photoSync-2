var io              = require('socket.io').listen(3000);
var fileManifest    = {};
var Events          = require( "events");
var EventDelegater  = require( "./node-js/eventDelegater.js");
var Settings        = require( "./node-js/appSettings.js" );


var appEvents       = new Events.EventEmitter();
var settings        = new Settings( );
var eventDelegater  = new EventDelegater( appEvents , settings );

io.set( 'log level' , 1 );

io.sockets.on('connection' , function (socket) {


   var router = require("./node-js/socketRouter.js")( socket , fileManifest , appEvents , settings );


});

