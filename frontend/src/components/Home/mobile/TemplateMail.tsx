import { useEffect, useState } from "react";
/* const logoPath = `/images/${domain.toLowerCase()}/logoDominio.png`; */
const buttonSend = `/images/${domain.toLowerCase()}/buttonEnviar.png`;
/* const buttonSendDisabled = `/images/${domain.toLowerCase()}/buttonEnviarDisabled.png`; */

import { dtoModal, ModalError } from '../../mod/ModalError';
import { ModalLogic } from "../../logic/ModalLogic";
import { ModalOk } from "../../mod/ModalOk";
/* import '../../styles/slide.css' */
import { useNavigate } from "react-router-dom";
import {
    baseUrl,/* , domain  */
    domain
} from "../../../content/content";
import { FaAt } from "react-icons/fa";
import { ModalAlreadyPlayed } from "../../mod/ModalAlreadyPlayed";
import { ModalAssessments } from "../../mod/ModalAssessments";

type dtoDataEmail = {
    nombre_apellido: string
    celular: string
    email: string
}
interface modalValues {

    boolean: boolean
    number: number
}
//prop para desactivar el confetti
interface propFather {
    stopConfetti: () => void
}
export function TemplateMail({ stopConfetti }: propFather) {
    //craendo navigate para navegar
    const navigate = useNavigate()
    //logic modals
    const [modal, setModal] = useState<modalValues | null>(null)
    const [dataModal, setDataModal] = useState<dtoModal | null>(null)
    const [email, setEmail] = useState<string>('');
    const [modalAssessments, setModalAssessments] = useState<boolean>(false);
    // check
    const [isChecked, setIsChecked] = useState<boolean>(false);
    const [buttonActivated, setButtonActivated] = useState<boolean>(false);
    const [isLoading, setLoading] = useState(false); // Estado para controlar la carga

    // Expresión regular para validar el formato del correo electrónico
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Función para validar si el botón debe estar habilitado
    const updateButtonActivation = () => {
        const isEmailValid = emailRegex.test(email);
        console.log('VALROES    ', isEmailValid, isChecked)
        setButtonActivated(isEmailValid && isChecked);
    };

    // Función para manejar el cambio en el campo de correo electrónico
    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setEmail(value);
        /*  updateButtonActivation(); // Actualiza la activación del botón */
    };

    // Función para manejar el cambio en el checkbox
    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsChecked(event.target.checked);
        /*  updateButtonActivation(); // Actualiza la activación del botón */
    };




    //envio de data
    async function sendData() {
        setLoading(true)
        const data: dtoDataEmail = {
            nombre_apellido: email.split("@")[0],
            celular: "",
            email: email
        };

        const urlencoded = new URLSearchParams();
        urlencoded.append('nombre_apellido', data.nombre_apellido)
        urlencoded.append('celular', data.celular)
        urlencoded.append('email', data.email)

        //creamos la request7
        const requestOptions = {
            method: "POST",
            body: urlencoded,
            credentials: 'include' as RequestCredentials,
            mode: "cors" as RequestMode,
            redirect: 'follow' as RequestRedirect
        }
        try {
            const response = await fetch(`${baseUrl}/insertar_accion`, requestOptions)
            const data = await response.json()
            /* const data = { status_code: 200 } */
            /* const data = 200 */
            switch (data.status_code) {
                case 200:
                    setModal({ boolean: true, number: 200 })
                    setDataModal({ title: 'YA TENÉS TU PREMIO', subTitle: 'SI NO TE LLEGÓ VERIFICÁ LA CARPETA DE “ NO DESEADOS O SPAM”' })
                    // Aquí puedes agregar la lógica para mostrar un mensaje de éxito o hacer alguna acción adicional
                    break;
                case 403:
                    setModal({ boolean: true, number: 403 })
                    setDataModal({ title: 'Debes jugar para poder recibir el premio', subTitle: 'Se refrescará la página y volverás al inicio para poder jugar' })
                    break;
                case 405:
                    setModal({ boolean: true, number: 405 })
                    setDataModal({ title: "Ocurrió un error en el campo requerido(mail)", subTitle: 'Inténtelo nuevamente' })
                    break;
                case 404:
                    setModal({ boolean: true, number: 404 })
                    setDataModal({ title: "El formato del correo electrónico es invalido", subTitle: "Verifique que su correo electrónico este bien escrito" })
                    break;
                case 402:
                    setModal({ boolean: true, number: 402 })
                    setDataModal({ title: '¡Ups! Parece que ya participaste de una edición anterior', subTitle: 'Esta promo es solo para personas que no hayan participado antes' })
                    break;
                case 401:
                    setModal({ boolean: true, number: 401 })
                    setDataModal({ title: 'Por alguna razón el formulario ya ha sido enviado', subTitle: 'Se lo redirigirá a otra sección' })
                    break;
                case 500:
                    setModal({ boolean: true, number: 500 });
                    setDataModal({
                        title: 'Ocurrió un problema inesperado',
                        subTitle: 'Estamos experimentando dificultades técnicas. Por favor intente nuevamente '
                    });
                    break;
                default:
                    break;
            }
        } catch (error) {
            console.error('Error al enviar el correo:', error);
            setModal({ boolean: true, number: 500 })
            setDataModal({ title: 'Error al enviar el correo', subTitle: 'Intente nuevamente ' })
        } finally {
            setLoading(false); // Desactiva el estado de carga después de recibir la respuesta
        }
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            // Aquí va  función que frena el confetti
            stopConfetti()
        }, 3000); // 3000 milisegundos = 3 segundos

        return () => clearTimeout(timer); // Limpia el timer al desmontar el componente
    }, []);

    useEffect(() => {
        updateButtonActivation()
        console.log(isChecked, buttonActivated, email)
    }, [isChecked, email])

    return (
        <div style={{ zIndex: 10 }} className=" tracking-wide z-50   py-[2rem] textGothamMedium">
            {isLoading && ( // Muestra el spinner de carga si isLoading es true
                <div className="fixed top-0 left-0 w-full h-full bg-gray-900 opacity-75 flex justify-center items-center z-50">
                    <div className="flex justify-center items-center h-screen">
                        <div className="rounded-full h-20 w-20 bg-red-800 animate-ping"></div>
                    </div>
                </div>
            )}
            <form onSubmit={sendData} className="flex flex-col items-center justify-center pt-[4dvh] sm:pt[8dvh]  lg:mt-[12dvh]">
                <div className=" bisonBoldItallic tracking-wider w-full max-w-xl ">
                    <h1 style={{ textShadow: '4px 6px 6px rgba(0, 0, 0, 0.5)' }} className="text-5xl text-white px-2  textGothamBlack  text-start   ">Ingresá tu dirección de correo</h1>
                    <h2 style={{ textShadow: '4px 6px 6px rgba(0, 0, 0, 0.5)' }} className="text-yellowMain px-2 text-4xl  text-start">
                        para enviarte tu premio
                    </h2>
                </div>
                <div className="relative w-full max-w-xl  my-[4dvh] items-center">
                    <span className="absolute inset-y-0 left-2 flex items-center pl-3 pointer-events-none">
                        <FaAt size={24} className="text-fuchsia-700" />
                    </span>
                    <input
                        type="email"
                        value={email}
                        onChange={handleEmailChange}
                        className=" py-3 pl-[8dvh]   text-black text-xl placeholder-gray-500 h-full w-full  rounded-full focus:outline-none shadow-sm shadow-amber-100 focus:border-indigo-500"
                        placeholder="M A I L"
                    />
                </div>
                <div className="w-full max-w-xl  gothamItalic text-sm">
                    <h1 style={{ textShadow: '4px 6px 6px rgba(0, 0, 0, 0.5)' }} className="text-white uppercase">VENÍ A RECLAMAR TU PREMIO SOLO DE LUNES A JUEVES</h1>
                    <h1 style={{ textShadow: '4px 6px 6px rgba(0, 0, 0, 0.5)' }} className="text-white uppercase"> <span className="text-yellowMain">RECORDá </span>que si ya participaste previamente de raspá y ganá o girá y ganá, no vas a poder reclamar el premio.</h1>
                </div>
                {/* TERMINOS Y CONDICIONES */}
                <div className="flex items-center gothamItalic text-sm uppercase  w-full max-w-xl  justify-start my-[2dvh]   ">
                    <input
                        onChange={handleCheckboxChange}
                        id="default-checkbox"
                        type="checkbox"
                        checked={isChecked}
                        className="  text-blue-600 bg-gray-100 border-gray-300 rounded-sm  focus:ring-blue-500 focus:ring-2 " required
                    />
                    <label style={{ textShadow: '4px 6px 6px rgba(0, 0, 0, 0.5)' }} onClick={() => window.open('/terms')} className="ms-2   text-white  underline ">Acepto términos y condiciones</label>
                </div>

                <div className="flex items-center w-full max-w-xl">

                    <button type="button" disabled={!buttonActivated} onClick={sendData} className={`${buttonActivated ? '' : 'opacity-50 cursor-not-allowed'} rounded-full    shadow-2xl shadow-black `}>
                        {buttonActivated}
                        <img src={buttonActivated ? buttonSend : buttonSend} className={`  w-[12dvh]`} alt="" />
                    </button>
                </div>
            </form>

            {modal?.boolean && modal?.number === 401 && (
                <ModalLogic isOpen={true} onClose={() => setModal({ boolean: false, number: 401 })}>
                    <ModalError onClose={() => navigate('/howToGet')} title={dataModal?.title} subTitle={dataModal?.subTitle} />
                </ModalLogic>
            )}
            {modal?.boolean && modal?.number === 403 && (
                <ModalLogic isOpen={true} onClose={() => setModal({ boolean: false, number: 403 })}>
                    <ModalError onClose={() => window.location.reload()} title={dataModal?.title} subTitle={dataModal?.subTitle} />
                </ModalLogic>
            )}
            {modal?.boolean && modal?.number === 402 && (
                <ModalLogic isOpen={true} onClose={() => setModal({ boolean: false, number: 402 })}>
                    <ModalAlreadyPlayed onClose={() => navigate('/alreadyPlayed')} title={dataModal?.title} subTitle={dataModal?.subTitle} />
                </ModalLogic>
            )}
            {modal?.boolean && modal?.number === 404 && (
                <ModalLogic isOpen={true} onClose={() => setModal({ boolean: false, number: 404 })}>
                    <ModalError onClose={() => setModal({ boolean: false, number: 404 })} title={dataModal?.title} subTitle={dataModal?.subTitle} />
                </ModalLogic>
            )}
            {modal?.boolean && modal?.number === 405 && (
                <ModalLogic isOpen={true} onClose={() => setModal({ boolean: false, number: 405 })}>
                    <ModalError onClose={() => setModal({ boolean: false, number: 405 })} title={dataModal?.title} subTitle={dataModal?.subTitle} />
                </ModalLogic>
            )}
            {modal?.boolean && modal?.number === 200 && (
                <ModalLogic isOpen={true} onClose={() => setModal({ boolean: false, number: 200 })}>
                    <ModalOk email={email} onClose={() => { setModal({ boolean: false, number: 200 }), /* navigate('/howToGet') */ setModalAssessments(true) }} title={dataModal?.title} subTitle={dataModal?.subTitle} />
                </ModalLogic>
            )}
            {modal?.boolean && modal?.number === 500 && (
                <ModalLogic isOpen={true} onClose={() => setModal({ boolean: false, number: 500 })}>
                    <ModalError onClose={() => { setModal({ boolean: false, number: 500 }) }} title={dataModal?.title} subTitle={dataModal?.subTitle} />
                </ModalLogic>
            )}
            {modalAssessments && (
                <ModalAssessments onClose={() => { setModalAssessments(false), navigate('/howToGet') }} subTitle="a ESTA  EXPERIENCIA?" title="¿Cuántas estrellas le das" />
            )}
        </div>
    )
}