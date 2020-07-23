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
      // mycomments: вот тут как бы открываем карточку, на самом деле она у нас уже есть и спрятана
      // просто заносим в нее новый данные
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

  var renderPins = function () {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < window.offers.length; i++) {
      if (window.offers[i].author.avatar === DEFAULT_IMG_PIN) {
        continue;

      } else {
        var pinData = window.offers[i];
        var pin = renderPin(pinData);


        // mycomments: вешаем слушателя чтобы на клик открывалась карточка, тут же можно повешать слушателя на enter
        pin.addEventListener('click', onPinClicked(pinData));
        fragment.appendChild(pin);
      }

    }

    similarPinList.appendChild(fragment);
  };
  var mainContainer = document.querySelector('main');

  window.offers = [];

  var onSuccess = function (data) {
    window.offers = data;
    renderPins();

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

  window.pin = {
    renderPins: renderPins,
    onError: onError,
    onSuccess: onSuccess
  };

})();

