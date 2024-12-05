import { useEffect, useState } from 'react'

interface Props {
    title: string | undefined
    onCloseOk: () => void
}
export interface dtoModal {
    title: string
    subTitle: string
}

export function ModalInfo({ title, onCloseOk }: Props) {
    /* const [loading, setLoading] = useState<boolean>(false); */
    const [showModal, setShowModal] = useState<boolean>(false);
    const [fontsLoaded, setFontsLoaded] = useState<boolean>(false);

    useEffect(() => {
        const timeout = setTimeout(() => setShowModal(true), 10);
        // Agregar clase para desactivar el desplazamiento
        document.body.style.overflow = 'hidden';
        return () => {
            clearTimeout(timeout);
            // Quitar clase para activar el desplazamiento
            document.body.style.overflow = 'auto';
        };
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
        <div className="p-4 flex items-center justify-center h-screen text-yellowMain bisonBoldItallic ">
            <div>
                <div x-show="showModal" className={`fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-black bg-opacity-50 transition-opacity duration-300 ${showModal ? 'opacity-100' : 'opacity-0'}`}>

                    <div className="gradientBackground border-4 border-redMain rounded-2xl p-[4dvh] w-[20rem] sm:w-[24rem] py-8 shadow-2xl transform transition-all duration-300">
                        {/*      <div className='flex justify-center items-center'>
                            <img src={img} className='w-[4rem] sm:w-[6rem]' alt="" />
                        </div> */}
                        <div className="flex justify-between tracking-wide items-center my-8">
                            <h2 className=" text-center text-backgroundCyanDark text-gray-700 mx-auto uppercase text-4xl gradientText font-semibold px-2">{title}</h2>
                        </div>
                        <div className='grid grid-cols-1 tracking-wide gap-4 items-center'>
                            <button id='btnEmpecemos' onClick={onCloseOk} className='px-[4dvh] text-2xl sm:text-2xl sm:px-[4dvh]  mx-auto py-1 rounded-full bg-gradient-to-b from-roseMain to-magentaMain duration-300 '>Empecemos</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}