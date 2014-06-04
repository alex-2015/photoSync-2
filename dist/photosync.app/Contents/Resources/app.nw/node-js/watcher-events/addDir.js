module.exports = function( path , stat , manifest , appEvents ){

    var chalk = require( "chalk" );

    console.log( chalk.bgBlue( "[ added Dir ]" ) , path );


    if ( !manifest[ path ] ){

        manifest[ path ] = [];
        appEvents.emit( "manifest:addedDir" , path );

    }

};