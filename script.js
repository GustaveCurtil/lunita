let startX, startY, startTime;

window.onload = function() {
    window.scrollTo(document.body.scrollWidth/4, document.body.scrollHeight/4);
};

// Function to handle touch start event
function handleTouchStart(event) {
    const touch = event.touches[0];
    startX = touch.pageX;
    startY = touch.pageY;
    startTime = new Date().getTime();
}

// Function to handle touch move event
function handleTouchMove(event) {
    if (event.touches.length > 1) {
        return; // Ignore if touching with more than one finger
    }

    const touch = event.touches[0];
    const deltaX = touch.pageX - startX;
    const deltaY = touch.pageY - startY;

    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    const currentTime = new Date().getTime();
    const timeElapsed = currentTime - startTime;

    if (timeElapsed > 10 && distance > 10) {
        // Move the scroll position based on swipe distance
        window.scrollBy(-deltaX, -deltaY);
        startX = touch.pageX;
        startY = touch.pageY;
    }
}

// Function to handle scroll event
function handleScroll(event) {
    // Handle scroll events from touchpad
    // Prevent the default action to avoid the browser's default scrolling behavior
    event.preventDefault();

    const deltaX = event.deltaX;
    const deltaY = event.deltaY;

    // Scroll the window based on the delta values from the scroll event
    window.scrollBy(deltaX, deltaY);
}

// Add event listeners for touch events
document.addEventListener('touchstart', handleTouchStart, false);
document.addEventListener('touchmove', handleTouchMove, false);

// Add event listener for scroll events
document.addEventListener('wheel', handleScroll, { passive: false });
