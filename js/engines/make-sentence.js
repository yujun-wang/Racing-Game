/*
#scene1-5-5
*/
$.extend($.scene, {
	background: 'calligraphy',

	settings: {
		
	},

	data: {
	
		lib: ['你','好','我','叫','四','五','六','七','八','九','十','爸','妈','有','住','中','国','人','澳','大','利','亚','她','他','是','几','多','的','学','生','老','师','书','百','红','色','黄','蓝','白','这','个','没','家','猫','狗','只','小','很','不','和','岁','点','分','半','吃','鱼','马','鸟','匹','条','日','打','星','期','快','乐','月','年','圣','诞'],
		
		options: [1,2,3,4], 
		
		offsetx: 0,
		
		offsety: 0,
		
		total: 5,	//total of questions
		
		blanks: 7,
		
		questions: {			
			0:['#','#','!'],
			1:['#','#','吗','?'],
			2:['#','#','什','么','名','字','?'],
			3:['#','早','!'],
			4:['#','#','珊','珊','。']
		},
		
		correct: {		//correct answers
			0:[1,2],
			1:[1,2],
			2:[1,4],
			3:[1],
			4:[3,4]
		},
		
	},

	
	start: function() {
		
		$.scene.prepare();
		
		$.scene.scene1();
	},
	
	scene1: function(){
		$.sound.play('rules',$.scene.scene2);
		
	},
	
	scene2: function(){
		$.each($.scene.data.options, function(key, val){
			$('#ch'+(key+1)).clickable(0);
		});
	
		for (var i=1;i<=7;i++)
		{
			$('#q'+i).setText('');
		}
		
		$.each($.scene.data.questions[$.scene.data.offsetx], function(key, val){
			$('#q'+(key+1))
			.addClass('table2')
			.setText(val);
		});
		
		$.sound.play('q'+($.scene.data.offsetx+1),function(){
			$.each($.scene.data.options, function(key, val){
				$('#ch'+(key+1)).clickable(1);
			});
		});
	},
	
	
	
	
	prepare: function(){
		
		$.each($.scene.data.lib, function(key, val){
			$('#ch'+(key+1))
			.addClass('table1')
			.setText(val);
		});
		
		$.each($.scene.data.options, function(key, val){
			$('#ch'+(key+1))
			.addClass('table13');
		});
		
		
		
		$.each($.scene.data.options, function(key, val){	//make the options clickable
				
				$('#ch'+(key+1))
				.off('click')
				.clickable(function(){
					
						var temp = 'ch'+$.scene.data.correct[$.scene.data.offsetx][$.scene.data.offsety]; //the right answer
						console.log($(this).attr('id'));
						if ($(this).attr('id')==temp){ //the right option is clicked
							console.log('right');
							//set the blank with the right answer
							for (var i=0;i<$.scene.data.questions[$.scene.data.offsetx].length;i++)
							{
								//find the first blank and fill it with the right answer
								if ($.scene.data.questions[$.scene.data.offsetx][i]=='#')
								{
									$('#q'+(i+1)).setText($.scene.data.lib[($.scene.data.correct[$.scene.data.offsetx][$.scene.data.offsety])-1]);
									$.scene.data.questions[$.scene.data.offsetx][i]=' ';
									i=$.scene.data.questions[$.scene.data.offsetx].length;
								}
							}
							$.scene.data.offsety++;
							console.log('offsety:',$.scene.data.offsety);
							if ($.scene.data.offsety>=$.scene.data.correct[$.scene.data.offsetx].length){ //sentence completed
								$.each($.scene.data.options, function(key, val){
									$('#ch'+(key+1)).clickable(0);
								});
								$.scene.data.offsety=0;
								$.scene.data.offsetx++;
								console.log('offsetx:',$.scene.data.offsetx);
								//all sentences completed
								if ($.scene.data.offsetx>=$.scene.data.total){			//$.scene.data.correct.length -- undefined??
									$.each($.scene.data.options, function(key, val){
										$('#ch'+(key+1)).clickable(0);
									});
									$.scene.end();
								}
								else{
									$.sound.play('sentence completed!',$.scene.scene2);
								}
							}
							
							
						}
						else{
							$.sound.play('wrong');
						}
					
				})
				.clickable(0);
			});
		
		
	},
	
	
});


