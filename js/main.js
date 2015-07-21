$(document).ready(function() {
    FastClick.attach(document.body);
    var sounds = {};
    var soundsCtx = {};
	var audioCtx = new (window.AudioContext || window.webkitAudioContext)();

	$('#hideinfolink').click(function(event) {
		event.preventDefault();
		$('#hideinfo').hide();
	});

	function loadNote(note, url) {
		var request = new XMLHttpRequest();
		request.open("GET", url, true);
		request.responseType = "arraybuffer";
		request.onload = function() {
			audioCtx.decodeAudioData(request.response, function(buffer) {
				soundsCtx[note] = buffer;
			}, function(error) {
				console.error("decodeAudioData error", error);
			});
		};

		request.send();
	}

	function playSound(note) {
		if (audioCtx) {
		    var source = audioCtx.createBufferSource();
		    source.buffer = soundsCtx[note];
		    source.connect(audioCtx.destination);
		    source.start(0);
		} else {
			var audioElement = document.createElement('audio');
			audioElement.setAttribute('src', $('.bar.'+note).attr('data-sound-location'));
	        audioElement.setAttribute('autoplay', 'autoplay');
	        audioElement.load();
	        
	        audioElement.addEventListener('load', function() {
	            audioElement.play();
	        }, true);
		}
	}

    $('.bar').each(function() {
    	loadNote($(this).attr('data-note'), $(this).attr('data-sound-location'));
    });

	function removePlayingClass(el) {
        el.removeClass('playing');
	}

	function playSoundByNote(note) {
		var el = $('.bar.' + note).first();
		el.addClass('playing');
		playSound(note);
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