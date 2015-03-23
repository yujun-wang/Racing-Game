/*
All the images are not correct
*/
$.extend($.scene, {
	background: 'street',

	settings: {
		
		options: [1,2,3,4],		//selection options
		
	},

	data: {
	
		lib: ['你','好','我','叫','四','五','六','七','八','九','十','爸','妈','有','住','中','国','人','澳','大','利','亚','她','他','是','几','多','的','学','生','老','师','书','百','红','色','黄','蓝','白','这','个','没','家','猫','狗','只','小','很','不','和','岁','点','分','半','吃','鱼','马','鸟','匹','条','日','打','星','期','快','乐','月','年','圣','诞'],
		
		
		
		offset: 0,
		
		count: 12,		
		
		answer: [],		//right answers
		
		layout: [],		//shuffled right answers
		
	},

	
	
	start: function() {
		
		$.scene.prepare();
		
		$.scene.scene1();
	},
	
	scene1: function(){
		
		$.sound.play('rules',$.scene.scene2);
	},
	
	scene2: function(){
		
		$.sound.play($.scene.data.lib[($.scene.data.answer[$.scene.data.offset])-1],function(){
			$.each($.scene.data.layout, function(key, val){
				$('#'+(key+1)).clickable(1);
			});
		});
		
	},
	
	
	
	
	prepare: function(){
	
		$.scene.data.answer=$.pick2($.scene.settings.options, 12);
		console.log($.scene.data.answer);
		$.scene.data.layout = $.shuffle($.scene.data.answer);
		console.log('A', $.scene.data.layout);
		console.log('B', $.scene.data.answer);
		
		
		$.each($.scene.data.layout, function(key, val)
		{
			
			$('#'+(key+1))
			.setText($.scene.data.lib[(val-1)])
			.addClass('table2')
			.clickable(function(){
				var temp = parseInt($(this).attr('id'))-1;
				
				if ($.scene.data.layout[temp]==$.scene.data.answer[$.scene.data.offset])
				{
					$(this).hide();
					$.each($.scene.data.layout, function(key, val){
						$('#'+(key+1)).clickable(0);
					});
					$.scene.data.offset++;
					if($.scene.data.offset==$.scene.data.count)
					{
						$.sound.play('all correct!',$.scene.end);
					}
					else
					{
						$.sound.play('right',$.scene.scene2);
					}
				}
				else
				{
					$.sound.play('wrong');
				}
			})
			.clickable(0);
		});
		
	},
	
	
});


