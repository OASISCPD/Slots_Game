const icon_width = 79,
    icon_height = 79,
    num_icons = 9,
    time_per_icon = 100,
    indexes = [0, 0, 0],
    iconMap = [];

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
    const delta = targetIndex !== null
        ? extraSpins * num_icons + (targetIndex - currentIndex + num_icons) % num_icons
        : (offset + 2) * num_icons + Math.round(Math.random() * num_icons);

    const style = getComputedStyle(reel),
        backgroundPositionY = parseFloat(style["background-position-y"]),
        targetBackgroundPositionY = backgroundPositionY + delta * icon_height,
        normTargetBackgroundPositionY = targetBackgroundPositionY % (num_icons * icon_height);

    return new Promise((resolve) => {
        reel.style.transition = `background-position-y ${8 + delta * time_per_icon}ms cubic-bezier(.45,.05,.58,1.09)`;
        reel.style.backgroundPositionY = `${targetBackgroundPositionY}px`;

        setTimeout(() => {
            reel.style.transition = `none`;
            reel.style.backgroundPositionY = `${normTargetBackgroundPositionY}px`;
            resolve(delta % num_icons);
        }, 8 + delta * time_per_icon);
    });
}

// Nueva función rollAll con opción de forzar un resultado y tiempos diferentes
function rollAll(forceWin = false, winIndexes = [0, 0, 0]) {
    const reelsList = document.querySelectorAll('.slots > .reel');
    const delayBetweenReels = 300; // Retraso de 500ms entre el inicio de cada rodillo

    // Mapear con un retraso diferente para cada reel
    [...reelsList].forEach((reel, i) => {
        setTimeout(() => {
            roll(reel, i, forceWin ? winIndexes[i] : null)
                .then((delta) => {
                    indexes[i] = (indexes[i] + delta) % num_icons;
                    console.log(`Reel ${i} index: `, indexes[i]);

                    // Verificar condiciones de victoria solo después de que todos los rodillos hayan terminado
                    if (i === reelsList.length - 1 && indexes[0] === indexes[1] && indexes[1] === indexes[2]) {
                        console.log('WIN WIN WIN');
                        sendUpdateToReact()
                        // Enviar mensaje de "win" al padre (componente React)
                        window.parent.postMessage({ type: 'WIN', message: 'WIN WIN WIN' }, '*');
                    }
                });
        }, i * delayBetweenReels); // Incrementar el retraso para cada reel
    });
}

function sendUpdateToReact() {
    console.log('Enviando actualización a React:', { clicksLeft, outcomes });
    window.parent.postMessage({
        type: 'UPDATE_STATE',
        data: { clicksLeft, outcomes }
    }, '*');
}
