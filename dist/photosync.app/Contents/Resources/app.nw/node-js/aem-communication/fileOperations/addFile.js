module.exports = function( filePath , appSettings ){

    var Q           = require( "q" );
    var request     = require( "request" );
    var fs          = require( "fs" );
    var deferred    = Q.defer();
    var _           = require( "underscore" );
    var settings    = appSettings.getSettings();

    var promisedQueue = [];

    //console.log( settings );

    var path = filePath.substr( settings.folderPath.length + 1 );

    var postURL = settings.cqURL + '/content/dam/' + settings.damPath + '/' + path;


    var r = request.post( postURL , function optionalCallback (err, httpResponse, body) {

        if (err) {
            return deferred.reject( err );
        }

        deferred.resolve( body );

    }).auth("admin","admin");

    var form = r.form();

    form.append('./jcr:content/renditions/original', fs.createReadStream( filePath ) );
    form.append('./jcr:primaryType', "dam:Asset");
    form.append('./jcr:content/jcr:primaryType', "dam:AssetContent");
    form.append('./jcr:content/renditions/original@TypeHint', "nt:file");
    form.append('./jcr:content/metadata/jcr:primaryType', "nt:unstructured");
    form.append('./jcr:content/metadata/dc:title', path);



    return deferred.promise;

};
