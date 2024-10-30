import { Slot } from "../slot/Slot";
import { dto_prizes_get, prizesHard } from '../../data/data'
/* import { Footer } from "../Footer"; */
import { ModalLogic } from "../logic/ModalLogic";
import { ModalAge } from "../mod/ModalAge";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FullScreeeLoader } from "../loadings/FullScreenLoader";
import { domain, propDomain } from "../../content/content";
import { TemplateMail } from "./TemplateMail";
import { Footer } from "../Footer";
//imagen para cada dominio
const logoPath = `/images/${domain.toLowerCase()}/logoDominio.png`;
import { StarrySky } from "../background/StarrySky";
import { getPrize } from "../../api/getPrize";
import { FaSpinner } from "react-icons/fa";

export function Home({ domain }: propDomain) {
    //constatnte que maneja los premios
    const [prizes, setPrizes] = useState<dto_prizes_get[]>()
    //constante q muestra o no el template de enviar mail dependiendo de qu accion haya hecho
    const [templateMail, setTemplateMail] = useState<boolean>(false)
    //constante que maneja un loading generico para las mayorias de peticiones o funciones asyncronas
    const [loading/* , setLoading */] = useState<boolean>(false)
    const navigate = useNavigate() //constante que me permite manejar el dom y los links 
    //constante que me activa el modal de edad
    const [modalAge, setModalAge] = useState<boolean>(false)
    //funcion que cierra el modal
    function closeModal() {
        setModalAge(false)
    }

    //funcion que activa el template del mail
    function viewTemplateMail() {
        console.log('entrando')
        setTemplateMail(true)
    }

    //funcion que me se dispara al negar ser mayor de edad
    function handleAgeConfirmation() {
        localStorage.setItem('isAdult', 'true');
        setModalAge(false);
        //fandar el fetch para traer los premios
        /*  setFetchPrize(true) */
    };

    //funcion que me se dispara al negar ser mayor de edad
    function handleAgeRejection() {
        localStorage.removeItem('isAdult');
        setModalAge(true);
        navigate('/minorAge');//url de redireccion
    };

    //cada que se carge el componente va a preguntar si la variable que estaria seteada es true o false, en este caso la variable es isAdult
    useEffect(() => {
        const isAdult = localStorage.getItem('isAdult');
        console.log('valor de validacion de edad', isAdult)
        if (isAdult !== 'true') {
            setModalAge(true);
            return
        }
        //realizar peticion http
        /*  setFetchPrize(true) */
    }, []);

    //funcion que trae el premio
    async function getData() {
        try {
            const res = await getPrize('369f5a533f')
            setPrizes(res)
            console.log(res)
        } catch (error) {
            console.error(error)
        }
    }

    //traer premios
    useEffect(() => {
        getData()
    }, [])

    //cuando cargue el componente mandar funcion que dispara confetti/estrellas


    return (
        <StarrySky>
            <div className={`flex flex-col min-h-screen `}>
                {/*   <SpaceParticles /> */}
                <h1 className="text-2xl text-white">{domain}</h1>
                {loading && (
                    <FullScreeeLoader />
                )}
                {templateMail ? (
                    <div className="flex-1 max-w-sm sm:max-w-2xl mx-auto">
                        <TemplateMail stopConfetti={() => ''} />
                    </div>
                ) : (
                    /*  <div className="flex-1  ">
                         <img src={logoPath} className="mx-auto mb-[6dvh]  w-[24dvh] lg:w-[16%] h-full" alt="" />
                         <Slot changedTemplate={viewTemplateMail} prizes={prizes} />
                     </div> */
                    <div className="flex-1">
                        <img src={logoPath} className="mx-auto mb-[6dvh] w-[24dvh] lg:w-[16%] h-full" alt="" />
                        {prizes && prizes.length > 0 ? (
                            <Slot changedTemplate={viewTemplateMail} prizes={prizes} />
                        ) : (
                            <div className=" flex flex-col justify-center items-center animate-pulse">
                                <h1>CARGANDO JUEGO....</h1>
                                <div className="border-[2px] border-white bg-black bg-opacity-30 rounded-md w-[80%] h-[18rem] flex items-center justify-center">
                                    <FaSpinner className="text-4xl animate-spin text-white" />
                                </div>
                            </div>

                        )}
                    </div>
                )
                }
                <Footer domain={domain} />
                {
                    modalAge && (
                        <ModalLogic onClose={closeModal} isOpen={true}>
                            <ModalAge title="¿SOS MAYOR DE 18 AÑOS?" onClose={handleAgeRejection} onCloseOk={handleAgeConfirmation} />
                        </ModalLogic>
                    )
                }
            </div >
        </StarrySky>
    )
}