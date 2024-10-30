import React, { useEffect } from 'react';
import './StarrySky.css'; // Assuming you put the CSS in a separate file

// Define the props interface
interface StarrySkyProps {
  // Add any additional props you may need here
}

// Use React.PropsWithChildren to allow children to be passed
export function StarrySky({ children }: React.PropsWithChildren<StarrySkyProps>) {
    useEffect(() => {
        createStars();
    }, []);

    const createStars = () => {
        const sky = document.querySelector('.sky') as HTMLElement;
        for (let i = 0; i < 50; i++) {
            const star = document.createElement('div');
            star.className = 'bright-star';
            star.style.top = Math.random() * 100 + '%';
            star.style.left = Math.random() * 100 + '%';
            star.style.animationDelay = Math.random() * 4 + 's';
            sky.appendChild(star);
        }
    };

    return (
        <div className="sky">
            <div className="stars">
                {/* Static bright stars, these could also be generated dynamically if needed */}
                <div className="bright-star"></div>
                <div className="bright-star"></div>
                <div className="bright-star"></div>
                <div className="bright-star"></div>
                <div className="bright-star"></div>
            </div>
            <div className="content">
                {/* Render children inside the content div */}
                {children}
            </div>
        </div>
    );
};
