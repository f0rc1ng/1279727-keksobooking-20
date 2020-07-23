'use strict';

(function () {
  /*
  * Константы
  * */
  var ESC_KEY = 'Escape';
  var ENTER_KEY = 'Enter';

  /*
   * Хэндлеры
   * */
  // Хэндлер на нажатие клавиши Esc, принимает параметрами эвент и функцию, которую необходимо выполнить
  var isEscapeEvent = function (evt, action) {
    if (evt.key === ESC_KEY) {
      action();
    }
  };
  // Хэндлер на нажатие клавиши Enter, принимает параметрами эвент и функцию, которую необходимо выполнить
  var isEnterEvent = function (evt, action) {
    if (evt.key === ENTER_KEY) {
      action();
    }
  };

  // mycomments: вот эта твоя функция идеально подхлодит для блока utils

  // функция склонения
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

