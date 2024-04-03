chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
  console.log('Tabs query result:', tabs);

  chrome.tabs.sendMessage(tabs[0].id, { action: 'getVideoInfo' }, function (response) {
    console.log('Response from content script:', response);

    if (chrome.runtime.lastError) {
      console.error('Error sending message:', chrome.runtime.lastError.message);
    } else if (response) {
      // No need to parse the response as it is already an object
      const videoData = response;
      updateUI(videoData);
    } else {
      console.error('Response is undefined. Check content script execution.');
    }
  });
});


console.log('Popup script is running.');

document.addEventListener('DOMContentLoaded', function () {
  console.log('DOMContentLoaded event fired.');

  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    console.log('Tabs query result:', tabs);

    chrome.tabs.sendMessage(tabs[0].id, { action: 'getVideoInfo' }, function (response) {
      console.log('Response from content script:', response);

      if (response) {
        // No need to parse the response as it is already an object
        const videoData = response;
        updateUI(videoData);
      } else {
        console.error('Response is undefined. Check content script execution.');
      }
    });
  });
});

function updateUI(videoData) {
  console.log('Updating UI with video data:', videoData);

  document.getElementById('stopCount').textContent = videoData.stops;
  document.getElementById('resumeCount').textContent = videoData.resumes;
  document.getElementById('totalTime').textContent = `${videoData.totalTime} seconds`;
  document.getElementById('scrollCount').textContent = videoData.scrolls;
}
