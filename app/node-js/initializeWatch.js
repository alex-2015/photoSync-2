module.exports = function ( ) {

    var chokidar        = require('chokidar');
    var addEvent        = require( "./watcher-events/add.js" );
    var addDirEvent     = require( "./watcher-events/addDir.js" );
    var changeEvent     = require( "./watcher-events/change.js" );
    var unlinkEvent     = require( "./watcher-events/unlink.js" );
    var unlinkdirEvent  = require( "./watcher-events/unlinkDir.js" );

    var watcher = null;

    this.add = function( path , fileManifest , appEvents ){

        if( watcher ){

            watcher.close();
            watcher = null;

        }

        watcher = chokidar.watch( path , { ignored: /[\/\\]\./, persistent: true });

        watcher
            .on('add', function(path , stats) {
                addEvent( path , stats , fileManifest , appEvents );
            })
            .on('addDir', function(path, stats) {
                addDirEvent( path , stats , fileManifest , appEvents );
            })
            .on('change', function(path, stats) {
                changeEvent( path , stats , fileManifest , appEvents );
            })
            .on('unlink', function(path) {
                unlinkEvent( path , fileManifest , appEvents );
            })
            .on('unlinkDir', function(path) {
                unlinkdirEvent( path , fileManifest , appEvents );
            })
            .on('error', function(error) {console.error('Error happened', error);});
    }




}