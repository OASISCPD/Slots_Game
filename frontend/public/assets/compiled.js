const icon_width = 79,
  icon_height = 79,
  num_icons = 9,
  time_per_icon = 100,
  indexes = [0, 0, 0];
let iconMap = [/* "banana", "seven", "cherry", "plum", "orange", "bell", "bar", "lemon", "melon" */];
let spinningInCourse; //Nuevo estado para controlar el giro en curso
//variables para mostrar el premio y ver cual es el que sali ganador segun logica

let icon_name; // Variable para almacenar el nombre del icono
let idPrizeWin;

//cambiar los valores de iconMap  por lo que me llega de la data del fetch
window.addEventListener('message', event => {
  if (event.data.type === 'SET_PRIZES') {
    ///ACTUALIZAR EL ICON MAP 
    iconMap = event.data.prizes;
    console.log('Nuevos premios recibidos', iconMap);
    initRandom(); //reinciamos con los nuevos premios
  }
  if (event.data.type === 'SET_PRIZE_ID') {
    console.log('event.data.id:', event.data.id);
    ///ACTUALIZAR EL ICON MAP 
    idPrizeWin = event.data.id;
    console.log('Premio que va a ser seleciconado como el ganador', idPrizeWin);
  }
});

// Función para generar un índice aleatorio inicial para cada rodillo
const getRandomIndex = () => Math.floor(Math.random() * num_icons);

// Función para inicializar los rodillos con índices aleatorios
function initRandom() {
  const reelsList = document.querySelectorAll('.slots > .reel');
  // Inicializar los índices aleatorios para cada rodillo
  [...reelsList].forEach((reel, i) => {
    indexes[i] = getRandomIndex(); // Asignar un índice aleatorio inicial
    // Ajustar la posición de fondo de cada rodillo para reflejar el índice aleatorio
    reel.style.backgroundPositionY = `${indexes[i] * icon_height}px`;
  });
}

// Modificar la función roll para aceptar targetIndex y agregar vueltas extra
const roll = (reel, offset = 0, targetIndex = null) => {
  const extraSpins = 6; // Cantidad de vueltas adicionales antes de detenerse
  const currentIndex = indexes[offset];

  // Si se proporciona targetIndex, forzamos a que el delta incluya vueltas extra antes de llegar al targetIndex
  const delta = targetIndex !== null ? extraSpins * num_icons + (targetIndex - currentIndex + num_icons) % num_icons : (offset + 2) * num_icons + Math.round(Math.random() * num_icons);
  const style = getComputedStyle(reel),
    backgroundPositionY = parseFloat(style["background-position-y"]),
    targetBackgroundPositionY = backgroundPositionY + delta * icon_height,
    normTargetBackgroundPositionY = targetBackgroundPositionY % (num_icons * icon_height);
  return new Promise(resolve => {
    reel.style.transition = `background-position-y ${8 + delta * time_per_icon}ms cubic-bezier(.45,.05,.58,1.09)`;
    reel.style.backgroundPositionY = `${targetBackgroundPositionY}px`;
    setTimeout(() => {
      reel.style.transition = `none`;
      reel.style.backgroundPositionY = `${normTargetBackgroundPositionY}px`;
      resolve(delta % num_icons);
    }, 8 + delta * time_per_icon);
  });
};
async function rollAll(forceWin = false, winIndexes = [0, 0, 0]) {
  if (spinningInCourse) return; // Evitar múltiples clics durante el giro
  spinningInCourse = true; // Iniciar el giro
  let namePrizeLocal = ''; // Variable local para almacenar el nombre del premio
  sendUpdateToReact(namePrizeLocal); // Enviar actualización a React sobre el estado del giro
  const reelsList = document.querySelectorAll('.slots > .reel');
  const delayBetweenReels = 300; // Retraso de 500ms entre el inicio de cada rodillo
  // Mapear con un retraso diferente para cada reel
  [...reelsList].forEach((reel, i) => {
    setTimeout(() => {
      roll(reel, i, forceWin ? winIndexes[i] : null).then(delta => {
        indexes[i] = (indexes[i] + delta) % num_icons;
        console.log(`Reel ${i} index: `, indexes[i]);

        // Verificar condiciones de victoria después de cada giro
        if (indexes[0] === indexes[1] && indexes[1] === indexes[2]) {
          console.log('WIN WIN WIN');
          //asignar el nombre y el icono  del premio
          console.log('lorem --->', winIndexes[0]);
          console.log(iconMap[winIndexes[0]]);
          console.log('iconMap', iconMap);
          namePrizeLocal = iconMap[winIndexes[0] - 1]; // Obtener el nombre del premio
          // Aquí puedes definir cómo se obtiene el icono si es necesario
          icon_name = `icono_de_${namePrizeLocal}`; // Solo un ejemplo de cómo podrías definir el icono
          // Mostrar el nombre del premio y el icono en la consola
          console.log(`Ganaste: ${namePrizeLocal}, Icono: ${icon_name}`);
          // Enviar mensaje de "win" al padre (componente React)
          sendUpdateToReact(namePrizeLocal);
          window.parent.postMessage({
            type: 'WIN',
            message: namePrizeLocal
          }, '*');
        }

        // Solo enviar el mensaje si es el último rodillo
        if (i === reelsList.length - 1) {
          // Manejo adicional después de que todos los rodillos han girado (si es necesario)
          spinningInCourse = false; // Termina el giro
          sendUpdateToReact(namePrizeLocal); // Actualiza el estado del giro en React
        }
      });
    }, i * delayBetweenReels); // Incrementar el retraso para cada reel
  });
}
function sendUpdateToReact(name_prize) {
  window.parent.postMessage({
    type: 'UPDATE_STATE',
    data: {
      clicksLeft,
      outcomes,
      hasWinner,
      spinningInCourse,
      name_prize
    } // Enviar también el estado de spinning
  }, '*');
}
