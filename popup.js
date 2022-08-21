$(function () {
    ///set the date of today
    setDate();

    let dragged;
    
    document.addEventListener("dragstart", (event) => {
      // store a ref. on the dragged elem
      dragged = event.target;
      // make it half transparent
      event.target.classList.add("dragging");
    });
    
    document.addEventListener("dragend", (event) => {        
      // reset the transparency

      event.target.classList.remove("dragging");
    });
    
    /* events fired on the drop targets */
    document.addEventListener("dragover", (event) => {
      // prevent default to allow drop
      event.preventDefault();
    }, false);
    
    document.addEventListener("dragenter", (event) => {
      // highlight potential drop target when the draggable element enters it
      if (event.target.classList.contains("dropzone1")) {
        // remove from one list and add to another 

        event.target.classList.add("dragover");
      }
      else if (event.target.classList.contains("dropzone2")) {
        // remove from one list and add to another 

        event.target.classList.add("dragover");
      }
    });
    
    document.addEventListener("dragleave", (event) => {
      // reset background of potential drop target when the draggable element leaves it
      if (event.target.classList.contains("dropzone1")) {
        event.target.classList.remove("dragover");
      }
      else if (event.target.classList.contains("dropzone2")) {
        event.target.classList.remove("dragover");
      }
    });
    
    document.addEventListener("drop", (event) => {
      // prevent default action (open as link for some elements)
      event.preventDefault();
      // move dragged element to the selected drop target
      if (event.target.classList.contains("dropzone1")) {
        event.target.classList.remove("dragover");
        var saveValue = dragged.textContent.slice(0, -1)
        dragged.querySelector("span").click();
        saver(saveValue,3);
      }

      else if (event.target.classList.contains("dropzone2")) {
        event.target.classList.remove("dragover");
        var saveValue = dragged.textContent.slice(0, -1)
        dragged.querySelector("span").click();
        saver(saveValue,1);
      }
    });

    var todoList = new Array();
    chrome.storage.sync.get(['list1'], function (val) {
        if (val.list1.length > 0)
            todoList = val.list1;
        console.log("val.list1 :" + val.list1);
        //displaying the old items
        for (var i = 0; i < todoList.length; i++) {
            addListItem(todoList[i],1);
        }
    })
    var backlogList = new Array();
    chrome.storage.sync.get(['list3'], function (val) {
        if (val.list3.length > 0)
            backlogList = val.list3;
        console.log("val.list3 :" + val.list3);
        //displaying the old items
        for (var i = 0; i < backlogList.length; i++) {
            addListItem(backlogList[i],3);
        }
    })

    var achievementList = new Array();
    chrome.storage.sync.get(['list4'], function (val) {
        if (val.list4.length > 0)
            achievementList = val.list4;
        console.log("val.list4 :" + val.list4);
        //displaying the old items
        for (var i = 0; i < achievementList.length; i++) {
            addListItem(achievementList[i],4);
        }
    })

    $('#addButtonTodo').click(function () {
        var newTodo = $('#todoInput').val();
        saver(newTodo,1);
    });

    $('#addButtonBacklog').click(function () {
        var newBacklog = $('#backlogInput').val();
        saver(newBacklog,3);
    });


    $('#addButtonAchievement').click(function () {
        var newAchievement = $('#achievementInput').val();
        saver(newAchievement,4);
    });

    function saver(value, num){
        if(num == 1){
            todoList.push(value);
            console.log("todoList under click :" + todoList);
            addListItem(value,1);
            //adding the new list back to chrome storage
            chrome.storage.sync.set({
                'list1': todoList
            })
        }
        else if(num == 3){
            backlogList.push(value);
            console.log("todoList under click :" + backlogList);
            addListItem(value,3);
            //adding the new list back to chrome storage
            chrome.storage.sync.set({
                'list3': backlogList
            })
        }
        else if(num == 4){
            achievementList.push(value);
            console.log("achievementList under click :" + achievementList);
            addListItem(value,4);
            //adding the new list back to chrome storage
            chrome.storage.sync.set({
                'list4': achievementList
            })
        }
    }

    function addListItem(value,num) {
        console.log("addListItem");

        if(num == 1){
            document.getElementById("todoInput").value = "";
            var ul = document.getElementById("todo-listUl");
            addUI(ul, value, 1)
        }
        else if(num == 3){
            document.getElementById("backlogInput").value = "";
            var ul = document.getElementById("backlog-listUl");
            addUI(ul, value, 3)
        }
        else{
            document.getElementById("achievementInput").value = "";
            var ul = document.getElementById("achievement-listUl");
            addUI(ul, value, 4)
        }
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
            li.draggable="true";
//            li.ondragstart="onDragStart(event);"
            $(".close1").click(function () {
                var index = $(this).index(".close1");
                console.log(index);
                var div = this.parentElement;
                div.style.display = "none";
                removeItem(index,1);
                $(".close1").eq(index).remove();
            })
        }
        else if (num === 3) {
            span.className = "close3";
            span.appendChild(txt);
            li.appendChild(span);
            li.draggable="true";
//            li.ondragstart="onDragStart(event);"

            $(".close3").click(function () {
                var index = $(this).index(".close3");
                console.log(index);
                var div = this.parentElement;
                div.style.display = "none";
                removeItem(index,3);
                $(".close3").eq(index).remove();
            })
        }
        else{
            span.className = "close4";
            span.appendChild(txt);
            li.appendChild(span);

            $(".close4").click(function () {
                var index = $(this).index(".close4");
                console.log(index);
                var div = this.parentElement;
                div.style.display = "none";
                removeItem(index,4);
                $(".close4").eq(index).remove();
            })
        }
        }

        function removeItem(itemIndex, num) {
            if(num == 1){
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
            else if(num == 3){
                console.log("removeitem");
                chrome.storage.sync.get(['list3'], function (val) {
                    backlogList = val.list3;
                    backlogList.splice(itemIndex, 1);
                    console.log("new list", backlogList);

                    chrome.storage.sync.set({
                        'list3': backlogList
                    })
                })
            }
            else{
                console.log("removeitem");
                chrome.storage.sync.get(['list4'], function (val) {
                    achievementList = val.list4;
                    achievementList.splice(itemIndex, 1);
                    console.log("new list", achievementList);

                    chrome.storage.sync.set({
                        'list4': achievementList
                    })
                })
            }
        }

        function setDate() {
            var todayDate = new Date();
            console.log(todayDate);
            var locale = "en-us";
            var month = todayDate.toLocaleString(locale, {month: "long"});
            var day = todayDate.toLocaleString(locale, {weekday: "long"});

            document.getElementById('date').innerHTML = "Todo checklist for " + day + ", " + todayDate.getDate() + " "
                + month +":";
        }
    }

)