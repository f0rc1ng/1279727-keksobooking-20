'use strict';

(function () {

  var PIN_X_OFFSET = 25;
  var PIN_Y_OFFSET = 70;

  var similarPinList = document.querySelector('.map__pins');
  var similarPinTemplate = document
    .querySelector('#pin')
    .content.querySelector('.map__pin');
  var resultData = window.data.getData();

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
    for (var i = 0; i < resultData.length; i++) {
      fragment.appendChild(renderPin(resultData[i]));
    }
    similarPinList.appendChild(fragment);
  };

  window.pin = {
    renderPins: renderPins,
    resultData: resultData
  };

})();
