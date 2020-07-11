'use strict';

(function () {

  var HALF_MAIN_PIN_X = 31;
  var MAIN_PIN_Y = 84;

  var mainMapPin = document.querySelector('.map__pin--main');
  var fillAddress = function () {
    var adressInput = document.querySelector('#address');
    var mainPinLocationTop = parseInt(mainMapPin.style.top, 10);
    var mainPinLocationLeft = parseInt(mainMapPin.style.left, 10);

    adressInput.value = (Math.round(mainPinLocationTop + MAIN_PIN_Y)) + ', ' + (Math.round(mainPinLocationLeft + HALF_MAIN_PIN_X));
  };

  fillAddress();

  // Активация страницы и разблокировка
  mainMapPin.addEventListener('mousedown', function (evt) {
    if (evt.button === 0) {
      window.map.activatePage();
      window.form.blockMapFilter(false);
      window.form.blockFormFilter(false);
      fillAddress();
      window.form.activateForm();
    }
  });

  mainMapPin.addEventListener('keydown', function (evt) {
    if (evt.code === 'Enter') {
      window.map.activatePage();
      window.form.blockMapFilter(false);
      window.form.blockFormFilter(false);
      fillAddress();
      window.form.activateForm();
    }
  });

})();
