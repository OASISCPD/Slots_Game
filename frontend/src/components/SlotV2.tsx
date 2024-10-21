import React, { useEffect, useState } from 'react';
import '../../public/assets/index.css'; // Ensure the CSS is in the correct directory

// Configuration constants
const icon_width = 79;  // Currently unused; consider removing if not needed
const icon_height = 79;
const num_icons = 9;
const time_per_icon = 100;
const indexes = [0, 0, 0]; // Holds the current indices for the reels
const iconMap = ["banana", "seven", "cherry", "plum", "orange", "bell", "bar", "lemon", "melon"]; // Currently unused; consider removing if not needed

// Function to generate a random index
const getRandomIndex = () => Math.floor(Math.random() * num_icons);

export function SlotV2() {
    const [clicksLeft, setClicksLeft] = useState(3);
    const [outcomes, setOutcomes] = useState<boolean[]>([]);
    const [hasWinner, setHasWinner] = useState(false);

    // Function to initialize the reels with random indices
    const initRandom = () => {
        const reelsList = document.querySelectorAll('.slots > .reel');
        reelsList.forEach((reel: Element, i) => {
            indexes[i] = getRandomIndex(); // Assign a random initial index
            (reel as HTMLElement).style.backgroundPositionY = `${indexes[i] * icon_height}px`;
        });
    };

    const roll = (reel: HTMLDivElement, offset: number = 0, targetIndex: number | null = null) => {
        const extraSpins = 6; // Cantidad de vueltas adicionales antes de detenerse
        const currentIndex = indexes[offset];

        // Si se proporciona targetIndex, forzamos a que el delta incluya vueltas extra antes de llegar al targetIndex
        const delta = targetIndex !== null
            ? extraSpins * num_icons + (targetIndex - currentIndex + num_icons) % num_icons
            : (offset + 2) * num_icons + Math.round(Math.random() * num_icons);

        console.log(`Rolling reel ${offset}:`);
        console.log(`Current Index: ${currentIndex}, Target Index: ${targetIndex}, Delta: ${delta}`);

        return new Promise<number>((resolve) => {
            reel.style.transition = `background-position-y ${8 + delta * time_per_icon}ms cubic-bezier(.45,.05,.58,1.09)`;
            reel.style.backgroundPositionY = `${parseFloat(reel.style.backgroundPositionY) + delta * icon_height}px`;

            setTimeout(() => {
                reel.style.transition = 'none';
                const normTargetBackgroundPositionY = (parseFloat(reel.style.backgroundPositionY) + delta * icon_height) % (num_icons * icon_height);
                reel.style.backgroundPositionY = `${normTargetBackgroundPositionY}px`;
                indexes[offset] = (indexes[offset] + delta) % num_icons; // Actualiza el índice
                console.log(`Updated Index for reel ${offset}: ${indexes[offset]}`); // Agrega el nuevo índice
                resolve(delta % num_icons);
            }, 8 + delta * time_per_icon);
        });
    };

    const rollAll = (forceWin: boolean = false, winIndexes: number[] = [0, 0, 0]) => {
        const reelsList = document.querySelectorAll('.slots > .reel');
        const delayBetweenReels = 300; // Retraso de 300ms entre el inicio de cada rodillo

        [...reelsList].forEach((reel, i) => {
            setTimeout(() => {
                console.log(`Starting roll for reel ${i}`);
                roll(reel as HTMLDivElement, i, forceWin ? winIndexes[i] : null).then((delta) => {
                    console.log(`Reel ${i} finished rolling with delta: ${delta}`);

                    // Verificar condiciones de victoria después de cada giro
                    if (indexes[0] === indexes[1] && indexes[1] === indexes[2]) {
                        setHasWinner(true);
                        window.parent.postMessage({ type: 'WIN', message: 'WIN WIN WIN' }, '*');
                        console.log('WIN CONDITION MET');
                    }
                });
            }, i * delayBetweenReels);
        });
    };

    const handleSpin = () => {
        if (clicksLeft > 0 && !hasWinner) {
            setClicksLeft(prev => prev - 1);

            const currentOutcome = outcomes[3 - clicksLeft - 1];
            if (currentOutcome) {
                const winIndexes = indexes; // Usar los índices actuales como ganadores
                console.log("Winning spin with indexes:", winIndexes);
                rollAll(true, winIndexes); // Mostrar el giro ganador
            } else {
                const nonWinningIndexes = getNonRepeatingIndexes();
                console.log("Non-winning spin with indexes:", nonWinningIndexes);
                rollAll(false, nonWinningIndexes); // Mostrar un giro que no gana
            }
        }
    };

    const getNonRepeatingIndexes = () => {
        const availableIndexes = Array.from({ length: num_icons }, (_, i) => i);
        for (let i = availableIndexes.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [availableIndexes[i], availableIndexes[j]] = [availableIndexes[j], availableIndexes[i]];
        }
        return availableIndexes.slice(0, 3); // Return the first three unique random indexes
    };

    useEffect(() => {
        initRandom();
        generateRandomOutcomes();
    }, []);

    const generateRandomOutcomes = () => {
        const randomOutcomes = [false, false, true]; // Example outcomes; you may want to adjust this logic
        for (let i = randomOutcomes.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [randomOutcomes[i], randomOutcomes[j]] = [randomOutcomes[j], randomOutcomes[i]]; // Shuffle outcomes
        }
        setOutcomes(randomOutcomes);
    };

    return (
        <div className=''>
            <div className="slots">
                <div className="reel" ></div>
                <div className="reel" ></div>
                <div className="reel" ></div>
            </div>
            <button
                style={{
                    width: '100%',
                    color: 'black',
                    backgroundColor: '#FFDE21',
                    border: 'none',
                    borderRadius: '0.5rem',
                    fontWeight: 500,
                    fontSize: '0.875rem',
                    padding: '10px 20px',
                    textAlign: 'center',
                    display: 'block',
                    margin: '2rem auto',
                    cursor: hasWinner || clicksLeft === 0 ? 'not-allowed' : 'pointer',
                    opacity: hasWinner || clicksLeft === 0 ? 0.5 : 1
                }}
                id="spinButton"
                onClick={handleSpin}
                disabled={hasWinner || clicksLeft === 0}
            >
                Girar
            </button>
        </div>
    );
};

