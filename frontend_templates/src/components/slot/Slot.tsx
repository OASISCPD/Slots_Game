import { useEffect, useRef, useState } from "react";
import { dto_prizes_get } from "../../data/data";
import { getIndexPrize, getPrizeDescriptions/* , separatePrize */ } from "../../logic/convertValues";
import { ModalLogic } from ".././logic/ModalLogic";
import { ModalGetPrize } from ".././mod/ModalGetPrize";

interface propSlot {
    prizes: dto_prizes_get[]
    changedTemplate: () => void
}

export function Slot({ prizes, changedTemplate }: propSlot) {
    
    const [clicksLeft, setClicksLeft] = useState(3);
    const [outcomes, setOutcomes] = useState<boolean[]>([]);
    const [hasWinner, setHasWinner] = useState<boolean>(false);
    const iframeRef = useRef<HTMLIFrameElement>(null);
    const [spinningInCourse, setSpinningInCourse] = useState<boolean>(false); // Nuevo estado para controlar el giro
    const [prizesSet, setPrizesSet] = useState<boolean>(false); // Estado para controlar la configuración de premios
    console.log(prizesSet)
    //boleano que activa el modal del premio
    const [modalPrize, setModalPrize] = useState<boolean>(false)
    //nombre del premio
    const [namePrize, setNamePrize] = useState<string>('')
    //variable que almacena el premio ganador
    const [prizeWinning, setPrizeWinning] = useState<string>('')
    const handleReactButtonClick = () => {
        console.log('boton')
        if (iframeRef.current) {
            // Envía un mensaje al iframe para que ejecute la función spinReels
            iframeRef.current.contentWindow?.postMessage({ type: 'SPIN' }, '*');
        }
    };

    //agrega el tipo de data que deberia llegar del fetch
    useEffect(() => {
        if (prizes.length === 0) return; // Salir si no hay premios

        console.log('Premios', prizes);
        /*       const convertData = separatePrize(prizes); */
        const convertDataV2 = getPrizeDescriptions(prizes);
        /*  const id = getIdPrize(prizes); */
        const index = getIndexPrize(prizes)
        console.log(index)
        console.log('id del premio ganador', index[0]);
        const setPrizesWithDelay = () => {
            if (iframeRef.current) {
                setTimeout(() => {
                    iframeRef.current?.contentWindow?.postMessage({
                        type: 'SET_PRIZES',
                        prizes: convertDataV2
                    }, '*');
                    setPrizesSet(true);
                }, 100);
            }
            if (iframeRef.current) {
                setTimeout(() => {
                    iframeRef.current?.contentWindow?.postMessage({
                        type: 'SET_PRIZE_INDEX',
                        index: index[0]
                    }, '*');
                }, 100);
            }
        };
        setPrizesWithDelay();
        console.log('los premios debieron de cambiar ------------->',prizes)
    }, [prizes]); // Asegúrate de que prizes sea una dependencia


    useEffect(() => {
        const handleMessage = (event: any) => {
            if (event.data.type === "UPDATE_STATE") {
                const { clicksLeft, outcomes, hasWinner, spinningInCourse, name_prize } = event.data.data;
                console.log('EVENTO CON LOS VALORES Q NECESITO', event.data.data)
                setClicksLeft(clicksLeft);
                setOutcomes(outcomes);
                setHasWinner(hasWinner);
                setSpinningInCourse(spinningInCourse); // Actualizar el estado del giro en curso
                setNamePrize(name_prize);
            }
            if (event.data.type === 'WIN') {
                /*   alert(event.data.message); */
                console.log('premio ganador ----->', event.data.message)
                setPrizeWinning(event.data.message)
                /* window.location.reload() */
            }
        };

        window.addEventListener('message', handleMessage);
        return () => {
            window.removeEventListener('message', handleMessage);
        };
    }, []);

    //cuando la variable cambie su valor se disparara una funcion
    useEffect(() => {
        if (prizeWinning !== '') {
            setModalPrize(true)
            /* alert(prizeWinning) */
            console.log('salio el premio ganador')
        }
    }, [prizeWinning])

    useEffect(() => {
        console.log(spinningInCourse, clicksLeft, outcomes, hasWinner, namePrize)//printea el booleano con el estado en el momento
    }, [spinningInCourse, clicksLeft, outcomes, hasWinner, namePrize])



    return (
        <div className="flex flex-col justify-center font-extrabold items-center gap-4">
            <iframe
                ref={iframeRef}
                src="/assets/slot.html"
                frameBorder="0"
                width="100%"
                height="350px"
            ></iframe>
            <button disabled={hasWinner || spinningInCourse} className={`${hasWinner ? 'bg-slate-400' : 'bg-black'}  ${spinningInCourse ? "bg-opacity-50" : ""} text-white rounded-md border-zinc-500 border-2 shadow-xl p-1  max-w-xs w-full ${spinningInCourse ? 'cursor-not-allowed' : 'cursor-pointer'}  `} onClick={handleReactButtonClick}>
                {hasWinner ? 'Haz ganado' : ' Girar'}
            </button>
            {prizeWinning !== '' && (
                <h1 className="text-black">PREMIO: {prizeWinning}</h1>
            )}
            {modalPrize && (
                <ModalLogic isOpen={true} onClose={() => setModalPrize(false)}>
                    <ModalGetPrize onClose={() => setModalPrize(false)} onCloseOk={() => { setModalPrize(false), changedTemplate() }} prize={prizeWinning} />
                </ModalLogic>
            )}
        </div>
    );
}
