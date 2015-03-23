$(function() {
$.extend({sound: {

	/**
	* Path to normal sound files
	* @param string
	*/
	path: './sound/',

	/**
	* Path to background music
	* @param string
	*/
	pathBackground: './sound/background/',

	/**
	* Path to sound effects
	* @type string
	*/
	pathEffect: './sound/',

	/**
	* Path to the fallback flash SWF file
	*/
	pathSWF: './lib/jplayer/jquery.jplayer',

	/**
	* Enable debug mode
	* If this is boolean true no sound effects will actually play. All callbacks will fire after a standard 2second interval
	* @param bool
	*/
	debug: 0,

	/** @type string id of Jplayer container for playing normal sound files*/
	jplayerid1: "#jquery_jplayer_1",

	/** @type string id of Jplayer container for playing background music*/
	jplayerid2: "#jquery_jplayer_2",

	/** @type mixed a sound queue storing sound file's format, path and pointer to callback functions*/
	queue: [],

	/** @type integer number of asynchronous sound effects*/
	effectno: 0,

	/**
	* Play sound files.
	* @param string $file A string to specify the sound file path.
	* @param function $callback A callback function triggered after the current function completes.
	* @return void
	*/
	play: function(file, callback) {
		console.log('$.sound.play(' + file + ')');
		if ($.sound.debug) {
			if (callback)
				setTimeout(callback, 2000);
		} else {
			$.sound.queue.push({
				oga: $.sound.path + file + ".ogg",
				mp3: $.sound.path + file + ".mp3",
				finish: callback
			});

			if ($.sound.queue.length == 1)
				$($.sound.jplayerid1)
					.jPlayer("setMedia", $.sound.queue[0])
					.jPlayer("play");
		}
	},

	/**
	* Play the next sound file in the queue.
	* @return void
	*/
	next: function() {
		$(this).data('playing', false);
		if ($.sound.queue[0]) {
			if ($.sound.queue[0].finish)    // if there is a callback request call it
				$.sound.queue[0].finish();
				$.sound.queue.shift();
				$($.sound.jplayerid1).jPlayer( "clearMedia" );

			if ($.sound.queue.length)
				$($.sound.jplayerid1)
					.jPlayer("setMedia", $.sound.queue[0])
					.jPlayer("play");
		}
	},

	/**
	* Play sounds asynchronously, such as click effects.
	* @param string $file A string to specify the sound file path.
	* @return void
	*/
	effect: function(file) {
		if ($.sound.debug) {
			console.log('$.sound.effect(' + file + ')');
		} else {
			$('<div></div>')
				.attr("id","effect"+$.sound.effectno)
				.jPlayer({
					errorAlerts: true,
					ready: function () {
						$(this).jPlayer("setMedia", {
							oga: $.sound.pathEffect + file + ".ogg",
							mp3: $.sound.pathEffect + file + ".mp3"
						}).jPlayer("play");
					},
					ended: function(){
						$(this).jPlayer("destroy");
						$(this).remove();
					},
					swfPath: $.sound.pathSWF,
					supplied: "mp3, oga",
				})
				.appendTo('body');
			$.sound.effectno++;
		}
	},

	/**
	* Pause all the sounds that are playing, except for the sounds played by
	* the effect() function.
	* @return void
	*/
	pause: function() {
		$($.sound.jplayerid1).jPlayer("pause");
		$($.sound.jplayerid2).jPlayer("pause");
	},

	/**
	* Continue playing all sounds that are paused.
	* @return void
	*/
	unpause: function() {
		$($.sound.jplayerid1).jPlayer("play");
		$($.sound.jplayerid2).jPlayer("play");
	},

	/**
	* Stop all sounds and reset the sound queue
	* @return void
	*/
	clear: function() {
		if ($($.sound.jplayerid1).data('playing'))
			$($.sound.jplayerid1).jPlayer("stop");
		if ($($.sound.jplayerid2).data('playing'))
			$($.sound.jplayerid2).jPlayer("stop");
		$.sound.queue = [];
	},

	/**
	* Play background music.
	*
	* @param string $file A string to specify the sound file path.
	* @return void
	*/
	background: function(file) {
		if ($.sound.debug) {
			console.log('$.sound.background(' + file + ')');
		} else
			$($.sound.jplayerid2).jPlayer({
				ready: function () {
					$(this).jPlayer("setMedia", {
						oga: $.sound.pathBackground + file + ".ogg",
						mp3: $.sound.pathBackground + file + ".mp3"
					}).jPlayer("play");
				},
				playing: function() {
					$(this).data('playing', true);
				},
				ended: function() {
					$(this).data('playing', false);
				},
				swfPath: $.sound.pathSWF,
				supplied: "mp3, oga",
				loop: true
			});
	},

	/**
	* Initialize a Jplayer object for playing normal sound files.
	* @return void
	*/
	init: function() {
		console.log('Sound> Init');
		$($.sound.jplayerid1)
			.jPlayer({
				ended: $.sound.next,
				playing: function() {
					$(this).data('playing', true);
				},
				errorAlerts: true,
				error: function(e) {
					console.warn("Sound> Error", e);
				},
				swfPath: $.sound.pathSWF,
				supplied: "mp3, oga"
			});
	}
}});

});
