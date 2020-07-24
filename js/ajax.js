'use strict';

(function () {
  var URL_LOAD = 'https://javascript.pages.academy/keksobooking/data';
  var URL_UPLOAD = 'https://javascript.pages.academy/keksobooking';
  var TYPE = 'json';
  var StatusCodes = {
    OK: 200
  };
  var TIMEOUT_IN_MS = 500;

  var load = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = TYPE;

    xhr.addEventListener('load', function () {
      if (xhr.status === StatusCodes.OK) {
        onSuccess(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = TIMEOUT_IN_MS;

    xhr.open('GET', URL_LOAD);
    xhr.send();
  };

  var upload = function (data, onSuccess, onErrors) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = TYPE;

    xhr.addEventListener('load', function () {
      if (xhr.status === StatusCodes.OK) {
        onSuccess();
      } else {
        onErrors('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.open('POST', URL_UPLOAD);
    xhr.send(data);
  };

  window.ajax = {
    load: load,
    upload: upload
  };
})();
