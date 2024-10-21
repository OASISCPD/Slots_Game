import { useEffect, useState } from 'react';
import logo from '/images/logoPilar.png';
import { Footer } from '../components/Footer';
import { LoadingInit } from '../components/loadings/LoadingInit';
import { facebook, instagram, urlWeb, whatsapp } from '../content/Variables';

export function PageAlreadyPlayed() {
    //VARIABLE QUE CAMBVIAN PARA MOSTRAR LAS IMAGENES Y EL TEMPLATE EN CUESTION
    const [imagesLoaded, setImagesLoaded] = useState(false);
    const [minimumTimeElapsed, setMinimumTimeElapsed] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setMinimumTimeElapsed(true);
        }, 1500); // 1000 milliseconds = 1 second

        const loadImage = (src: any) => {
            return new Promise((resolve) => {
                const img = new Image();
                img.onload = resolve;
                img.onerror = resolve;
                img.src = src;
            });
        };

        Promise.all([loadImage(logo)])
            .then(() => {
                setImagesLoaded(true);
            });

        return () => clearTimeout(timer);
    }, []);
    return (
        <div>
            {!imagesLoaded || !minimumTimeElapsed ? (
                <LoadingInit />
            ) : (
                <div className="flex flex-col min-h-[100dvh]"
                >
                    <div className="flex-grow flex flex-col justify-center py-4 textGothamMedium">
                        <div className="relative z-20 mx-[2rem] lg:mx-[4rem] text-start py-8 text-white">
                            <h1 style={{ textShadow: '2px 5px 4px rgba(0, 0, 0, 0.5)' }} className='text-xl sm:text-3xl  lg:text-2xl xl:text-3xl text-center uppercase  textGothamBlack tracking-wide'>Esta promo es solo para personas <br/> que no hayan participado de las versiones anteriores de Raspá y Ganá</h1>
                            <div className='my-2 '></div>
                            <h1  className='text-base sm:text-xl lg:text-lg  xl:text-xl text-center uppercase'>Pero no te preocupes entra a nuestra web y enterate de todas las cosas que tenemos para vos! </h1>
                        </div>
                        <div className='flex justify-center items-center'>
                            <button onClick={() => window.open(urlWeb)} className='text-white shadow-lg uppercase mt-8 bg-gradient-to-r hover:scale-95 duration-300 from-redMain to-black border-0 py-2 mx-auto sm:mx-[4rem]  hover:bg-yellow-600 rounded-3xl items-center text-lg px-8 sm:px-12 sm:text-2xl lg:text-lg xl:text-xl'>
                                Entrar a bingo Pilar
                            </button>
                        </div>
                        <div className='flex justify-center items-center content-center mt-48 lg:mt-[8rem]'>
                            <img src={logo} alt="Logo Pilar" className='w-[12rem] sm:w-[16rem] lg:w-[20rem] ' />
                        </div>
                    </div>
                    <Footer whatsapp={whatsapp} instagram={instagram} facebook={facebook} />
                </div>
            )}
        </div>
    )
}
