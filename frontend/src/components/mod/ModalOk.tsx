import { useEffect, useState } from 'react'


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
    /* const [loading, setLoading] = useState<boolean>(false); */
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

                        <div className="flex bisonBoldItallic flex-wrap justify-between   items-center py-1">
                            <h2 className="text-4xl  textGothamBlack text-center tracking-wide gradientTextRevert bisonBoldItallic px-2   mx-auto uppercase ">{title}YA TENÉS TU PREMIO</h2>
                        </div>
                        <div style={{ textShadow: '4px 6px 6px rgba(0, 0, 0, 0.5)' }} className='flex bisonBoldItallic flex-col justify-between  items-center py-1 flex-shrink'>
                            <h3 className='text-2xl text-center tracking-wide text-white uppercase my-2  break-words w-full'><span className='text-yellowMain'>INGRESÁ</span> A TU CASILLA DE CORREO <br />
                                alex@gmail.com{email} <span className='text-yellowMain'>y disfrutá</span></h3>
                        </div>
                        <div className="flex flex-col justify-between items-center py-1">
                            <h2 className="text-sm text-center tracking-wide mx-auto uppercase  ">SI NO TE LLEGÓ VERIFICÁ LA CARPETA <br /> DE “ NO DESEADOS O SPAM”{subTitle}</h2>
                        </div>
                        {/*   <div className='grid grid-cols-1 my-4 items-center'>
                            <button onClick={onClose} className='px-4 mx-auto py-1 rounded-xl min-w-[6rem] bg-gradient-to-r from-redMain tracking-wide to-black duration-300 sm:text-lg'>Cerrar</button>
                        </div> */}
                    </div>
                </div>
            </div>
        </div>
    )
}