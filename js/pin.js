'use strict';

(function () {

  var PIN_X_OFFSET = 25;
  var PIN_Y_OFFSET = 70;
  var DEFAULT_IMG_PIN = 'img/avatars/default.png';

  var similarPinList = document.querySelector('.map__pins');
  var similarPinTemplate = document
    .querySelector('#pin')
    .content.querySelector('.map__pin');


  var onPinClicked = function (data) {
    return function () {
      window.card.openCard(data);
    };
  };

  var renderPin = function (ad) {
    var pinElement = similarPinTemplate.cloneNode(true);

    pinElement.style =
      'left: ' +
      (ad.location.x - PIN_X_OFFSET / 2) +
      'px; top: ' +
      (ad.location.y - PIN_Y_OFFSET) +
      'px';
    pinElement.querySelector('img').src = ad.author.avatar;
    pinElement.querySelector('img').alt = ad.offer.title;

    return pinElement;
  };

  var renderPins = function (pins) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < pins.length; i++) {
      if (pins[i].author.avatar === DEFAULT_IMG_PIN) {
        continue;

      } else {
        var pinData = pins[i];
        var pin = renderPin(pinData);

        pin.addEventListener('click', onPinClicked(pinData));
        fragment.appendChild(pin);
      }
    }

    similarPinList.appendChild(fragment);
  };
  var mainContainer = document.querySelector('main');

  var onSuccess = function (data) {
    renderPins(data);

  };

  var onError = function (message) {
    var error = document.querySelector('#error').content.querySelector('.error');
    var errorElement = error.cloneNode(true);
    var errorMessage = errorElement.querySelector('.error__message');
    var errorBtn = errorElement.querySelector('.error__button');
    errorMessage.textContent = message;

    errorBtn.addEventListener('click', function () {
      errorElement.remove();
      window.ajax.load(onSuccess, onError);
    });

    document.addEventListener('keydown', function (evt) {
      if (evt.keyCode === 'Escape') {
        errorElement.remove();
      }
    });

    mainContainer.appendChild(errorElement);
  };

  var removePins = function () {
    var pins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    pins.forEach(function (el) {
      el.remove();
    });
    var popup = document.querySelector('.popup');
    if (popup) {
      popup.remove();
    }
  };

  window.pin = {
    renderPins: renderPins,
    onError: onError,
    onSuccess: onSuccess,
    removePins: removePins
  };

})();

