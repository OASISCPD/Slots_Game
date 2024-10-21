import { useEffect, useState } from 'react';
import logo from '/images/logoPilar.png';
import { Footer } from '../components/Footer';
import { useNavigate } from 'react-router-dom';
import { LoadingInit } from '../components/loadings/LoadingInit';
import { facebook, instagram, whatsapp } from '../content/Variables';
export function PageTemplateMinorAge() {
    //logica de carga de imagenes en el componente
    const [imageLoaded, setImageLoaded] = useState<boolean>(false)
    const [minimumTimeElapsed, setMinimumTimeElapsed] = useState<boolean>(false)
    //navigate
    const navigate = useNavigate()

    useEffect(() => {
        const timer = setTimeout(() => {
            setMinimumTimeElapsed(true)
        }, 1500)
        const loadImage = (src: any) => {
            return new Promise((resolve) => {
                const img = new Image();
                img.onload = resolve;
                img.onerror = resolve;
                img.src = src
            })
        }

        Promise.all([loadImage(logo)]).then(() => {
            setImageLoaded(true)
        });

        return () => clearTimeout(timer)

    }, [])
    return (
        <div>
            {!imageLoaded || !minimumTimeElapsed ? (
                <LoadingInit />
            ) : (
                <div className="flex flex-col min-h-screen"
                >
                    <div className="flex-grow flex flex-col justify-center py-24 textGothamMedium">
                        <div className="relative z-20 mx-[2rem] text-start py-4 text-white ">
                            <h1 style={{ textShadow: '2px 5px 4px rgba(0, 0, 0, 0.5)' }} className=' text-2xl sm:text-3xl tracking-wide text-center textGothamBlack'>ESTA PROMO ES SOLO PARA PERSONAS MAYORES DE 18 AÑOS.</h1>
                            <h1 className='text-center sm:text-xl tracking-wide'>Si sos menor de edad tenés que saber que el juego compulsivo es perjudicial para la salud, puede afectar tus relaciones, tu rendimiento escolar e incluso tu salud mental.</h1>
                        </div>
                        <div className='flex justify-center items-center'>
                            <button onClick={() => navigate('/')} className='text-white shadow-lg uppercase   bg-gradient-to-r from-redMain to-black border-0 py-2 mx-[4rem] hover:bg-yellow-600 rounded-3xl items-center text-base px-8 sm:px-12 my-12 sm:text-xl'>
                                Volver al inicio
                            </button>
                        </div>
                        <div className='flex justify-center items-center content-center my-12'>
                            <img src={logo} alt="Logo Pilar" className='w-[12rem] sm:w-[16rem]' />
                        </div>
                    </div>
                    <Footer whatsapp={whatsapp} instagram={instagram} facebook={facebook} />
                </div>
            )}
        </div>
    )
}
