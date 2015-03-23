/**
* Scene object
* Singleton object representing an insanciated scene
*/
var Scene = {
	// Properties {{{
	/**
	* The name of the scene file we were instanciated from
	* This should corrispond with the scene name (e.g. 12-4 => /scenes/12-4.html)
	* @var string
	*/
	scene: '',

	/**
	* Individual settings for a scene specified by the level we are on
	* This array along with 'data' is overwritten on each scene load
	* @var hash
	*/
	settings: {},

	/**
	* Private data related to the progression of the game
	* This usually tracks private info that shouldn't be overwritten while the game is in progress
	* @var hash
	*/
	data: {},

	/**
	* The game engine file to load from /js/engines when we are invoking the scene
	* @var string
	*/
	engine: 'none',

	/**
	* The background image to use in the scene
	* @var string
	*/
	background: '',
	// }}}

	// Methods {{{
	/**
	* Complete a scene, unload it and return back to the game menu
	* This function takes an optional 'dialog' variable which can be one of the following:
	* 	* lose - Displays a 'You lost' message complete with 'Retry' and 'Return to main menu' prompts
	*	* replay - Usually used for slideshows, displays 'Replay' and 'Return to menu' prompts
	* @param string dialog Optional dialog to display to the user rather than returning to the menu
	*/
	end: function(dialog) {
		console.log('SCENE END!', dialog);
	},

	/**
	* Awards points for a right answer
	*/
	rightAnswer: function() {
		console.log('RIGHT ANSWER!');
	},

	/**
	* Removes points for a wrong answer
	*/
	wrongAnswer: function() {
		console.log('WRONG ANSWER!');
	},
	// }}}

	// Events {{{
	/**
	* Event that fires when the scene is ready to be rendered
	* @var event
	*/
	ready: function() {},

	/**
	* Event queried when compiling a scene that is expected to return a list of required items
	* Typically this reads in any dynamic data contained in $.scene.settings and checks that all required <div> ids are present.
	* e.g. if the scene engine is running a 'matching pairs' game this function checks that the correct number of pairs has been loaded into the scene
	* @return array An array of jQuery queries to check for when compiling a scene.
	* @var event
	*/
	check: function() {}
	// }}}
};
