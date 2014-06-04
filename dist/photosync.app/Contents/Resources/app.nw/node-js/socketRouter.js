module.exports = function( socket , fileManifest , appEvents , appSettings){

    var Watch               = require( "./initializeWatch.js" );
    var watch               = new Watch();
    var timeOut             = null;
    var currentDAMFolders   = require( "./aem-communication/getCurrentDAMFolders.js" );


    if( appSettings.settings.folderPath ){

        fileManifest = {};

        watch.add( appSettings.settings.folderPath , fileManifest , appEvents );

    }


    socket.on( "setFolderLocation" , function( folderLocation ) {

        fileManifest = {};

        watch.add( folderLocation , fileManifest , appEvents );

    } );

    socket.on( "manifest:request" , function( ) {

        socket.emit( "manifest:current" , fileManifest );

    } );

    socket.on( "app:getDAMFolders" , function(){

        var settings        = appSettings.getSettings();
        var currentFolder   = currentDAMFolders.getFirstLevel( settings );

        currentFolder.then( function( folders ){

            socket.emit( "app:DAMFolders" , folders );

        } );

    } );

    socket.on( "settings:save" , function( settingsToSave ){

        appSettings.save( settingsToSave );

        var settings = appSettings.getSettings();

        var currentFolder = currentDAMFolders.getFirstLevel( settings );

        currentFolder.then( function( folders ){

            socket.emit( "app:DAMFolders" , folders );

        } );



    } );

    socket.on( "settings:get" , function( settingsToSave ){

        socket.emit( "settings:set" , appSettings.settings );

    });


    appEvents.on( "manifest:addedFile" , function( ) {

        console.log( "[ about to set time out ]" );

        if( timeOut ){
            clearTimeout( timeOut );
            console.log( "[ unset time out ]" );
        }

        timeOut = setTimeout( function( ){

            socket.emit( "manifest:new" , fileManifest );

            console.log( "[ manifest:new ]" );

        }, 1000 );

    } );
};