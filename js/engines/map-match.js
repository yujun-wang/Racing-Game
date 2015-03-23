/*
#scene2-11
*/
$.extend($.scene, {
	background: 'projector',

	settings: {
		
	},

	data: {
	
		correct: [], //array to store correct name and home matches
		
	
		
		user: [],
		
		offset: 0,
		
		right: '',
		
		temp: 0,
		
		offset2: -1,
		
	},

	
	start: function() {
		
		$.scene.prepare();
	
		$.scene.scene1();
	},
	
	scene1: function(){
		console.log('Scene1 Start');
	    
		$('#mrfang')
		.img('people/mrfang/idle')
		.clickable(function(){
			$(this).img('people/mrfang/point');
			$.sound.play('rules',$.scene.scene2);
		},{fullscreen: 1});
	},
	
	/*
	Simple click and play scene, but clicked items are recorded
	*/
	scene2:function(){
		console.log('Scene1 End');
		console.log('Scene2 Start');
		
		$('#mrfang')
		.clickable(0) //mrfang is not clickable
		.img('people/mrfang/idle');
		
		$.each($.scene.data.correct, function(key)
		{
			
			
			$('#'+$.scene.data.correct[key].name).clickable(function(){ //set all children clickable
				
				$.each($.scene.data.correct, function(key2)				//After one child is clicked, set all the children unclickable
				{
					$('#'+$.scene.data.correct[key2].name).clickable(0);
				});
				
				$.scene.data.user.push(key);	//push selected name into $scene.data.user
				
				
				
				
				var name = $(this).attr('id');
				
				$('#child')						//let the selected child talking on the stage
				.img('people/'+$.scene.data.correct[key].name+'/talk')
				.show();
				$.sound.play(name,$.scene.scene3); 
			});
		});
	},
	
	/*
	The first match scene
	*/
	scene3: function(){
		
					console.log('Scene2 End');
					console.log('Scene3 Start');
					$('#child')
					.img('people/'+$.scene.data.correct[($.scene.data.user[$.scene.data.offset])].name+'/idle')
					.show();
					
					//locations clickable
					$.each($.scene.data.correct, function(key4)
					{
						
						
						$('#'+$.scene.data.correct[key4].home)
						.off('click')
						.clickable(function(){
							
							
							
							if (($(this).attr('id'))==$.scene.data.correct[$.scene.data.user[$.scene.data.offset]].home)
							{
								//if right answer is clicked on, all the location should be unclickable
								$.each($.scene.data.correct, function(key){
									$('#'+$.scene.data.correct[key].home).clickable(0);
								});
								
								$.scene.data.offset++;
								
								if ($.scene.data.offset>=4)  //all the correct answers have been chosen
								{
									$.sound.play('right',$.scene.scene4); //go to the next scene
									
								}
								else{
									$('#mrfang').img('people/mrfang/point');
									$.sound.play('right',$.scene.reset);	//reset the current scene
									
								};
							}
							else {
								$.sound.play('wrong');
								
							};
						});
					});
				
	},
	
	
	/*
	The second match scene
	*/
	scene4: function(){
		
		
		
		if ($.scene.data.temp==4)	//Tell if all the correct answers are collected
		{
			
			$.sound.play('all correct!',$.scene.scene5); //got the next scene
			console.log('Look here!');
			$.scene.data.temp=0;
		}
		
		else 	//enter scene4
		{
			console.log('Scene4');
		
			$('#child').hide();
		
			$.each($.scene.data.correct, function(key){
				$('#'+$.scene.data.correct[key].name)
				.clickable(0)
				.hide();
				
				$('#'+$.scene.data.correct[key].home).hide();
			});
		
			
			
			$('#mrfang').img('people/mrfang/point');
			$('#child')
			.img('people/'+$.scene.data.correct[$.scene.data.temp].name+'/idle')
			.show();
			
			$.sound.play('question'+($.scene.data.temp+1),function(){	//mrfang ask a question
				$('#mrfang').img('people/mrfang/idle');
				$('#child')
				.img('people/'+$.scene.data.correct[$.scene.data.temp].name+'/talk')	
				.show();
				
				$.sound.play($.scene.data.correct[$.scene.data.temp].home,function(){	//a kid show up and answer the question
					$('#child')
					.img('people/'+$.scene.data.correct[$.scene.data.temp].name+'/idle')
					.show();
					
					$.each($.scene.data.correct, function(key){	//remove covers of locations
						
						
						$('#'+$.scene.data.correct[key].home)
						.show()
						.off('click')
						.clickable(function(){
							
							if($(this).attr('id')==$.scene.data.correct[$.scene.data.temp].home) //if the answer is right
							{
								
								$.each($.scene.data.correct, function(key2){	//set all the locations unclickable
							
									$('#'+$.scene.data.correct[key2].home).clickable(0);
								});
								$.scene.data.temp++;
								$.sound.play('right',$.scene.scene4);	//go back to the start of the current scene
							}
							else{
								$.sound.play('wrong');
							}
						})
						.clickable(1);
					});
				});
			});
		}
		
	},
	
	scene5: function(){
		if ($.scene.data.temp==4)	//tell if all the right answers are collected
		{
			$.each($.scene.data.correct, function(key){
				$('#'+$.scene.data.correct[key].name).clickable(0);
				
				
				$('#'+$.scene.data.correct[key].home).clickable(0);
			});
			$.sound.play('all correct!',$.scene.end);
			
		}
		else //enter scene5
		{
			console.log('Scene5!!!');
			$.each($.scene.data.correct, function(key){
				$('#'+$.scene.data.correct[key].name)
				.clickable(1)
				.show();
				
				$('#'+$.scene.data.correct[key].home).clickable(0);
				
				
			});
		
			$('#child').hide();
		
			$.sound.play($.scene.data.correct[$.scene.data.temp].name,function(){	//the user is supposed to choose the right childs
				$.each($.scene.data.correct, function(key2){
				
					$('#'+$.scene.data.correct[key2].name)
					.off('click')
					.clickable(function(){
						if ($(this).attr('id')==$.scene.data.correct[$.scene.data.temp].name) //the right child is chosen
						{
							$('#child')
							.show()
							.img('people/'+$.scene.data.correct[$.scene.data.temp].name+'/talk');
							$.each($.scene.data.correct, function(key){
							
								$('#'+$.scene.data.correct[key].name).clickable(0); 
							
							});
							$.sound.play($.scene.data.correct[$.scene.data.temp].home,function(){
								$('#child').img('people/'+$.scene.data.correct[$.scene.data.temp].name+'/idle');
								$.each($.scene.data.correct, function(key){
									$('#'+$.scene.data.correct[key].home)
									.off('click')
									.clickable(function(){	//the user is supposed to choose the right location
										if ($(this).attr('id')==$.scene.data.correct[$.scene.data.temp].home)
										{
											$.scene.data.temp++;
											$.sound.play('right',$.scene.scene5); //reset to the start of the current scene
										}
										else
										{
											$.sound.play('wrong');
										}
									})
									.show()
									.clickable(1);
								});
							});
						}
						else
						{
							$.sound.play('wrong');
						}
					})
					.clickable(1);
				
				});
			});
		
		}
		
	},
	
	
	
	/*
		Reset the scene to an intial state
	*/
	reset: function(){
		console.log('Scene3 End');
		$('#mrfang').img('people/mrfang/idle');
		$('#child').hide();
		
		$.each($.scene.data.correct, function(key){
			$('#'+$.scene.data.correct[key].home).clickable(0);
			
			$('#'+$.scene.data.correct[key].name).clickable(1);
			
		});
		
		
		//set the used children unclickable
		for (var i=0;i<$.scene.data.correct.length;i++)
		{
			for (var j=0;j<$.scene.data.user.length;j++)
			{
				if($.scene.data.correct[i].name==$.scene.data.correct[$.scene.data.user[j]].name)
				{
					$('#'+$.scene.data.correct[i].name).clickable(0);
				}
			}
	
		}
		
		
	},
	
	
	prepare: function(){
		$.scene.data.correct.push({  //put correct matches into $.scene.data.correct
				name: "shanshan",
				home: "guangzhou"
			},
			{
				name:"mingming",
				home:"shanghai"
			},
			{
				name:"nini",
				home:"beijing"
			},
			{
				name:"rongrong",
				home:"xian"
			});
			
		
		//set images for the map	
		$('#map').img('things/map/china');
		
		
		
		//set images for the children and locations
		$.each($.scene.data.correct, function(key){
			$('#'+$.scene.data.correct[key].name).img('people/'+$.scene.data.correct[key].name+'/idle');
			$('#'+$.scene.data.correct[key].home).img('things/dot/yellow');
		});
		
		
		
	},
	
	
});


