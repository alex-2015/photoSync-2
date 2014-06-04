angular.module("photoSync.controllers.settings", []).
    controller("SettingsCtrl" , [ '$scope' , 'Sockets' , '$state' , 'ManifestSrvs' ,
        function( $scope , Sockets , $state , ManifestSrvs){

            $scope.path                 = "";
            $scope.buttonText           = "Add A Folder To Sync";
            $scope.disableSecondForm    = true;
            $scope.damFolders           = {};
            $scope.form                 = {
                path        : "",
                damPath     : "",
                userName    : "",
                password    : "",
                cqURL       : ""
            };



            var chooser = document.querySelector('#fileDialog');
            chooser.addEventListener("change", function() {

                $scope.form.path = this.value;

                $scope.$apply();

            }, false);



            $scope.addFolderPath = function(  ){

                chooser.click();

            };

            $scope.back = function(){
                $state.go( "home" );
            };



            $scope.save = function(){

                if( $scope.form.path ){
                    Sockets.emit( 'setFolderLocation' , $scope.form.path );
                    ManifestSrvs.folderPath = $scope.form.path;
                    $scope.buttonText = "Change the folder that is syncing"
                }

                Sockets.emit( "settings:save" , $scope.form );
                Sockets.emit( "app:requestDAMFolders" );


                $scope.disableSecondForm = false;


            };

            Sockets.emit( "settings:get" );

            Sockets.on( "settings:set" , function( settings ){

                $scope.form = {
                    userName    : settings.userName     ? settings.userName : "",
                    password    : settings.password     ? settings.password : "",
                    cqURL       : settings.cqURL        ? settings.cqURL : "",
                    path        : settings.folderPath   ? settings.folderPath : "",
                    damPath     : settings.damPath      ? settings.damPath : "",
                };

                if( $scope.form.userName && $scope.form.password && $scope.form.cqURL ){
                    Sockets.emit("app:getDAMFolders");
                    $scope.disableSecondForm = false;
                }


            } );

            Sockets.on( "app:DAMFolders" , function( folders ){

                $scope.damFolders = folders;

            } );

            $scope.damFolderSelected = function( folder ){

                console.log( folder );

                $scope.form.damPath = folder

            }


        }
    ] );