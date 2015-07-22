$(document).ready(function() {
    FastClick.attach(document.body);
    var sounds = {};
    var soundsCtx = {};
	var contextClass = (window.AudioContext || 
				  	window.webkitAudioContext || 
				  	window.mozAudioContext || 
					window.oAudioContext || 
					window.msAudioContext);
	var audioCtx = false;
	if (contextClass) {
    	audioCtx = new contextClass();
	}

	$('#hideinfolink').click(function(event) {
		event.preventDefault();
		$('#hideinfo').hide();
	});

	$('#hickorylink').click(function(event) {
		event.preventDefault();
		var notes = [
			{'note': 'e', 'delay': 300},
			{'note': 'f', 'delay': 300},
			{'note': 'g', 'delay': 300},
			{'note': 'g', 'delay': 300},
			{'note': 'a', 'delay': 300},
			{'note': 'b', 'delay': 300},
			{'note': 'c-small', 'delay': 300},

			{'note': 'g', 'delay': 700},
			{'note': 'e', 'delay': 300},
			{'note': 'f', 'delay': 300},
			{'note': 'g', 'delay': 300},
			{'note': 'g', 'delay': 300},
			{'note': 'a', 'delay': 300},
			{'note': 'b', 'delay': 300},
			{'note': 'c-small', 'delay': 300},

			{'note': 'g', 'delay': 800},
			{'note': 'c-small', 'delay': 400},
			{'note': 'c-small', 'delay': 400},
			{'note': 'g', 'delay': 400},
			{'note': 'b', 'delay': 700},
			{'note': 'a', 'delay': 400},
			{'note': 'a', 'delay': 400},
			{'note': 'g', 'delay': 400},

			{'note': 'g', 'delay': 600},
			{'note': 'a', 'delay': 400},
			{'note': 'g', 'delay': 400},

			{'note': 'f', 'delay': 400},
			{'note': 'e', 'delay': 400},
			{'note': 'd', 'delay': 400},
			{'note': 'c', 'delay': 400},

			{'note': 'e', 'delay': 800},
			{'note': 'c', 'delay': 800},
			{'note': 'e', 'delay': 800},
			{'note': 'c', 'delay': 800},

			{'note': 'c', 'delay': 500},
			{'note': 'd', 'delay': 50},
			{'note': 'e', 'delay': 50},
			{'note': 'f', 'delay': 50},
			{'note': 'g', 'delay': 50},
			{'note': 'a', 'delay': 50},
			{'note': 'b', 'delay': 50},
			{'note': 'c-small', 'delay': 50},
		];

		var lengthSoFar = 0;

		for (var i=0;i<notes.length;i++) {
			setTimeout(playSoundByNote, lengthSoFar + notes[i]['delay'], notes[i]['note']);
			lengthSoFar += notes[i]['delay'];
		}
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
			sounds[note].play();
		}
	}

    $('.bar').each(function() {
    	if (audioCtx) {
    		loadNote($(this).attr('data-note'), $(this).attr('data-sound-location'));
    	} else {
			var audioElement = document.createElement('audio');
			audioElement.setAttribute('src', $(this).attr('data-sound-location'));
		    audioElement.setAttribute('preload', 'auto');
		    audioElement.load();
		    sounds[$(this).attr('data-note')] = audioElement;
		}
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