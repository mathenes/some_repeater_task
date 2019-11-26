$(document).ready(function() {
  // function that calls isiaFormRepeater
  const initRepeater = (el) => {
    $(el).isiaFormRepeater({
      addButton: '<div class="repeat-add-wrapper"><div>or</div><a data-repeat-add-btn class="repeat-add" style="background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAMAAAAM7l6QAAAAnFBMVEUAAAA0SV40SV40SV40SV40SV40SV40SV40SV40SV40SV40SV40SV40SV40SV40SV40SV40SV40SV40SV40SV40SV40SV40SV40SV40SV40SV40SV40SV40SV40SV40SV40SV40SV40SV40SV40SV40SV40SV40SV40SV40SV40SV40SV40SV40SV40SV40SV40SV40SV40SV40SV7WE2snAAAAM3RSTlMAAQMFDBUXGBodHiAhIiMmKy0vOj0+Q0RHSU9UVVhzdXh5j5HBxcfIyszOz9Xa3ujv8f0EXf+OAAAAuUlEQVQoU9XQ2Q6CMBAF0KHUFVFBcVfcAHcs/f9/cwQM05b4rPelc+ckTVOAf4jlH1Ip071v1anzkGXuXVPXkmSp60oqWajaKbYegFdMbYVvxZID8GK6Uh1InWWf8M7kLeEEu2/b9nvGY4g1Jiyws6oyrOI7PwlH2APOOX6nhccI65FwaD5tQ9g12SEMF50TqtDK8uWYsSAfsobCMJdKJqBlllWYTXUFaJ4/etJuLuOGsRBR2KvFn8sLE7ouonIEdvUAAAAASUVORK5CYII=); padding: 5px 0 5px 35px;" href="#"></a></div>',
      removeButton: '<a data-repeat-remove-btn class="repeat-remove" style="background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAMAAAAMCGV4AAAAbFBMVEUAAAA0SV40SV40SV40SV40SV40SV40SV40SV40SV40SV40SV40SV40SV40SV40SV40SV40SV40SV40SV40SV40SV40SV40SV40SV40SV40SV40SV40SV40SV40SV40SV40SV40SV40SV40SV7ulPmzAAAAI3RSTlMAAQQFDg8QES4vMDI3OD9AoKKlqqvHyMrO09fa4Ojp6+319/7EkGIAAABmSURBVAgdTcEJEoIwFETB94GIu8ZdRCDO/e9oihSVdBPZxg/6ntfGzD2U3BsiF7QIDVin7G3sVTriVbrSSxVJLU30UkVSSxNepRsHlU7YR1ln0P60CI6ofSl5rpjZ7jJq8FsjM5I/lckTO6Y3PXUAAAAASUVORK5CYII=); padding: 10px 0 5px 15px; margin-left: 10px;" href="#"></a>',
    });
  };

  $('#base').isiaFormRepeater({
    addButton: '<div class="repeat-add-wrapper self-end"><a data-repeat-add-btn class="repeat-add" style="margin-right: 85px;" href="#">&plus; Group</a></div>',
    initNewGroup: (group) => initRepeater(group),
  });

  // Initialize repeater for base group
  $('#base > .repeat-items').children().each((_index, group) => (
    initRepeater($(group).children()[0])
  ));


  // Code for Stop/Enable

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