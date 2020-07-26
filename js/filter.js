'use strict';

(function () {
  var MIN_PINS_COUNT = 0;
  var MAX_PINS_COUNT = 5;

  var filterForm = document.querySelector('.map__filters');

  var HouseFilter = {
    TYPE: filterForm.querySelector('#housing-type'),
    PRICE: filterForm.querySelector('#housing-price'),
    ROOMS: filterForm.querySelector('#housing-rooms'),
    GUESTS: filterForm.querySelector('#housing-guests')
  };

  var getHouseTypeValue = function (it) {
    return it.offer.type === HouseFilter.TYPE.value || HouseFilter.TYPE.value === 'any';
  };

  var filterPins = function (data) {

    var filteredPins = data.filter(function (it) {
      return getHouseTypeValue(it);
    })
      .slice(MIN_PINS_COUNT, MAX_PINS_COUNT);

    return filteredPins;
  };

  var onHouseTypeChange = function () {
    window.pin.renderPins(filterPins(window.offers));
  };

  HouseFilter.TYPE.addEventListener('change', onHouseTypeChange);

  window.filter = {
    filterPins: filterPins
  };
})();
