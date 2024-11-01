import { useEffect, useState } from 'react'
import { domain } from '../../content/content'
/* import textImage from '/images/ups.png' */
const textImage = `/images/${domain.toLowerCase()}/ups.png`
const buttonImage = `/images/${domain.toLowerCase()}/closeButton.png`

interface Props {
    onClose: () => void
    /*   deleteUser: () => void */
    title: string | undefined
    subTitle: string | undefined


}
export interface dtoModal {
    title: string
    subTitle: string
}


export function ModalAlreadyPlayed({ onClose, title, subTitle, }: Props) {
    /* const [loading, setLoading] = useState<boolean>(false); */
    const [showModal, setShowModal] = useState<boolean>(false);
    const [fontsLoaded, setFontsLoaded] = useState<boolean>(false);

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


    return (
        <div className="p-4 flex bisonBoldItallic items-center justify-center h-screen text-white textGothamMedium ">
            <div>
                <div x-show="showModal" className={`fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-black bg-opacity-50 transition-opacity duration-300 ${showModal ? 'opacity-100' : 'opacity-0'}`}>

                    <div className="bg-violetMain border-2 border-violet-800 rounded-2xl p-8 w-[20rem] sm:w-[30rem] py-[2dvh]  shadow-2xl transform  transition-all duration-300">
                        <div className="flex justify-between items-center">
                            {/*  <h2 className="text-6xl text-center tracking-wide text-backgroundCyanDark  ml-auto mr-auto uppercase sm:text-xl font-semibold gradientText px-2">{title}</h2> */}
                            <img src={textImage} alt="button" className={`w-[12dvh] mx-auto  `} />
                        </div>
                        <div className="flex justify-between items-center gothamItalic py-0">
                            <h2 className="text-sm text-center tracking-wide  ml-auto mr-auto uppercase   px-2">{subTitle}</h2>
                        </div>
                        <button id="btnReclamaTuPremio" className="flex justify-center my-[1dvh] lg:my-[2dvh] items-center mx-auto" type="button" onClick={onClose}>
                            <img src={buttonImage} alt="button" className={`w-[12dvh] mx-auto transition-transform duration-1000 `} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}