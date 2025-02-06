document.addEventListener('DOMContentLoaded', function() {
    const redScore = document.getElementById('red-score');
    const blueScore = document.getElementById('blue-score');
    const redSide = document.getElementById('red-side');
    const blueSide = document.getElementById('blue-side');

    let redCount = 0;
    let blueCount = 0;
    let pressTimer = null;
    let lastTap = 0;
    let isLongPress = false;

    // Function to handle score increase
    function increaseScore(scoreElement, side) {
        if (side === 'red') {
            redCount++;
            scoreElement.textContent = redCount;
        } else {
            blueCount++;
            scoreElement.textContent = blueCount;
        }

        // Add quick feedback animation
        scoreElement.style.transform = 'scale(1.1)';
        setTimeout(() => {
            scoreElement.style.transform = 'scale(1)';
        }, 100);
    }

    // Function to handle score decrease
    function decreaseScore(scoreElement, side) {
        if (side === 'red' && redCount > 0) {
            redCount--;
            scoreElement.textContent = redCount;
        } else if (side === 'blue' && blueCount > 0) {
            blueCount--;
            scoreElement.textContent = blueCount;
        }
    }

    // Function to handle long press reset
    function startPress(scoreElement, side) {
        isLongPress = false;
        pressTimer = setTimeout(() => {
            if (side === 'red') {
                redCount = 0;
                scoreElement.textContent = '0';
            } else {
                blueCount = 0;
                scoreElement.textContent = '0';
            }
            isLongPress = true;
            // Add feedback animation for reset
            scoreElement.style.transform = 'scale(0.8)';
            setTimeout(() => {
                scoreElement.style.transform = 'scale(1)';
            }, 200);
        }, 3000); // 3 seconds for reset
    }

    function endPress() {
        clearTimeout(pressTimer);
    }

    // Handle events for red side
    redSide.addEventListener('mousedown', () => startPress(redScore, 'red'));
    redSide.addEventListener('touchstart', () => startPress(redScore, 'red'));
    redSide.addEventListener('mouseup', () => endPress());
    redSide.addEventListener('touchend', (e) => {
        endPress();
        if (!isLongPress) {
            const currentTime = new Date().getTime();
            const tapLength = currentTime - lastTap;
            if (tapLength < 300 && tapLength > 0) {
                decreaseScore(redScore, 'red');
            } else {
                increaseScore(redScore, 'red');
            }
            lastTap = currentTime;
        }
    });

    // Handle events for blue side
    blueSide.addEventListener('mousedown', () => startPress(blueScore, 'blue'));
    blueSide.addEventListener('touchstart', () => startPress(blueScore, 'blue'));
    blueSide.addEventListener('mouseup', () => endPress());
    blueSide.addEventListener('touchend', (e) => {
        endPress();
        if (!isLongPress) {
            const currentTime = new Date().getTime();
            const tapLength = currentTime - lastTap;
            if (tapLength < 300 && tapLength > 0) {
                decreaseScore(blueScore, 'blue');
            } else {
                increaseScore(blueScore, 'blue');
            }
            lastTap = currentTime;
        }
    });

    // Lock orientation to landscape if supported
    if (screen.orientation && screen.orientation.lock) {
        screen.orientation.lock('landscape').catch(function(error) {
            console.log('Orientation lock failed:', error);
        });
    }

    // Prevent default touch behavior
    document.addEventListener('touchmove', function(e) {
        e.preventDefault();
    }, { passive: false });
});