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

  var initCard = function () {
    // mycomments: создаем карточку
    var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
    var cardElement = cardTemplate.cloneNode(true);

    return cardElement;
  };

  var hideCard = function () {
    cardElement.classList.add('hidden');

    document.removeEventListener('keydown', onPinEscPress);
  };

  var showCard = function () {
    cardElement.classList.remove('hidden');

    document.addEventListener('keydown', onPinEscPress);
  };

  // mycomments: с помощью getCard возвращаем саму карточку для добавления на карту
  var getCard = function () {
    return cardElement;
  };

  var onPinEscPress = function (evt) {
    window.util.isEscapeEvent(evt, hideCard);
  };

  // Функция карточки объявления
  var openCard = function (value) {
    showCard();

    cardElement.querySelector('.popup__title').textContent = value.offer.title;
    cardElement.querySelector('.popup__text--address').textContent = value.offer.address;
    cardElement.querySelector('.popup__text--price').textContent = value.offer.price + ' ₽/ночь';
    cardElement.querySelector('.popup__type').textContent = typesoOffers[value.offer.type];
    cardElement.querySelector('.popup__text--capacity').textContent = window.util.plural(value.offer.rooms, ' комната для ', ' комнаты для ', ' комнат для ') + window.util.plural(value.offer.guests, ' гостя', ' гостей', ' гостей');
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

  };

  // mycomments: создаем карточку один раз и храним ее внутри модуля card
  var cardElement = initCard();

  // mycomments: прячем карточку потому что она нам не нужна
  hideCard();

  // mycomments: тут же где создаем карточку подписываемся на то чтобы она пряталась когда мы жмем на close
  // вот тут можно добавить и событие на escape
  cardElement.querySelector('.popup__close').addEventListener('click', function () {
    hideCard();
  });

  window.card = {
    getCard: getCard,
    openCard: openCard
  };

})();
