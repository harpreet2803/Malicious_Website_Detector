// Send a message to the content script to request Pyodide to be loaded
chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
//  if (tabs[0].url.startsWith('chrome://')) {
//    console.log('Cannot inject script into chrome:// URL');
//  }
    chrome.scripting.executeScript(
            { target: { tabId: tabs[0].id }, files: ['content.js'] },
            (results) => {
                if (chrome.runtime.lastError) {
                    console.error(chrome.runtime.lastError.message);
                } else {
                    chrome.tabs.sendMessage(tabs[0].id, { type: 'loadPyodide' });
                }
            }
        );
});

// Listen for a message from the content script indicating that Pyodide is ready
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'pyodideReady') {
      // Fetch model.pkl file
      fetch(chrome.runtime.getURL('model.pkl'))
              .then(response => response.arrayBuffer())
              .then(buffer => {
                // Use Pyodide to load the model
                const bytes = new Uint8Array(buffer);
                const model = pyodide.globals.get('pickle').loads(bytes);

                // Use model to classify URLs
                chrome.webRequest.onBeforeRequest.addListener(
                  function(details) {
                    const url = details.url;
                    const isMalicious = model.predict([url])[0];
                    chrome.extension.getBackgroundPage().console.log(isMalicious);
                    chrome.tabs.sendMessage(details.tabId, { isMalicious: isMalicious });
                  },
                  { urls: ["<all_urls>"], types: ["main_frame", "sub_frame", "xmlhttprequest"] },
                );
              });
          }});

          chrome.webRequest.onHeadersReceived.addListener(details => {
            const headers = details.responseHeaders;
            headers.push({ name: 'Content-Security-Policy', value: "default-src 'self';" });
            return { responseHeaders: headers };
          }, { urls: ["http://*/*"], types: ["main_frame", "sub_frame"] }, [ 'responseHeaders']);

