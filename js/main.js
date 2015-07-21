$(document).ready(function() {
	function playSound(location) {
		var audioElement = document.createElement('audio');
		audioElement.setAttribute('src', location);
        audioElement.setAttribute('autoplay', 'autoplay');
        audioElement.load();
        
        audioElement.addEventListener('load', function() {
            audioElement.play();
        }, true);

        audioElement.addEventListener('ended', function() {
        	console.log('ended');
        });
	}

	function removePlayingClass(className) {
        $(className).removeClass('playing');
	}

	function playSoundByClass(className) {
		$(className).addClass('playing');
		playSound($(className).attr('data-sound-location'));
		setTimeout(removePlayingClass, 100, className);
	}

	$(document).keypress(function( event ) {
		switch(event.keyCode) {
			case 113: //Q
				playSoundByClass('.bar.c');
				break;
			case 119: //W
				playSoundByClass('.bar.d');
				break;
			case 101: //E
				playSoundByClass('.bar.e');
				break;
			case 114: //R
				playSoundByClass('.bar.f');
				break;
			case 116: //T
				playSoundByClass('.bar.g');
				break;
			case 121: //Y
				playSoundByClass('.bar.a');
				break;
			case 117: //U
				playSoundByClass('.bar.b');
				break;
			case 105: //I
				playSoundByClass('.bar.c-small');
				break;
			default:
				return true;
		}
	});

	$('.bar').click(function(event) {
        playSoundByClass('.bar.' + $(this).attr('class').replace(/bar /, '').replace(/playing/, ''));
	});
});