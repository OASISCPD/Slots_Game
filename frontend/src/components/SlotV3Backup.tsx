import React, { useState } from 'react';

// Definir los símbolos que usaremos en la máquina tragamonedas
const symbols: string[] = ["🍒", "🍋", "🍊", "🍇", "🍉", "🍓", "🍍", "🥝", "🍌"];

export function SlotV3() {
    const [reels, setReels] = React.useState([
        [...Array(20)].map(() => symbols[Math.floor(Math.random() * symbols.length)]),
        [...Array(20)].map(() => symbols[Math.floor(Math.random() * symbols.length)]),
        [...Array(20)].map(() => symbols[Math.floor(Math.random() * symbols.length)]
        )]);
    const [spinning, setSpinning] = React.useState(false);
    const [attempts, setAttempts] = React.useState(0);
    const [won, setWon] = React.useState(false);
    const [offsets, setOffsets] = React.useState([0, 0, 0]);

    const spinReel = (reelIndex: any, duration: number) => {
        return new Promise((resolve: any) => {
            const startTime = Date.now();
            const animate = () => {
                const elapsedTime = Date.now() - startTime;
                const progress = Math.min(elapsedTime / duration, 1);

                setOffsets(prevOffsets => {
                    const newOffsets = [...prevOffsets];
                    newOffsets[reelIndex] = (progress * 17 * 100) % 100;
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
        setAttempts(prev => prev + 1);

        const spinDurations = [3000, 3500, 4000];

        await Promise.all([
            spinReel(0, spinDurations[0]),
            spinReel(1, spinDurations[1]),
            spinReel(2, spinDurations[2]),
        ]);

        setSpinning(false);

        // Verificar si ha ganado
        const finalSymbols = reels.map((reel, i) => reel[Math.floor(offsets[i] / (100 / 20))]);
        const hasWon = finalSymbols.every(symbol => symbol === finalSymbols[0]);

        if (attempts === 2 && !won && !hasWon) {
            const winningSymbol = symbols[Math.floor(Math.random() * symbols.length)];
            setReels(reels.map(() => Array(20).fill(winningSymbol)));
            setOffsets([0, 0, 0]);
            setWon(true);
        } else if (hasWon || (Math.random() < 0.3 && attempts < 2)) {
            setWon(true);
        }
    };

    const reset = () => {
        setReels([
            [...Array(20)].map(() => symbols[Math.floor(Math.random() * symbols.length)]),
            [...Array(20)].map(() => symbols[Math.floor(Math.random() * symbols.length)]),
            [...Array(20)].map(() => symbols[Math.floor(Math.random() * symbols.length)])
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
                                className="absolute top-0 left-0 w-full transition-transform duration-100 ease-linear flex flex-col items-center justify-center text-6xl"
                                style={{ transform: `translateY(-${offsets[index]}%)` }}
                            >
                                {reel.concat(reel.slice(0, 3)).map((symbol, symbolIndex) => (
                                    <div key={symbolIndex} className="h-24 flex items-center justify-center">
                                        {symbol}
                                    </div>
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
};