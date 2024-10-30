import { useEffect, useState } from "react"
/* import { dto_prizes_get } from "../../data/data" */
import { Game } from "../Game"
/* import { getPrize } from "../../api/getPrize" */
/* import { FaSpinner } from "react-icons/fa" */
import {/*  codeCampaignPilar, codeCampaignZarate, codeCampaignSalta,  */propDomain, domain } from "../../content/content"
import { prizesHard } from '../../data/data'
import { Footer } from "../Footer"
import { FullScreeeLoader } from "../loadings/FullScreenLoader"
import { TemplateMail } from "./TemplateMail"
import { ModalLogic } from "../logic/ModalLogic"
import { ModalGetPrize } from "../mod/ModalGetPrize"
import { getNamePrize } from "../../logic/convertValues"
const logoPathTitle3 = `/images/${domain.toLowerCase()}/tituloMobile3.png`;
const logoPathTitle2 = `/images/${domain.toLowerCase()}/tituloMobile2.png`;
const logoPathTitle1 = `/images/${domain.toLowerCase()}/tituloMobile1.png`;
const logoPath = `/images/${domain.toLowerCase()}/logoDominio.png`;


export function Home({ domain }: propDomain) {
    //constante de modal
    const [modal, setModal] = useState<boolean>(false)
    //clicks para jugar
    const [clicks, setClicks] = useState<number>(3)
    //constante que almacena el nombre del premio
    const namePrize: string[] = getNamePrize(prizesHard)
    //constante q almacena un booleano para printear o no el componente del template
    const [templateMail, setTemplateMail] = useState<boolean>(false)
    //constatnte que maneja los premios
    /*  const [prizes, setPrizes] = useState<dto_prizes_get[]>() */
    //constante que printea el template de loading
    const [loading] = useState<boolean>(false)
    // Cargando imágenes
    const [imagesLoaded, setImagesLoaded] = useState<boolean>(false);
    /* console.log(prizes) */
    //funcion que trae el premio
    /*  async function getData() {
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
             setPrizes(res)
             console.log(res)
         } catch (error) {
             console.error(error)
         }
     } */
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
        await Promise.all(images.map(loadImage));
        setImagesLoaded(true); // Indica que las imágenes han sido cargadas
        console.log('imagenes cargadas')
    };
    //traer premios
    useEffect(() => {
        /* getData() */
        preloadImages();
    }, [domain])

    //clicks
    useEffect(() => {
        console.log('clicks del usuario', clicks)
    }, [clicks])

    return (
        <div className="flex flex-col min-h-screen">
            {loading && !imagesLoaded && (
                <FullScreeeLoader />
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
                            className={`w-[24rem] z-30 sm:w-[24rem] lg:w-[20rem] xl:w-[24rem] 2xl:w-[28rem] mx-auto ${clicks > 2 ? '' : 'hidden'}`}
                        />

                        <img
                            src={logoPathTitle2}
                            alt=""
                            className={`w-[24rem] z-30 sm:w-[24rem] lg:w-[20rem] xl:w-[24rem] 2xl:w-[28rem] mx-auto ${clicks === 2 ? '' : 'hidden'}`}
                        />

                        <img
                            src={logoPathTitle1}
                            alt=""
                            className={`w-[24rem] z-30 sm:w-[24rem] lg:w-[20rem] xl:w-[24rem] 2xl:w-[28rem] mx-auto ${clicks >= 0 && clicks <= 1 ? '' : 'hidden'}`}
                        />
                        <div className="z-0">
                            <Game setClicks={setClicks} getPrize={openModal} prizes={prizesHard} />
                        </div>
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

            <img src={logoPath} alt="" className="w-[12rem] sm:w-[12rem] lg:w-[11rem] xl:w-[11rem] mx-auto" />
            <Footer domain={domain} />
            {/*     )} */}
            {modal && (
                <ModalLogic isOpen={true} onClose={closeModal}>
                    <ModalGetPrize prize={namePrize[0]} onCloseOk={closeModalOk} onClose={closeModal} />
                </ModalLogic>
            )}
        </div>
    )
}