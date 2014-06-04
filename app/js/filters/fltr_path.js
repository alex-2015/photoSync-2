angular.module( "photoSync.filters.path", [] ).
    filter( "path" , function(){

        return function( originalPath ){

            var newPath = originalPath.substr( originalPath.lastIndexOf( "/" ) + 1 );


            return newPath;

        }

    } )