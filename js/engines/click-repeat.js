
$.extend($.scene, {
	background: 'street',

	settings: {
		
	},

	data: {
		
	},

	

	start: function() {
		$.scene.hide();
		$('#announcer')
		.empty()
		.hide();
		$.scene.scene1();
		

		
	},
	
	scene1: function(){
	
		$('#dada')
		.img('people/dada/idle#1')
		.show();
		
		$('#reply1')
		.img('people/reply1/idle#1')
		.show();
	
		$('#announcer')
		.img('people/announcer/talk#1')
		.show()
		.clickable(function(){
			$('#announcer').img('people/announcer/talk')
			$.sound.play('rules',$.scene.scene2);
		}, {fullscreen: 1});
		
	},
	
	scene2: function(){
	
		$('#announcer').hide();
	
		$('#dada')
		.clickable(function(){
		    $('#dada').img('people/dada/talk');
			$.sound.play('dada-speak',function(){
				$('#dada').img('people/dada/pose');
				$('#reply1').img('people/reply1/talk');
				$.sound.play('reply1-speak',$.scene.scene3);
			});
		});
	
	},
	
	scene3: function(){
	
		$('#dada').hide();
		$('#reply1').hide();
		
		$('#beibei')
		.img('people/beibei/idle')
		.show();
		$('#lr')
		.img('people/lr/idle')
		.show()
		.clickable(function(){
		    $('#lr').img('people/lr/talk');
			$.sound.play('lr-speak',function(){
				$('#lr').img('people/lr/point');
				$('#beibei').img('people/beibei/talk');
				$.sound.play('beibei-speak',$.scene.scene4);
			});
		});
	
		
	},
	
	scene4: function(){
	
		$('#lr').hide();
		$('#beibei').hide();
		
		$('#nini')
		.img('people/girl-green/idle')
		.show();
		$('#jinhua')
		.img('people/jinhua/stand')
		.show()
		.clickable(function(){
		    $('#jinhua').img('people/jinhua/talk');
			$.sound.play('jinhua-speak',function(){
				$('#jinhua').img('people/jinhua/idle');
				$('#nini').img('people/girl-green/talk');
				$.sound.play('nini-speak',$.scene.scene5);
			});
		});
	
	},
	
	scene5: function(){
		$('#jinhua').hide();
		$('#nini').hide();
		
		$('#question')
		.html("你好吗？")
		.css({'color': 'white', 'font-size': '40px'})
		.show()
		.clickable(function(){
			$.sound.play('r-u-ok',function(){
				$('#answer')
				.html("我很好，谢谢！")
				.css({'color': 'white', 'font-size': '40px'})
				.show()
				.clickable(function(){
					$.sound.play('fine-thx',function(){
						$('#head-sad')
						.img('people/dada/head-sad#1')
						.show()
						.clickable(function(){
							$(this).img('people/dada/head-sad#2');
							$.sound.effect('wrong');
						});
						
						$('#head-happy')
						.img('people/dada/head-happy#1')
						.show()
						.clickable(function(){
							$(this).img('people/dada/head-happy#2');
							$.sound.play('correct',function(){
								$.scene.end();
							});
						});
						
						$('#head-unwell')
						.img('people/dada/head-unwell#1')
						.show()
						.clickable(function(){
							$(this).img('people/dada/head-unwell#2');
							$.sound.effect('wrong');
						});
					});
				})
			});
		});
	},
	
	hide: function(){
	    $('#dada')
		.empty()
		.hide();
		
		$('#jinhua')
		.empty()
		.hide();
		
		$('#reply1')
		.empty()
		.hide();
		
		$('#nini')
		.empty()
		.hide();
		
		$('#beibei')
		.empty()
		.hide();
		
		$('#lr')
		.empty()
		.hide();
		
		$('#question')
		.empty()
		.hide();
		
		$('#answer')
		.empty()
		.hide();
		
		$('#announcer')
		.empty()
		.hide();
		
		$('#head-happy')
		.empty()
		.hide();
		
		$('#head-unwell')
		.empty()
		.hide();
		
		$('#head-sad')
		.empty()
		.hide();
		
		$('#yes')
		.empty()
		.hide();
		
		$('#no')
		.empty()
		.hide();
		
	}
});


