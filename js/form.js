'use strict';

(function () {
  var form = document.querySelector('.ad-form');
  var mainMapPin = document.querySelector('.map__pin--main');
  mainMapPin.style.zIndex = 2;

  var blockFormFilter = function (state) {
    var formFieldsets = document.querySelectorAll('.ad-form fieldset');
    for (var i = 0; i < formFieldsets.length; i++) {
      formFieldsets[i].disabled = state;
    }
  };

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

  var onTimeChange = function (evt) {
    if (evt.target.id === 'timein') {
      form.querySelector('#timeout').value = evt.target.value;
    } else {
      form.querySelector('#timein').value = evt.target.value;
    }
  };

  var timeInElement = form.querySelector('#timein');
  var timeOutElement = form.querySelector('#timeout');

  timeInElement.addEventListener('change', onTimeChange);
  timeOutElement.addEventListener('change', onTimeChange);

  var deactivateForm = function () {
    window.map.map.classList.add('map--faded');
    form.classList.add('ad-form--disabled');
    form.reset();
    window.pin.removePins();
    window.form.blockMapFilter(true);
    window.form.blockFormFilter(true);

    mainMapPin.addEventListener('mouseup', window.mainPin.activatePage);
    mainMapPin.addEventListener('keydown', window.mainPin.activatePage);
  };

  var formSuccess = function () {
    deactivateForm();
    var successMessageTemplate = document.querySelector('#success').content.querySelector('.success');
    var successMessage = successMessageTemplate.cloneNode(true);
    document.querySelector('main').appendChild(successMessage);
    var close = document.querySelector('.success');

    var closeSuccess = function (evt) {
      evt.preventDefault();
      if (evt.which === 1) {
        close.remove();
      }
      if (evt.key === 'Escape') {
        close.remove();
      }
      window.removeEventListener('click', closeSuccess);
      window.removeEventListener('keydown', closeSuccess);
    };
    window.addEventListener('click', closeSuccess);
    window.addEventListener('keydown', closeSuccess);
  };

  var formErrors = function () {
    var errorMessageTemplate = document.querySelector('#error').content.querySelector('.error');
    var errorMessage = errorMessageTemplate.cloneNode(true);
    document.querySelector('main').appendChild(errorMessage);
    var error = document.querySelector('.error');
    var errorButton = errorMessage.querySelector('.error__button');

    var closeError = function (evt) {
      evt.preventDefault();
      if (evt.which === 1) {
        error.remove();
      }
      if (evt.key === 'Escape') {
        error.remove();
      }
      window.removeEventListener('click', closeError);
      window.removeEventListener('keydown', closeError);
    };
    window.addEventListener('click', closeError);
    errorButton.addEventListener('click', closeError);
    window.addEventListener('keydown', closeError);
  };

  var submitHandler = function (evt) {
    window.ajax.upload(new FormData(form), formSuccess, formErrors);
    evt.preventDefault();
  };
  form.addEventListener('submit', submitHandler);

  window.form = {
    blockMapFilter: blockMapFilter,
    blockFormFilter: blockFormFilter,
    activateForm: activateForm,
    formSuccess: formSuccess
  };

})();
