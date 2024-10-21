// SlotsGame.tsx

import React, { useState } from 'react';

// Define the symbols for the slot machine
const symbols = ['🍒', '🍋', '🍊', '🍇', '🔔', '💎'];

export function SlotsGame() {
    // Define state variables
    const [reels, setReels] = useState<string[][]>([
        [symbols[0], symbols[0], symbols[0]],
        [symbols[0], symbols[0], symbols[0]],
        [symbols[0], symbols[0], symbols[0]],
    ]);
    const [message, setMessage] = useState<string>('');
    const [spinning, setSpinning] = useState<boolean>(false);

    // Function to spin the reels
    const spinReels = () => {
        if (spinning) return;

        setSpinning(true);
        setMessage('Spinning...');

        // Generate new random reels
        const newReels = reels.map(() =>
            Array(3).fill(null).map(() => symbols[Math.floor(Math.random() * symbols.length)])
        );

        // Simulate the spinning animation
        let count = 0;
        const spinInterval = setInterval(() => {
            setReels(reels.map(() =>
                Array(3).fill(null).map(() => symbols[Math.floor(Math.random() * symbols.length)])));
            count++;
            if (count >= 10) {
                clearInterval(spinInterval);
                setReels(newReels);
                checkWin(newReels);
                setSpinning(false);
            }
        }, 100);
    };

    // Function to check if the user wins
    const checkWin = (finalReels: string[][]) => {
        const middleRow = finalReels.map(reel => reel[1]);
        const isWin = middleRow.every(symbol => symbol === middleRow[0]);
        setMessage(isWin ? 'You Win!' : 'Try Again!');
    };

    // Function to set the reels to a winning combination with animation
    const setWinningCombination = () => {
        if (spinning) return; // No action if already spinning

        setSpinning(true);
        setMessage('Gaining...');

        // Simulate the spinning animation for winning
        let count = 0;
        const spinInterval = setInterval(() => {
            setReels(reels.map(() =>
                Array(3).fill(null).map(() => symbols[Math.floor(Math.random() * symbols.length)])));
            count++;
            if (count >= 10) {
                clearInterval(spinInterval);

                // Set a winning combination
                const winningSymbol = symbols[Math.floor(Math.random() * symbols.length)];
                const winningReels = [
                    [winningSymbol, winningSymbol, winningSymbol],
                    [winningSymbol, winningSymbol, winningSymbol],
                    [winningSymbol, winningSymbol, winningSymbol],
                ];
                setReels(winningReels);
                setMessage('You Win! (Guaranteed!)');
                setSpinning(false);
            }
        }, 100);
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-200">
            <div className="bg-gray-800 rounded-lg p-5 shadow-lg">
                <div className="flex justify-around mb-5">
                    {reels.map((reel, i) => (
                        <div
                            key={i}
                            className="w-20 h-32 bg-white border-2 border-yellow-400 rounded-lg flex items-center justify-center text-5xl"
                        >
                            {reel[1]}
                        </div>
                    ))}
                </div>
                <div className="flex justify-around mb-5">
                    {reels.map((reel, i) => (
                        <div
                            key={i}
                            className="w-20 h-32 bg-white border-2 border-yellow-400 rounded-lg flex items-center justify-center text-5xl"
                        >
                            {reel[1]}
                        </div>
                    ))}
                </div>
                <button
                    onClick={spinReels}
                    disabled={spinning}
                    className={`bg-green-500 text-white py-3 px-6 rounded transition duration-300 
                    ${spinning ? 'cursor-not-allowed opacity-50' : 'hover:bg-green-600'}`}
                >
                    {spinning ? 'Spinning...' : 'Spin'}
                </button>
                <button
                    onClick={setWinningCombination}
                    disabled={spinning}
                    className={`mt-3 bg-blue-500 text-white py-2 px-4 rounded transition duration-300 
                    ${spinning ? 'cursor-not-allowed opacity-50' : 'hover:bg-blue-600'}`}
                >
                    Ganar
                </button>
                <div className="mt-5 text-xl font-bold text-white text-center">{message}</div>
            </div>
        </div>
    );
}
