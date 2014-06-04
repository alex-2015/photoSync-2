module.exports = function(  ){

    var jf                  = require( "jsonfile" );
    var fs                  = require( "fs" );
    var settingsFilePath    = "../settings.json";

    this.settings           = {};


    this.save = function( settings ){

        console.log( "settings to save : " , settings )

        this.settings = {
            userName    : settings.userName     ? settings.userName : "",
            password    : settings.password     ? settings.password : "",
            cqURL       : settings.cqURL        ? settings.cqURL : "",
            folderPath  : settings.path         ? settings.path : "",
            damPath     : settings.damPath      ? settings.damPath : ""
        };

        jf.writeFileSync( settingsFilePath ,  this.settings );

    };


    this.getSettings = function( ) {

        return this.settings;

    };


    if( !fs.existsSync(settingsFilePath) ){

        this.save( {} );

    } else {

        this.settings = jf.readFileSync(settingsFilePath);

    }

};