$(function() {
    $("#backlog-listUl, #todo-listUl").sortable({
      connectWith: "ul",
      placeholder: "placeholder",
      delay: 150
    })
    .disableSelection()
    .dblclick( function(e){
      var item = e.target;
      console.log("HIHIHI");
      if (e.currentTarget.id === 'backlog-listUl') {
        //move from all to user
        $(item).fadeOut('fast', function() {
          $(item).appendTo($('#todo-listUl')).fadeIn('slow');
        });
      } else {
        //move from user to all
        $(item).fadeOut('fast', function() {
          $(item).appendTo($('#backlog-listUl')).fadeIn('slow');
        });
      }
    });
  });