import React, { useState, useEffect } from 'react';

const symbols: string[] = ["🍒", "🍋", "🍊", "🍇", "🍉", "🍓", "🍍", "🥝", "🍌"];

export function SlotV3() {
    const [reels, setReels] = useState([
        [...Array(20)].map(() => symbols[Math.floor(Math.random() * symbols.length)]),
        [...Array(20)].map(() => symbols[Math.floor(Math.random() * symbols.length)]),
        [...Array(20)].map(() => symbols[Math.floor(Math.random() * symbols.length)]),
    ]);
    const [spinning, setSpinning] = useState(false);
    const [attempts, setAttempts] = useState(0);
    const [won, setWon] = useState(false);
    const [offsets, setOffsets] = useState([0, 0, 0]);
    const [outcomes, setOutcomes] = useState<boolean[]>([]);
    const [middleRowSymbols, setMiddleRowSymbols] = useState<string[]>([]);
    const [secondRowSymbols, setSecondRowSymbols] = useState<string[]>([]);

    useEffect(() => {
        const generateRandomOutcomes = () => {
            const outcomesArr = [false, false, true];
            for (let i = outcomesArr.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [outcomesArr[i], outcomesArr[j]] = [outcomesArr[j], outcomesArr[i]];
            }
            setOutcomes(outcomesArr);
        };
        generateRandomOutcomes();
    }, []);

    const spinReel = (reelIndex: number, duration: number) => {
        return new Promise<void>((resolve) => {
            const startTime = Date.now();
            const animate = () => {
                const elapsedTime = Date.now() - startTime;
                const progress = Math.min(elapsedTime / duration, 1);
                setOffsets((prevOffsets) => {
                    const newOffsets = [...prevOffsets];
                    newOffsets[reelIndex] = (progress * 17 * 100) % 100; // Ajustar el desplazamiento
                    return newOffsets;
                });

                if (progress < 1) {
                    requestAnimationFrame(animate);
                } else {
                    resolve();
                }
            };
            requestAnimationFrame(animate);
        });
    };

    const spin = async () => {
        if (spinning || attempts >= 3 || won) return;

        setSpinning(true);
        setAttempts((prev) => prev + 1);

        const spinDurations = [3000, 3500, 4000];

        // Realiza la animación de giro para cada rodillo
        await Promise.all([
            spinReel(0, spinDurations[0]),
            spinReel(1, spinDurations[1]),
            spinReel(2, spinDurations[2]),
        ]);

        setSpinning(false);

        const isLastAttempt = attempts === 2;

        // Generar símbolos aleatorios para la primera y segunda tirada
        const newSecondRowSymbols = reels.map((reel) => {
            const randomIndex = Math.floor(Math.random() * reel.length);
            return reel[randomIndex]; // Obtener símbolo aleatorio
        });

        // Forzar los símbolos ganadores en el último intento
        const forcedWinningIndex = [2, 2, 2];
        if (isLastAttempt && !won) {
            setSecondRowSymbols(forcedWinningIndex.map(index => symbols[index]));
            setWon(true);
            console.log('Tirada final (forzada):', forcedWinningIndex.map(index => symbols[index]));
        } else {
            // Si no es el último intento, actualizar con símbolos aleatorios
            setSecondRowSymbols(newSecondRowSymbols);

            // Verificar si hay una victoria en la fila del medio
            const hasWon = newSecondRowSymbols.every((symbol) => symbol === newSecondRowSymbols[0]);
            if (hasWon) {
                setWon(true);
            }
        }
    };

    const reset = () => {
        setReels([
            [...Array(20)].map(() => symbols[Math.floor(Math.random() * symbols.length)]),
            [...Array(20)].map(() => symbols[Math.floor(Math.random() * symbols.length)]),
            [...Array(20)].map(() => symbols[Math.floor(Math.random() * symbols.length)]),
        ]);
        setOffsets([0, 0, 0]);
        setAttempts(0);
        setWon(false);
        setOutcomes([]);
        const generateRandomOutcomes = () => {
            const outcomesArr = [false, false, true];
            for (let i = outcomesArr.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [outcomesArr[i], outcomesArr[j]] = [outcomesArr[j], outcomesArr[i]];
            }
            setOutcomes(outcomesArr);
        };
        generateRandomOutcomes();
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-purple-600 to-indigo-600">
            <h1 className="text-4xl font-bold mb-8 text-white">Máquina Tragamonedas</h1>
            <div className="bg-white rounded-lg shadow-2xl p-8 mb-8">
                <div className="flex justify-center mb-6 space-x-4">
                    {reels.map((reel, index) => (
                        <div key={index} className="w-24 h-72 bg-yellow-200 rounded-lg overflow-hidden relative">
                            <div
                                className="absolute top-0 left-0 w-full transition-transform duration-100 ease-linear flex flex-col items-center justify-center text-4xl"
                                style={{ transform: `translateY(-${offsets[index]}%)` }} // Aplicar desplazamiento
                            >
                                {reel.concat(reel.slice(0, 3)).map((symbol, symbolIndex) => (
                                    <div key={symbolIndex} className="h-24 flex items-center justify-center">
                                        {symbol}
                                    </div>
                                ))}
                            </div>
                            {/* Agregar otra capa para la segunda fila de símbolos */}
                            {/*    <div className={`absolute top-1/3 left-0 w-full bg-yellow-200 flex flex-col items-center`}>
                                {secondRowSymbols[index] && (
                                    <div className="h-24 flex items-center justify-center text-4xl">
                                        {secondRowSymbols[index]}
                                    </div>
                                )}
                            </div> */}
                        </div>
                    ))}
                </div>
                <button
                    onClick={spin}
                    disabled={spinning || attempts >= 3 || won}
                    className={`w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full transition duration-300 ${(spinning || attempts >= 3 || won) && 'opacity-50 cursor-not-allowed'}`}
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
        </div>
    );
}
