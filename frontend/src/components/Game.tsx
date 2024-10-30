import { useEffect, useRef, useState } from "react";
import { /* dto_prizes_get, */ dto_prizes_get } from '../data/data'
import { getIndexPrize } from "../logic/convertValues";
//imagen que funciona como button
import imageButton from '/images/spinButton.png'
//importando image
import image from '/images/test.png'
import imageTablet from '/images/testTablet.png'
/* import imageWin from '/images/testWin.png' */
//desktop
import { useMediaQuery } from "react-responsive";
interface propSlot {
    prizes: dto_prizes_get[]
    getPrize: () => void
    setClicks: React.Dispatch<React.SetStateAction<number>>;
}

export function Game({ prizes, getPrize, setClicks }: propSlot) {
    //resoluciones

    // Define las resoluciones
    const isMobile = useMediaQuery({ query: '(max-width: 767px)' });
    const isTablet = useMediaQuery({ query: '(min-width: 768px) and (max-width: 1023px)' });
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
            <div className="flex flex-col w-full -mt-[2rem] ">
                {/* ESTO DEBERIA CAMBIAR PARA CADA RESOLUCION */}
                {isMobile && (
                    <div className="relative ">
                        {isMobile && (
                            <img src={image} alt="Fondo" className="w-[100%]  h-full   mx-auto object-cover relative z-10" />
                        )}
                        {isTablet && (
                            <img src={imageTablet} alt="Fondo" className="w-[100%]  h-full   mx-auto object-cover relative z-10" />
                        )}
                        <div className="absolute inset-0 pl-[0.5rem] mx-auto -mt-[1.5rem] flex items-center justify-center z-0">
                            <iframe
                                ref={iframeRef}
                                src="/core/index.html"
                                frameBorder="0"
                                width="100%"
                                height="350px"
                            ></iframe>
                        </div>
                    </div>
                )}
                {isTablet && (
                    <div className="relative ">
                        {win ? (
                            <img src={image} alt="Fondo" className="sm:w-[60%] h-full   mx-auto object-cover relative z-10" />

                        ) : (
                            <img src={image} alt="Fondo" className="sm:w-[60%]  h-full   mx-auto object-cover relative z-10" />
                        )}
                        <div className="absolute inset-0 pl-[0.5rem] mx-auto -mt-[1.8rem] flex items-center justify-center z-0">
                            <iframe
                                ref={iframeRef}
                                src="/core/index.html"
                                frameBorder="0"
                                width="100%"
                                height="350px"
                            ></iframe>
                        </div>
                    </div>
                )}
                {isDesktop && (
                    <div className="relative">

                    </div>
                )}
                <button id="btnSpin" className="mx-auto" disabled={isClicked} onClick={isClicked ? undefined : handleReactButtonClick}>
                    <img
                        src={imageButton}
                        alt="button"
                        className={`w-[12rem] sm:w-[12rem] lg:w-[10rem] xl:w-[10rem] mx-auto transition-transform duration-1000 ${scaleClass}`} // Aplica la clase de escala
                    />
                </button>
            </div>
        </div>
    )
}