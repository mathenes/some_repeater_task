$(document).ready(function() {
  // function that calls isiaFormRepeater, i.e, that replicates the wanted code
  const initRepeater = (el) => {
    $(el).isiaFormRepeater({
      addButton: '<div class="repeat-add-wrapper flex flex-column self-stretch mr1"><div data-and_or="or" class="and-or-button cursor-pointer flex items-center"><div class="vertical-text and-or-text">OR</div></div><a data-repeat-add-btn class="repeat-add add-button" href="#">&plus;</a></div>',
      removeButton: '<a data-repeat-remove-btn class="repeat-remove" style="background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAMAAAAMCGV4AAAAbFBMVEUAAAA0SV40SV40SV40SV40SV40SV40SV40SV40SV40SV40SV40SV40SV40SV40SV40SV40SV40SV40SV40SV40SV40SV40SV40SV40SV40SV40SV40SV40SV40SV40SV40SV40SV40SV40SV7ulPmzAAAAI3RSTlMAAQQFDg8QES4vMDI3OD9AoKKlqqvHyMrO09fa4Ojp6+319/7EkGIAAABmSURBVAgdTcEJEoIwFETB94GIu8ZdRCDO/e9oihSVdBPZxg/6ntfGzD2U3BsiF7QIDVin7G3sVTriVbrSSxVJLU30UkVSSxNepRsHlU7YR1ln0P60CI6ofSl5rpjZ7jJq8FsjM5I/lckTO6Y3PXUAAAAASUVORK5CYII=); padding: 10px 0 5px 15px; margin-left: 10px;" href="#"></a>',
    });

    // Code for and/or button. It's inside of the repeater method because it needs to be repeated for every new and/or button
    $(el).find('[data-and_or]').on('click', function() {
      if ($(this).data().and_or == 'or') {
        $(this).data().and_or = 'and';
        $(this).children().text('AND');
      } else {
        $(this).data().and_or = 'or';
        $(this).children().text('OR');
      }
    });
  };

  // Initialize repeater on page
  $('#base').isiaFormRepeater({
    addButton: '<div class="repeat-add-wrapper self-end"><a data-repeat-add-btn class="repeat-add" style="margin-right: 85px;" href="#">&plus; Trigger/Action</a></div>',
    initNewGroup: (group) => initRepeater(group),
  });

  // Initialize repeater base conditions
  $('#base > .repeat-items').children().each((_index, group) => (
    initRepeater($(group).children()[0])
  ));

  // Code for Stop/Enable button
  $('[data-enabler]').on('click', function() {
    if ($(this).data().enabler == 'enabled') {
      $(this).data().enabler = 'disabled';
      $('#enabler-text').text('Play');
      $('#enabler-icon').html('&#10095;');
    } else {
      $(this).data().enabler = 'enabled';
      $('#enabler-text').text('Pause');
      $('#enabler-icon').html('&#8545;');
    }
  });
});