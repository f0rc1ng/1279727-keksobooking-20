'use strict';

// Функция для создания массива из 8 сгенерированных JS-объектов
var ADS_QUANTITY = 8;
var TITLES = ['Идеальный вариант на выходные', 'Лучшее для семьи', 'Для большой компании'];
var PIN_X_MIN = 0;
var PIN_X_MAX = 1200;
var PIN_Y_MIN = 130;
var PIN_Y_MAX = 630;
var MIN_PRICE = 0;
var MAX_PRICE = 1000000;
var TYPES = ['palace', 'flat', 'house', 'bungalo'];
var ROOMS = [1, 2, 3];
var GUESTS = [1, 2, 3];
var CHECKIN = ['12:00', '13:00', '14:00'];
var CHECKOUT = ['12:00', '13:00', '14:00'];
var FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];
var DESCRIPTION = 'Лучший вариант на сегодняшний день!';
var PHOTOS = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg',
];
var PIN_X_OFFSET = 25;
var PIN_Y_OFFSET = 70;
var WIDTH_PHOTO = 40;
var HEIGHT_PHOTO = 45;
var HALF_MAIN_PIN_X = 31;
var MAIN_PIN_Y = 84;

var getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var getRandomValueFromArray = function (arr) {
  return arr[getRandomNumber(0, arr.length - 1)];
};

var getArrRandomLength = function (arr) {
  var result = [];
  var j = getRandomNumber(1, arr.length);
  for (var i = 0; i < j; i++) {
    var element = arr[i];
    result.push(element);
  }
  return result;
};



var getData = function () {
  var randomArr = [];
  for (var i = 1; i <= ADS_QUANTITY; i++) {
    var ad = {
      author: {
        avatar: 'img/avatars/user0' + i + '.png',
      },
      offer: {
        title: getRandomValueFromArray(TITLES),
        address: '',
        price: getRandomNumber(MIN_PRICE, MAX_PRICE),
        type: getRandomValueFromArray(TYPES),
        rooms: getRandomValueFromArray(ROOMS),
        guests: getRandomValueFromArray(GUESTS),
        checkin: getRandomValueFromArray(CHECKIN),
        checkout: getRandomValueFromArray(CHECKOUT),
        features: getArrRandomLength(FEATURES),
        description: DESCRIPTION,
        photos: getArrRandomLength(PHOTOS),
      },
      location: {
        x: getRandomNumber(PIN_X_MIN, PIN_X_MAX),
        y: getRandomNumber(PIN_Y_MIN, PIN_Y_MAX),
      },
    };
    ad.offer.address = ad.location.x + ',' + ad.location.y;
    randomArr.push(ad);
  }
  return randomArr;
};
//

// Cоздаём DOM-элементы, соответствующие меткам на карте, и заполняем их данными из массива.

var similarPinList = document.querySelector('.map__pins');
var similarPinTemplate = document
  .querySelector('#pin')
  .content.querySelector('.map__pin');
var resultData = getData();

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

var typesoOffers = {
  palace: 'Дворец',
  flat: 'Квартира',
  house: 'Дом',
  bungalo: 'Бунгало'
};

var filtersContainer = document.querySelector('.map__filters-container');


// функция склонения
var plural = function (number, one, several, plenty) {
  number = Math.abs(number);
  number %= 100;
  if (number >= 5 && number <= 20) {
    return number + plenty;
  }
  number %= 10;
  if (number === 1) {
    return number + one;
  }
  if (number >= 2 && number <= 4) {
    return number + several;
  }
  return number + plenty;
};


// Функция карточки объявления
var getCard = function (value) {
  console.log(value)
  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
  var cardElement = cardTemplate.cloneNode(true);

  cardElement.querySelector('.popup__title').textContent = value.offer.title;
  cardElement.querySelector('.popup__text--address').textContent = value.offer.address;
  cardElement.querySelector('.popup__text--price').textContent = value.offer.price + ' ₽/ночь';
  cardElement.querySelector('.popup__type').textContent = typesoOffers[value.offer.type];
  cardElement.querySelector('.popup__text--capacity').textContent = plural(value.offer.rooms, ' комната для ', ' комнаты для ', ' комнат для ') + plural(value.offer.guests, ' гостя', ' гостей', ' гостей');
  cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + value.offer.checkin + ', выезд до ' + value.offer.checkout;
  cardElement.querySelector('.popup__description').textContent = value.offer.description;
  cardElement.querySelector('.popup__avatar').src = value.author.avatar;
  cardElement.querySelector('.popup__feature').textContent = value.offer.features;

  var popupPhotos = cardElement.querySelector('.popup__photos');
  popupPhotos.textContent = '';
  for (var j = 0; j < value.offer.photos.length; j += 1) {
    var newPhoto = document.createElement('img');
    newPhoto.classList.add('popup__photo');
    newPhoto.setAttribute('src', value.offer.photos[j]);
    newPhoto.setAttribute('width', WIDTH_PHOTO);
    newPhoto.setAttribute('height', HEIGHT_PHOTO);
    newPhoto.setAttribute('alt', 'Фотография жилья');

    popupPhotos.appendChild(newPhoto);
  }

  return cardElement;
};

var map = document.querySelector('.map');

map.insertBefore(getCard(resultData[0]), filtersContainer);


var activateMap = function () {
  map.classList.remove('map--faded');
};

var activatePage = function () {
  activateMap();
  renderPins();
};

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


// Заполнение поля адреса
var mainMapPin = document.querySelector('.map__pin--main');
var fillAddress = function () {
  var adressInput = document.querySelector('#address');
  var mainPinLocationTop = parseInt(mainMapPin.style.top, 10);
  var mainPinLocationLeft = parseInt(mainMapPin.style.left, 10);

  adressInput.value = (Math.round(mainPinLocationTop + MAIN_PIN_Y)) + ', ' + (Math.round(mainPinLocationLeft + HALF_MAIN_PIN_X));
};

fillAddress();

var activateForm = function () {
  var form = document.querySelector('.ad-form');
  form.classList.remove('ad-form--disabled');
};

// Активация страницы и разблокировка
mainMapPin.addEventListener('mousedown', function (evt) {
  if (evt.button === 0) {
    activatePage();
    blockMapFilter(false);
    blockFormFilter(false);
    fillAddress();
    activateForm();
  }
});

mainMapPin.addEventListener('keydown', function (evt) {
  if (evt.code === 'Enter') {
    activatePage();
    blockMapFilter(false);
    blockFormFilter(false);
    fillAddress();
    activateForm();
  }
});

var roomsSelect = document.querySelector('#room_number');
var capacitySelect = document.querySelector('#capacity');

capacitySelect.addEventListener('change', function () {
  validateGuests();
});

roomsSelect.addEventListener('change', function () {
  validateGuests();
});

var validateGuests = function () {
  if ((roomsSelect.value == 100 && capacitySelect.value > 0) || (roomsSelect.value != 100 && capacitySelect.value == 0)) {
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
  if (typeSelect.value == 'bungalo') {
    priceSelect.placeholder = 0;
    priceSelect.setAttribute('min', '0')
  }
  else if (typeSelect.value == 'flat') {
    priceSelect.placeholder = 1000;
    priceSelect.setAttribute('min', '1000')
  }
  else if (typeSelect.value == 'house') {
    priceSelect.placeholder = 5000;
    priceSelect.setAttribute('min', '5000')
  }
  else if (typeSelect.value == 'palace') {
    priceSelect.placeholder = 10000;
    priceSelect.setAttribute('min', '10000')
  }
}
