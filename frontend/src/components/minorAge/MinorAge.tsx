import { domain, propDomain } from '../../content/content';
import { useEffect, useState } from 'react';
const logoPath = `/images/${domain.toLowerCase()}/logoDominio.png`;

import { Footer } from '../Footer';
import { useNavigate } from 'react-router-dom';
import { FullScreeeLoader } from '../loadings/FullScreenLoader';
import { getGradientByDomain } from '../../logic/logicColors';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { ModalLogic } from '../logic/ModalLogic';
import { ModalAssessments } from '../mod/ModalAssessments';

export function MinorAge({ domain }: propDomain) {
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

        Promise.all([loadImage(logoPath)]).then(() => {
            setImageLoaded(true)
        });

        return () => clearTimeout(timer)

    }, [])
    return (
        <div>
            {!imageLoaded || !minimumTimeElapsed ? (
                <FullScreeeLoader />
            ) : (
                <div className={`flex flex-col min-h-screen`}
                >
                    {domain}
                    <div className="flex-grow flex flex-col justify-center py-24  bisonBoldItallic">
                        <div className="relative z-20 mx-[2rem] text-start py-4 text-white ">
                            <h1 style={{ textShadow: '2px 5px 4px rgba(0, 0, 0, 0.5)' }} className=' text-4xl tracking-wide text-center  '>ESTA PROMO <span className='text-yellowMain'>ES SOLO PARA PERSONAS MAYORES DE 18 AÑOS.</span> </h1>
                            <h1 className='text-center text-lg sm:text-2xl tracking-wide my-[4dvh]'>Si sos menor de edad tenés que saber que el juego compulsivo es perjudicial para la salud, puede afectar tus relaciones, tu rendimiento escolar e incluso tu salud mental.</h1>
                        </div>
                        {/*      <div className='flex justify-center items-center'>
                            <button onClick={() => navigate('/')} className='text-white shadow-lg uppercase   bg-gradient-to-r from-redMain to-black border-0 py-2 mx-[4rem] rounded-3xl items-center text-base px-8 sm:px-12 my-12 sm:text-xl'>
                                Volver al inicio
                            </button>
                        </div> */}
                        <div className='flex justify-center text-yellowMain items-center'>
                            {/*  <span ><FaMapMarkerAlt size={40} /></span> */}
                            <button onClick={() => navigate('/')} className={`    items-center `}>
                                <h1 className='underline text-2xl sm:text-3xl 2xl:text-4xl' style={{ textShadow: '4px 6px 6px rgba(0, 0, 0, 0.5)' }}> volver al inicio</h1>
                            </button>
                        </div>
                        <div className='flex justify-center items-center content-center my-12'>
                            <img src={logoPath} alt="Logo Pilar" className='w-[12rem] sm:w-[14rem]  2xl:w-[16rem]' />
                        </div>
                    </div>
                    <Footer domain={domain} />
                </div>
            )}

           {/*  <ModalLogic isOpen={true} onClose={() => () => console.log('')}>
                <ModalAssessments  />
            </ModalLogic> */}
        </div>
    )
}