'use strict';

(function () {
  var MAIN_PIN_LEFT = 570;
  var MAIN_PIN_TOP = 375;
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
    validateGuestsHandler();
  });

  roomsSelect.addEventListener('change', function () {
    validateGuestsHandler();
  });

  var validateGuestsHandler = function () {
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
    setMinPriceHandler();
  });

  priceSelect.addEventListener('change', function () {
    setMinPriceHandler();
  });

  var setMinPriceHandler = function () {
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
    window.card.hideCard();
    window.form.blockMapFilter(true);
    window.form.blockFormFilter(true);

    mainMapPin.addEventListener('mousedown', window.mainPin.activatePageHandler);
    mainMapPin.addEventListener('keydown', window.mainPin.activatePageHandler);
  };

  var formSuccess = function () {
    deactivateForm();
    var successMessageTemplate = document.querySelector('#success').content.querySelector('.success');
    var successMessage = successMessageTemplate.cloneNode(true);
    document.querySelector('main').appendChild(successMessage);
    var close = document.querySelector('.success');

    var closeSuccessHandler = function (evt) {
      evt.preventDefault();
      if (evt.which === 1) {
        close.remove();
      }
      if (evt.key === 'Escape') {
        close.remove();
      }
      window.removeEventListener('click', closeSuccessHandler);
      window.removeEventListener('keydown', closeSuccessHandler);
    };
    window.addEventListener('click', closeSuccessHandler);
    window.addEventListener('keydown', closeSuccessHandler);
  };

  var formErrors = function () {
    var errorMessageTemplate = document.querySelector('#error').content.querySelector('.error');
    var errorMessage = errorMessageTemplate.cloneNode(true);
    document.querySelector('main').appendChild(errorMessage);
    var error = document.querySelector('.error');
    var errorButton = errorMessage.querySelector('.error__button');

    var closeErrorHandler = function (evt) {
      evt.preventDefault();
      if (evt.which === 1) {
        error.remove();
      }
      if (evt.key === 'Escape') {
        error.remove();
      }
      errorButton.removeEventListener('click', closeErrorHandler);
      window.removeEventListener('keydown', closeErrorHandler);
    };
    errorButton.addEventListener('click', closeErrorHandler);
    window.addEventListener('keydown', closeErrorHandler);
  };

  var submitHandler = function (evt) {
    window.ajax.upload(new FormData(form), formSuccess, formErrors);
    evt.preventDefault();
  };
  form.addEventListener('submit', submitHandler);

  var resetSite = function () {
    deactivateForm();
    mainMapPin.style.left = MAIN_PIN_LEFT + 'px';
    mainMapPin.style.top = MAIN_PIN_TOP + 'px';
    window.mainPin.fillAddress();
  };

  var resetButton = document.querySelector('.ad-form__reset');
  resetButton.addEventListener('click', resetSite);


  window.form = {
    blockMapFilter: blockMapFilter,
    blockFormFilter: blockFormFilter,
    activateForm: activateForm,
    formSuccess: formSuccess
  };

})();
