/**
 * Main.js
 * This file is where Node-Webkit will add menus and functions to interact with the main window
 *
 */

// this is the node-wekit main module
var gui   = require( "nw.gui" );

// Create a tray icon
var tray         = new gui.Tray({ title: '', icon: 'img/icon.png' });
var mainWindow   = {};


// Give it a menu
var menu = new gui.Menu();
var showWindow = new gui.MenuItem( { type: 'normal', label: 'Show Window' } );


menu.append( showWindow );

/**
 * When the user clicks on the menu item open the main window
 */
showWindow.on( "click" , function() {

    mainWindow = gui.Window.get(
        gui.Window.open('views/index.html', {
            position: 'center',
            width: 650,
            height: 500,
            frame: false
        })
    );


} );

tray.menu = menu;




