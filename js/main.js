$(document).ready(function() {
	var audioElement = document.createElement('audio');
	
	$('.bar').click(function(event) {
        audioElement.setAttribute('src', $(this).attr('data-sound-location'));
        audioElement.setAttribute('autoplay', 'autoplay');
        audioElement.load();
        
        audioElement.addEventListener("load", function() {
            audioElement.play();
        }, true);
	});
});