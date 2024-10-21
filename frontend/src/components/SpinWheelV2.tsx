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
const soundSpinWheel = new Audio('/sounds/wheel-spinV4.mp3')

interface Prize {
    name: string;
    color: string;
    index: number;
}

interface PrizeWinningDTO {
    premio: string
    status_code: number
}
/* interface GetPrize {
    premio: string
    status_code: number
} */

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
console.log(shuffledColors);

interface propFather {
    confetti: (prize: string) => void
    fetchBoolean: boolean
}

export function SpinWheelV2({ confetti, fetchBoolean }: propFather) {
    const navigate = useNavigate();
    const [prizeWinning, setPrizeWinning] = useState<PrizeWinningDTO>({ premio: '', status_code: 0 });
    const [modal, setModal] = useState<modalValues | null>(null);
    const [dataModal, setDataModal] = useState<dtoModal | null>(null);
    const [email, setEmail] = useState<string | undefined>();
    const [loading, setLoading] = useState<boolean>(false);
    const [getPrize, setGetPrize] = useState<boolean>(false);
    const [prizes, setPrizes] = useState<Prize[]>([]);
    const [rotation, setRotation] = useState<number>(0);
    const [spinning, setSpinning] = useState<boolean>(false);
    const [borderColor, setBorderColor] = useState('#F4F5FA');
    const [backgroundColor, setBackgroundColor] = useState('#ffffff');

    const spinWheel = () => {
        if (spinning || getPrize) return;
        soundSpinWheel.play().catch(error => {
            console.error('Error al reproducir el sonido:', error);
        })
        setSpinning(true);
        const prizeIndex = prizes.findIndex(prize => prize.name === prizeWinning.premio);
        if (prizeIndex === -1) {
            console.error('El premio ganador no se encuentra en la lista de premios.');
            setSpinning(false);
            return;
        }
        const wheelSize = 360 / prizes.length;
        const degreesToRotate = 7 * 360 + (410 - (prizeIndex * wheelSize));

        setRotation(degreesToRotate);
        setTimeout(() => {
            setSpinning(false);
            setGetPrize(true);
            setPrizes(prizes.map((prize, index) =>
                index === prizeIndex ? { ...prize, color: '#03022A' } : prize
            ));
            startBackgroundBlinking('#ffffff', '#FEDC56', 12, 500);
            startBorderBlinking('black', 'yellow');
            confetti(prizes[prizeIndex].name);
        }, 5200);
    };

    const startBorderBlinking = (color1 = 'F4F5FA', color2 = 'yellow') => {
        let blinkCount = 0;
        const maxBlinks = 20;
        const blinkInterval = setInterval(() => {
            setBorderColor(prevColor => (prevColor === color1 ? color2 : color1));
            blinkCount++;
            if (blinkCount >= maxBlinks) {
                clearInterval(blinkInterval);
                setBorderColor(color1);
            }
        }, 500);
    };

    const startBackgroundBlinking = (color1 = '#ffffff', color2 = '#ff0000', duration = 20, intervalTime = 500) => {
        let blinkCount = 0;
        const blinkInterval = setInterval(() => {
            setBackgroundColor(prevColor => (prevColor === color1 ? color2 : color1));
            blinkCount++;
            if (blinkCount >= duration) {
                clearInterval(blinkInterval);
                setBackgroundColor(color1);
            }
        }, intervalTime);
    };

    const getNumberStyles = (index: number, color: string, totalPrizes: number) => ({
        '--i': index,
        '--clr': color,
        '--totalPrizes': totalPrizes,
        'transform': `rotate(${(index - 1) * (360 / totalPrizes)}deg)`,
        'clip-path': `polygon(0 0, ${70 / (totalPrizes / 5)}% 0, 100% 100%, 0 ${100 / (totalPrizes / 5)}%)`
    } as React.CSSProperties);

    async function initPrizes() {
        const numPremios = 7;
        const getColorByIndex = (index: number) => shuffledColors[index % shuffledColors.length];

        const premios = Array.from({ length: numPremios }, (_, index) => ({
            name: index === numPremios - 1 ? prizeWinning.premio : '',
            color: getColorByIndex(index),
            index: index + 1
        }));
        setPrizes(premios);
    }

    async function getData() {
        if (!fetchBoolean) return; // No hacer fetch si fetchBoolean es false
        setLoading(true);
        try {
            const result = await fetch(`${baseUrl}/obtener_premio?codigo_campana=${codeCampaign}`, {
                credentials: 'include' as RequestCredentials,
                mode: "cors" as RequestMode,
                redirect: 'follow' as RequestRedirect
            });
            const data: PrizeWinningDTO = await result.json();
            // Handle various status codes
            switch (data.status_code) {
                case 401:
                    const email = await fetchMailEnviado();
                    if (email) {
                        setEmail(email);
                        setModal({ boolean: true, number: 401 });
                        setDataModal({ title: 'El premio ya fue enviado', subTitle: 'Checkeá tu casilla de mail y buscá Promociones Oasis Pilar.' });
                    }
                    initPrizes();
                    break;
                case 402:
                    setPrizeWinning({ premio: data.premio, status_code: data.status_code });
                    break;
                case 403:
                case 404:
                case 500:
                    setModal({ boolean: true, number: data.status_code });
                    setDataModal({ title: '¡Estamos mejorando nuestra plataforma!', subTitle: 'Estaremos de vuelta pronto' });
                    break;
                case 200:
                    setPrizeWinning({ premio: data.premio, status_code: data.status_code });
                    break;
                default:
                    console.error('Error desconocido');
                    setModal({ boolean: true, number: 500 });
                    setDataModal({ title: '¡Ocurrio un error desconocido!', subTitle: 'Estaremos de vuelta pronto' });
                    break;
            }
        } catch (error) {
            console.error("ERROR", error);
            setModal({ boolean: true, number: 500 });
            setDataModal({ title: '¡Ocurrio un error desconocido!', subTitle: 'Estaremos de vuelta pronto' });
            initPrizes();
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getData();
    }, [fetchBoolean]);

    useEffect(() => {
        if (prizeWinning.premio) {
            initPrizes();
        }
    }, [prizeWinning]);

    return (
        <div>
            {loading || !fetchBoolean ? (
                <div>
                    <div className={`fixed top-0 left-0 w-full h-full bg-gray-900 ${fetchBoolean ? 'opacity-70' : 'opacity-20'} flex justify-center items-center z-40`}>
                        <div className="flex justify-center items-center h-screen">
                            <div className="rounded-full h-20 w-20 bg-red-800 animate-ping"></div>
                        </div>
                    </div>
                    <div className="container animate-pulse">
                        <svg width="0" height="0">
                            <defs>
                                <linearGradient id="gradiente" x1="100%" y1="0%" x2="0%" y2="100%">
                                    <stop offset="0%" style={{ stopColor: "#FF0000", stopOpacity: 1 }} />
                                    <stop offset="100%" style={{ stopColor: "#8B00FF", stopOpacity: 1 }} />
                                </linearGradient>
                            </defs>
                        </svg>
                        <div className="spinBtn" onClick={spinWheel}>
                            GIRAR
                        </div>
                        {/* Render Confetti when getPrize is true */}
                        {/* {getPrize && <Confetti />} */}
                        <div className="wheel" style={{
                            transform: `rotate(${rotation}deg)`,
                            background: backgroundColor,
                            boxShadow: `0 0 0 2px ${borderColor}, 0 0 0 8px #ffffff`
                        } as React.CSSProperties}>
                            {prizes.length === 0 ? (
                                // Hardcoded prizes while loading
                                Array.from({ length: 7 }, (_, index) => ({
                                    index: index + 1,
                                    name: ``,
                                    color: fixedColors[index % fixedColors.length],
                                })).map(prize => (
                                    <div
                                        key={prize.index}
                                        className="number"
                                        style={{
                                            ...getNumberStyles(prize.index, prize.color, 7), // Use 7 as total number of prizes
                                        }}
                                    >
                                        <span className='icon-container' style={{
                                            transform: `rotate(-50deg)`,
                                        }}>
                                            <img src={image} alt="" className='w-[2.5rem]' />
                                            {prize.name}
                                        </span>
                                    </div>
                                ))
                            ) : (
                                // Render actual prizes
                                prizes.map(prize => (
                                    <div
                                        key={prize.index}
                                        className="number"
                                        style={{
                                            ...getNumberStyles(prize.index, prize.color, prizes.length),
                                        }}
                                    >
                                        {prize.name !== '' ? (
                                            <span className='icon-container' style={{
                                                transform: `rotate(-50deg)`,
                                            }}>
                                                {!getPrize ? (
                                                    <div>
                                                        <img src={image} alt="" className='w-[2.5rem] ' />
                                                    </div>
                                                ) : (
                                                    <h1 className='relative mb-[5rem] text-base sm:text-xl lg:text-base uppercase  text-white'>
                                                        <h1 className='opacity-0'> !Ganaste¡</h1>
                                                        <br />
                                                        <p className='text-[70%] sm:text-[100%] lg:text-base mx-auto absolute left-2.5'>{prize.name}</p>
                                                    </h1>
                                                )}
                                            </span>
                                        ) : (
                                            <span className='icon-container' style={{
                                                transform: `rotate(-50deg)`,
                                            }}>
                                                <img src={image} alt="" className='w-[2.5rem] ' />
                                                {prize.name}
                                            </span>
                                        )}
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>

            ) : (
                //loading ganador
                fetchBoolean && (
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
                                        <span className='icon-container flex flex-col items-center justify-center text-center' style={{
                                            // Aplica la rotación solo al texto (name) del premio
                                            transform: `rotate(-50deg)`, // Cambia este valor para probar
                                        }}>
                                            {!getPrize ? (
                                                <div>
                                                    <img src={image} alt="" className='w-[2.5rem] lg:w-[2rem]' />
                                                </div>
                                            ) : (
                                                <h1 className='relative mb-[5rem] sm:mb-[8rem] lg:mb-[5rem] 2xl:mb-[6rem] text-base sm:text-lg lg:text-sm uppercase  text-white'>
                                                    <h1 className='opacity-0'> !Ganaste¡</h1>
                                                    <br />
                                                    <p className='text-xs sm:text-lg sm:text-[90%] lg:text-xs lg:text-[65%] xl:text-[80%] 2xl:text-[100%]  mx-auto absolute '>{prize.name}</p>
                                                </h1>
                                            )}
                                        </span>
                                    ) : (
                                        <span className='icon-container text-center' style={{
                                            // Aplica la rotación solo al texto (name) del premio
                                            transform: `rotate(-50deg)`, // Cambia este valor para probar
                                        }}>
                                            <img src={image} alt="" className='w-[2.5rem] lg:w-[2rem] ' />
                                            <p className='text-xs sm:text-lg lg:text-xs lg:text-[70%] 2xl:text-sm  mx-auto absolute '>{prize.name}</p>
                                        </span>
                                    )}

                                </div>
                            ))}
                        </div>
                    </div >
                )
            )}
            {/* loading de placeholder */}

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
