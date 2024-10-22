import { Slot } from "../slot/Slot";
import { prizes } from '../../data/data'
/* import { Footer } from "../Footer"; */
import { ModalLogic } from "../logic/ModalLogic";
import { ModalAge } from "../mod/ModalAge";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FullScreeeLoader } from "../loadings/FullScreenLoader";
import { propDomain } from "../../content/content";
import { TemplateMail } from "./TemplateMail";

export function Home({ domain }: propDomain) {
    //constante q muestra o no el template de enviar mail dependiendo de qu accion haya hecho
    const [templateMail/* , setTemplateMail */] = useState<boolean>(false)
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
   /*  function viewTemplateMail() {
        console.log('entrando')
        setTemplateMail(true)
    } */
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

    return (
        <div className="flex flex-col bg-gradient-to-tr  from-black to-zinc-100 min-h-[100dvh]">
            <h1 className="text-2xl">{domain}</h1>
            {loading && (
                <FullScreeeLoader text_color="text-yellow-500" title="Preparando tu suerte..." color_border="border-yellow-500" />
            )}
            {templateMail ? (
                <div className="max-w-sm mx-auto">
                    <TemplateMail stopConfetti={() => ''} />
                </div>
            ) : (
                <div className="flex-1 mt-[12rem] ">
                    <Slot changedTemplate={/* viewTemplateMail */ () => window.location.reload()} prizes={prizes} />
                </div>
            )
            }
            {/*   <div className="">
                <Footer facebook="" instagram="" whatsapp="" />
            </div> */}

            {
                modalAge && (
                    <ModalLogic onClose={closeModal} isOpen={true}>
                        <ModalAge title="¿SOS MAYOR DE 18 AÑOS?" onClose={handleAgeRejection} onCloseOk={handleAgeConfirmation} />
                    </ModalLogic>
                )
            }
        </div >
    )
}