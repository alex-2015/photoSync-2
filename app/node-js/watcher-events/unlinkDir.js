module.exports = function( path , manifest , appEvents ){

    var chalk = require( "chalk" );

    console.log( chalk.bgRed( "[ unlinked dir ]" ) , path );

    delete manifest[ path ];

    appEvents.emit( "manifest:removedDir" , path );

    console.log( manifest );

};