$(document).ready(function() {
  // function that calls isiaFormRepeater
  const initRepeater = (el) => {
    $(el).isiaFormRepeater();
  };

  $('#base').isiaFormRepeater({
    addButton: '<div class="repeat-add-wrapper self-end"><a data-repeat-add-btn class="repeat-add" style="margin-right: 85px;" href="#">&plus; Group</a></div>',
    initNewGroup: (group) => initRepeater(group),
  });

  // Initialize repeater for base group
  $('#base > .repeat-items').children().each((_index, group) => (
    initRepeater($(group).children()[0])
  ));
});