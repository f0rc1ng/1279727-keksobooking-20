'use strict';

(function () {

  var map = document.querySelector('.map');
  var filtersContainer = document.querySelector('.map__filters-container');

  // mycomments: вот тут удалила вставку карточки - она прям вставлялась в нескольких метах
  // map.insertBefore(window.card.getCard(window.pin.resultData[0]), window.card.filtersContainer);

  var activateMap = function () {
    map.classList.remove('map--faded');
  };

  var activatePage = function () {
    activateMap();
    // window.pin.renderPins();
    window.ajax.load(window.pin.onSuccess, window.pin.onError);

    // mycomments: вот тут добавляем карточку, чтобы она добавилась один раз
    map.insertBefore(window.card.getCard(), filtersContainer);

    // window.util.activatePins();
  };

  window.map = {
    activatePage: activatePage,
    map: map
  };

})();
