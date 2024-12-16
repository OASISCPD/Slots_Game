import { useEffect, useState } from 'react'
import { domain } from '../../content/content'
const buttonImage = `/images/${domain.toLocaleLowerCase()}/closeButton.png`


interface Props {
    onClose: () => void
    /*   deleteUser: () => void */
    title: string | undefined
    subTitle: string | undefined
    email: string | undefined
}
export interface dtoModal {
    title: string
    subTitle: string
}


export function ModalOk({ onClose, title, subTitle, email }: Props) {
    const [showModal, setShowModal] = useState<boolean>(false);

    useEffect(() => {
        // Muestra el modal después de un pequeño retraso para que la animación se reproduzca correctamente
        const timeout = setTimeout(() => setShowModal(true), 10);
        return () => clearTimeout(timeout);
    }, []);

    return (
        <div className="p-4 flex items-center  justify-center h-screen text-white textGothamMedium">
            <div>
                <div x-show="showModal" className={`fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-black bg-opacity-50 transition-opacity duration-300 ${showModal ? 'opacity-100' : 'opacity-0'}`}>

                    <div className="gradientBackground border-4 border-redMain  rounded-2xl p-8 w-[20rem] sm:w-[24rem] xl:w-[26rem] py-8  shadow-2xl transform transition-all duration-300 ">

                        <div className="flex bisonBoldItallic flex-col justify-between  items-center py-1 flex-shrink">
                            <h2 className="text-3xl lg:text-3xl  textGothamBlack text-center tracking-wide gradientTextRevert bisonBoldItallic px-2  break-words w-full  mx-auto uppercase ">{title}</h2>
                        </div>
                        <div style={{ textShadow: '4px 6px 6px rgba(0, 0, 0, 0.5)' }} className='flex bisonBoldItallic flex-col justify-between  items-center py-1 flex-shrink'>
                            <h3 className='text-xl lg:text-2xl text-center tracking-wide text-white uppercase my-2  break-words w-full'><span className='text-yellowMain'>INGRESÁ</span> A TU CASILLA DE CORREO <br />
                                {email} <span className='text-yellowMain'>y disfrutá</span></h3>
                        </div>
                        <div className="flex flex-col justify-between items-center py-1">
                            <h2 className="text-[60%] lg:text-xs text-center tracking-wide mx-auto uppercase  text-gray-200">{subTitle}</h2>
                            <h2 className="text-[60%] lg:text-xs text-center tracking-wide mx-auto uppercase  text-yellowMain">podes reclamar tu premio de lunes a domingos</h2>
                        </div>
                        <button id="btnReclamaTuPremio" className=" w-full rounded-full my-[1dvh]" type="button" onClick={onClose}>
                            <img src={buttonImage} alt="button" className={`shadow-2xl w-[10dvh] sm:w-[12dvh] lg:w-[12dvh] mx-auto transition-transform duration-1000 `} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
} 