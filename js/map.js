'use strict';

(function () {

  var map = document.querySelector('.map');
  var filtersContainer = document.querySelector('.map__filters-container');

  var activateMap = function () {
    map.classList.remove('map--faded');
  };

  var activatePage = function () {
    activateMap();
    window.ajax.load(window.pin.onSuccess, window.pin.onError);
    map.insertBefore(window.card.getCard(), filtersContainer);

  };

  window.map = {
    activatePage: activatePage,
    map: map
  };

})();
