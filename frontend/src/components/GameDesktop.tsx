import { useEffect, useRef, useState } from "react";
import { /* dto_prizes_get, */ dto_prizes_get } from '../data/data'
import { getIndexPrize } from "../logic/convertValues";
//imagen que funciona como button
const imageButton = `/images/${domain.toLowerCase()}/spinButton.png`
//importando image
const imageBorder = `/images/${domain.toLowerCase()}/testDesktop.png`;

//desktop
import { useMediaQuery } from "react-responsive";
import { domain } from "../content/content";
interface propSlot {
    prizes: dto_prizes_get[]
    getPrize: () => void
    setClicks: React.Dispatch<React.SetStateAction<number>>;
}
const slotSound = new Audio('/sounds/sonidoSlot5s.mp3')
//configuramos el sonido a salir 
slotSound.volume = 0.2; // 20% del volumen

export function GameDesktop({ prizes, getPrize, setClicks }: propSlot) {
    // Define las resoluciones
    const isDesktop = useMediaQuery({ query: '(min-width: 1024px)' });
    // Estado para manejar la clase de escala
    const [scaleClass, setScaleClass] = useState("scale-100");

    const iframeRef = useRef<HTMLIFrameElement>(null);
    const [indexWin, setIndexWin] = useState<number>()
    const [isClicked, setIsClicked] = useState<boolean>(false)
    //constante que maneja el win en el game
    const [win, setWin] = useState<boolean>(false)

    const handleReactButtonClick = () => {
        if (iframeRef.current) {
            slotSound.play().catch(error => {
                console.error('Error al reproducir el sonido:', error)
            })
            // Envía un mensaje al iframe para que ejecute la función spinReels
            iframeRef.current.contentWindow?.postMessage({ type: 'SPIN', data: indexWin }, '*');
        }
    };

    function initPrizes() {
        if (prizes.length === 0) return; // Salir si no hay premios
        console.log('Premios', prizes);
        const newIndex = getIndexPrize(prizes)
        console.log('valor del index', newIndex[0])
        if (newIndex[0] === undefined || newIndex[0] === null) {
            console.log('por alguna razon no hay id ganador ')
            //aca deberia tirar un error y no permitirme jugar
        }
        setIndexWin(newIndex[0])
    }

    useEffect(() => {
        const handleMessage = (event: any) => {
            // Manejo de mensajes aquí
            if (event.data.type === "UPDATE_STATE") {
                console.log('ALGO?', event.data.data)
                console.log('ALGO?', event.data.data.clicksLeft)
                // Actualizar el estado de clicks en el componente padre
                setClicks(event.data.data.clicksLeft);
            }
            if (event.data.type === 'WIN') {
                /* alert(event.data.message); */
                /* window.location.reload() */
                setWin(true)
            }
            if (event.data.type === "UPDATE_BOOLEAN") {
                console.log('ALGO?', event.data.boolean)
                setIsClicked(event.data.boolean.isClicked)
            }
        };

        const handleIframeLoad = () => {
            // El iframe está completamente cargado
            /* console.log('cargado') */
            initPrizes()

        };

        const iframe = iframeRef.current;
        if (iframe) {
            iframe.addEventListener('load', handleIframeLoad);
        }

        window.addEventListener('message', handleMessage);
        return () => {
            if (iframe) {
                iframe.removeEventListener('load', handleIframeLoad);
            }
            window.removeEventListener('message', handleMessage);
        };
    }, []);

    useEffect(() => {
        console.log('BOLEANO CAMBIANDO', isClicked)
    }, [isClicked])

    useEffect(() => {
        console.log('BOLEANO CAMBIANDO si gano o no', win)
        if (win) {
            getPrize()
        }
    }, [win])

    // Lógica de front del botón
    useEffect(() => {
        // Si el botón no está "clicked", configura el intervalo para cambiar la escala
        if (!isClicked) {
            const interval = setInterval(() => {
                setScaleClass((prev) => (prev === "scale-100" ? "scale-125" : "scale-100"));
            }, 1000); // Cambia cada 1 segundo (ajusta si necesitas más tiempo)

            // Limpia el intervalo al desmontar o si cambia el estado de `isClicked`
            return () => clearInterval(interval);
        } else {
            // Detener la escala si el botón está "clicked"
            setScaleClass("scale-100");
        }
    }, [isClicked]);

    return (
        <div>
            <div className="flex flex-col w-full -mt-[4rem] ">
                {/* ESTO DEBERIA CAMBIAR PARA CADA RESOLUCION */}
                {isDesktop && (
                    <div className="relative ">
                        {win ? (
                            <img src={imageBorder} alt="Fondo" className={`${domain === "SALTA" ? 'w-[40rem]' : 'w-[46rem]'}  h-full opacity-0   mx-auto object-cover relative z-10`} />

                        ) : (
                            <img src={imageBorder} alt="Fondo" className={`${domain === "SALTA" ? 'w-[40rem]' : 'w-[46rem]'}  h-full opacity-0   mx-auto object-cover relative z-10`} />
                        )}
                        <div className={`absolute inset-0  mx-auto   flex items-center justify-center z-0 ${domain === "SALTA" ? 'mt-[1dvh]' : ''}`}>
                            <iframe
                                ref={iframeRef}
                                src="/core/index.html"
                                frameBorder="0"
                                width="100%"
                                height="400px"
                            ></iframe>
                        </div>
                    </div>
                )}
                <button id="btnSpin" className={`mx-auto ${domain.toLowerCase() !== 'salta' ? "-mt-8" : "-mt-4"}`} disabled={isClicked} onClick={isClicked ? undefined : handleReactButtonClick}>
                    <img
                        src={imageButton}
                        alt="button"
                        className={`${domain.toUpperCase() === "SALTA" ? 'w-[8rem] sm:w-[10rem] lg:w-[10rem]' : 'w-[12rem] sm:w-[12rem] lg:w-[10rem] xl:w-[10rem]'} mx-auto transition-transform duration-1000 ${scaleClass}`} // Aplica la clase de escala
                    />
                </button>
            </div>
        </div>
    )
}