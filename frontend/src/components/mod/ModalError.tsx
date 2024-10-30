import { useEffect, useState } from 'react'
import { MdErrorOutline } from "react-icons/md";
import buttonImage from '/images/getPrizeButton.png'


interface Props {
    onClose: () => void
    /*   deleteUser: () => void */
    title: string | undefined
    subTitle: string | undefined
    buttonText: string | undefined


}
export interface dtoModal {
    title: string
    subTitle: string
}


export function ModalError({ onClose, title, subTitle, buttonText }: Props) {
    console.log(buttonText)
    /* const [loading, setLoading] = useState<boolean>(false); */
    const [showModal, setShowModal] = useState<boolean>(false);
    const [fontsLoaded, setFontsLoaded] = useState<boolean>(false);
    const [isClicked/* , setIsClicked */] = useState<boolean>(false)
    const [scaleClass, setScaleClass] = useState("scale-100");

    useEffect(() => {
        // Muestra el modal después de un pequeño retraso para que la animación se reproduzca correctamente
        const timeout = setTimeout(() => setShowModal(true), 10);
        return () => clearTimeout(timeout);
    }, []);

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
        <div className="p-4 flex bisonBoldItallic items-center justify-center h-screen text-white  ">
            <div>
                <div x-show="showModal" className={`fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-black bg-opacity-50 transition-opacity duration-300 ${showModal ? 'opacity-100' : 'opacity-0'}`}>

                    <div className="gradientBackground border-4 border-redMain rounded-2xl p-8 w-[20rem] sm:w-[30rem] py-8  shadow-2xl transform  transition-all duration-300">
                        <div className='flex justify-center items-center'>
                            <MdErrorOutline size={60} className='text-yellowMain' />
                        </div>
                        <div className="flex justify-between items-center py-1">
                            <h2 className="text-6xl text-center tracking-wide text-backgroundCyanDark  ml-auto mr-auto uppercase sm:text-xl font-semibold gradientText px-2">{title}</h2>
                        </div>
                        <div className="flex justify-between items-center py-1">
                            <h2 className="text-4xl text-center tracking-wide  ml-auto mr-auto uppercase sm:text-base gradientText px-2">{subTitle}</h2>
                        </div>
                        <button id="btnReclamaTuPremio" className="shadow-2xl w-full rounded-full" type="button" onClick={onClose}>
                            <img src={buttonImage} alt="button" className={`w-[12rem] sm:w-[16rem] lg:w-[12rem] xl:w-[12rem] mx-auto transition-transform duration-1000 ${scaleClass}`} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}