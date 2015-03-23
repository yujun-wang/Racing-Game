/*
#scene1-2, 2-1, 3-1.......
*/
$.extend($.scene, {
	background: 'marketplace',

	settings: {
		/**
		* This variable is used to store the image paths of the characters and clouds
		* ['imgage path the of the moving character','image path of the idle character',whether is clicked,'image path of the cloud image']
		* @var array
		*/
		people:[
			['people/rednose/wide','people/rednose/talk',0,''],
			['people/spy/walk','people/spy/blink',0,''],
			['people/jinhua/idle','people/jinhua/talk',0,''],
			['people/rednose/wide','people/rednose/talk',0,''],
			['people/rednose/wide','people/rednose/talk',0,''],
			['people/rednose/wide','people/rednose/talk',0,''],
		],
		
		
	},

	data: {
		count:0,
	},

	
	start: function() {
	
	
		$.scene.scene1();
	},
	
	scene1: function(){
		$('#announcer')
		.img('people/announcer/talk#1')
		.clickable(function(){
			$(this).img('people/announcer/talk');
			$.sound.play('rules',$.scene.scene2);
		}, {fullscreen: 1});
	},
	
	scene2: function(){
		$('#announcer').hide();
		for (var i=0;i<$.scene.settings.people.length;i++)
		{
			$("#person"+(i+1))
			.img($.scene.settings.people[i][0])
			.off('click')
			.clickable(function(){
				
				var temp = $(this).attr('id');
				temp = parseInt(temp[6])-1;
				if ($.scene.settings.people[temp][3]!='')
				{
					$("#frame")
					.img("things/frames/cloud")
					.show();
				
					$("#content")
					.img($.scene.settings.people[temp][3])
					.show();
				}
				$.scene.settings.people[temp][2]=1;
				//console.log(temp);
				$(this).img($.scene.settings.people[temp][1]);
				//console.log($.scene.settings.people[temp][1]);
				$.scene.data.count=0;
				for (var j=0;j<$.scene.settings.people.length;j++)
				{
					$("#person"+j).clickable(0);
					if ($.scene.settings.people[j][2]==1)
					{
						$.scene.data.count++
					}
				}
				$.sound.play('sound'+temp,function(){
					$("#frame").hide();
					$("#content").hide();
					console.log($.scene.data.count);
					if ($.scene.data.count==$.scene.settings.people.length)
					{
						for (var k=0;k<$.scene.settings.people.length;k++)
						{
							$("#person"+(k+1)).hide();
						}
						$.scene.end();
						console.log("end");
					}
					else{
						$.scene.scene2();
					}
				});
			});
		}
	},
	
	
	
	
});


