$(document).ready(function() {
    const images = ['circle.png', 'heart.png', 'square.png', 'star.png', 'triangle.png'];
    let gameCards = [...images, ...images];
    let openedCards = [];
    let matchedPairs = 0;
    let isGameRunning = false;
    let canClick = true;

    const $btn = $('#game-btn');
    const $board = $('#game-board');

    function initBoard(showFaceUp) {
        $board.empty();
        $('#win-message').hide();
        
        if (!isGameRunning) {
            gameCards.sort(() => Math.random() - 0.5);
        }

        gameCards.forEach((imgName) => {
            const $card = $('<div class="card"></div>');
            $card.data('img', imgName);
            
            if (showFaceUp) {
                $card.css('background-image', `url('img/${imgName}')`);
            } else {
                $card.addClass('back');
            }
            $board.append($card);
        });
    }

    initBoard(true);

    $btn.on('click', function() {
        if ($btn.text() === 'START') {
            isGameRunning = true;
            matchedPairs = 0;
            $btn.text('FINISH');
            initBoard(false);
        } else {
            isGameRunning = false;
            $btn.text('START');
            $('.card').each(function() {
                const img = $(this).data('img');
                $(this).css('background-image', `url('img/${img}')`).removeClass('back');
            });
        }
    });

    $board.on('click', '.card', function() {
        if (!isGameRunning || !canClick) return;
        const $this = $(this);
        if ($this.hasClass('matched') || !$this.hasClass('back')) return;

        const img = $this.data('img');
        $this.css('background-image', `url('img/${img}')`).removeClass('back');
        openedCards.push($this);

        if (openedCards.length === 2) {
            canClick = false;
            const card1 = openedCards[0];
            const card2 = openedCards[1];

            if (card1.data('img') === card2.data('img')) {
                card1.addClass('matched');
                card2.addClass('matched');
                matchedPairs++;
                openedCards = [];
                canClick = true;

                if (matchedPairs === images.length) {
                    $('#win-message').fadeIn();
                    $btn.text('START');
                    isGameRunning = false;
                }
            } else {
                setTimeout(() => {
                    card1.addClass('back').css('background-image', "");
                    card2.addClass('back').css('background-image', "");
                    openedCards = [];
                    canClick = true;
                }, 1000); 
            }
        }
    });
});