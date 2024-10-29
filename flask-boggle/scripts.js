$(document).ready(function() {
    let score = 0;
    let timeLeft = 60; // 60 seconds for the game

    // Update the timer every second
    const timer = setInterval(function() {
        timeLeft--;
        $('#timer').text(`Time left: ${timeLeft}s`);

        if (timeLeft <= 0) {
            clearInterval(timer);
            $('#word-form :input').prop('disabled', true); // Disable form inputs
            $('#result').text('Time is up! Game over.');
            axios.post('/update-score', { score: score })
                .then(response => {
                    $('#plays').text(`Plays: ${response.data.plays}`);
                    $('#high_score').text(`High Score: ${response.data.high_score}`);
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        }
    }, 1000);

    $('#word-form').on('submit', function(event) {
        event.preventDefault();
        const word = $('#word').val();
        axios.post('/check-word', { word: word })
            .then(response => {
                const result = response.data.result;
                let message;
                if (result === 'ok') {
                    message = 'Valid word!';
                    score += word.length;
                    $('#score').text(`Score: ${score}`);
                } else if (result === 'not-on-board') {
                    message = 'Word not on board!';
                } else {
                    message = 'Not a valid word!';
                }
                $('#result').text(message);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    });
});