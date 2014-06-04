module.exports = function( appEvents , appSettings ){

    var FileQueue       = require( './aem-communication/fileQueue.js' );
    var fileOperations  = require( './aem-communication/fileOperations.js' );
    var fileQueue       = new FileQueue( appEvents , fileOperations , appSettings );

    appEvents.on( "manifest:addedFile" , function( filePath ){

        fileQueue.addToQueue( { type: "file" , path : filePath.path , parentPath : filePath.parent } );

    } );

    appEvents.on( "manifest:addedDir" , function( filePath ){

        //fileQueue.addToQueue( { type: "folder" , path : filePath } );

    } );

    appEvents.on( "manifest:removedFile" , function( filePath ){

        fileQueue.removeFromQueue( { type: "file" , path : filePath } );

    } );

    appEvents.on( "manifest:removedDir" , function( filePath ){

        fileQueue.removeFromQueue( { type: "folder" , path : filePath } );

    } );



};