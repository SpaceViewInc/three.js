/**
 * @author mrdoob / http://mrdoob.com/
 */

var Sidebar = function ( editor ) {

	var container = new UI.Panel();
	container.setId( 'sidebar' );

	//

	var sceneTab = new UI.Text( 'SCENE' ).onClick( onClick );
	var projectTab = new UI.Text( 'PROJECT' ).onClick( onClick );
	var settingsTab = new UI.Text( 'SETTINGS' ).onClick( onClick );
	//var materialsTab = new UI.Text( 'MATERIALS').onClick( onClick );

	var tabs = new UI.Div();
	tabs.setId( 'tabs' );
	tabs.add( sceneTab, projectTab, settingsTab );
	container.add( tabs );

	function onClick( event ) {

		select( event.target.textContent );

	}

	//

	var scene = new UI.Span().add(
		new Sidebar.Scene( editor ),
		new Sidebar.Properties( editor ),
		new Sidebar.Animation( editor ),
		new Sidebar.Script( editor )
	);
	container.add( scene );

	var project = new UI.Span().add(
		new Sidebar.Project( editor )
	);
	container.add( project );

	var settings = new UI.Span().add(
		new Sidebar.Settings( editor ),
		new Sidebar.History( editor )
	);
	container.add( settings );

	// var materials = new UI.Span().add(
	// 	new Sidebar.Material( editor, true )
	// );
	// container.add( materials );
	//

	function select( section ) {

		sceneTab.setClass( '' );
		projectTab.setClass( '' );
		settingsTab.setClass( '' );
		//materialsTab.setClass( '' );

		scene.setDisplay( 'none' );
		project.setDisplay( 'none' );
		settings.setDisplay( 'none' );
		//materials.setDisplay( 'none' );

		switch ( section ) {
			case 'SCENE':
				sceneTab.setClass( 'selected' );
				scene.setDisplay( '' );
				break;
			case 'PROJECT':
				projectTab.setClass( 'selected' );
				project.setDisplay( '' );
				break;
			case 'SETTINGS':
				settingsTab.setClass( 'selected' );
				settings.setDisplay( '' );
				break;
			// case 'MATERIALS':
			// 	materialsTab.setClass( 'selected' );
			// 	materials.setDisplay( '' );
			// 	break;
		}

	}

	select( 'SCENE' );

	return container;

};
