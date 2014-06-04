
angular.module("photoSync.controllers.home", []).
    controller("HomeCtrl" , function( $scope , Sockets , $state , ManifestSrvs ){

        $scope.path         = ManifestSrvs.folderPath;
        $scope.manifest     = null;
        $scope.buttonText   = "Add Folder To Sync ";

        Sockets.emit( 'manifest:request' );

        Sockets.on( 'manifest:current' , function( manifest ){

            $scope.manifest     = manifest;

        } );

        Sockets.on( 'manifest:new' , function( manifest ){

            $scope.manifest     = manifest;

        } );









        $scope.addFolderPath = function(  ){

            //chooser.click();
            $state.go( "settings" );


        };



        $scope.$watch('manifest' , function( newValue ){

            console.log( newValue );

        });

        ManifestSrvs.getFolderPath().
            then( function( folderPath ) {

                if( !folderPath ){
                    $state.go( "settings" );
                }

                $scope.path = folderPath;

            } )

    });