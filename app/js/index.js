/**
 * Created By Ben Westrate 05.16.2014
 */

var gui = require( "nw.gui" );

if( gui.App.manifest.showDevTools ){
    gui.Window.get().showDevTools();
}


// Set up angular app

angular.module('photoSync',
    [
        'ui.router',
        'ui.bootstrap',
        'photoSync.controllers',
        'photoSync.services',
        'photoSync.filters'

    ]
).
    config(function ($stateProvider, $urlRouterProvider) {

        $stateProvider.
            state("home", {
                url         : '/home',
                templateUrl : "partials/home.html",
                controller  : "HomeCtrl"
            }).
            state("settings", {
                url         : '/settings',
                templateUrl : "partials/settings.html",
                controller  : "SettingsCtrl"
            });

        $urlRouterProvider.otherwise('/home');
    });
