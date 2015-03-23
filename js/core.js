$(function() {
$.extend({
	/**
	* Main program options hash
	* @var hash
	*/
	options: {
		debug: 1, // Universal debug mode. This is often transfered into sub-modules during init
		reload: 0, // Force each scene change to reload the browser, this is handy for browsers with faulty garbage collection which need to release all resources to free up memory
		url: './', // The Base URL where to find all resources
		index: './', // Location of this index.html file (this must be able to have a hash suffix added e.g. '/index.html#something')
		cache: false, // Cache server resources whenever possible
		tick: 150, // The frequency of one animation tick
		spritesize: false // The percentage zoom to force all sprite loads (false = figure it out automatically, string = always use this zoom [usually '100%'])
	},

	/**
	* Internal function to deal with AJAX responses.
	* This function unpacks the response and relays any errors to the user
	* @param string operation What operation was being performed at the time
	* @param json json The JSON server response object
	*/
	unpack: function(operation, json) {
		if (!json.header) {
			console.warn('CORE - Missing header on ' + operation);
			return;
		}
		if (json.header.error) {
			console.log('Error on ' + operation + ' - ' + json.header.error);
		}
		if (json.header.info) {
			console.log('INFO: ' + json.header.info);
		}
	},

	/**
	* Load a scene by reference
	* e.g. $.go('12-4')
	* @param string scene The HTML file to load from scenes/
	* @param hash options An optional hash of further options to pass to the loader
	* @param bool options.clear Whether to clear the previous scene out before loading this one (default: 1)
	* @param string options.parent The parent object to load the scene contents into
	*/
	go: function(scene, options) {
		$('#interface').toggle(scene != 'menu');
		var sceneSettings = $.extend({
			clear: true,
			parent: $('#scene'),
		}, options || {});

		console.log('Core> Go', sceneSettings);

		if (sceneSettings.clear) {
			sceneSettings.parent.empty();
			$.sound.clear();
		}

		console.log('Core> Load "' + scene + '"');
		$.ajax({
			url: $.options.url + 'scenes/' + scene + '.html',
			dataType: 'html',
			success: function(html) {
				$.scene = Object.create(Scene);
				sceneSettings.parent.html(html);
				if (!$.scene.engine) {
					console.warn('Core> Loaded scene but no engine specified!');
					$.scenePrepare(sceneSettings);
					return;
				}
				var settings = $.scene.settings; // Preseve settings from overwrite when loading the engines defaults
				$.getScript($.options.url + 'js/engines/' + $.scene.engine + '.js', function() {
					console.log('Core> Loaded engine "' + $.scene.engine + '"');
					$.extend($.scene.settings, settings);
					$.extend($.scene, {
						scene: scene
					});
					$.scenePrepare(sceneSettings);
				}).fail(function(e,err) {
					console.warn('Core> Err on engine load: ', err);
				});
			},
			error: function(a, e) {
				$.error('Cannot load scene ' + scene + ' - ' + e);
			}
		});
	},
	
	

	/**
	* Prepare to show the scene
	* This function is called after all resources have loaded but before the engine $.scene.start() function runs
	* @param hash options An optional array of options to pass to the scene processor
	*/
	scenePrepare: function(options) {
		var sceneSettings = $.extend({
			parent: $('#scene')
		}, options || {});
		console.log('Core> $.scene.prepare()');
		// Apply scene.background - Set the background image {{{
		if ($.scene.background) {
			$('<div></div>')
				.addClass('scene-background')
				.appendTo(sceneSettings.parent)
				.css({
					left: '0%',
					top: '0%',
					width: '100%',
					height: '100%'
				})
				.img($.scene.background, { root: 'img/backgrounds/' }); // Convert background request into a sprite so its auto-sized
		}
		// }}}
		// Apply [data-img] - Auto populate divs with images {{{
		sceneSettings.parent.children('div[data-img]').each(function() {
			$(this).img($(this).data('img'));
		});
		// }}}
		// Apply [data-scene] - link the mouse click to opening a scene {{{
		sceneSettings.parent.children('div[data-scene]').clickable(function() {
			if ($.options.reload) {
				window.location.href = $.options.index + '?rand=' + (Math.random()*100) + '#' + $(this).data('scene');
			} else // Inline load - just tell the scene handler to load the scene inline
				$.go($(this).data('scene'));
		});
		// }}}
		// Apply text wrapping to div.text {{{
		sceneSettings.parent.children('.text')
			.wrapInner('<div></div>');
			

		console.log('Core> $.scene.start()');
		$.scene.start();
		sceneSettings.parent.trigger('ready');
		// }}}
	},


	/**
	* Initialize everything
	*/
	init: function() {
		// Set debug mode on submodules that need it {{{
		// $.sound.debug = $.options.debug;
		// }}}
		$.sound.init();
		
		// If the document hash is referring to a specific scene jump to it now (e.g. /#12-4 loads scene 12-4)
		if (window.location.hash)
			scene = window.location.hash.substr(1);

		//$('body').prepend('<div id="interface"></div>');
		
		$('body').prepend('<div id="interface" style="display:none"></div>');
		//
		$.go('interface', { clear: 0, parent: $('#interface') });
		$.go('2-3');
	

		
		setTimeout($.tick, $.options.tick);
	}
});

$.init();
});
