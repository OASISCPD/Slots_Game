import { useEffect, useState } from 'react';
import { Footer } from '../Footer';
const logoPath = `/images/${domain.toLowerCase()}/logoDominio.png`;
import { domain, googleMapsPilar, googleMapsSalta, googleMapsZarate, propDomain } from '../../content/content';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { FullScreeeLoader } from '../loadings/FullScreenLoader';


export function HowToGet({ domain }: propDomain) {

    //LOGICA DE CARGA DE IMAGENES
    const [imagesLoaded, setImagesLoaded] = useState<boolean>(false)
    const [minimumTimeElapsed, setMinimunTimeElapsed] = useState<boolean>(false)



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


    // Función para cargar imágenes
    const loadImage = (src: string) => {
        return new Promise((resolve) => {
            const img = new Image();
            img.onload = resolve;
            img.onerror = resolve; // Resolvemos en caso de error para no bloquear
            img.src = src;
        });
    };

    // Cargar todas las imágenes
    const preloadImages = async () => {
        const images = [
            logoPath
        ];
        // Cargar todas las imágenes de manera asíncrona
        await Promise.all(images.map(loadImage));

        /* setImagesLoaded(true); // Indica que las imágenes han sido cargadas
        console.log('imagenes cargadas') */
        //aca deberia ir una funcion de timeout de 1 segundo\
        // Función de timeout de 1 segundo
        setTimeout(() => {
            console.log('Esperando 1 segundo después de cargar las imágenes...');
            setImagesLoaded(true); // Indica que las imágenes han sido cargadas
            console.log('Imágenes cargadas');
        }, 2000); // 1000 milisegundos = 1 segundo
    };

    //traer imagenes
    useEffect(() => {

        preloadImages();
    }, [])

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


    return (
        <div>{!imagesLoaded || !minimumTimeElapsed ? (
            <FullScreeeLoader />

        ) : (
            <div className={`flex flex-col  min-h-[100dvh] `}
            >
                <div className="flex-grow flex flex-col justify-center py-24 bisonBoldItallic">
                    <div className="relative z-20 mx-[2rem] text-start py-8 text-white">
                        <h1 style={{ textShadow: '4px 6px 6px rgba(0, 0, 0, 0.5)' }} className=' text-3xl sm:text-4xl 2xl:text-6xl text-center  tracking-wider'><span className='text-yellowMain'>TE ESPERAMOS,</span> CON TU DNI <br /> EN NUESTRO STAND DE ATENCIÓN AL CLIENTE</h1>
                    </div>
                    <div className='flex justify-center text-yellowMain items-center'>
                        <span ><FaMapMarkerAlt size={40} /></span>
                        <button onClick={() => openLink(domain)} className={`    items-center `}>
                            <h1 className='underline text-2xl sm:text-3xl 2xl:text-4xl' style={{ textShadow: '4px 6px 6px rgba(0, 0, 0, 0.5)' }}> Cómo llegar</h1>
                        </button>
                    </div>
                    <div className='flex justify-center items-center content-center mt-48 lg:mt-[8rem]'>
                        <img src={logoPath} alt="Logo Pilar" className={`${domain === 'SALTA' ? 'w-[8rem] sm:w-[10rem]  2xl:w-[12rem]' : 'w-[12rem] sm:w-[14rem]  2xl:w-[16rem]'}`} />
                    </div>
                </div>
                <Footer domain={domain} />
            </div>
        )}
        </div>
    )
}
