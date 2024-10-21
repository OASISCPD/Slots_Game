import React, { useState } from 'react';

// Definir los íconos y sus posiciones en el sprite
const iconMap = ["banana", "seven", "cherry", "plum", "orange", "bell", "bar", "lemon", "melon"];
const iconHeight = 79; // Altura de cada ícono en el sprite
const numIcons = iconMap.length;

export function SlotV4() {
    const [reels, setReels] = useState<number[][]>([
        generateUniqueReel(),
        generateUniqueReel(),
        generateUniqueReel(),
    ]);

    const [spinning, setSpinning] = useState(false);
    const [attempts, setAttempts] = useState(0);
    const [won, setWon] = useState(false);
    const [offsets, setOffsets] = useState([0, 0, 0]);

    // Función para generar un array de símbolos aleatorios sin que todos sean iguales
    function generateUniqueReel() {
        const reel: any = [];
        while (reel.length < 20) {
            const randomIcon = Math.floor(Math.random() * numIcons);
            if (!reel.includes(randomIcon)) {
                reel.push(randomIcon);
            }
        }
        return reel;
    }

    // Genera un set aleatorio para cada carrete asegurando variación en los símbolos
    const generateRandomReels = () => {
        let newReels: number[][] = [];
        for (let i = 0; i < 3; i++) {
            let reel: number[] = [];
            for (let j = 0; j < 20; j++) {
                let icon;
                do {
                    icon = Math.floor(Math.random() * numIcons);
                } while (reel.includes(icon)); // Evitar repetidos en la misma tirada
                reel.push(icon);
            }
            newReels.push(reel);
        }
        return newReels;
    };

    // Función para girar un carrete con delay
    const spinReel = (reelIndex: number, duration: number, delay: number) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                const startTime = Date.now();
                const animate = () => {
                    const elapsedTime = Date.now() - startTime;
                    const progress = Math.min(elapsedTime / duration, 1);

                    setOffsets((prevOffsets) => {
                        const newOffsets = [...prevOffsets];
                        newOffsets[reelIndex] = (progress * 17 * 100) % 100;
                        return newOffsets;
                    });

                    if (progress < 1) {
                        requestAnimationFrame(animate);
                    } else {
                        resolve(null);
                    }
                };
                requestAnimationFrame(animate);
            }, delay);
        });
    };
    // Función para verificar si los símbolos del medio son iguales
    const checkIfWon = (finalSymbols: number[]) => {
        return finalSymbols.every((symbol) => symbol === finalSymbols[0]);
    };

    // Función para iniciar el giro
    const spin = async () => {
        if (spinning || attempts >= 3 || won) return;

        setSpinning(true);
        setAttempts((prev) => prev + 1);

        // Generar nuevos carretes aleatorios
        const newReels = generateRandomReels();
        setReels(newReels);

        const spinDurations = [3000, 3500, 4000];
        const spinDelays = [0, 500, 1000];

        // Hacemos que cada carrete gire uno tras otro con delays
        await Promise.all([
            spinReel(0, spinDurations[0], spinDelays[0]),
            spinReel(1, spinDurations[1], spinDelays[1]),
            spinReel(2, spinDurations[2], spinDelays[2]),
        ]);

        setSpinning(false);

        const finalSymbols = newReels.map((reel) => reel[1]); // Fila del medio (índice 1)
        const hasWon = checkIfWon(finalSymbols);

        if (hasWon) {
            setWon(true);
            alert(`¡Has ganado con el icono: ${iconMap[finalSymbols[0]]} en la fila del medio!`);
        } else if (attempts === 2) {
            alert('Lo siento, no has ganado.');
        }
    };


    const reset = () => {
        setReels([
            generateUniqueReel(),
            generateUniqueReel(),
            generateUniqueReel(),
        ]);
        setOffsets([0, 0, 0]);
        setAttempts(0);
        setWon(false);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-purple-600 to-indigo-600">
            <h1 className="text-4xl font-bold mb-8 text-white">Máquina Tragamonedas</h1>
            <div className="bg-white rounded-lg shadow-2xl p-8 mb-8">
                <div className="flex justify-center mb-6 space-x-4">
                    {reels.map((reel, index) => (
                        <div key={index} className="w-24 h-72 bg-yellow-200 rounded-lg overflow-hidden relative">
                            <div
                                className="absolute top-0 left-0 w-full transition-transform duration-100 ease-linear flex flex-col items-center justify-center"
                                style={{
                                    backgroundImage: 'url(https://assets.codepen.io/439000/slotreel.webp)',
                                    backgroundSize: `100% auto`,
                                    transform: `translateY(-${offsets[index]}%)`,
                                }}
                            >
                                {reel.concat(reel.slice(0, 3)).map((symbolIndex, symbolReelIndex) => (
                                    <div
                                        key={symbolReelIndex}
                                        className="h-24 w-full"
                                        style={{
                                            backgroundPositionY: `-${symbolIndex * iconHeight}px`,
                                            height: `${iconHeight}px`,
                                            width: '100%',
                                        }}
                                    />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
                <button
                    onClick={spin}
                    disabled={spinning || attempts >= 3 || won}
                    className={`w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full transition duration-300 ${(spinning || attempts >= 3 || won) && 'opacity-50 cursor-not-allowed'
                        }`}
                >
                    {spinning ? 'Girando...' : 'Girar'}
                </button>
            </div>
            <div className="text-white text-xl mb-4">
                Intentos: {attempts}/3
            </div>
            {won && (
                <div className="text-3xl font-bold text-yellow-300 mb-4 animate-pulse">
                    ¡Has ganado!
                </div>
            )}
            {attempts === 3 && !won && (
                <div className="text-3xl font-bold text-red-400 mb-4">
                    Juego terminado
                </div>
            )}
            {(attempts === 3 || won) && (
                <button
                    onClick={reset}
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full transition duration-300"
                >
                    Jugar de nuevo
                </button>
            )}
        </div>
    );
}
