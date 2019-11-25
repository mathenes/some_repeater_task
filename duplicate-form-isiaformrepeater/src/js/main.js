(function ($, window, document, undefined) {
  'use strict';
  // Create the defaults once
  // Declare global variables
  let pluginName = 'isiaFormRepeater';
  let el;
  let addEl;
  let removeEl;
  let fieldId;
  let itemsIndexArray;
  let maxItemIndex;
  let repeatItem;
  const defaults = {
    addButton: '<div class="repeat-add-wrapper"><a data-repeat-add-btn class="repeat-add" href="#"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAMAAAAM7l6QAAAAnFBMVEUAAAA0SV40SV40SV40SV40SV40SV40SV40SV40SV40SV40SV40SV40SV40SV40SV40SV40SV40SV40SV40SV40SV40SV40SV40SV40SV40SV40SV40SV40SV40SV40SV40SV40SV40SV40SV40SV40SV40SV40SV40SV40SV40SV40SV40SV40SV40SV40SV40SV40SV40SV40SV7WE2snAAAAM3RSTlMAAQMFDBUXGBodHiAhIiMmKy0vOj0+Q0RHSU9UVVhzdXh5j5HBxcfIyszOz9Xa3ujv8f0EXf+OAAAAuUlEQVQoU9XQ2Q6CMBAF0KHUFVFBcVfcAHcs/f9/cwQM05b4rPelc+ckTVOAf4jlH1Ip071v1anzkGXuXVPXkmSp60oqWajaKbYegFdMbYVvxZID8GK6Uh1InWWf8M7kLeEEu2/b9nvGY4g1Jiyws6oyrOI7PwlH2APOOX6nhccI65FwaD5tQ9g12SEMF50TqtDK8uWYsSAfsobCMJdKJqBlllWYTXUFaJ4/etJuLuOGsRBR2KvFn8sLE7ouonIEdvUAAAAASUVORK5CYII=" />Add</a></div>',
    removeButton: '<a data-repeat-remove-btn class="repeat-remove" href="#"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAMAAAAMCGV4AAAAbFBMVEUAAAA0SV40SV40SV40SV40SV40SV40SV40SV40SV40SV40SV40SV40SV40SV40SV40SV40SV40SV40SV40SV40SV40SV40SV40SV40SV40SV40SV40SV40SV40SV40SV40SV40SV40SV40SV7ulPmzAAAAI3RSTlMAAQQFDg8QES4vMDI3OD9AoKKlqqvHyMrO09fa4Ojp6+319/7EkGIAAABmSURBVAgdTcEJEoIwFETB94GIu8ZdRCDO/e9oihSVdBPZxg/6ntfGzD2U3BsiF7QIDVin7G3sVTriVbrSSxVJLU30UkVSSxNepRsHlU7YR1ln0P60CI6ofSl5rpjZ7jJq8FsjM5I/lckTO6Y3PXUAAAAASUVORK5CYII=" /></a>',
  };

  // The actual plugin constructor
  function Plugin(element, options) {
    this.element = element;
    this.el = el;
    this.addEl = addEl;
    this.removeEl = removeEl;
    this.fieldId = fieldId;
    this.itemsIndexArray = itemsIndexArray;
    this.maxItemIndex = maxItemIndex;
    this.repeatItem = repeatItem;
    this.settings = $.extend({}, defaults, options);
    this._defaults = defaults;
    this._name = pluginName;
    this.createRemoveItemClickEvent = function(el, removeEl, itemsIndexArray) {
      $(el + ' .repeat-item').on('click', removeEl, function(event) {
        event.preventDefault();
        if(!event.target.hasAttribute('data-repeat-remove-btn') || event.target !== removeEl[0]){
          event.stopPropagation();
        } else {
          const currentFieldIndex = parseInt($(this).attr('data-field-index'));
          const remove_index = itemsIndexArray.indexOf(currentFieldIndex);

          if (remove_index > -1) {
            itemsIndexArray.splice(remove_index, 1);
            maxItemIndex = Math.max.apply(null, itemsIndexArray);
          }

          $(el).attr('data-items-index-array', '[' + itemsIndexArray.toString() + ']');		

          const conditionsTotal =  $(el + ' .repeat-items .repeat-item').length;
          if (conditionsTotal === 1) {
            $(el).parent().remove();
          } else {
            $(el + ' .repeat-item[data-field-index='+ currentFieldIndex +']').remove();
          }
        }
      });
    };

    this.init();
  }

  // Avoid Plugin.prototype conflicts
  $.extend(Plugin.prototype, {

    // Initialize plugin. Assign attribute and run needed methods
    init() {
      /**
   * [el The element id]
   * @type {String}
   */
      this.el = '#' + this.element.id;
      /**
   * [fieldId The id of the option field]
   * @type {[type]}
   */
      this.fieldId = $(this.el).attr('data-field-id');
      /**
   * [repeateItem The item to be repeated]
   * @type {[type]}
   */
      this.repeatItem = $(this.el + ' .repeat-item:first').clone(true);
      
      /**
   * [addEl The add button class]
   * @type {[type]}
   */
      //Create add button
      this.createAddButton(this.settings.addButton);
      this.addEl = $(this.el + ' a[data-repeat-add-btn]');

      /**
   * [removeEl The remove button class]
   * @type {[type]}
   */
      //Create remove button
      this.createRemoveButton(this.settings.removeButton);
      this.removeEl = $(this.el + ' a[data-repeat-remove-btn]');
      /**
   * [itemsIndexArray The keys of the array items currently present ]
   * @type {[type]}
   */
      this.itemsIndexArray = JSON.parse($(this.el).attr('data-items-index-array'));

      this.maxItemIndex = Math.max.apply(null, this.itemsIndexArray);

      // // Create event to handle item addition
      this.createAddItemClickEvent(
        this.el,
        this.addEl,
        this.itemsIndexArray,
        this.maxItemIndex,
        this.repeatItem,
        this.createRemoveItemClickEvent,
        { ...this.settings }
      );

      // Create event to handle item removal
      // #base is excluded because no group will get deleted. Only the conditions
      if (this.el !== '#base') {
        this.createRemoveItemClickEvent(this.el, this.removeEl, this.itemsIndexArray);
      }
    },

    createAddButton(addButton){
      $(this.el).prepend(addButton);
    },

    createRemoveButton(removeButton){
      if (this.fieldId !== 'condition' || this.el == '#base_condition_group_1') return;
      
      $(this.el + ' .repeat-item').each(function(i) {
        if($(this).find('[data-field-id="condition"').length == 0 ){
          $(this).append(removeButton);
        }
      });				
    },

    createAddItemClickEvent(el, addEl, itemsIndexArray, maxItemIndex, repeatItemSource, createRemoveItemClickEvent, settings){
      $(el).on('click', addEl, function(event) {
        event.preventDefault();

        if(!event.target.hasAttribute('data-repeat-add-btn') || event.target !== addEl[0]){
          event.stopPropagation();
        }
        else{
          itemsIndexArray.push(maxItemIndex + 1);

          $(el).attr('data-items-index-array', '[' + itemsIndexArray.toString() + ']');

          maxItemIndex = Math.max.apply(null, itemsIndexArray);
  
          repeatItem = repeatItemSource.clone(true);
          
          repeatItem.attr('data-field-index', maxItemIndex);
          repeatItem.find(':input').val('');
          repeatItem.find('checkbox').checked = false;
          repeatItem.find('radio').checked = false;

          // Update columns names and ids
          const columns = repeatItem.find('.repeat-el');
          columns.each(function() {
            const newName = this.name.replace(/[[]\d+[\]]/g, '[' + maxItemIndex + ']');
            this.name = newName;
            this.id = this.name;
          });
          
          // Change new repeated item id for new groups
          const new_group = repeatItem.find('#base_condition_group_1');
          
          if (new_group.length > 0) {
            const id = new_group[0].id;
            new_group[0].id = id.replace(/_\d+/g, '_' + maxItemIndex);
          }

          // Appending Item to Items
          repeatItem.appendTo(el + '> .repeat-items');

          // If new group id added, init new repeater to it
          if (new_group.length > 0) {
            settings.initNewGroup(new_group[0]);
          } else {
            repeatItem.append(settings.removeButton);
            const removeEl = repeatItem.find('a[data-repeat-remove-btn]');
            
            createRemoveItemClickEvent(el, removeEl, itemsIndexArray);
          }
        }						
      });
    },
  });

  // A really lightweight plugin wrapper around the constructor,
  // preventing against multiple instantiations
  $.fn[pluginName] = function (options) {
    return this.each(function () {
      if (!$.data(this, 'plugin_' + pluginName)) {
        $.data(this, 'plugin_'
      + pluginName, new Plugin(this, options));
      }
    });
  };

}( jQuery, window, document ));
