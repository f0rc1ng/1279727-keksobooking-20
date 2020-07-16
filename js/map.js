'use strict';

(function () {

  var map = document.querySelector('.map');

  // map.insertBefore(window.card.getCard(window.pin.resultData[0]), window.card.filtersContainer);

  var activateMap = function () {
    map.classList.remove('map--faded');
  };

  var activatePage = function () {
    activateMap();
    window.pin.renderPins();
    window.util.activatePins();
  };

  window.map = {
    activatePage: activatePage,
    map: map
  };

})();
