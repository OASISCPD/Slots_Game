import { useEffect, useState } from "react";

export function Slot() {
    //constante que almacenan los valores del dom manejado con html
    const [clicksLeft, setClicksLeft] = useState(3);
    const [outcomes, setOutcomes] = useState<boolean[]>([]);
    const [hasWinner, setHasWinner] = useState<boolean>(false)
    useEffect(() => {
        // Escuchar el evento "message" del iframe
        const handleMessage = (event: any) => {
            //escuchar axtualizaciones del iframe
            if (event.data.type === "UPDATE_STATE") {
                const { clicksLeft, outcomes, hasWinner } = event.data.data;
                setClicksLeft(clicksLeft);
                setOutcomes(outcomes);
                setHasWinner(hasWinner)
            }
            // Verificar el origen del mensaje si es necesario (event.origin)
            if (event.data.type === 'WIN') {
                console.log('Message from iframe:', event.data.message);
                // Puedes manejar aquí lo que sucede en React cuando se recibe un "WIN"
                alert(event.data.message); // Muestra una alerta, o puedes manejar el estado
            }
        };
        // Agregar el event listener
        window.addEventListener('message', handleMessage);

        // Limpiar el event listener al desmontar el componente
        return () => {
            window.removeEventListener('message', handleMessage);
        };
    }, []);

    return (
        <div className="flex flex-col justify-center items-center gap-4 bg-black min-h-[100dvh]">
            <div className="text-white">
                {/* Mostrar los valores que provienen del iframe */}
                <p>Clicks Left: {clicksLeft}</p>
                <p>Has Winner: {hasWinner ? "Yes" : "No"}</p>
                <p>Outcomes: {outcomes.join(", ")}</p>
            </div>
            <iframe src="/assets/slot.html" frameBorder="0" width="100%" height="350px"></iframe>
        </div>
    )
}