'use strict';

// Функция для создания массива из 8 сгенерированных JS-объектов
var ADS_QUANTITY = 8;
var TITLES = ['Идеальный вариант на выходные', 'Лучшее для семьи', 'Для большой компании'];
var PIN_X_MIN = 0;
var PIN_X_MAX = 1200;
var PIN_Y_MIN = 130;
var PIN_Y_MAX = 630;
var MIN_PRICE = 0;
var MAX_PRICE = 100000;
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

var randomArr = [];

var getData = function () {

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

renderPins();
//

// У блока .map уберите класс .map--faded

var map = document.querySelector('.map');
map.classList.remove('map--faded');


var typesoOffers = {
  palace: 'Дворец',
  flat: 'Квартира',
  house: 'Дом',
  bungalo: 'Бунгало'
};

var filtersContainer = document.querySelector('.map__filters-container');


// функция склонения
var getNoun = function (number, one, two, five) {
  number = Math.abs(number);
  number %= 100;
  if (number >= 5 && number <= 20) {
    return number + five;
  }
  number %= 10;
  if (number === 1) {
    return number + one;
  }
  if (number >= 2 && number <= 4) {
    return number + two;
  }
  return number + five;
};


// Функция карточки объявления
var getCard = function (value) {
  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
  var cardElement = cardTemplate.cloneNode(true);

  cardElement.querySelector('.popup__title').textContent = value.offer.title;
  cardElement.querySelector('.popup__text--address').textContent = value.offer.address;
  cardElement.querySelector('.popup__text--price').textContent = value.offer.price + ' ₽/ночь';
  cardElement.querySelector('.popup__type').textContent = typesoOffers[value.offer.type];
  cardElement.querySelector('.popup__text--capacity').textContent = getNoun(value.offer.rooms, ' комната для ', ' комнаты для ', ' комнат для ') + getNoun(value.offer.guests, ' гостя', ' гостей', ' гостей');
  cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + value.offer.checkin + ', выезд до ' + value.offer.checkout;
  cardElement.querySelector('.popup__description').textContent = value.offer.description;
  cardElement.querySelector('.popup__avatar').src = value.author.avatar;
  cardElement.querySelector('.popup__features').li = value.offer.features;

  var popupPhotos = cardElement.querySelector('.popup__photos');
  popupPhotos.textContent = '';
  for (var j = 0; j < value.offer.photos.length; j += 1) {
    var newPhoto = document.createElement('img');
    newPhoto.classList.add('popup__photo');
    newPhoto.setAttribute('src', value.offer.photos[j]);
    newPhoto.setAttribute('width', 40);
    newPhoto.setAttribute('height', 45);
    newPhoto.setAttribute('alt', 'Фотография жилья');

    popupPhotos.appendChild(newPhoto);
  }

  return cardElement;
};

map.insertBefore(getCard(randomArr[0]), filtersContainer);
