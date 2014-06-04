


    var gui   = require( "nw.gui" );

    // Create a tray icon
    var tray         = new gui.Tray({ title: '', icon: 'img/icon.png' });
    var mainWindow   = {};


    // Give it a menu
    var menu = new gui.Menu();
    var showWindow = new gui.MenuItem( { type: 'normal', label: 'Show Window' } );

    menu.append( showWindow );

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




