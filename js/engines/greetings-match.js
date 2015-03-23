/*
#scene1-7

All the people images are not correct
*/
$.extend($.scene, {
	background: 'stall',

	settings: {
		
	},

	data: {
	
		match: ['mingming','nini','reply1','tingting','shanshan'],		//order of the right answers
		
		match2: ['girl-green','girl-blue','girl-green','girl-blue','girl-green'], //diplay order of big children
		
		offset: 0,
	},

	
	start: function() {
		
		$.scene.prepare();
	
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
		$('#announcer')
		.img('people/announcer/talk#1')
		.hide();
		$('#big')
		.img('people/'+$.scene.data.match2[$.scene.data.offset]+'/talk')
		.show();
		$.sound.play($.scene.data.match[$.scene.data.offset],function(){
			$('#big').img('people/'+$.scene.data.match2[$.scene.data.offset]+'/idle');
			$.each($.scene.data.match, function(key, val){
				$('#'+val).clickable(1);
			});
		});
	},
	
	
	prepare: function(){
		
		$.each($.scene.data.match, function(key, val){
			$('#'+val)
			.img('people/'+val+'/idle')
			.clickable(function(){
				if ($(this).attr('id')===$.scene.data.match[$.scene.data.offset])
				{
					$(this).img('people/'+$(this).attr('id')+'/talk');
					
					$.each($.scene.data.match, function(key, val){
						$('#'+val).clickable(0);
					});
					
					
					
					$.sound.play($.scene.data.match[$.scene.data.offset],function(){
						$('#big').hide();
						$('#'+$.scene.data.match[$.scene.data.offset]).img('people/'+$.scene.data.match[$.scene.data.offset]+'/idle');
						$.scene.data.offset++;
						if ($.scene.data.offset===$.scene.data.match.length)
						{
							$.scene.end();
						}
						else
						{
							$.scene.scene2();
						}
						});
						
					
				}
				else
				{
					$.sound.play('wrong!');
				}
			})
			.clickable(0);
		});
		
	},
	
	
});


