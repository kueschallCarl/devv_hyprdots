chrome.storage.sync.get(["url", "focus"], (result) => {
  if (result.url) {
    window.location.replace(result.url);
    if (result.focus) {
      window.history.pushState("", "", "");
    }
  } else {
    if (window.localStorage.getItem("url")) {
      chrome.storage.sync.set(
        {
          url: window.localStorage.getItem("url"),
          focus: window.localStorage.getItem("focus"),
        },
        () => {
          chrome.storage.sync.get(["url", "focus"], (result) => {
            if (result.url) {
              window.location.replace(result.url);
              if (result.focus) {
                window.history.pushState("", "", "");
              }
            }
          });
        }
      );
    }
    window.location.replace(chrome.runtime.getURL("setup.html"));
  }
});
