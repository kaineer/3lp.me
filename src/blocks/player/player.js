(function () {
    var players = document.querySelectorAll('.player');

    var getSeconds = timing => {
        var parsed = timing.split(':').reverse();
        var [sec, min, hour] = parsed.map(Number);

        sec += min * 60;
        sec += hour * 60;

        return sec;
    };

    [...players].forEach(player => {
        var audio = player.querySelector('.player__audio');
        var timecodes = player.querySelectorAll('.player__timecode');

        [...timecodes].forEach(timecode => {
            var codes = timecode.innerText;
            var seconds = getSeconds(timecode.innerText);

            var button = document.createElement('button');
            button.type = 'button';
            button.className = 'player__button';
            button.innerText = codes;

            button.addEventListener('click', () => {
                audio.currentTime = seconds;
                audio.play();
            });

            timecode.replaceWith(button);
        });
    });
}());
