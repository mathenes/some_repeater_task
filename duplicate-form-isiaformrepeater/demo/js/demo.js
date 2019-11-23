$(document).ready(function() {
  // function that calls isiaFormRepeater
  const initRepeater = (el) => {
    $(el).isiaFormRepeater();
  };

  $('#base').isiaFormRepeater({
    addButton: '<div class="repeat-add-wrapper"><a data-repeat-add-btn class="repeat-add pure-button pure-button-primary" href="#">Add</a></div>',
    removeButton: '<a data-repeat-remove-btn class="repeat-remove pure-button pure-button-primary" href="#">Remove</a>',
    initNewGroup: (group) => initRepeater(group),
  });

  // Initialize repeater for base group
  $('#base > .repeat-items').children().each((_index, group) => (
    initRepeater($(group).children()[0])
  ));
});