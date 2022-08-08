$(function () {
    ///set the date of today
    setDate();

    var todoList = new Array();
    chrome.storage.sync.get(['list1'], function (val) {
        if (val.list1.length > 0)
            todoList = val.list1;
        console.log("val.list1 :" + val.list1);
        //displaying the old items
        for (var i = 0; i < todoList.length; i++) {
            addListItem(todoList[i]);
        }
    })

    $('#addButtonTodo').click(function () {

        var newTodo = $('#todoInput').val();
        todoList.push(newTodo);
        console.log("todoList under click :" + todoList);
        addListItem(newTodo);
        //adding the new list back to chrome storage
        chrome.storage.sync.set({
            'list1': todoList
        })


    });

    function addListItem(value) {
        console.log("addListItem");
        document.getElementById("todoInput").value = "";
        var ul = document.getElementById("todo-listUl");

        addUI(ul, value, 1)
    }

    function addUI(ul, value, num) {
        var li = document.createElement("li");
        $("li").addClass("list-group-item");
        li.appendChild(document.createTextNode(value));

        if (value === '') {
            //do nothing
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
        }

        function removeItem(itemIndex) {
            console.log("removeitem");
            chrome.storage.sync.get(['list1'], function (val) {
                todoList = val.list1;
                todoList.splice(itemIndex, 1);
                console.log("new list", todoList);

                chrome.storage.sync.set({
                    'list1': todoList
                })
            })
        }

        function setDate() {
            var todayDate = new Date();
            console.log(todayDate);
            var locale = "en-us";
            var month = todayDate.toLocaleString(locale, {month: "long"});
            var day = todayDate.toLocaleString(locale, {weekday: "long"});

            document.getElementById('date').innerHTML = "Todo checklist for " + day + ", " + todayDate.getDate() + " "
                + month;
        }
    }

)