document.addEventListener('DOMContentLoaded', function() {
    const redScore = document.getElementById('red-score');
    const blueScore = document.getElementById('blue-score');
    const redSide = document.getElementById('red-side');
    const blueSide = document.getElementById('blue-side');

    let redCount = 0;
    let blueCount = 0;

    // Handle click/touch events for red side
    redSide.addEventListener('click', function(e) {
        e.preventDefault();
        redCount++;
        redScore.textContent = redCount;
        
        // Add quick feedback animation
        redScore.style.transform = 'scale(1.1)';
        setTimeout(() => {
            redScore.style.transform = 'scale(1)';
        }, 100);
    });

    // Handle click/touch events for blue side
    blueSide.addEventListener('click', function(e) {
        e.preventDefault();
        blueCount++;
        blueScore.textContent = blueCount;
        
        // Add quick feedback animation
        blueScore.style.transform = 'scale(1.1)';
        setTimeout(() => {
            blueScore.style.transform = 'scale(1)';
        }, 100);
    });

    // Lock orientation to landscape if supported
    if (screen.orientation && screen.orientation.lock) {
        screen.orientation.lock('landscape').catch(function(error) {
            console.log('Orientation lock failed:', error);
        });
    }

    // Prevent default touch behavior to avoid unwanted scrolling or zooming
    document.addEventListener('touchmove', function(e) {
        e.preventDefault();
    }, { passive: false });

    // Double tap to reset scores
    let lastTap = 0;
    document.addEventListener('touchend', function(e) {
        const currentTime = new Date().getTime();
        const tapLength = currentTime - lastTap;
        if (tapLength < 500 && tapLength > 0) {
            redCount = 0;
            blueCount = 0;
            redScore.textContent = '0';
            blueScore.textContent = '0';
        }
        lastTap = currentTime;
    });
});
