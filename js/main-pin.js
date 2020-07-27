'use strict';

(function () {

  var HALF_MAIN_PIN_X = 31;
  var MAIN_PIN_Y = 84;
  var PIN_LEFT_END = -32;
  var PIN_RIGHT_END = 1170;
  var PIN_TOP_END = 45;
  var PIN_BOTTOM_END = 547;


  var mainMapPin = document.querySelector('.map__pin--main');
  mainMapPin.style.zIndex = 2;

  var fillAddress = function () {
    var adressInput = document.querySelector('#address');
    var mainPinLocationTop = parseInt(mainMapPin.style.top, 10);
    var mainPinLocationLeft = parseInt(mainMapPin.style.left, 10);

    adressInput.value = (Math.round(mainPinLocationLeft + HALF_MAIN_PIN_X)) + ', ' + (Math.round(mainPinLocationTop + MAIN_PIN_Y));
  };

  fillAddress();

  var activatePageHandler = function (evt) {
    if (evt.button === 0 || evt.code === 'Enter') {
      window.map.activatePage();
      window.form.blockMapFilter(false);
      window.form.blockFormFilter(false);
      window.form.activateForm();
    }

    mainMapPin.removeEventListener('mousedown', activatePageHandler);
    mainMapPin.removeEventListener('keydown', activatePageHandler);
  };

  mainMapPin.addEventListener('mousedown', activatePageHandler);
  mainMapPin.addEventListener('keydown', activatePageHandler);

  mainMapPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };


      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      mainMapPin.style.top = (mainMapPin.offsetTop - shift.y) + 'px';
      mainMapPin.style.left = (mainMapPin.offsetLeft - shift.x) + 'px';

      if (mainMapPin.offsetLeft <= PIN_LEFT_END) {
        mainMapPin.style.left = (mainMapPin.offsetLeft + shift.x) + 'px';
      } else if (mainMapPin.offsetLeft >= PIN_RIGHT_END) {
        mainMapPin.style.left = (mainMapPin.offsetLeft + shift.x) + 'px';
      }

      if (mainMapPin.offsetTop <= PIN_TOP_END) {
        mainMapPin.style.top = (mainMapPin.offsetTop + shift.y) + 'px';
      } else if (mainMapPin.offsetTop >= PIN_BOTTOM_END) {
        mainMapPin.style.top = (mainMapPin.offsetTop + shift.y) + 'px';
      }

    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      fillAddress();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  window.mainPin = {
    activatePageHandler: activatePageHandler
  };

})();

