/**
* Dummy engine
* This engine is designed to do absolutely nothing. It is here purely to import the default functionality without raising an error
*/
$.extend($.scene, {
	settings: {},

	data: {},

	check: function() {
		return [];
	},

	start: function() {
		console.log('ENGINE> Doing nothing ($.scene.engine = "none")');
	},
});
