urlInput = document.getElementById("url");
btnSave = document.getElementById("save");
urlInput.addEventListener("keyup", function (event) {
  if (event.key === "Enter") {
    save();
  }
});
btnSave.onclick = save;

function save() {
  url = urlInput.value;
  url = url.indexOf("://") === -1 ? "https://" + url : url;
  // localStorage.setItem("url", url);
  chrome.storage.sync.set({ url: url }, () => {
    urlInput.blur();
    btnSave.blur();
    urlInput.value = "";
    load();
  });
}

function load() {
  chrome.storage.sync.get(["url", "focus"], (result) => {
    urlInput.placeholder = result.url;
    document.getElementById("autofocusBtn").checked = result.focus;
  });
}

document.getElementById("autofocusBtn").onchange = (e) => {
  chrome.storage.sync.set({ focus: e.target.checked });
};

chrome.storage.sync.get(["url", "focus"], (result) => {
  if (!result.url) {
    if (window.localStorage.getItem("url")) {
      chrome.storage.sync.set(
        {
          url: window.localStorage.getItem("url"),
          focus: window.localStorage.getItem("focus"),
        },
        load
      );
    } else {
      chrome.tabs.create({ url: chrome.runtime.getURL("setup.html") });
    }
  } else {
    urlInput.placeholder = result.url;
    document.getElementById("autofocusBtn").checked = result.focus;
  }
});
