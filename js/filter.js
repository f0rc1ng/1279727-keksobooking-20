'use strict';

(function () {
  var MIN_PINS_COUNT = 0;
  var MAX_PINS_COUNT = 5;

  var filterForm = document.querySelector('.map__filters');

  var HouseFilter = {
    TYPE: filterForm.querySelector('#housing-type'),
    PRICE: filterForm.querySelector('#housing-price'),
    ROOMS: filterForm.querySelector('#housing-rooms'),
    GUESTS: filterForm.querySelector('#housing-guests'),
    FEATURES: filterForm.querySelector('#housing-features')
  };

  var FilterPrices = {
    MIN: 10000,
    MAX: 50000,
    LOW: 'low',
    MIDDLE: 'middle',
    HIGH: 'high'
  };

  var getHouseTypeValue = function (pin) {
    return pin.offer.type === HouseFilter.TYPE.value || HouseFilter.TYPE.value === 'any';
  };

  var getHousePriceValue = function (pin) {
    switch (HouseFilter.PRICE.value) {
      case FilterPrices.LOW:
        return pin.offer.price < FilterPrices.MIN;
      case FilterPrices.MIDDLE:
        return pin.offer.price >= FilterPrices.MIN && pin.offer.price < FilterPrices.MAX;
      case FilterPrices.HIGH:
        return pin.offer.price >= FilterPrices.MAX;
      default:
        return true;
    }
  };

  var getHouseRoomsValue = function (pin) {
    return pin.offer.rooms === Number(HouseFilter.ROOMS.value) || HouseFilter.ROOMS.value === 'any';
  };

  var getHouseGuestsValue = function (pin) {
    return pin.offer.guests === Number(HouseFilter.GUESTS.value) || HouseFilter.GUESTS.value === 'any';
  };

  var getHouseFeaturesValue = function (pin) {
    var checkedFeatures = Array.from(HouseFilter.FEATURES.querySelectorAll('input:checked'));
    return checkedFeatures.every(function (feature) {
      return pin.offer.features.includes(feature.value);
    });
  };

  var filterPins = function (data) {

    var filteredPins = data.filter(function (pin) {
      return (
        getHouseTypeValue(pin) &&
        getHousePriceValue(pin) &&
        getHouseRoomsValue(pin) &&
        getHouseGuestsValue(pin) &&
        getHouseFeaturesValue(pin)
      );
    })
      .slice(MIN_PINS_COUNT, MAX_PINS_COUNT);

    return filteredPins;
  };

  var onFormChange = window.debounce(function () {
    window.pin.renderPins(filterPins(window.offers));
  });

  filterForm.addEventListener('change', onFormChange);

  window.filter = {
    filterPins: filterPins
  };
})();
