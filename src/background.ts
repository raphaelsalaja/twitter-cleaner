chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    if (changeInfo.url) {
        chrome.tabs.executeScript(tabId, { file: "content.tsx" })
    }
})

export {}
