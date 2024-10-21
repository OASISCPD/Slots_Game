import { useEffect, useState } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";

interface dto_modal {
    onClose: () => void
    title: string
    email: string
    subTitle: string

}
export function ModalMailSending({ onClose, email, subTitle, title }: dto_modal) {
    const [showModal, setShowModal] = useState<boolean>(false)

    useEffect(() => {
        const timeout = setTimeout(() => setShowModal(true), 10);
        return () => clearTimeout(timeout);
    }, []);

    return (
        <div className={`fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-black text-black bg-opacity-50 transition-opacity duration-300 ${showModal ? 'opacity-100' : 'opacity-0'}`}>
            {/* <ToastContainer autoClose={2000} /> */}
            {/*  {loading && (
            <LoadingAllScreen />
        )} */}
            <div>
                <div className="fixed inset-0 flex items-center justify-center  z-50">
                    <form /* onSubmit={handleSubmit(sendData)} */ className="bg-white text-black rounded-2xl p-4 w-[40vh]  shadow-2xl transform transition-all duration-300">
                        <div className="flex justify-end items-center">
                            <AiOutlineCloseCircle className="text-bageDark  rounded-full m-2" size={32} onClick={onClose} />
                        </div>
                        <div className="mx-auto my-[2rem]">
                            <div className="flex flex-col uppercase text-xl text-stone-700 justify-center items-center">
                                <h1 className="text-2xl text-center tracking-wide text-stone-900 ">{title}</h1>
                                <p className="my-2 text-red-500 text-center tracking-wide"> {email}</p>
                                <p className="my-2 text-center tracking-wide text-lg "> {subTitle}</p>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>

    )
}