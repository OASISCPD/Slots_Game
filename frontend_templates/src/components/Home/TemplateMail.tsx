import { useEffect, useState } from "react";
import { MdOutlineMailOutline } from "react-icons/md";
const logoPath = `/images/${domain.toLowerCase()}/logoDominio.png`;

import { dtoModal, ModalError } from '../mod/ModalError';
import { ModalLogic } from "../logic/ModalLogic";
import { ModalOk } from "../mod/ModalOk";
/* import '../../styles/slide.css' */
import { useNavigate } from "react-router-dom";
import { baseUrl, domain } from "../../content/content";

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
    //primer check
    const [isCheckedFirst, setIsCheckedFirst] = useState<boolean>(false);
    //segundo check
    const [isChecked, setIsChecked] = useState<boolean>(false);
    const [buttonActivated, setButtonActivated] = useState<boolean>(false);
    const [isLoading, setLoading] = useState(false); // Estado para controlar la carga

    // Expresión regular para validar el formato del correo electrónico
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Función para validar si el botón debe estar habilitado
    const updateButtonActivation = () => {
        const isEmailValid = emailRegex.test(email);
        setButtonActivated(isEmailValid && isChecked && isCheckedFirst);
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

    // Función para manejar el cambio en el checkbox
    const handleCheckboxChangeFirst = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsCheckedFirst(event.target.checked);
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
            /* const data = 200 */
            switch (data.status_code) {
                case 200:
                    setModal({ boolean: true, number: 200 })
                    setDataModal({ title: 'TE HEMOS ENVIADO EL PREMIO A LA CASILLA DE CORREO', subTitle: 'SI NO TE LLEGÓ, VERIFICÁ  EN TU CASILLA DE SPAM O CORREO NO DESEADO' })
                    // Aquí puedes agregar la lógica para mostrar un mensaje de éxito o hacer alguna acción adicional
                    break;
                case 403:
                    setModal({ boolean: true, number: 403 })
                    setDataModal({ title: 'Debes jugar para poder recibir el premio', subTitle: 'Se refrescará la página y volverá al inicio para poder jugar' })
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
    }, [isChecked, isCheckedFirst, email])

    return (
        <div style={{ zIndex: 10 }} className=" tracking-wide z-50   py-[2rem] textGothamMedium">
            {isLoading && ( // Muestra el spinner de carga si isLoading es true
                <div className="fixed top-0 left-0 w-full h-full bg-gray-900 opacity-75 flex justify-center items-center z-50">
                    <div className="flex justify-center items-center h-screen">
                        <div className="rounded-full h-20 w-20 bg-red-800 animate-ping"></div>
                    </div>
                </div>
            )}
            <h1 style={{ textShadow: '2px 4px 4px rgba(0, 0, 0, 0.5)' }} className="text-2xl  textGothamBlack  text-white text-center sm:text-4xl lg:text-xl xl:sm:text-3xl  ">INGRESÁ TU CORREO Y TE ENVIAREMOS UN MAIL CON TU PREMIO</h1>
            <h2 className="text-yellowMain lg:text-center mb-8 mt-4 sm:my-12 lg:my-4 xl:my-12  text-sm sm:text-xl lg:text-base xl:text-xl  text-center">
                Revisá la casilla de SPAM si no lo ves en bandeja de ENTRADA
            </h2>
            <div className="relative flex my-12 lg:my-8 xl:my-12 xl:mx-[2rem] items-center">
                <span className="absolute inset-y-0 left-2 flex items-center pl-3 pointer-events-none">
                    <MdOutlineMailOutline size={24} className="text-gray-100" />
                </span>
                <input
                    type="email"
                    value={email}
                    onChange={handleEmailChange}
                    className="pl-[3rem] pr-4 py-4   text-white text-xl neon-border-input placeholder-gray-100 h-full w-full  rounded-md focus:outline-none focus:border-indigo-500"
                    placeholder="M A I L"
                />
            </div>
            {/* validaciones para envio de mail checkboxes */}
            <div className="p-3 bg-black bg-opacity-40 rounded-2xl mb-8 xl:mx-[2rem] sm:mb-12">
                <div className="flex items-center justify-start my-1  ">
                    <input
                        onChange={handleCheckboxChangeFirst}
                        id="default-checkbox"
                        type="checkbox"
                        checked={isCheckedFirst}
                        className=" text-blue-600 bg-gray-100 border-gray-300  rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" required
                    />
                    <h1 className="ms-2 text-xs text-white sm:text-lg lg:text-sm xl:text-xl 2xl:text-base">Recordá que si ya participaste de Raspá y Ganá, no vas a poder reclamar el premio.</h1>
                </div>
                <div className="flex items-center justify-start my-1   ">
                    <input
                        onChange={handleCheckboxChange}
                        id="default-checkbox"
                        type="checkbox"
                        checked={isChecked}
                        className="  text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 focus:ring-2 " required
                    />
                    <label onClick={() => window.open('/terms')} className="ms-2 text-xs  text-yellowMain  underline sm:text-lg lg:text-sm xl:text-xl 2xl:text-base">Acepto términos y condiciones</label>
                </div>
            </div>
            <button
                onClick={sendData}
                disabled={!buttonActivated}
                className={`${buttonActivated ? 'hover:scale-105 duration-100 bg-gradient-to-r from-buttonColorMagenta to-redMain' : 'bg-redMain bg-opacity-50 text-opacity-70 '} xl:mx-[2rem] uppercase rounded-md p-2 px-[3rem] cursor-pointer  text-white sm:text-xl lg:text-sm xl:text-xl`}
            >
                Enviar
            </button>
            <div className=" flex justify-center my-[4rem] lg:my-[1rem]">
                <img src={logoPath} className=" w-[12rem] sm:w-[40%] lg:w-[12rem] xl:w-[16rem] " alt="logo empresarial" />
            </div>
            {modal?.boolean && modal?.number === 401 && (
                <ModalLogic isOpen={true} onClose={() => setModal({ boolean: false, number: 401 })}>
                    <ModalError buttonText="Continuar" onClose={() => navigate('/howToGet')} title={dataModal?.title} subTitle={dataModal?.subTitle} />
                </ModalLogic>
            )}
            {modal?.boolean && modal?.number === 403 && (
                <ModalLogic isOpen={true} onClose={() => setModal({ boolean: false, number: 403 })}>
                    <ModalError buttonText="Jugar" onClose={() => window.location.reload()} title={dataModal?.title} subTitle={dataModal?.subTitle} />
                </ModalLogic>
            )}
            {modal?.boolean && modal?.number === 402 && (
                <ModalLogic isOpen={true} onClose={() => setModal({ boolean: false, number: 402 })}>
                    <ModalError buttonText="Cerrar" onClose={() => navigate('/alreadyPlayed')} title={dataModal?.title} subTitle={dataModal?.subTitle} />
                </ModalLogic>
            )}
            {modal?.boolean && modal?.number === 404 && (
                <ModalLogic isOpen={true} onClose={() => setModal({ boolean: false, number: 404 })}>
                    <ModalError buttonText="Volver" onClose={() => setModal({ boolean: false, number: 404 })} title={dataModal?.title} subTitle={dataModal?.subTitle} />
                </ModalLogic>
            )}
            {modal?.boolean && modal?.number === 405 && (
                <ModalLogic isOpen={true} onClose={() => setModal({ boolean: false, number: 405 })}>
                    <ModalError buttonText="Volver" onClose={() => setModal({ boolean: false, number: 405 })} title={dataModal?.title} subTitle={dataModal?.subTitle} />
                </ModalLogic>
            )}
            {modal?.boolean && modal?.number === 200 && (
                <ModalLogic isOpen={true} onClose={() => setModal({ boolean: false, number: 200 })}>
                    <ModalOk email={email} onClose={() => { setModal({ boolean: false, number: 200 }), navigate('/howToGet') }} title={dataModal?.title} subTitle={dataModal?.subTitle} />
                </ModalLogic>
            )}
            {modal?.boolean && modal?.number === 500 && (
                <ModalLogic isOpen={true} onClose={() => setModal({ boolean: false, number: 500 })}>
                    <ModalError buttonText="Volver" onClose={() => { setModal({ boolean: false, number: 500 }) }} title={dataModal?.title} subTitle={dataModal?.subTitle} />
                </ModalLogic>
            )}
        </div>
    )
}