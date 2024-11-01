import { useEffect, useState } from "react";
//importanto imagen del button
/* import buttonImage from '/images/getPrizeButton.png' */
import { Spinner } from "../loadings/Spinner";
import { domain } from "../../content/content";
const buttonImage = `/images/${domain.toLowerCase()}/getPrizeButton.png`
/* import { AiOutlineCloseCircle } from "react-icons/ai"; */

interface dto_modal {
    onClose: () => void
    onCloseOk: () => void
    prize: string
}
export function ModalGetPrize({ /* onClose, */ onCloseOk, prize }: dto_modal) {
    const [showModal, setShowModal] = useState<boolean>(false)
    const [scaleClass, setScaleClass] = useState("scale-100");
    const [isClicked/* , setIsClicked */] = useState<boolean>(false)

    const [fontsLoaded, setFontsLoaded] = useState<boolean>(false);
    useEffect(() => {
        const loadFonts = async () => {
            // Aquí puedes cargar las fuentes que necesitas
            const font = new FontFace('bisonBoldItallic', 'url(/fonts/Bison-BoldItallic.ttf)');
            await font.load();
            document.fonts.add(font);
            setFontsLoaded(true);
        };

        loadFonts();
    }, []);

    useEffect(() => {
        if (fontsLoaded) {
            const timeout = setTimeout(() => setShowModal(true), 10);
            return () => clearTimeout(timeout);
        }
    }, [fontsLoaded]);


    // Lógica de front del botón
    useEffect(() => {
        // Si el botón no está "clicked", configura el intervalo para cambiar la escala
        if (!isClicked) {
            const interval = setInterval(() => {
                setScaleClass((prev) => (prev === "scale-100" ? "scale-125" : "scale-100"));
            }, 1000); // Cambia cada 1 segundo (ajusta si necesitas más tiempo)

            // Limpia el intervalo al desmontar o si cambia el estado de `isClicked`
            return () => clearInterval(interval);
        } else {
            // Detener la escala si el botón está "clicked"
            setScaleClass("scale-100");
        }
    }, [isClicked]);

    return (
        <div className={`fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-black text-white bg-opacity-50 transition-opacity duration-300 ${showModal ? 'opacity-100' : 'opacity-0'}`}>
            <div>
                <div className="fixed bisonBoldItallic  inset-0 flex items-center justify-center  z-50">
                    <form /* onSubmit={handleSubmit(sendData)} */ className="gradientBackground border-4 border-redMain shadow-2xl shadow-gray-400   py-[3rem] rounded-3xl sm:py-[4rem] lg:py-[2rem]   p-4 xl:p-[2rem] w-[40vh] 2xl:py-[4rem]    transform transition-all duration-300">
                        {!fontsLoaded ? (
                            <Spinner />
                        ) : (
                            <div className="flex flex-col  text-lg  text-stone-700 justify-center items-center text-center">
                                <h1 className="text-6xl gradientText px-2 ">¡GANASTE!</h1>
                                {/*<h1 class="gradientText px-2">Texto con Degradado</h1>*/}
                                <p className="my-[1rem] gradientText px-2  text-4xl">{prize}</p>
                                {/* <button className="uppercase  sm:my-[1rem] lg:my-[1rem] text-base xl:text-lg text-white bg-gradient-to-r from-redMain to-black rounded-3xl py-2 px-4" onClick={onCloseOk} >QUIERO MI PREMIO</button> */}
                                <button id="btnReclamaTuPremio" className="shadow-2xl rounded-full" type="button" onClick={onCloseOk}>
                                    <img src={buttonImage} alt="button" className={`w-[12rem] sm:w-[16rem] lg:w-[12rem] xl:w-[12rem] mx-auto transition-transform duration-1000 ${scaleClass}`} />
                                </button>
                            </div>
                        )}
                    </form>
                </div>
            </div >
        </div >

    )
}