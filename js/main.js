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

	function preloadNotes() {
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
	}

	$('#hideinfolink').click(function(event) {
		event.preventDefault();
		$('#hideinfo').hide();
		preloadNotes();
	});
	
	function playDictionaryOfNotes(notes) {
		var lengthSoFar = 0;

		for (var i=0;i<notes.length;i++) {
			setTimeout(playSoundByNote, lengthSoFar + notes[i]['delay'], notes[i]['note']);
			lengthSoFar += notes[i]['delay'];
		}
	}

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

	$('.songlink').click(function(event) {
		playSoundByNote('silence');

		var songLocation = $(this).attr('data-song-location');
		console.log('Playing: ' + songLocation);

		$.getJSON(songLocation, function(data) {
			console.log('Fully loaded: ' + songLocation);
			playDictionaryOfNotes(data.notes);
		});
	});

	preloadNotes();
});