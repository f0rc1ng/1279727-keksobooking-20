'use strict';

(function () {

  window.map.map.insertBefore(window.card.getCard(window.pin.resultData[0]), window.card.filtersContainer);


  var popupClose = document.querySelector('.popup__close');
  var popupOpen = document.querySelector('.map__pin');
  var popup = document.querySelector('.popup');

  var onPopupEscPress = function (evt) {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      closePopup();
    }
  };

  var openPopup = function () {
    popup.classList.remove('hidden');
    document.addEventListener('keydown', onPopupEscPress);
  };

  var closePopup = function () {
    popup.classList.add('hidden');

    document.removeEventListener('keydown', onPopupEscPress);
  };

  popupOpen.addEventListener('click', function () {
    openPopup();
  });

  popupOpen.addEventListener('keydown', function (evt) {
    if (evt.key === 'Enter') {
      openPopup();
    }
  });

  popupClose.addEventListener('click', function () {
    closePopup();
  });


  // var addThumbnailClickHandler = function (thumbnail, photo) {
  //   thumbnail.addEventListener('click', function () {
  //     window.map.map.insertBefore(window.card.getCard(photo), window.card.filtersContainer);
  //   });
  // };


  // var activatePins = function () {

  //   var popupOpen = document.querySelectorAll('.map__pin');
  //   for (var i = 0; i < popupOpen.length; i++) {
  //     addThumbnailClickHandler(popupOpen[i], window.pin.resultData[i]);
  //   }

  // };

  // window.util = {
  //   activatePins: activatePins
  // };

})();

