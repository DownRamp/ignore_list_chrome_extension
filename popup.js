$(function () {
    ///set the date of today
    setDate();

    var hateList = new Array();
    chrome.storage.sync.get(['list1'], function (val) {
        if (val.list1.length > 0)
            hateList = val.list1;
        console.log("val.list1 :" + val.list1);
        //displaying the old items
        for (var i = 0; i < hateList.length; i++) {
            addListItem(hateList[i]);
        }


    })

    $('#addButtonTask').click(function () {

        var newHate = $('#hateInput').val();
        //adding the new item to tasklist array
        hateList.push(newHate);
        console.log("hateList under click :" + hateList);
        addListItem(newHate);
        //adding the new list back to chrome storage
        chrome.storage.sync.set({
            'list1': hateList
        })


    });

    function addListItem(value) {
        console.log("addListItem");
        document.getElementById("hateItemInput").value = "";
        var ul = document.getElementById("listUl");

        addUI(ul, value, 2)
    }


    function addUI(ul, value, num) {
        var li = document.createElement("li");
        $("li").addClass("list-group-item");
        li.appendChild(document.createTextNode(value));

        if (value === '') {
            //do nothing
            //alert("You must write something!");
        } else {
            ul.appendChild(li);
        }

        var span = document.createElement("SPAN");
        var txt = document.createTextNode("\u00D7");
        if (num === 1) {
            span.className = "close1";
            span.appendChild(txt);
            li.appendChild(span);

            $(".close1").click(function () {
                var index = $(this).index(".close1");

                console.log(index);
                var div = this.parentElement;
                div.style.display = "none";
                removeItem(index);
                $(".close1").eq(index).remove();

            })
        }



        function removeItem(itemIndex) {
            console.log("removeHateItem ", itemIndex);

            chrome.storage.sync.get(['list1'], function (val) {
                hateList = val.list1;
                hateList.splice(itemIndex, 1);
                console.log("new Hate list", hateList);

                chrome.storage.sync.set({
                    'list1': hateList
                })

            })

        }

        function setDate() {
            var todayDate = new Date();
            console.log(todayDate);
            var locale = "en-us";
            var month = todayDate.toLocaleString(locale, {month: "long"});
            var day = todayDate.toLocaleString(locale, {weekday: "long"});

            document.getElementById('date').innerHTML = "Hate list for " + day + ", " + todayDate.getDate() + " "
                + month;
        }