"use strict";

function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
var icon_width = 79,
  icon_height = 79,
  num_icons = 9,
  time_per_icon = 100,
  indexes = [0, 0, 0],
  iconMap = [];
var isClicked = false;

// Función para generar un índice aleatorio inicial para cada rodillo
var getRandomIndex = function getRandomIndex() {
  return Math.floor(Math.random() * num_icons);
};

// Función para inicializar los rodillos con índices aleatorios
function initRandom() {
  var reelsList = document.querySelectorAll('.slots > .reel');

  // Inicializar los índices aleatorios para cada rodillo
  _toConsumableArray(reelsList).forEach(function (reel, i) {
    indexes[i] = getRandomIndex(); // Asignar un índice aleatorio inicial
    // Ajustar la posición de fondo de cada rodillo para reflejar el índice aleatorio
    reel.style.backgroundPositionY = "".concat(indexes[i] * icon_height, "px");
  });
}

// Modificar la función roll para aceptar targetIndex y agregar vueltas extra
var roll = function roll(reel) {
  var offset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  var targetIndex = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  var extraSpins = 6; // Cantidad de vueltas adicionales antes de detenerse
  var currentIndex = indexes[offset];

  // Si se proporciona targetIndex, forzamos a que el delta incluya vueltas extra antes de llegar al targetIndex
  var delta = targetIndex !== null ? extraSpins * num_icons + (targetIndex - currentIndex + num_icons) % num_icons : (offset + 2) * num_icons + Math.round(Math.random() * num_icons);
  var style = getComputedStyle(reel),
    backgroundPositionY = parseFloat(style["background-position-y"]),
    targetBackgroundPositionY = backgroundPositionY + delta * icon_height,
    normTargetBackgroundPositionY = targetBackgroundPositionY % (num_icons * icon_height);
  return new Promise(function (resolve) {
    reel.style.transition = "background-position-y ".concat(8 + delta * time_per_icon, "ms cubic-bezier(.45,.05,.58,1.09)");
    reel.style.backgroundPositionY = "".concat(targetBackgroundPositionY, "px");
    setTimeout(function () {
      reel.style.transition = "none";
      reel.style.backgroundPositionY = "".concat(normTargetBackgroundPositionY, "px");
      resolve(delta % num_icons);
    }, 8 + delta * time_per_icon);
  });
};

// Nueva función rollAll con opción de forzar un resultado y tiempos diferentes
/* function rollAll() {
  var forceWin = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
  var winIndexes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [0, 0, 0];
  isClicked = true;
  sendUpdateBoolean();
  var reelsList = document.querySelectorAll('.slots > .reel');
  var delayBetweenReels = 300; // Retraso de 500ms entre el inicio de cada rodillo
  // Mapear con un retraso diferente para cada reel
  _toConsumableArray(reelsList).forEach(function (reel, i) {
    setTimeout(function () {
      roll(reel, i, forceWin ? winIndexes[i] : null).then(function (delta) {
        indexes[i] = (indexes[i] + delta) % num_icons;
        console.log("Reel ".concat(i, " index: "), indexes[i]);
        if (i === reelsList.length - 1) {
          console.log('Último reel completado', i, indexes[2]);
          isClicked = false;
          sendUpdateBoolean();
          // Aquí puedes agregar lógica adicional para el usuario
          // Verificar condiciones de victoria solo después de que todos los rodillos hayan terminado
          if (i === reelsList.length - 1 && indexes[0] === indexes[1] && indexes[1] === indexes[2]) {
            console.log('WIN WIN WIN');
            sendUpdateToReact();
            // Enviar mensaje de "win" al padre (componente React)
            window.parent.postMessage({
              type: 'WIN',
              message: 'WIN WIN WIN'
            }, '*');
          }
        }
      });
    }, i * delayBetweenReels); // Incrementar el retraso para cada reel
  });
} */

//esta funcion es asincrona y response correctamente 
function rollAll() {
  var forceWin = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
  var winIndexes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [0, 0, 0];
  isClicked = true;
  sendUpdateBoolean(); // Enviar la actualización del booleano una vez al inicio
  var reelsList = document.querySelectorAll('.slots > .reel');
  var delayBetweenReels = 300; // Retraso entre el inicio de cada rodillo

  // Crear una lista de promesas para cada `roll`
  var rollPromises = _toConsumableArray(reelsList).map(function (reel, i) {
    return new Promise((resolve) => {
      setTimeout(() => {
        roll(reel, i, forceWin ? winIndexes[i] : null).then(function (delta) {
          indexes[i] = (indexes[i] + delta) % num_icons;
          console.log(`Reel ${i} index: `, indexes[i]);
          resolve(); // Resolvemos la promesa después de completar el rollo
        });
      }, i * delayBetweenReels);
    });
  });

  // Esperar a que todas las promesas terminen antes de continuar
  Promise.all(rollPromises).then(() => {
    console.log('Último reel completado', indexes[2]);
    isClicked = false;
    sendUpdateBoolean(); // Enviar el booleano actualizado una vez que todo termina

    // Verificar condiciones de victoria
    if (indexes[0] === indexes[1] && indexes[1] === indexes[2]) {
      console.log('WIN WIN WIN');
      sendUpdateToReact();
      window.parent.postMessage({
        type: 'WIN',
        message: 'WIN WIN WIN'
      }, '*');
    }
  });
}

//funcion q envia el booleano para el bloqueo de el button
function sendUpdateBoolean() {
  console.log('enviando booleado desde el js');
  window.parent.postMessage({
    type: 'UPDATE_BOOLEAN',
    "boolean": {
      isClicked: isClicked
    }
  });
}

//funcion que manda los valores a react
function sendUpdateToReact() {
  console.log('Enviando actualización a React:', {
    clicksLeft: clicksLeft,
    outcomes: outcomes
  });
  window.parent.postMessage({
    type: 'UPDATE_STATE',
    data: {
      clicksLeft: clicksLeft,
      outcomes: outcomes
    }
  }, '*');
}
