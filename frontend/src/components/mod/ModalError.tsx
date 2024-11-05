
import { useEffect, useState } from 'react'
import { domain } from '../../content/content';
//imagen dinamica
const buttonImage = `/images/${domain.toLocaleLowerCase()}/closeButton.png`


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


export function ModalError({ onClose, title, subTitle }: Props) {
    /* console.log(buttonText) */
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

                    <div className="gradientBackground border-4 border-redMain rounded-2xl p-8 w-[20rem] sm:w-[30rem] py-8  shadow-2xl transform  transition-all duration-300">
                        <div className="flex justify-between items-center py-1">
                            <h2 className="text-3xl sm:text-4xl text-center tracking-wide text-backgroundCyanDark  ml-auto mr-auto uppercase  font-semibold gradientText px-2">{title}</h2>
                        </div>
                        <div className="flex justify-between items-center py-1">
                            <h2 className="text-xl sm:text-2xl text-center tracking-wide  ml-auto mr-auto uppercase gradientText px-2">{subTitle}</h2>
                        </div>
                        <div className='w-full flex justify-center'>
                            <button id="btnReclamaTuPremio" className="shadow-2xl  rounded-full" type="button" onClick={onClose}>
                                <img src={buttonImage} alt="button" className={`w-[10dvh] sm:w-[12dvh] lg:w-[12dvh] mx-auto transition-transform duration-1000 `} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}