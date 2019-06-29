(function () {
    const players = document.querySelectorAll('.player');

    const getSeconds = timing => {
        const parsed = timing.split(':');
        const [hour, min, sec] = parsed.map(Number);

        return ((hour * 60) + min) * 60 + sec;
    };

    [...players].forEach(player => {
        const audio = player.querySelector('.player__audio');
        const timecodes = player.querySelectorAll('.player__timecode');

        [...timecodes].forEach(timecode => {
            const codes = timecode.innerText;
            const seconds = getSeconds(timecode.innerText);

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
