// Inject the Pyodide script into the web page
const script = document.createElement('script');
script.src = chrome.runtime.getURL('/pyodide/pyodide.js');
console.log(script.src);
//script.src = 'https://localhost:*';
script.addEventListener('load', () => {
  document.head.appendChild(script);
  chrome.runtime.sendMessage({ type: 'pyodideReady' });
});

//// Listen for a message from the background script indicating that Pyodide is ready
//chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
//  if (message.type === 'pyodideReady') {
////     const script = document.createElement('script');
////     script.src = 'https://localhost:*';
////     document.head.appendChild(script);
//      languagePluginLoader.then(() => {
//            chrome.runtime.sendMessage({ type: 'pyodideReady' });
//          });
//    // Fetch the model file
//    fetch(chrome.runtime.getURL('model.pkl'))
//      .then(response => response.arrayBuffer())
//      .then(buffer => {
//        // Use Pyodide to load the model
//        const bytes = new Uint8Array(buffer);
//        const model = pyodide.globals.get('pickle').loads(bytes);
//
//        // Use the model to classify URLs
//        chrome.webRequest.onBeforeRequest.addListener(
//          function(details) {
//          const url = details.url;
//            const isMalicious = model.predict([url])[0];
//            chrome.extension.getBackgroundPage().console.log(isMalicious);
//            chrome.runtime.sendMessage({ isMalicious: isMalicious });
//          },
//          { urls: [ "http://*/*"] },
//        );
//      });
//  }
//});
