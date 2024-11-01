import { useEffect, useState } from "react"
/* import { dto_prizes_get } from "../../data/data" */
import { Game } from "../../Game"
/* import { getPrize } from "../../api/getPrize" */
/* import { FaSpinner } from "react-icons/fa" */
import {/*  codeCampaignPilar, codeCampaignZarate, codeCampaignSalta,  */propDomain, domain, codeCampaignPilar, codeCampaignZarate, codeCampaignSalta } from "../../../content/content"
import { dto_prizes_get/* , prizesHard */ } from '../../../data/data'
import { Footer } from "../../Footer"
import { FullScreeeLoader } from "../../loadings/FullScreenLoader"
import { TemplateMail } from "../mobile/TemplateMail"
import { ModalLogic } from "../../logic/ModalLogic"
import { ModalGetPrize } from "../../mod/ModalGetPrize"
import { getNamePrize } from "../../../logic/convertValues"
import { getPrize } from "../../../api/getPrize"
import { FaSpinner } from "react-icons/fa"
import { ModalError } from "../../mod/ModalError"
import { useNavigate } from "react-router-dom"
import { ModalAge } from "../../mod/ModalAge"
const logoPathTitle3 = `/images/${domain.toLowerCase()}/tituloMobile3.png`;
const logoPathTitle2 = `/images/${domain.toLowerCase()}/tituloMobile2.png`;
const logoPathTitle1 = `/images/${domain.toLowerCase()}/tituloMobile1.png`;
const logoPath = `/images/${domain.toLowerCase()}/logoDominio.png`;


export function Home({ domain }: propDomain) {
    //navigate
    const navigate = useNavigate()
    //constante de modal
    const [modal, setModal] = useState<boolean>(false)
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
        try {
            const res = await getPrize(campaignCode)
            //verificamos si res es un arreglo vacio
            if (Array.isArray(res) && res.length === 0) {
                setLoadingFetch(false)
                console.log('La lista esta vacia printear modal')
                setModalError(true)
                return
            }
            console.log('respuesta', res)
            setPrizes(res)
            //constante que almacena el nombre del premio
            const namePrize: string[] = getNamePrize(res)
            console.log('nombre del premio anentrega--->', namePrize[0])
            setNamePrize(namePrize[0])
            //funcion que abriria el modal para preguntar si es mayor de edad
            //aca iria
            console.log(res)
        } catch (error) {
            console.error(error)
        } finally {
            setLoadingFetch(false)
        }
    }
    //funcion que abre el modal para confirmar el premio
    function openModal() {
        setModal(true)
    }
    //function que cierra el modal
    function closeModal() {
        setModal(false)
    }
    function closeModalOk() {
        setModal(false)
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
    //traer premios
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
        setFetchPrize(true)
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
        setFetchPrize(true)
    }
    useEffect(() => {
        if (fetchPrize) {
            console.log('se puede hacer la consulta a l fecth pq es mayor de edad')
            getData()
        }
    }, [fetchPrize])

    return (
        <div className="flex flex-col min-h-screen">
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
            </div>
            {/*    ) : ( */}
            {/*   <div className=" flex flex-col justify-center items-center ">
                <h1>CARGANDO JUEGO....</h1>
                <div className="border-[2px] animate-pulse border-white bg-black bg-opacity-30 rounded-md w-[80%] h-[18rem] flex items-center justify-center">
                    <FaSpinner className="text-4xl animate-spin text-white" />
                </div>
            </div> */}
            {/* IMAGE */}

            <img src={logoPath} alt="" className={`${domain === "SALTA" ? 'w-[6rem] sm:w-[8rem] lg:w-[8rem]' : 'w-[12rem] sm:w-[12rem] lg:w-[12rem]'} mx-auto`} />
            <Footer domain={domain} />
            {/*     )} */}
            {modal && (
                <ModalLogic isOpen={true} onClose={closeModal}>
                    <ModalGetPrize prize={namePrize} onCloseOk={closeModalOk} onClose={closeModal} />
                </ModalLogic>
            )}
            {modalError && (
                <ModalLogic isOpen={true} onClose={closeModal}>
                    <ModalError buttonText="error de fetch" subTitle="lorem" title="lorem" onClose={closeModal} />
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
        </div>
    )
}