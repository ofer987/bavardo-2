(function() {
  chrome.commands.onCommand.addListener(function(command, tab) {
    var tabUrl = new URL(tab.url);

    if (tabUrl.origin === "https://teams.microsoft.com" && tabUrl.hash.match(/(meeting|calling)/)) {
      if (command === "hang-up") {
        chrome.tabs.executeScript({
          code: "window.document.querySelector('#hangup-button').click();"
        });
      }

      if (command === "toggle-full-screen") {
        chrome.tabs.executeScript({
          code: `
              window.document.querySelector('#callingButtons-showMoreBtn').click();

              // Wait till the #full-screen-button appears in the DOM
              setTimeout(function() {
                window.document.querySelector('#full-screen-button').click();
              }, 10);
            `
        });
      }

      if (command === "dismiss") {
        chrome.tabs.executeScript({
          code: "window.document.querySelector(\"button[aria-label*='Dismiss'\").click();"
        });
      }

      if (command === "raise-hand") {
        chrome.tabs.executeScript({
          code: "window.document.querySelector('#raise-hand-button').click();"
        });
      }
    }
  });
})();
