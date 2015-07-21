$(document).ready(function() {
    FastClick.attach(document.body);
    var sounds = {};

    $('.bar').each(function() {
    	var audioElement = document.createElement('audio');
    	audioElement.setAttribute('src', $(this).attr('data-sound-location'));
        audioElement.setAttribute('preload', 'true');

    	sounds[$(this).attr('data-note')] = audioElement;
    });

	function removePlayingClass(el) {
        el.removeClass('playing');
	}

	function playSoundByNote(note) {
		var el = $('.bar.' + note).first();
		el.addClass('playing');
		sounds[el.attr('data-note')].cloneNode().play();
		setTimeout(removePlayingClass, 100, el);
	}

	$(document).keypress(function( event ) {
		switch(event.keyCode) {
			case 113: //Q
				playSoundByNote('c');
				break;
			case 119: //W
				playSoundByNote('d');
				break;
			case 101: //E
				playSoundByNote('e');
				break;
			case 114: //R
				playSoundByNote('f');
				break;
			case 116: //T
				playSoundByNote('g');
				break;
			case 121: //Y
				playSoundByNote('a');
				break;
			case 117: //U
				playSoundByNote('b');
				break;
			case 105: //I
				playSoundByNote('c-small');
				break;
			default:
				return true;
		}
	});

	$('.bar').click(function(event) {
        playSoundByNote($(this).attr('data-note'));
	});
});