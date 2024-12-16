import { useEffect, useRef, useState } from "react"
/* import { dto_prizes_get } from "../../data/data" */
import { Game } from "../../Game"
/* import { getPrize } from "../../api/getPrize" */
/* import { FaSpinner } from "react-icons/fa" */
import {/*  codeCampaignPilar, codeCampaignZarate, codeCampaignSalta,  */propDomain, domain, codeCampaignPilar, codeCampaignZarate, codeCampaignSalta } from "../../../content/content"
import { dto_prizes_get, /* prizesHard */ } from '../../../data/data'
import { Footer } from "../../Footer"
import { FullScreeeLoader } from "../../loadings/FullScreenLoader"
import { TemplateMail } from "../TemplateMail"
import { ModalLogic, modalValuesDto } from "../../logic/ModalLogic"
import { ModalGetPrize } from "../../mod/ModalGetPrize"
import { getNamePrize } from "../../../logic/convertValues"
import { getPrize } from "../../../api/getPrize"
import { FaSpinner } from "react-icons/fa"
import { dtoModal, ModalError } from "../../mod/ModalError"
import { useNavigate } from "react-router-dom"
import { ModalAge } from "../../mod/ModalAge"
import { fetchMailEnviado, getDomainMail } from "../../../logic/mail"
/* import { ModalAlreadyPlayed } from "../../mod/ModalAlreadyPlayed" */
import { ModalOk } from "../../mod/ModalOk"
import { ModalInfo } from "../../mod/ModalInfo"
const logoPathTitle3 = `/images/${domain.toLowerCase()}/titulo3.png`;
const logoPathTitle2 = `/images/${domain.toLowerCase()}/titulo2.png`;
const logoPathTitle1 = `/images/${domain.toLowerCase()}/titulo.png`;
const logoPath = `/images/${domain.toLowerCase()}/logoDominio.png`;


export function Home({ domain }: propDomain) {
    //navigate
    const navigate = useNavigate()
    //constante de modal
    const [modal, setModal] = useState<modalValuesDto>({ boolean: false, number: 0 })
    //tipo de mensajeq ue va a a llevar el modal
    const [dataModal, setDataModal] = useState<dtoModal | null>(null);
    //email del usuario en caso de que en las cookies se hayan guardado anteriormente su email
    const [email, setEmail] = useState<string>('')
    //clicks para jugar
    const [clicks, setClicks] = useState<number>(3)
    const [namePrize, setNamePrize] = useState<string>('')
    //constante q almacena un booleano para printear o no el componente del template
    const [templateMail, setTemplateMail] = useState<boolean>(false)
    //constatnte que maneja los premios
    const [prizes, setPrizes] = useState<dto_prizes_get[]>()
    // Cargando imágenes
    const [imagesLoaded, setImagesLoaded] = useState<boolean>(false);
    //loading del fetch
    const [loadingFetch, setLoadingFetch] = useState<boolean>(false)
    //modal que printea el error
    const [modalError, setModalError] = useState<boolean>(false)
    //validacion de menor de edad agregando logica
    const [fetchPrize, setFetchPrize] = useState<boolean>(false);
    const [showAgeModal, setShowAgeModal] = useState<boolean>(false);
    //modal que maneja info para los clientes
    const [modalInfo, setModalInfo] = useState<boolean>(false)
    //audio de win 
    const audioRef = useRef<HTMLAudioElement>(null)
    /* console.log(prizes) */
    //funcion que trae el premio
    async function getData() {
        setLoadingFetch(true)
        // Definir el código según el dominio
        let campaignCode;
        if (domain.toUpperCase() === 'PILAR') {
            campaignCode = codeCampaignPilar;
        } else if (domain.toUpperCase() === 'ZARATE') {
            campaignCode = codeCampaignZarate;
        } else if (domain.toUpperCase() === 'SALTA') {
            campaignCode = codeCampaignSalta;
        }
        else {
            campaignCode = ''; // Usa el código que se pasa como argumento si no es 'pilar' o 'zarate'
        }
        /*      hardcodeado
                setPrizes([{ descripcion_premio: '', estado: true, id_premio: 4, index_id: 5 }])
                setLoadingFetch(false) */
        try {
            const res: any = await getPrize(campaignCode)
            /*  const resTEST = { status: 402 } */
            // Handle various status codes

            console.log('CODIGO DE ESTADO', res.status)
            const data = await res.json()
            console.log(res.status)
            switch (res.status) {
                case 401:
                    const email = await fetchMailEnviado();
                    console.log('EMAILLl', email)
                    if (email) {
                        setEmail(email);
                        const domainText = getDomainMail(domain)
                        setModal({ boolean: true, number: 401 });
                        setDataModal({ title: 'El premio ya fue enviado', subTitle: `Checkeá tu casilla de mail y buscá Promociones ${domainText}` });
                    }
                    break;
                case 402:
                    /* setModal({ boolean: true, number: 200 }); */
                    /* setPrizeWinning({ premio: data.premio, status_code: data.status_code }); */
                    console.log("lorem")
                    if (Array.isArray(data) && data.length === 0) {
                        setLoadingFetch(false)
                        console.log('La lista esta vacia printear modal')
                        setModalError(true)
                        return
                    }
                    console.log('respuesta', data)
                    setPrizes(data)
                    //constante que almacena el nombre del premio
                    const namePrize402: string[] = getNamePrize(data)
                    console.log('nombre del premio anentrega--->', namePrize402[0])
                    setNamePrize(namePrize402[0])
                    break;
                case 403:
                    setModal({ boolean: true, number: 403 });
                    setDataModal({ title: '¡Estamos mejorando nuestra plataforma!', subTitle: 'Estaremos de vuelta pronto' });
                    break
                case 404:
                case 500:
                    setModal({ boolean: true, number: 500 });
                    setDataModal({ title: '¡Estamos mejorando nuestra plataforma!', subTitle: 'Estaremos de vuelta pronto' });
                    break;
                case 200:
                    /*  setModal({ boolean: true, number: 200 }); */
                    /* setPrizeWinning({ premio: data.premio, status_code: data.status_code }); */
                    if (Array.isArray(data) && data.length === 0) {
                        setLoadingFetch(false)
                        console.log('La lista esta vacia printear modal')
                        setModalError(true)
                        return
                    }
                    console.log('respuesta', data)
                    setPrizes(data)
                    //constante que almacena el nombre del premio
                    const namePrize: string[] = getNamePrize(data)
                    console.log('nombre del premio anentrega--->', namePrize[0])
                    setNamePrize(namePrize[0])
                    break;
                default:
                    console.error('Error desconocido');
                    setModal({ boolean: true, number: 500 });
                    setDataModal({ title: '¡Ocurrio un error desconocido!', subTitle: 'Estaremos de vuelta pronto' });
                    break;
            }
            console.log(res)
        } catch (error) {
            console.error(error)
        } finally {
            /* setModal({ boolean: true, number: 500 });
            setDataModal({ title: '¡Estamos mejorando nuestra plataforma!', subTitle: 'Estaremos de vuelta pronto' }); */
            setLoadingFetch(false)
        }
    }
    //funcion que abre el modal para confirmar el premio
    function openModal() {
        // Reproducir el sonido desde el elemento de audio
        //audio de win para cuando aparece el modal en relacion 
        console.log('ABRIENDO EL SONIDO PARA EL MODAL')
        audioRef.current?.play().catch(error => {
            console.error('Error al reproducir el sonido ganador para el premio:', error);
        });
        setModal({ boolean: true, number: 200 })
    }
    //function que cierra el modal
    function closeModal() {
        setModal({ boolean: false, number: 0 })
    }
    function closeModalOk() {
        setModal({ boolean: false, number: 0 })
        changedTemplate()
    }
    //funcion que cambia de templates
    function changedTemplate() {
        console.log('cambiando de template')
        setTemplateMail(true)
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
            logoPathTitle3,
            logoPathTitle2,
            logoPathTitle1,
            logoPath
        ];
        // Cargar todas las imágenes de manera asíncrona
        await Promise.all(images.map(loadImage));

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
    }, [domain])

    //clicks
    useEffect(() => {
        console.log('clicks del usuario', clicks)
    }, [clicks])

    useEffect(() => {
        console.log('estado de las imagenes', imagesLoaded)
        if (imagesLoaded) {
            /* getData() */
            //llamar a la funcion que valida si la persona es menor de edad o no
            checkIsAdult()

        }
    }, [imagesLoaded])

    const handleAgeConfirmation = () => {
        localStorage.setItem('isAdult', 'true');
        setShowAgeModal(false);
        setModalInfo(true)
        /*  setFetchPrize(true) */
    };

    const handleAgeRejection = () => {
        localStorage.removeItem('isAdult');
        setShowAgeModal(true);
        navigate('/minorAge');
    };

    function checkIsAdult() {
        const isAdult = localStorage.getItem('isAdult');
        console.log('valor', isAdult)
        if (isAdult !== 'true') {
            setShowAgeModal(true);
            return
        }
        setModalInfo(true)
        /* setFetchPrize(true) */
    }
    useEffect(() => {
        console.log("MODAAAl", modalInfo)
        if (fetchPrize && !modalInfo) {
            console.log('se puede hacer la consulta a l fecth pq es mayor de edad y acepto el modal de tres chances')
            getData()
            /* setPrizes([{ descripcion_premio: '', estado: true, id_premio: 4, index_id: 5 }]) */
        }
    }, [fetchPrize])

    //useEffect para cargar el sonido de
    useEffect(() => {
        //al cargar y si existe el audioRef entonces asociarle el sonido ganador
        if (audioRef.current) {
            audioRef.current.src = '/sounds/win.mp3'
            audioRef.current.volume = 0.2;
        }
    }, [])

    return (
        <div className="flex flex-col min-h-screen">
            {/* agregamos la etiqueta del audio para que pueda escucharse */}
            <audio ref={audioRef} />
            {!imagesLoaded && (
                <FullScreeeLoader />
            )}
            {loadingFetch && (
                <div className={`fixed top-0 left-0 w-full h-full bg-gray-900 ${loadingFetch ? 'opacity-50' : 'opacity-50'} flex justify-center items-center z-40`}>
                    <div className="flex justify-center items-center h-screen">
                        <div className="rounded-full h-20 w-20 bg-redMain animate-ping"></div>
                    </div>
                </div>
            )}
            {/*    {prizes && prizes.length > 0 ? ( */}
            <div className="flex-1 mx-[1rem]">
                {templateMail ? (
                    <TemplateMail stopConfetti={() => ''} />
                ) : (
                    <div className="relative">
                        <div id="titleImage">
                            <img
                                src={logoPathTitle3}
                                alt=""
                                className={`w-[20rem] z-30 sm:w-[24rem] lg:w-[20rem] xl:w-[24rem] 2xl:w-[28rem] mx-auto ${clicks > 2 ? '' : 'hidden'}`}
                            />

                            <img
                                src={logoPathTitle2}
                                alt=""
                                className={`w-[20rem] z-30 sm:w-[24rem] lg:w-[20rem] xl:w-[24rem] 2xl:w-[28rem] mx-auto ${clicks === 2 ? '' : 'hidden'}`}
                            />

                            <img
                                src={logoPathTitle1}
                                alt=""
                                className={`w-[20rem] z-30 sm:w-[24rem] lg:w-[20rem] xl:w-[24rem] 2xl:w-[28rem] mx-auto ${clicks >= 0 && clicks <= 1 ? '' : 'hidden'}`}
                            />
                        </div>
                        {prizes && prizes.length >= 0 ? (
                            <div className="my-[1rem]">
                                <Game setClicks={setClicks} getPrize={openModal} prizes={prizes} />
                            </div>
                        ) : (
                            <div className=" flex flex-col my-[1rem] text-white justify-center items-center ">
                                <h1>CARGANDO JUEGO....</h1>
                                <div className="border-[2px] animate-pulse border-white bg-black bg-opacity-30 rounded-md w-[70%] h-[14rem] flex items-center justify-center">
                                    <FaSpinner className="text-4xl animate-spin " />
                                </div>
                            </div>
                        )}
                    </div>
                )}
                <img src={logoPath} alt="" className={`${domain === "SALTA" ? 'animate-spin-once w-[8rem] sm:w-[10rem] lg:w-[10rem]' : 'w-[12rem] sm:w-[12rem] lg:w-[12rem]'} mx-auto`} />
            </div>
            <Footer domain={domain} />
            {modalError && (
                <ModalLogic isOpen={true} onClose={closeModal}>
                    <ModalError subTitle="Estaremos de vuelta pronto" title="¡Estamos mejorando nuestra plataforma!" onClose={() => navigate('/howToGet')} />
                </ModalLogic>
            )}
            {showAgeModal && (
                <ModalLogic isOpen={true} onClose={closeModal}>
                    <ModalAge
                        onClose={handleAgeRejection}
                        onCloseOk={handleAgeConfirmation}
                        title="¿SOS MAYOR DE 18 AÑOS?"
                    />
                </ModalLogic>
            )}
            {modal?.boolean && modal.number === 200 && (
                <ModalLogic isOpen={true} onClose={() => setModal({ boolean: false, number: 200 })}>
                    <ModalGetPrize prize={namePrize} onClose={closeModal} onCloseOk={closeModalOk} />
                </ModalLogic>
            )}
            {modal?.boolean && modal.number === 401 && (
                <ModalLogic isOpen={true} onClose={() => setModal({ boolean: false, number: 401 })}>
                    <ModalOk email={email} onClose={() => { setModal({ boolean: false, number: 401 }), navigate('/howToGet') }} title={dataModal?.title} subTitle={dataModal?.subTitle} />
                </ModalLogic>
            )}
            {modal?.boolean && modal.number === 403 && (
                <ModalLogic isOpen={true} onClose={() => setModal({ boolean: false, number: 403 })}>
                    <ModalError onClose={() => { setModal({ boolean: false, number: 403 }), navigate('/howToGet') }} title={dataModal?.title} subTitle={dataModal?.subTitle} />
                </ModalLogic>
            )}
            {modal?.boolean && modal.number === 500 && (
                <ModalLogic isOpen={true} onClose={() => setModal({ boolean: false, number: 500 })}>
                    <ModalError onClose={() => { setModal({ boolean: false, number: 500 }) }} title={dataModal?.title} subTitle={dataModal?.subTitle} />
                </ModalLogic>
            )}
            {/* MODAL PARA LA INFO  */}
            {modalInfo && (
                <ModalLogic isOpen={true} onClose={() => setModalInfo(false)}>
                    <ModalInfo onCloseOk={() => { setModalInfo(false), setFetchPrize(true) }} title="TENÉS TRES CHANCES PARA GANAR UN PREMIO" />
                </ModalLogic>
            )}
        </div>
    )
}