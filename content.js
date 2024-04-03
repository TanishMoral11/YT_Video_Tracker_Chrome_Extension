let videoData = {
    stops: 0,
    resumes: 0,
    totalTime: 0,
    scrolls: 0, // This property tracks scroll counts
    isPaused: true
  };
  
  function updateVideoInfo() {
    console.log('Content script is running.');
    window.addEventListener('load', function () {
        console.log('YouTube page is fully loaded.');
        // Add your code to interact with the page here
    });
  
    // Track video time and pause/resume
    let video = document.querySelector('video');
    if (video) {
        video.addEventListener('timeupdate', function () {
            if (!videoData.isPaused && video.paused) {
                // Video paused
                videoData.stops += 1;
                videoData.isPaused = true;
            } else if (videoData.isPaused && !video.paused) {
                // Video resumed
                videoData.resumes += 1;
                videoData.isPaused = false;
            }
  
            // Update total time in seconds
            videoData.totalTime = Math.floor(video.currentTime);
        });
    } else {
        console.log('Video element not found.');
    }
  
    // Track video scrolls
    window.addEventListener('scroll', function () {
        videoData.scrolls += 1; // Increment scrolls count on scroll events
    });
  }
  
  updateVideoInfo();
  