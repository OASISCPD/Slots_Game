import { useEffect, useState } from 'react';
import { Footer } from '../Footer';
const logoPath = `/images/${domain.toLowerCase()}/logoDominio.png`;
import { domain, googleMapsPilar, googleMapsSalta, googleMapsZarate, propDomain } from '../../content/content';
import { getGradientButton, getGradientByDomain } from '../../logic/logicColors';
/* import { LoadingInit } from '../components/loadings/LoadingInit'; */
/* import { facebook, googleMapsPilar, instagram, whatsapp } from ''; */



export function HowToGet({ domain }: propDomain) {

    //LOGICA DE CARGA DE IMAGENES
    const [imagesLoaded, setImagesLoaded] = useState<boolean>(false)
    const [minimumTimeElapsed, setMinimunTimeElapsed] = useState<boolean>(false)

    //Carga logica de imagenes para mostrar el template solo cuando las imagenes esten cargadas 
    useEffect(() => {
        const timer = setTimeout(() => {
            setMinimunTimeElapsed(true)
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
            setImagesLoaded(true)
        })

        return () => clearTimeout(timer)
    })
    //funcion que hace la logica del open para cada sede segun el dominio
    function openLink(domain: string) {
        const url = domain === 'PILAR'
            ? googleMapsPilar
            : domain === 'ZARATE'
                ? googleMapsZarate
                : domain === 'SALTA'
                    ? googleMapsSalta
                    : '#'; // Puedes definir un valor por defecto o un manejo de error aquí
        window.open(url, '_blank'); // Abrir en una nueva pestaña
        return
    }
    return (
        <div>{!imagesLoaded || !minimumTimeElapsed ? (
            /*  <LoadingInit /> */
            <>
            </>
        ) : (
            <div className={`flex flex-col  min-h-[100dvh] ${getGradientByDomain(domain)}`}
            >
                <div className="flex-grow flex flex-col justify-center py-24 textGothamMedium">
                    <div className="relative z-20 mx-[2rem] text-start py-8 text-white">
                        <h1 style={{ textShadow: '2px 5px 4px rgba(0, 0, 0, 0.5)' }} className=' text-2xl sm:text-3xl lg:text-2xl text-center textGothamBlack tracking-wide'>ACERCATE CON TU DNI AL STAND DE ATC <br /> Y CANJEÁ TU PREMIO</h1>
                    </div>
                    <div className='flex justify-center items-center'>
                        <button onClick={() => openLink(domain)} className={`text-white shadow-lg uppercase mt-8 lg:mt-0 ${getGradientButton(domain)}  border-0 py-2 mx-[4rem]   rounded-3xl items-center text-lg px-8 sm:px-12 sm:text-2xl lg:text-xl`}>
                            Cómo llegar
                        </button>
                    </div>
                    <div className='flex justify-center items-center content-center mt-48 lg:mt-[8rem]'>
                        <img src={logoPath} alt="Logo Pilar" className='w-[12rem] sm:w-[16rem] lg:w-[12rem] xl:w-[12rem]' />
                    </div>
                </div>
                <Footer domain={domain} />
            </div>
        )}
        </div>
    )
}
