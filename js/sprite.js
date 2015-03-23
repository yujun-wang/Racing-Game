/**
* Sprite object
*/
$.extend({
	paused: 0,

	spriteinfo: {},

	/**
	* An object who's click event will be fired on the next fullscreen mask click
	* See clickable()
	* @var null|object
	*/
	fullscreenobj: null,
	
	/**
	* Move all sprite animations by one frame
	*/
	tick: function() {
		if ($.paused) {
			setTimeout($.tick, 150);
			return;
		}
		$('#scene > div.animate').each(function() {
			var sprite = $(this);
			var img = sprite.data('img');
			var frame = sprite.data('frame');

			if (++frame > $.spriteinfo[img].frames-1) {
				var finish = sprite.data('finish');
				if (finish) { // Do something when we complete?
					sprite.removeClass('animate'); // Remove the animation property so we dont get stuck calling this over and over
					if (typeof finish == 'function') {
						finish();
					} else
						sprite.img(sprite.data('finish'));
					return;
				} else // Reset to beginning and loop
					frame = 0;
			}

			sprite
				.data('frame', frame)
				.find('.sprite-img').css('background-position', (100 / ($.spriteinfo[img].frames-1) * frame) + '% 0');
		});
		setTimeout($.tick, 150);
	},

	pause: function() {
		$.paused = 1;
	}
});

/**
* Shortcut function to assign the 'clickable' class and bind a click event
* The click event is ignored if clickable(0) is called and reassigned if clickable(1)
* e.g. $('#something').clickable(function() {}) // Assign a click event to a class
* e.g. $('#something').clickable(0) // Turn off clickability (bound to the above function)
* e.g. $('#something').clickable(1) // Turn on clickability
* @param callback|bool If this function is a callback then the click event is assigned, if its a boolean this controls whether this item is clickable
*/
$.fn.clickable = function(callback, options) {
	var settings = $.extend({
		fullscreen: false,
		button: false
	}, options || {});
	return this.each(function() {
		if (typeof callback == 'function') {
			$(this)
				.addClass('clickable')
				.on('click', function() {
					if ($(this).hasClass('clickable')) {
						if (settings.button)
							$(this).img($(this).data('img'), {frame: 2});
						if ($.options.debug)
							console.log('Sprite> Click', this);
						var callbacks = $.Callbacks();
						callbacks.add(callback);
						callbacks.fireWith(this);
					} else {
						console.log('Sprite> Click on sprite thats disabled');
					}
				});
			if (settings.button)
				$(this).hover(function() {
					$(this).img($(this).data('img'), {frame: 1});
				}, function() {
					$(this).img($(this).data('img'), {frame: 0});
				});

			if (settings.fullscreen) {
				$.fullscreenobj = $(this);
				$('#fullscreen-click').show();
			}
		} else if (callback) { // Eval as boolean to enable clicking
			$(this).addClass('clickable')
		} else
			$(this).removeClass('clickable')
	});
}

/**
* Load an animation sequence or individual frame into an object
* This function will attempt to load a corrisponding .json file to get information about the sprite
* @param string img The image sequence to load
* @param array options Additional sprite options to load
* @param int options.frame An individual frame to freeze at (or alternate syntax .img('things/clock/tick#3') uses frame 3 of the specified animation
* @param string options.finish The animation sequence should play though only once then move to the animation specified as this value (usually 'idle')
* @param string options.root The prefix prepended to the image file name to determine the path. This normally should point to where the sprites are stored on disk and should end in a slash
* @param string options.suffix The suffix appended to the image file name to determine the absolute location. This normally should represent the main storage medium (normally: '.png')
* e.g. $('#sprite-1').img('people/announcer/run'); // Load the running announcer animation into #sprite-1
*/
$.fn.img = function(img, options) {
	return this.each(function() {
		var sprite = $(this);
		var settings = $.extend({
			frame: -1,
			finish: false,
			root: 'img/sprites/',
			suffix: '.png'
		}, options);

		var extract;
		if (extract = /^(.*)#(.*)$/.exec(img)) { // Referencing a specific frame of a sprite (e.g. things/clock/tick#1 means use frame 1 of things/clock/tick
			img = extract[1];
			settings.frame = extract[2] - 1;
		}

		if ($.spriteinfo[img]) { // Already know about this sprite
			var imgsize, imgfile;
			var frame = (settings.frame != -1 ? settings.frame : 0);
			var width = sprite.width();
			var height = sprite.height();
			if (!sprite.find('.sprite-img').length) // Nested image frame does not exist - create it
				sprite.append('<div class="sprite-img"></div>')

			for (var s = 0; s < $.spriteinfo[img].sizes.length; s++) {
				if ( // Use this sprite size IF...
					($.options.spritesize && $.spriteinfo[img].sizes[s].size == $.options.spritesize) // We are forced to use this size via $.options.spritesize
					|| (!$.options.spritesize && $.spriteinfo[img].sizes[s].width >= width && $.spriteinfo[img].sizes[s].height >= height) // This is bigger than the one we want (assumes JSON spec is in order of smallest -> largest)
				) {
					imgsize = $.spriteinfo[img].sizes[s].size;

					imgfile = $.dirname(img) + '/' + $.spriteinfo[img].sizes[s].file;
					break;
				}
			}
			if (!imgfile) {
				var last = $.spriteinfo[img].sizes.length-1;
				console.warn('Sprite> Cannot find large enough image file for img ' + img + '. Largest w/h: ' + $.spriteinfo[img].sizes[last].width + 'x' + $.spriteinfo[img].sizes[last].height + ' but requested w/h:' + width + 'x' + height + '. Defaulting to last');
				imgsize = $.spriteinfo[img].sizes[last].size;
				imgfile = $.dirname(img) + '/' + $.spriteinfo[img].sizes[last].file;
			}
			sprite
				.toggleClass('animate', ($.spriteinfo[img].frames > 1 && settings.frame == -1))
				.addClass('sprite')
				.data({
					img: img,
					imgsize: imgsize,
					imgfile: imgfile,
					frame: frame,
					finish: settings.finish
				});

			sprite.find('.sprite-img').css({
				'background-image': 'url("' + $.options.url + settings.root + imgfile + settings.suffix + '")',
				'background-position': (100 / ($.spriteinfo[img].frames - 1) * frame) + '% 0',
				'background-size': ($.spriteinfo[img].frames * 100) + '% 100%'
			});
		} else { // Dont know about it - load from server then retrigger this function
			$.ajax({
				url: $.options.url + settings.root + img + '.json',
				dataType: 'json',
				cache: $.options.cache,
				success: function(json) {
					$.spriteinfo[img] = json;
					sprite.img(img, settings);
				},
				error: function(e,t) {
					console.warn('Error loading sprite info for "' + img + '"', t);
					$.spriteinfo[img] = {
						width: 100,
						height: 100,
						frames: 1
					};
					sprite.img(img, settings);
				}
			});
		}
	});
};

/**
* Creates an animated image clone of the current sprite and sets the image to another animation
* This is useful if you need one animation playing over the top of another
* @param string img The animation or single frame to set the new animation to
* @param array options Optional options hash (see img() for details)
* @see img
*/
$.fn.overlay = function(img, options) {
	return this.each(function() {
		var overlay = $(this).clone().appendTo('#scene');
		overlay.css('z-index', $(this).css('z-index')+1);
		overlay.img(img, options);
	});
}

/**
* Sets the content of a sprite to given text
* This also triggers BigText to deal with text scaling
* @param string text The text to set the sprite contents to
*/
$.fn.setText = function(text) {
	return this.each(function() {
		if (!$(this).hasClass('bigtext')) { // Not already under bigtext control - wrap then initalize
			$(this)
				.addClass('sprite text')
				.html('<div>' + text + '</div>');
		} else {
			$(this).find('div').text(text);
		}
		$(this)
			.show()
			.bigtext({resize: false});
	});
}


$(function() {
	// Set up the full screen click capture
	$('<div id="fullscreen-click"></div>')
		.hide()
		.click(function() {
			if ($.fullscreenobj) {
				$(this).hide();
				console.log('Sprite> Click trigger via fullscreen capture');
				$.fullscreenobj.trigger('click');
				$.fullscreenobj = null;
			}
		})
		.appendTo('body');
});
