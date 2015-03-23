/*
! background and mingming's pics are not correct
*/
$.extend($.scene, {
	background: 'street',

	settings: {
		
	},

	data: {
	
		offset: 0,
		
		queue: ['hao','wo','hao','hao','wo','hao'],
		
		queue2: ['hao','ji','bai','ta','da','si','wo','se','zhong','jiao','ren','zhu'],
		
		options: ['好','几','百','他','大','四','我','色','中','叫','人','住'],
		
	},

	

	start: function() {
		
		$.scene.hide();
		$.scene.scene1();
		
	},
	
	scene1: function(){
		$('#announcer')
		.img('people/announcer/talk#1')
		.show()
		.clickable(function(){
			$(this).img('people/announcer/talk');
			$.sound.play('rules',$.scene.scene2);
		});
	},
	
	scene2: function(){
		$('#announcer').hide();
		$('#girl-purple')
		.img('people/girl-purple/idle')
		.show();
		$('#mingming')
		.img('people/beibei/idle')
		.show()
		.clickable(function(){
			$(this).img('people/beibei/talk');
			$("#dialogue1")
			.addClass('speach-bubble')
			.setText("你#，#是明明。");
			$.sound.play('Sentence1',function(){
				$("#mingming").img('people/beibei/idle');
				
				$.each($.scene.data.queue2, function(key, val) { 
		    
					$('#card' + (key+1))
						.data('cvalue', val)
						.addClass('table')
						.setText($.scene.data.options[key])
						.clickable(function() {
							if ($.scene.data.queue[$.scene.data.offset] == $(this).data('cvalue'))
							{
								$.scene.data.offset++;
								switch($.scene.data.offset)
								{
									case 1:
										$("#dialogue1").setText("你好，#是明明。");
										$.sound.play('well-done');
										break;
									case 2:
										$("#dialogue1").setText("你好，我是明明。");
										$.sound.play('well-done',$.scene.scene3);
										break;
									case 3:
										$("#dialogue2").setText("你好，你#吗？");
										$.sound.play('well-done');
										break;
									case 4:
										$("#dialogue2").setText("你好，你好吗？");
										$.sound.play('well-done',$.scene.scene4);
										break;
									case 5:
										$("#dialogue1").setText("我很#，谢谢。");
										$.sound.play('well-done');
										break;
									case 6:
										$("#dialogue1").setText("我很好，谢谢。");
										$.sound.play('well-done', function(){
											$('#mingming').unbind('click');
											$('#dialogue1').hide();
											$.scene.end();});
										break;
									
								}		
							}
						});
				
				
				
				});
				
			});
			
		});
	},
	
	scene3: function(){
		$('#dialogue1').hide();
		$('#mingming').unbind('click');
		
		$('#girl-purple')
		.clickable(function(){
			$(this).img('people/girl-purple/talk');
			$('#dialogue2')
			.addClass('speach-bubble')
			.setText("你#，你#吗？");
			
			
		
		$.sound.play('sentence2',function(){
			$('#girl-purple').img('people/girl-purple/idle');
			});
		});
		
	},
	
	scene4: function(){
		$('#dialogue2').hide();
		$('#girl-purple').unbind('click');
		
		$('#mingming')
		.bind('click')
		.clickable(function(){
			$(this).img('people/beibei/talk');
			$('#dialogue1')
			.setText("#很#，谢谢。")
			.css({'color': 'white', 'font-size': '40px'})
			.show();
		
		$.sound.play('sentence3',function(){
			$('#mingming').img('people/beibei/idle');
			});
		});
	},
	
	hide: function(){
	    $('#announcer')
		.empty()
		.hide();
		
		$('#dialogue1')
		.empty()
		.hide();
		
		$('#dialogue2')
		.empty()
		.hide();
		
		
	}	
	
	
	
	
	
	
	
});


