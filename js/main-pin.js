'use strict';

(function () {

  var HALF_MAIN_PIN_X = 31;
  var MAIN_PIN_Y = 84;


  var mainMapPin = document.querySelector('.map__pin--main');
  var fillAddress = function () {
    var adressInput = document.querySelector('#address');
    var mainPinLocationTop = parseInt(mainMapPin.style.top, 10);
    var mainPinLocationLeft = parseInt(mainMapPin.style.left, 10);

    adressInput.value = (Math.round(mainPinLocationLeft + HALF_MAIN_PIN_X)) + ', ' + (Math.round(mainPinLocationTop + MAIN_PIN_Y));
  };

  fillAddress();

  // Активация страницы и разблокировка
  mainMapPin.addEventListener('mousedown', function (evt) {
    if (evt.button === 0) {
      window.map.activatePage();
      window.form.blockMapFilter(false);
      window.form.blockFormFilter(false);
      window.form.activateForm();
    }
  });

  mainMapPin.addEventListener('keydown', function (evt) {
    if (evt.code === 'Enter') {
      window.map.activatePage();
      window.form.blockMapFilter(false);
      window.form.blockFormFilter(false);
      window.form.activateForm();
    }
  });

  mainMapPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };


    var dragged = false;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      dragged = true;

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

      if (mainMapPin.offsetLeft <= -32) {
        mainMapPin.style.left = (mainMapPin.offsetLeft + shift.x) + 'px';
      } else if (mainMapPin.offsetLeft >= 1170) {
        mainMapPin.style.left = (mainMapPin.offsetLeft + shift.x) + 'px';
      }

      if (mainMapPin.offsetTop <= 45) {
        mainMapPin.style.top = (mainMapPin.offsetTop + shift.y) + 'px';
      } else if (mainMapPin.offsetTop >= 547) {
        mainMapPin.style.top = (mainMapPin.offsetTop + shift.y) + 'px';
      }

      // if (mainMapPin.offsetLeft <= -32 || mainMapPin.offsetLeft >= 1168 || mainMapPin.offsetTop <= 130 || mainMapPin.offsetTop >= 630) {
      //   return;
      // }

    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      fillAddress();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      if (dragged) {
        var onClickPreventDefault = function (clickEvt) {
          clickEvt.preventDefault();
          mainMapPin.removeEventListener('click', onClickPreventDefault)
        };
        mainMapPin.addEventListener('click', onClickPreventDefault);
      }
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

})();

