angular.module( "photoSync.services.manifest" , [] ).
    service( "ManifestSrvs" , function( $q , Sockets ){

        var self = this;

        this.folderPath = "";
        this.manifest   = null;


        Sockets.emit( "manifest:request" );
        Sockets.on( "manifest:current" , function( manifest ) {

            console.log( manifest );

            self.manifest = manifest;

        } );

        this.getFolderPath = function(){

            var deferred = $q.defer();

            Sockets.emit( "settings:get" );
            Sockets.on( "settings:set" , function( settings ){

                console.log( settings );

                self.folderPath = settings.folderPath;

                deferred.resolve( self.folderPath );

            } );

            return deferred.promise;

        };




    } );