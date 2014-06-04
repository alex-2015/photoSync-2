module.exports = function( path , stat , manifest , appEvents ){

    var chalk = require( "chalk" );
    var _     = require( "underscore" );

    console.log( chalk.bgBlue("[ added file ]") , path );

    _.each( manifest , function( value , key ) {

        var keyLength = key.length;
        var parentDir = path.substr( 0 , keyLength );
        var theRest   = path.substr( keyLength + 1 );
        var isInAnotherFolder = theRest.indexOf( "/" );


        if( parentDir == key && isInAnotherFolder == -1 ){

            if ( value.indexOf( path ) == -1 ) {

                value.push( path );
                appEvents.emit( "manifest:addedFile" , { path : path , parent: parentDir } );

            }

        }

    } );

};