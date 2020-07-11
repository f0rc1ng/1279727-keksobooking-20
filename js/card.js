'use strict';

(function () {

  var WIDTH_PHOTO = 40;
  var HEIGHT_PHOTO = 45;

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

    var newFeauters = cardElement.querySelector('.popup__features');
    while (newFeauters.firstChild) {
      newFeauters.removeChild(newFeauters.firstChild);
    }
    newFeauters.textContent = '';
    for (var j = 0; j < value.offer.features.length; j += 1) {
      var newFeature = document.createElement('li');
      newFeature.classList.add('popup__feature');
      newFeature.classList.add('popup__feature--' + value.offer.features[j]);


      newFeauters.appendChild(newFeature);
    }

    var popupPhotos = cardElement.querySelector('.popup__photos');
    popupPhotos.textContent = '';
    for (var i = 0; i < value.offer.photos.length; i += 1) {
      var newPhoto = document.createElement('img');
      newPhoto.classList.add('popup__photo');
      newPhoto.setAttribute('src', value.offer.photos[i]);
      newPhoto.setAttribute('width', WIDTH_PHOTO);
      newPhoto.setAttribute('height', HEIGHT_PHOTO);
      newPhoto.setAttribute('alt', 'Фотография жилья');

      popupPhotos.appendChild(newPhoto);
    }

    return cardElement;
  };

  window.card = {
    filtersContainer: filtersContainer,
    getCard: getCard
  };

})();
