chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
  chrome.tabs.sendMessage(tabs[0].id, {}, function(response) {
    var result = document.getElementById('result');
    console.log(result)
    if (!chrome.runtime.lastError && response && response.isMalicious) {
      result.innerHTML = "Warning! This website has been identified as malicious.";
    } else {
      result.innerHTML = "This website is safe.";
    }
  });
});

chrome.runtime.onConnect.addListener(function(port) {
  console.assert(port.name == "popup");
  port.onMessage.addListener(function(message) {
    console.log(message);
  });
});
//chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
//  chrome.tabs.sendMessage(tabs[0].id, {}, function(response) {
//    var result = document.getElementById('result');
//    if (response.isMalicious) {
//      result.innerHTML = "Warning! This website has been identified as malicious.";
//    } else {
//      result.innerHTML = "This website is safe.";
//    }
//  });
//});
