module.exports = function( path , manifest , appEvents ){

    var chalk = require( "chalk" );
    var _     = require( "underscore" );

    console.log( chalk.bgRed("[ unlinked file ]") , path );


    _.each( manifest , function( value , key ) {

        var keyLength = key.length;
        var parentDir = path.substr( 0 , keyLength );

        if( parentDir == key ){

            var index = value.indexOf( path );

            value.splice( index , 1 );

            appEvents.emit( "manifest:removedFile" , path );

        }

    } );

    console.log( manifest );

};