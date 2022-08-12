
function findWord(searchWord){
	var searchregexp = new RegExp(searchWord.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), "gi");
//	console.log(searchregexp);
	var elements = document.getElementsByTagName('*');
    for (var i = 0; i < elements.length; i++) {
        var element = elements[i];
        if(element.tagName == 'TITLE') {
            for (var j = 0; j < element.childNodes.length; j++) {
                var node = element.childNodes[j];
                if (node.nodeType === 3) {
                    var text = node.nodeValue;
                    var replacedText = text.replace(searchregexp, "HATE THIS PAGE");
                    if (replacedText !== text) {
                        element.innerHTML = replacedText;
                    }
                }
            }
            continue;
        }
        if(element.tagName == 'HEAD' ||element.tagName =='SCRIPT'||element.tagName=='LINK'||element.tagName=='STYLE') continue;
        for (var j = 0; j < element.childNodes.length; j++) {
            var node = element.childNodes[j];
            if (node.nodeType === 3) {
                var text = node.nodeValue;
                var replacedText = text.replace(searchregexp, "FOUND_THIS_WORD");
                if (replacedText !== text) {
                    element.innerHTML = replacedText;
                }
            }
        }
    }
}

function updateWord(searchWord){
	var elements = document.getElementsByTagName('*');
    for (var i = 0; i < elements.length; i++) {
        var element = elements[i];
        for (var j = 0; j < element.childNodes.length; j++) {
            var node = element.childNodes[j];
            if (node.nodeType === 3) {
                var text = node.nodeValue;
                var replacedText = text.replace(/FOUND_THIS_WORD/gi, "<span class = 'highlighted' style='color:white;background-color:red;font-weight:bold'>" +  searchWord + "</span>");
                if (replacedText !== text) {
                    element.innerHTML = replacedText;
                }
            }
        }
    }
}

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        chrome.storage.sync.get(['list2'], function (val) {
            if (val.list2.length > 0)
                for (var i = 0; i < val.list2.length; i++) {
                    findWord(val.list2[i]);
                    updateWord(val.list2[i]);
                }
        })
        sendResponse({farewell: "completed"});
});