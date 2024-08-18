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
  chrome.storage.sync.set({ url: url }, () => {
    urlInput.blur();
    btnSave.blur();
    urlInput.value = "";
    document.getElementById("success").classList =
      document.getElementById("success").classList + " show";
    load();
  });
}

function load() {
  chrome.storage.sync.get(["url"], (result) => {
    urlInput.placeholder = result.url;
  });
}

urlInput.placeholder = "Enter New Tab URL here";
chrome.storage.sync.set({ focus: true });
