$(function() {
$('#scene').on('ready', function() {
	$("#scene div")
		.draggable({
			cursor: 'move',
			containment: '#scene',
			grid: [10, 10],
			scroll: false,
			helper: 'clone',
			start: function() {
				$(document).tooltip('disable');
				$(this)
					.removeAttr('left')
					.removeAttr('top');
			},
			stop: function(e, ui) {
				var scene = $('#scene');
				$(document).tooltip('enable');
				$(this).css({
					left: Math.floor(ui.position.left / scene.width() * 100) + '%',
					top: Math.floor(ui.position.top / scene.height() * 100) + '%'
				});
			}
		});
	$(document)
		.tooltip({
			items: '#scene > div',
			track: true,
			content: function() {
				var scene = $('#scene');
				var out = '';
				var position = $(this).position();
				if ($(this).attr('id'))
					out += 'ID: #' + $(this).attr('id') + '<br/>';
				out += 'Pos: ' + position.left + ' , ' + position.top + '<br/>';
				out += 'Pos: ' + Math.floor(position.left / scene.width() * 100) + '% , ' + Math.floor(position.top / scene.height() * 100) + '%';
				return out;
			}
		});
});
});
