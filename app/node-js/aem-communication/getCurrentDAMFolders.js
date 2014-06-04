var getfirstLevel = function( settings ){

    var request     = require( "request" );
    var util        = require( "util" );
    var Q           = require( "q" );
    var folders     = {};

    var deferred = Q.defer();

    console.log( settings );

    var options = {
        url: settings.cqURL + "/content/dam.2.json",
        'auth': {
            'username': settings.userName,
            'password': settings.password,
            'sendImmediately': false
        }
    };

    function callback ( error , response , body ) {

        if ( !error && response.statusCode == 200 ) {

            var folders = JSON.parse(body);
            deferred.resolve( folders );

        }else{

            console.log(error,response,body);
            deferred.reject( error );

        }
    }

    request(options, callback);

    return deferred.promise
};

module.exports = {
    getFirstLevel : getfirstLevel
};