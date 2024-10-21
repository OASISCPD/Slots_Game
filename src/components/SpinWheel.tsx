import { useEffect, useState } from 'react';
import '../styles/style.css'
import image from '/images/logoRoulette.png'
import { baseUrl } from '../logic/credentials';
import { Modal } from './mod/Modal';
import { ModalOk } from './mod/ModalOk';
import { ModalError } from './mod/ModalError';
import { useNavigate } from 'react-router-dom';
import { fetchMailEnviado } from '../logic/mail';
import { codeCampaign } from '../content/Variables';
interface Prize {
    name: string;
    color: string;
    index: number;
}

interface PrizeWinningDTO {
    premio: string
    status_code: number
}
interface GetPrize {
    premio: string
    status_code: number

}

interface modalValues {
    boolean: boolean
    number: number
}

interface dtoModal {
    title: string
    subTitle: string
}

// Array de colores fijos en formato hexadecimal
/* const fixedColors: string[] = ['#FF0000', '#FF00FF', '#00FF00', '#5CC1FF', '#5D0057', '#FFA500', '#FFFF00']; */
const fixedColors: string[] = ['#FFFF00', '#5CC1FF', '#FF00FF', '#00FF00', '#FF0000', '#FF5400', '#5D0057'];
// Función para mezclar un array de forma aleatoria
function shuffleArray(array: string[]): string[] {
    // Copiar el array original para no modificarlo
    let shuffledArray = array.slice();
    let currentIndex = shuffledArray.length;
    let temporaryValue: string;
    let randomIndex: number;

    // Mientras haya elementos para mezclar
    while (currentIndex !== 0) {
        // Elegir un índice aleatorio
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // Intercambiar el elemento en el índice actual con el elemento en el índice aleatorio
        temporaryValue = shuffledArray[currentIndex];
        shuffledArray[currentIndex] = shuffledArray[randomIndex];
        shuffledArray[randomIndex] = temporaryValue;
    }

    return shuffledArray;
}

// Ejemplo de uso
const shuffledColors = shuffleArray(fixedColors);

interface propFather {
    confetti: (prize: string) => void
}

export function SpinWheel({ confetti }: propFather) {
    //navigate
    const navigate = useNavigate()
    // Inicializamos el estado para el premio
    const [prizeWinning, setPrizeWinning] = useState<PrizeWinningDTO>({
        premio: '',
        status_code: 0,
    })
    //modal que aparecera en cada caso
    const [modal, setModal] = useState<modalValues | null>(null)
    //mensaje que respondera el modal
    const [dataModal, setDataModal] = useState<dtoModal | null>(null)
    //email que tomara en caso de que ya haya jugado
    const [email, setEmail] = useState<string | undefined>()
    //loading
    const [loading, setLoading] = useState<boolean>(false)
    // Premios y estado de rotación
    const [getPrize, setGetPrize] = useState<boolean>(false)
    //premio ganador, que viene del fetch 
    /* const [prize, setPrize] = useState<boolean>(false) */
    const [prizes, setPrizes] = useState<Prize[]>([]);
    const [rotation, setRotation] = useState<number>(0);
    const [spinning, setSpinning] = useState<boolean>(false);
    //parpadeo
    const [borderColor, setBorderColor] = useState('#F4F5FA'); // Estado para el color del borde
    const [backgroundColor, setBackgroundColor] = useState('#ffffff')//estado para el bacground del spinn

    const spinWheel = () => {
        if (spinning) return; // Evita girar si ya está girando
        if (getPrize) {
            /*  confetti() */
            return
        }
        setSpinning(true);

        // Determinar el índice del premio que queremos mostrar (último premio en la lista)
        const prizeIndex = prizes.findIndex(prize => prize.name === prizeWinning.premio)

        if (prizeIndex === -1) {
            console.error('El premio ganador no se encuentra en la lista de premios.');
            setSpinning(false);
            return;
        }
        // Cada premio ocupa un segmento del tamaño igual en grados
        const wheelSize = 360 / prizes.length;
        const completeRotations = 5
        // Calcular el ángulo necesario para que el premio deseado quede en la parte superior
        /*  const degreesToRotate = 360 * 5 + (360 - (wheelSize * prizeIndex)); */
        const degreesToRotate = completeRotations * 360 + (410 - (prizeIndex * wheelSize))
        // Calcular el ángulo final de la rueda
      /*   const finalRotation = degreesToRotate  *//* - (wheelSize / 2) */;

        /*   const winningPrizeIndex = (prizes.length - Math.floor((finalRotation % 360) / wheelSize)) % prizes.length;
          console.log(winningPrizeIndex) */
        // Establecer la rotación final
        setRotation(degreesToRotate);
        //rotacion
        /* setRotation(degreesToRotate - (wheelSize / 2)); */
        /*     setPrizes(prizes.map((prize, index) =>
                index === prizeIndex ? { ...prize, color: 'black' } : prize
            )); */
        setTimeout(() => {
            setSpinning(false); // Permite volver a girar después de la animación
            // Aquí puedes manejar la lógica para mostrar el premio ganador si no quieres recargar la página
            setGetPrize(true)
            // Cambiar el color del premio ganador a negro
            setPrizes(prizes.map((prize, index) =>
                index === prizeIndex ? { ...prize, color: '#03022A' } : prize
            ));
            /* startBlinking(prizeIndex) */
            // Llama a la función con los colores y el tiempo deseado para parpadear
            startBackgroundBlinking('#ffffff', '#FEDC56', 12, 500); // Alterna entre blanco y amarillo
            startBorderBlinking('black', 'yellow')
            confetti(prizes[prizeIndex].name)
        }, 5200); // 5 segundos, que es el tiempo de rotación de la animación
        /*  console.log('saliendo') */

    };
    // Función para iniciar el parpadeo del borde de la ruleta
    const startBorderBlinking = (color1 = 'F4F5FA', color2 = 'yellow') => {
        let blinkCount = 0;
        const maxBlinks = 12; // Número de parpadeos
        const blinkInterval = setInterval(() => {
            setBorderColor(prevColor => (prevColor === color1 ? color2 : color1)); // Alternar entre color1 y color2
            blinkCount++;
            if (blinkCount >= maxBlinks) {
                clearInterval(blinkInterval); // Detener parpadeo después de `maxBlinks`
                setBorderColor(color1); // Restablecer el borde al color original (color1)
            }
        }, 500); // Cambia de color cada 500ms
    };
    const startBackgroundBlinking = (color1 = '#ffffff', color2 = '#ff0000', duration = 12, intervalTime = 500) => {
        let blinkCount = 0;
        const blinkInterval = setInterval(() => {
            setBackgroundColor(prevColor => (prevColor === color1 ? color2 : color1)); // Alternar entre color1 y color2
            blinkCount++;
            if (blinkCount >= duration) {
                clearInterval(blinkInterval); // Detener el parpadeo después de `duration` ciclos
                setBackgroundColor(color1); // Restablecer el color de fondo al color inicial (color1)
            }
        }, intervalTime); // Cambia de color cada `intervalTime` milisegundos
    };
    // Llamar a esta función cuando quieras que comience a parpadear el borde
    /* startBorderBlinking(); */

    const getNumberStyles = (index: number, color: string, totalPrizes: number) => ({
        '--i': index,
        '--clr': color,
        '--totalPrizes': totalPrizes, // Añade la variable totalPrizes aquí
        'transform': `rotate(${(index - 1) * (360 / totalPrizes)}deg)`,
        'clip-path': `polygon(0 0, ${70 / (totalPrizes / 5)}% 0, 100% 100%, 0 ${100 / (totalPrizes / 5)}%)`
    } as React.CSSProperties);

    async function initPrizes() {
        try {
            const numPremios = 7; // Ejemplo de número de premios

            // Función para obtener un color fijo basado en el índice
            const getColorByIndex = (index: number) => {
                return shuffledColors[index % shuffledColors.length];
            };

            const premios = Array.from({ length: numPremios }, (_, index) => ({
                name: index === numPremios - 1 ? prizeWinning.premio : '',
                color: getColorByIndex(index),
                index: index + 1
            }));
            setPrizes(premios);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    async function getData() {
        setLoading(true)
        try {
            const result = await fetch(`${baseUrl}/obtener_premio?codigo_campana=${codeCampaign}`)
            const data: GetPrize = await result.json()
            switch (data.status_code) {
                case 401:
                    const email = await fetchMailEnviado();
                    if (email) {
                        setEmail(email)
                        setModal({ boolean: true, number: 401 })
                        setDataModal({ title: 'El premio ya fue enviado', subTitle: 'Checkeá  tu casilla de mail y busca Promociones Oasis Pilar.' })
                    }
                    break
                case 402:
                    setPrizeWinning({ premio: data.premio, status_code: data.status_code })
                    break
                case 403:
                    setModal({ boolean: true, number: 403 })
                    setDataModal({ title: '¡Estamos mejorando nuestra plataforma para ofrecerte la mejor experiencia posible!', subTitle: 'Estaremos de vuelta pronto' })
                    break;
                case 404:
                    setModal({ boolean: true, number: 404 })
                    setDataModal({ title: '¡Estamos mejorando nuestra plataforma para ofrecerte la mejor experiencia posible!', subTitle: 'Estaremos de vuelta pronto' })
                    break;
                case 200:
                    setPrizeWinning({ premio: data.premio, status_code: data.status_code })
                    break
                default:
                    console.error('Error desconocido')
                    setModal({ boolean: true, number: 500 })
                    setDataModal({ title: '¡Ocurrio un error desconocido!', subTitle: 'Estaremos de vuelta pronto' })
                    break;
            }
            return data
        } catch (error) {
            console.error("ERROR", error)
            setModal({ boolean: true, number: 500 })
            setDataModal({ title: '¡Ocurrio un error desconocido!', subTitle: 'Estaremos de vuelta pronto' })
            initPrizes()
        } finally {
            setLoading(false)
            /*  initPrizes() */
        }
    }
    useEffect(() => {
        getData()
    }, []);

    useEffect(() => {
        // Ejecuta initPrizes solo cuando prizeWinning haya sido actualizado con un valor válido
        if (prizeWinning.premio) {
            initPrizes();
        }
    }, [prizeWinning]);

    useEffect(() => {
        const iconContainers = document.querySelectorAll('.icon-container') as NodeListOf<HTMLElement>;
        iconContainers.forEach((icon) => {
            const rotationAngle = -50; // Define el ángulo deseado
            icon.style.transform = `rotate(${rotationAngle}deg)`;
        });
    }, [prizes]); // Ejecuta este efecto cuando cambien los premios (prizes)

    return (
        <div>
            {loading ? (
                <div className="fixed top-0 left-0 w-full h-full bg-gray-900 opacity-75 flex justify-center items-center z-50">
                    <div className="flex justify-center items-center h-screen">
                        <div className="rounded-full h-20 w-20 bg-red-800 animate-ping"></div>
                    </div>
                </div>
            ) : (
                <div className="container">
                    <svg width="0" height="0">
                        <defs>
                            <linearGradient id="gradiente" x1="100%" y1="0%" x2="0%" y2="100%">
                                <stop offset="0%" style={{ stopColor: "#FF0000", stopOpacity: 1 }} />
                                <stop offset="100%" style={{ stopColor: "#8B00FF", stopOpacity: 1 }} />
                            </linearGradient>
                        </defs>
                    </svg>
                    <div className="spinBtn " onClick={spinWheel}>
                        GIRAR
                    </div>
                    {/* Render Confetti when getPrize is true */}
                    {/* {getPrize && <Confetti />} */}
                    <div className="wheel" style={{
                        transform: `rotate(${rotation}deg)`, background: backgroundColor, boxShadow: `0 0 0 2px ${borderColor}, 0 0 0 8px #ffffff`
                    } as React.CSSProperties} >
                        {prizes.map(prize => (
                            <div
                                key={prize.index}
                                className="number"
                                style={{
                                    ...getNumberStyles(prize.index, prize.color, prizes.length),
                                }} // Pass the total number of prizes
                            >
                                {prize.name !== '' ? (
                                    <span className='icon-container' style={{
                                        // Aplica la rotación solo al texto (name) del premio
                                        transform: `rotate(-42deg)`, // Cambia este valor para probar
                                    }}>
                                        {!getPrize ? (
                                            <div>
                                                {/* <FaQuestion style={{ fill: "url(#gradiente)" }} /> */}
                                                <img src={image} alt="" className='w-[2.5rem]' />
                                            </div>
                                        ) : (
                                            <h1 className='relative mb-[3rem] text-sm uppercase  text-white'>
                                                !Ganaste¡
                                                <br />
                                                <p className='text-[70%] sm:text-[100%] lg:text-base  mx-auto absolute left-2.5'>{prize.name}</p>
                                            </h1>
                                        )}
                                    </span>
                                ) : (
                                    <span className='icon-container' style={{
                                        // Aplica la rotación solo al texto (name) del premio
                                        transform: `rotate(-42deg)`, // Cambia este valor para probar
                                    }}>
                                        {/* <FaQuestion style={{ fill: "url(#gradiente)" }} /> */}
                                        <img src={image} alt="" className='w-[2.5rem]' />
                                        {prize.name}
                                    </span>
                                )}

                            </div>
                        ))}
                    </div>
                </div >
            )}
            {/* MODALS */}
            {modal?.boolean && modal.number === 401 && (
                <Modal isOpen={true} onClose={() => setModal({ boolean: false, number: 401 })}>
                    <ModalOk email={email} onClose={() => { setModal({ boolean: false, number: 401 }), navigate('/howToGet') }} title={dataModal?.title} subTitle={dataModal?.subTitle} />
                </Modal>
            )}
            {modal?.boolean && modal.number === 403 && (
                <Modal isOpen={true} onClose={() => setModal({ boolean: false, number: 403 })}>
                    <ModalError buttonText='Continuar' onClose={() => { setModal({ boolean: false, number: 403 }), navigate('/howToGet') }} title={dataModal?.title} subTitle={dataModal?.subTitle} />
                </Modal>
            )}
            {modal?.boolean && modal.number === 404 && (
                <Modal isOpen={true} onClose={() => setModal({ boolean: false, number: 403 })}>
                    <ModalError buttonText='Continuar' onClose={() => { setModal({ boolean: false, number: 403 }), navigate('/howToGet') }} title={dataModal?.title} subTitle={dataModal?.subTitle} />
                </Modal>
            )}
            {modal?.boolean && modal.number === 500 && (
                <Modal isOpen={true} onClose={() => setModal({ boolean: false, number: 500 })}>
                    <ModalError buttonText='Continuar' onClose={() => { setModal({ boolean: false, number: 500 }), navigate('/howToGet') }} title={dataModal?.title} subTitle={dataModal?.subTitle} />
                </Modal>
            )}
        </div>
    );
}
