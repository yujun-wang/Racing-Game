/**
* Example of scene 2-7
* Playing Bingo against the computer
*/
$.extend($.scene, {
	background: 'bingo',

	settings: {
		/**
		* The number of Bingo numbers to play with
		* Default is 16 - 4x4 grid
		* @var int
		*/
		bingoCardCount: 16,

		/**
		* The number of actual numbers to draw (number of blank spaces = bingoCardCount - bingNumbersDraw)
		* Default is 6 - i.e. 10 blank spots out of 16
		* @var int
		*/
		bingoCardDraw: 6,

		/**
		* The amount of time the announcer will pause between draws
		* @var int
		*/
		bingoDrawDelay: 3000,

		/**
		* The list of possible bingo values
		* @var array
		*/
		bingoValues: [ 'dog', 'cat', 'mouse', 'horse', 'parrot', 'gerbil', 'hamster', 'snake', 'ferret', 'lizard', 'turtle', 'rabbit', 'fish' ]
	},

	data: {
		/**
		* The bingo numbers the user is looking for
		* Blank spots are designated with an 'x'
		* Number of itms in this array is bingoCardCount
		* @var array
		*/
		bingoCardUser: [],

		/**
		* The number of entries the user has crossed off
		* @type int
		*/
		bingoUserCalled: 0,

		/**
		* The bingo numbers the computer is looking for
		* @var array
		* @see bingoCardUser
		*/
		bingoCardComputer: [],

		/**
		* The number of entries the computer has crossed off
		* @type int
		*/
		bingoComputerCalled: 0,

		/**
		* The items that will be drawn by the announcer (shuffled version of the bingoValues array)
		* @var array
		* @see bingoValues
		*/
		bingoDrawn: [],

		/**
		* The offset in the bingoDrawn array
		* @var int
		*/
		bingoDrawnOffset: 0,
	},

	check: function() {
		var refs = []
		refs.push('#bingo-caller');
		for (var x = 1; x < $.scene.settings.bingoCardCount; x++) {
			refs.push('#bingo-user-' + x);
			refs.push('#bingo-computer-' + x);
		}
		return refs;
	},

	start: function() {
		$.sound.play('play-bingo');

		$.scene.data.bingoDrawn = $.shuffle($.scene.settings.bingoValues);

		// Populate the users bingo card {{{
		$.scene.data.bingoCardUser = $.pick($.scene.settings.bingoValues, $.scene.settings.bingoCardDraw);
		for (var i = $.scene.settings.bingoCardDraw; i < $.scene.settings.bingoCardCount; i++) // Fill remainder of user numbers array with 'x's
			$.scene.data.bingoCardUser.push('things/x/blue');
		$.scene.data.bingoCardUser = $.shuffle($.scene.data.bingoCardUser);
		$.each($.scene.data.bingoCardUser, function(key, val) { // Fill in sprites with appropriate Bingo number
			$('#bingo-user-' + (key+1))
				.data('bvalue', val)
				.addClass('bingo-user')
				.img(val)
				.clickable(function() { // User clicked on me!
					if ($.scene.data.bingoDrawn[$.scene.data.bingoDrawnOffset] == $(this).data('bvalue')) { // Click was right
						$.scene.rightAnswer();
						$(this)
							.overlay('things/x/blue')
							.clickable(false);
						if (++$.scene.data.bingoUserCalled == $.scene.settings.bingoCardDraw) { // Has the user called all items?
							$.sound.play('bingo-win');
							$.scene.end();
						}
					} else { // Click was wrong
						$.scene.wrongAnswer();
					}
				})
				.clickable(val != 'things/x/blue'); // Only make it clickable if its not an 'X'
		});

		// }}}
		// Populate the computers bingo card {{{
		$.scene.data.bingoCardComputer = $.pick($.scene.settings.bingoValues, $.scene.settings.bingoCardDraw);
		for (var i = $.scene.settings.bingoCardDraw; i < $.scene.settings.bingoCardCount; i++) // Fill remainder of user numbers array with 'x's
			$.scene.data.bingoCardComputer.push('things/x/red');
		$.scene.data.bingoCardComputer = $.shuffle($.scene.data.bingoCardComputer);
		$.each($.scene.data.bingoCardComputer, function(key, val) { // Fill in sprites with appropriate Bingo number
			$('#bingo-computer-' + (key+1))
				.addClass('bingo-computer-val-' + $.safe(val))
				.addClass('bingo-computer')
				.img(val);
		});
		// }}}

		setTimeout($.scene.draw, $.scene.settings.bingoDrawDelay);
	},

	draw: function() {
		if (!$.scene.data.bingoDrawnOffset) {  // First number drawn - skip straight to choosing the first number
			$.scene.choose();
		} else { // Not the first number drawn - animate throwing the ball away then go on to choose
			$('#bingo-caller').img('people/bingo-caller/throw-away', { finish: $.scene.choose });
		}
	},

	choose: function() {
		$('#bingo-caller').img('people/bingo-caller/choose', { finish: $.scene.callout });
	},

	callout: function() {
		if (++$.scene.data.bingoDrawnOffset > $.scene.settings.bingoValues.length - 1) // If we've exhausted all numbers and still no-one has won
			$.scene.data.bingoDrawnOffset = 0; // Reset to the beginning

		$('#bingo-caller').img('people/bingo-caller/talk');
		$.sound.play($.scene.data.bingoDrawn[$.scene.data.bingoDrawnOffset], function() { // After we've read out the bingo number...
			$('#bingo-caller').img('people/bingo-caller/idle');
			setTimeout($.scene.draw, $.scene.settings.bingoDrawDelay); // Draw another after a delay
		});

		var computerHasValue = $('#scene .bingo-computer-val-' + $.safe($.scene.data.bingoDrawn[$.scene.data.bingoDrawnOffset])); // Does the computer have this bingo number?
		if (computerHasValue.length) { // Computer has this value
			computerHasValue.overlay('things/x/red');

			if (++$.scene.data.bingoComputerCalled >= $.scene.settings.bingoCardDraw) { // Has the computer called all items?
				$.sound.play('bingo-lose');
				$.scene.end('lose');
				return;
			}
		}
	}
});
