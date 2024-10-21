import React, { useEffect } from 'react';
import '../../public/assets/index.css';


export function SlotHTML() {
    useEffect(() => {
        const script = document.createElement('script');
        script.src = '/assets/index.js'; // Cambia aquí a la ruta correcta
        script.async = true;

        // Asegúrate de no agregar el script si ya está presente
        if (!document.querySelector(`script[src="${script.src}"]`)) {
            document.body.appendChild(script);
        }

        return () => {
            // Limpiar el script si es necesario
            const existingScript = document.querySelector(`script[src="${script.src}"]`);
            if (existingScript) {
                document.body.removeChild(existingScript);
            }
        };
    }, []);

    return (
        <div>
            <iframe src="/assets/slot.html" frameBorder="0" width="100%" height="350px"></iframe>

            {/*   <div className="slots">
                <div className="reel"></div>
                <div className="reel"></div>
                <div className="reel"></div>
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
                    boxShadow: '0 0 0 0 rgba(255, 255, 255, 0)',
                    transition: 'box-shadow 0.2s ease-in-out',
                }}
                id="spinButton"
                onFocus={(e) => (e.currentTarget.style.boxShadow = '0 0 0 4px rgba(252, 165, 165, 0.5)')}
                onBlur={(e) => (e.currentTarget.style.boxShadow = '0 0 0 0 rgba(255, 255, 255, 0)')}
            >
                Girar
            </button> */}
        </div>
    );
}
