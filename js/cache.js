$(function() {
/**
Caching library for loading images or other materials before execution

// EXAMPLE:
$('body').append("<div id='progress'>Loading.....</div>");
$.cache
	.add('img', 'pic/1.jpg')
	.add('img', ['pic/2.jpg', 'pic/3.jpg'])
	.add('sound', 'sounds/1');
	.execute({
		success: function() { alert('Done caching'); }
		progress: function(percent) { console.log('Cache> Loaded ' + percent + '%'); }
	});
*/

$.extend({cache: {
	/**
	* An array of hashes representing each item to be cached
	* e.g. queue = [ {file: 'foo', 'type': 'img'} ]
	* @var array
	*/
	queue: [],

	/**
	* Number of items in the queue that have been loaded
	* @var int
	*/
	loaded: 0,
	
	/**
	* Add an item to the cache queue
	* @param type string The type of object to add to the queue (ENUM: 'img')
	* @param string|array A single file or array of files to cache
	*/
	add: function(type, file) {
		if (typeof file == 'string') { // Push a single object
			$.cache.queue.push({
				type: type,
				file: file
			});
		} else { // Push multiple items onto the stack
			$.each(file, function(k, file) {
				$.cache.queue.push({
					type: type,
					file: file
				});
			});
		}
		return this;
	},

	/**
	* Start caching all items added to the queue
	* @param array options An array of options to use
	* @param function options.progress Optional callback to fire to update a progress bar. The single parameter passed is the percentage complete
	* @param function options.success Optional callback to fire when the cache object has finished loading all cache items
	*/
	execute: function(options) {
		var settings = $.extend({
			progress: $.noop,
			success: $.noop
		}, options || {});

		$.cache.loaded = 0;
		
		for (i=0 ; i < $.cache.queue.length ; i++) {
			$('<img/>')
				.addClass('cache-img')
				.hide()
				.load(function () {
					$.cache.loaded++;
					settings.progress(($.cache.loaded/$.cache.queue.length)*100);
					if ($.cache.loaded >= $.cache.queue.length) { // Finished?
						settings.success();
						$.cache.clear();
					}
				})
				.attr("src", $.cache.queue[i])
				.appendTo('body');
		}
		return this;
	},

	/**
	* Reset all cache items and remove all items from the queue
	*/
	clear: function() {
		$.cache.queue = [];
		$.cache.loaded = 0;
	}
}});
});
