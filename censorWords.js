var hateList = new Array();

chrome.storage.sync.get(['list1'], function (val) {
    if (val.list1.length > 0)
        hateList = val.list1;
    console.log("val.list1 :" + val.list1);
})

setTimeout(findText(document.body), 1000) // After a second of load time

const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
        mutation.addedNodes.forEach(findText)
    });
});

observer.observe(document.body,  
    { 
        subtree: true,
        childList: true // Look for any additions of child nodes
    });

function findText(element) {

    if (element.hasChildNodes()) {
        element.childNodes.forEach(findText);
    } 
    else if (element.nodeType === Text.TEXT_NODE) {
        replaceText(element);
    }
}

function replaceText(textElement) {
   textElement.textContent = ` ${textElement.textContent} `;

   for (let ignor in hateList) {
        if (ignor != "[ __ ]") {
            // So we can read variables as strings
            var sRegExpInput = new RegExp(ignor, "gi");
            textElement.textContent = textElement.textContent.replace(sRegExpInput, " ████ ");
        }
        // For YouTube subtitles
        else {
            try {
                if (textElement.parentElement.className === "captions-text" || 
                textElement.parentElement.className === "ytp-caption-segment") {
                    // replace the no break space with a normal space for detection purposes
                    textElement.textContent = textElement.textContent.replace(/ /gi, " ");
                    textElement.textContent = textElement.textContent.replace(/\[ __ \]/gi, " ████ ");
                }
            }
            catch(Exception) {} // pass
        }
    }
    // Get rid of added spaces.
    textElement.textContent = textElement.textContent.slice(1, textElement.textContent.length - 1);
}

