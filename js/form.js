'use strict';

(function () {

  // Блокирует поля формы при открытии страницы
  var blockFormFilter = function (state) {
    var formFieldsets = document.querySelectorAll('.ad-form fieldset');
    for (var i = 0; i < formFieldsets.length; i++) {
      formFieldsets[i].disabled = state;
    }
  };

  // Блокировка фильтра
  var blockMapFilter = function (state) {
    var mapFilter = document.querySelectorAll('.map__filters .map__filter');
    var mapFeaturesFilter = document.querySelector('.map__filters .map__features');
    for (var i = 0; i < mapFilter.length; i++) {
      mapFilter[i].disabled = state;
    }

    mapFeaturesFilter.disabled = state;
  };

  blockMapFilter(true);
  blockFormFilter(true);

  var activateForm = function () {
    var form = document.querySelector('.ad-form');
    form.classList.remove('ad-form--disabled');
  };

  var roomsSelect = document.querySelector('#room_number');
  var capacitySelect = document.querySelector('#capacity');

  capacitySelect.addEventListener('change', function () {
    validateGuests();
  });

  roomsSelect.addEventListener('change', function () {
    validateGuests();
  });

  var validateGuests = function () {
    if ((roomsSelect.value === '100' && capacitySelect.value > 0) || (roomsSelect.value !== '100' && capacitySelect.value === '0')) {
      capacitySelect.setCustomValidity('Для 100 комнат доступен только вариант Не для гостей');
    } else if (capacitySelect.value > roomsSelect.value) {
      capacitySelect.setCustomValidity('Гостям будет тесно, выберите меньшее количество гостей');
    } else {
      capacitySelect.setCustomValidity('');

    }
  };

  var typeSelect = document.querySelector('#type');
  var priceSelect = document.querySelector('#price');

  typeSelect.addEventListener('change', function () {
    setMinPrice();
  });

  priceSelect.addEventListener('change', function () {
    setMinPrice();
  });

  var setMinPrice = function () {
    switch (typeSelect.value) {
      case 'bungalo':
        priceSelect.placeholder = 0;
        priceSelect.setAttribute('min', '0');
        break;
      case 'flat':
        priceSelect.placeholder = 1000;
        priceSelect.setAttribute('min', '1000');
        break;
      case 'house':
        priceSelect.placeholder = 5000;
        priceSelect.setAttribute('min', '5000');
        break;
      case 'palace':
        priceSelect.placeholder = 10000;
        priceSelect.setAttribute('min', '10000');
        break;
    }
  };

  window.form = {
    blockMapFilter: blockMapFilter,
    blockFormFilter: blockFormFilter,
    activateForm: activateForm
  };

})();
