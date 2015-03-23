/**
* Test engine
* This engine is designed to be as whiney as possible for debugging purposes
*/
$.extend($.scene, {
	settings: {
		foo: 'bar'
	},

	data: {
		baz: 'quzz'
	},

	check: function() {
		console.log('TEST ENGINE> $.scene.check()');
		return [];
	},

	start: function() {
		console.log('TEST ENGINE> $.scene.start()');
		console.log('TEST ENGINE> $.scene.settings.foo = ' + $.scene.settings.foo);
	},
});
