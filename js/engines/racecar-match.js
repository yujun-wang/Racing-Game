/**
* Example of scene 2-6
* Announcer reads off 4 possible car combinations and the user has to select them in the correct order
*/
$.extend($.scene, {
	background: 'racetrack',

	settings: {
		/**
		* The number of cars we are looking for in the race
		* @var int
		*/
		carCount: 4,

		
		
		/**
		* The number of cars we can select from
		* @var int
		*/
		carOptions: 20
	},

	data: {
		/**
		* The cars we are looking for - the 20 candidate cars
		* @var int
		*/
		cars: [],

		/**
		* The car offset thats the right answer
		* @var int
		* @see $.scene.data.cars
		*/
		carno: [],
		
		round: 4,
		
		offset: 0,
		
		temp: 0,
	},

	check: function() {
		var refs = [];
		for (var x = 1; x < $.scene.settings.carCount; x++)
			refs.push('#big-car' + x);
		return refs;
	},

	
	scene0: function() {
		$('#race-announcer')
		.img('people/race-announcer/talk');
		$.sound.play('scenes/2-3/cn-015hello',function(){
			$('#race-announcer')
			.img('people/race-announcer/idle');
			
			
			$('#race-announcer').img('people/race-announcer/talk');
			$.sound.play('scenes/2-3/numbers',function(){
				$('#race-announcer').img('people/race-announcer/idle');
				$.scene.scene1();
			});
		});
		
	},
	
	start: function(){
		$.scene.scene0();
		
	},
	
	scene1: function() {
		
		// Populate random numbers that are right anwsers
		$.scene.data.carno = $.pick($.range(1, $.scene.settings.carOptions), $.scene.settings.carCount);
		
		/*$.scene.data.carno[0]=1;$.scene.data.carno[1]=2;$.scene.data.carno[2]=3;$.scene.data.carno[3]=4;*/
		$('#light').img('things/traffic-lights/red');
		$('#race-announcer')
		.img('people/race-announcer/talk');
		//$.sound.play('scenes/2-3/click');
		//the announcer starts to read the correct numbers
		
			
		$.each($.scene.data.cars, function(key, val) { 
			$('#car' + (key+1)).clickable(0);
	    });
			
		$.sound.play('scenes/2-3/cn-014'+($.scene.data.carno[0]),function(){
			$('#race-announcer').img('people/race-announcer/idle');
			$('#race-announcer').img('people/race-announcer/talk');
			$.sound.play('scenes/2-3/cn-014'+($.scene.data.carno[1]),function(){
				$('#race-announcer').img('people/race-announcer/idle');
				$('#race-announcer').img('people/race-announcer/talk');
				$.sound.play('scenes/2-3/cn-014'+($.scene.data.carno[2]),function(){
					$('#race-announcer').img('people/race-announcer/idle');
					$('#race-announcer').img('people/race-announcer/talk');
					$.sound.play('scenes/2-3/cn-014'+($.scene.data.carno[3]),function(){
						$('#race-announcer').img('people/race-announcer/idle');
						$.each($.scene.data.cars, function(key, val) { 
							$('#car' + (key+1)).clickable(1);
						});
					});
				});
			});
			
		});
		
		for (var i=0;i<$.scene.settings.carOptions;i++)
		{
			$.scene.data.cars[i]=i+1;
		}
		
		$.each($.scene.data.cars, function(key, val) { 
		    
			$('#car' + (key+1))
				.data('cvalue', val)
				.addClass('candidate-car')
				.img('things/car/'+val+'#1')
				.clickable(function() {
					if ($.scene.data.carno[$.scene.data.offset] == $(this).data('cvalue')) {
						$.each($.scene.data.cars, function(key, val) { 
							$('#car' + (key+1)).clickable(0);
						});
						$('#race-announcer').img('people/race-announcer/happy');
                        $.sound.play('scenes/2-3/cn-015right',function(){
							$.each($.scene.data.cars, function(key, val) { 
								$('#car' + (key+1)).clickable(1);
							});
							$('#race-announcer').img('people/race-announcer/idle');
						});				
						
						
						$(this).hide();  //hide the correct car
						$('#big-car'+($.scene.data.offset+1))
						.show()
						.img('things/car/'+val+'#1'); //show the correct big car
						$.scene.data.offset++;
						
							if ($.scene.data.offset==$.scene.settings.carCount) //All four cars are chosen correctly - we win the game
							{  
								$.each($.scene.data.cars, function(key, val) { 
									$('#car' + (key+1)).clickable(0);
								});
								$('#light').img('things/traffic-lights/green');
								$('#race-announcer').img('people/race-announcer/flag');
								
								
								$.sound.play('scenes/2-3/cn-015start',function(){
									
									$('#race-announcer').img('people/race-announcer/idle');
									$.each($.scene.data.carno, function(key, val) { //Hide all the big cars
									$('#big-car'+(key+1))
										.empty()
										.hide();
									});
									$.scene.data.round--;
									if ($.scene.data.round>0)
									{
										$.each($.scene.data.carno, function(key, val) {
											
											$('#car' + (key+1)).show();
										}); 
									
										
										$.each($.scene.data.carno, function(key, val) {
											$('#car' + (val)).show();
										});
										$.scene.data.carno = $.pick($.range(1, $.scene.settings.carOptions), $.scene.settings.carCount);
										
										
									
									
									
										$.scene.data.offset=0;
									
										
										$('#light').img('things/traffic-lights/red');
										$.each($.scene.data.cars, function(key, val) { 
											$('#car' + (key+1)).clickable(0);
											
										});
										$('#race-announcer').img('people/race-announcer/talk');
										$.sound.play('scenes/2-3/cn-014'+($.scene.data.carno[0]),function(){
											$('#race-announcer').img('people/race-announcer/idle');
											$('#race-announcer').img('people/race-announcer/talk');
											$.sound.play('scenes/2-3/cn-014'+($.scene.data.carno[1]),function(){
												$('#race-announcer').img('people/race-announcer/idle');
												$('#race-announcer').img('people/race-announcer/talk');
												$.sound.play('scenes/2-3/cn-014'+($.scene.data.carno[2]),function(){
													$('#race-announcer').img('people/race-announcer/idle');
													$('#race-announcer').img('people/race-announcer/talk');
														$.sound.play('scenes/2-3/cn-014'+($.scene.data.carno[3]),function(){
															$('#race-announcer').img('people/race-announcer/idle');
															$.each($.scene.data.cars, function(key, val) { 
																$('#car' + (key+1)).clickable(1);
															});
														});
												});
											});
			
										});
										
									
									}
									else
									{
										$.each($.scene.data.cars, function(key, val) 
										{
											$('#car' + (key+1)).hide();
										
										});
										alert("Demo Ended!"); 
									}
									});
								
							}
						}
						else { 
							$('#race-announcer').img('people/race-announcer/sad');
							
							$.sound.effect('scenes/2-3/cn-015wrong',function(){
								$('#race-announcer').img('people/race-announcer/idle');
							});
						};
				})
				.clickable(0);
				
		});

		
	}
});


