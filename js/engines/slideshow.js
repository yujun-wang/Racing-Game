/**
* Example of scene 4-8
* Show a series of slides to the user
*/
$.extend($.scene, {
	settings: {
		/**
		* The slides to display
		* @var array
		*/
		slides: [ 'dog', 'cat', 'mouse' ],

		/**
		* The time delay between the slides
		* @var int
		*/
		slideDelay: 4000
	},

	data: {
		/**
		* The offset of the current slide
		* @var int
		*/
		slideOffset: 0
	},

	check: function() {
		return ['#slideshow'];
	},

	start: function() {
		setTimeout($.scene.nextSlide, $.scene.settings.slideDelay);
	},

	nextSlide: function() {
		if (++$.scene.data.slideOffset > $.scene.settings.slides.length - 1) { // If we've exhausted all slides
			$.scene.end('replay');
			return;
		}

		$.sound.play('slide-next');

		$('#slideshow').img($.scene.settings.slides[$.scene.data.slideOffset]);

		setTimeout($.scene.nextSlide, $.scene.settings.slideDelay);
	},
});
