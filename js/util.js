'use strict';

(function () {

  var ESC_KEY = 'Escape';
  var ENTER_KEY = 'Enter';

  var isEscapeEvent = function (evt, action) {
    if (evt.key === ESC_KEY) {
      action();
    }
  };
  var isEnterEvent = function (evt, action) {
    if (evt.key === ENTER_KEY) {
      action();
    }
  };

  var plural = function (number, one, several, plenty) {
    number = Math.abs(number);
    number %= 100;
    if (number >= 5 && number <= 20) {
      return number + plenty;
    }
    number %= 10;
    if (number === 1) {
      return number + one;
    }
    if (number >= 2 && number <= 4) {
      return number + several;
    }
    return number + plenty;
  };

  window.util = {
    isEnterEvent: isEnterEvent,
    isEscapeEvent: isEscapeEvent,
    plural: plural
  };

})();

