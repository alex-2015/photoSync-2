module.exports = function( appEvents , fileOperations , settings ){

    var self = this;
    this.queue = [];

    var processingQueue = false;

    this.addToQueue = function( pathObject ){

        this.queue.push( pathObject );
        appEvents.emit( "fileQueue:fileAdded" );

    };

    this.removeFromQueue = function( pathObject ){

        var pathIndex = this.queue.indexOf( pathObject );

        this.queue.splice( pathIndex , 1 );

    };

    appEvents.on( "fileQueue:fileAdded" , function( ) {

        if( !processingQueue ){
            processQueue();
            processingQueue = true;
        }


    } )


    function processQueue ( ){

        var file = self.queue.pop();

        fileOperations.addFile( file.path , settings).
            then( function() {

                if( self.queue.length > 0 ){

                    processQueue();

                }else{
                    processingQueue = false;
                }

            } );

    }
};