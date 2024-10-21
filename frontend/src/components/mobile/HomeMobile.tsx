import { SpinWheel } from "../SpinWheel";
import img from '/images/heroMobile.png'
import imgLogo from '/images/logoPilar.png'
import { Footer } from "../Footer";
import Confetti from 'react-confetti';
import { useState } from "react";
import { Modal } from "../mod/Modal";
import { ModalPrize } from "../mod/ModalPrize";
import { facebook, instagram, whatsapp } from "../../content/Variables";
import { TemplateMailMobile } from "./TemplateMailMobile";

export function HomeMobile() {

    //manejo de templates sobre la misma ruta
    const [templateMail, setTemplateMail] = useState<boolean>(false)
    const [confetti, setConfetti] = useState<boolean>(false)
    //mostrar modal
    const [modal, setModal] = useState<boolean>(false)
    //premio a mostrar en el modal
    const [prize, setPrize] = useState<string>('')
    function openModal(prize: string) {
        setPrize(prize)
        setConfetti(true)
        setTimeout(() => {
            setModal(true)
        }, 5000);
    }

    function closeModal() {
        setConfetti(false)
        setModal(false)
    }

    function changedTemplate() {
        setConfetti(false)
        setModal(false)
        setTemplateMail(true)
    }
    //funcion que frena y oculta el conffeti
    function stopConfetti() {
        /* setVisible(false) */
    }

    return (
        <div className=" flex flex-col items-center justify-center flex-1 app-container min-h-[100dvh]">
            <div className="lg:flex ">
                {templateMail ? (
                    <div className="mx-[2rem]">
                        <TemplateMailMobile stopConfetti={stopConfetti} />
                    </div>
                ) : (
                    <div className="my-4 flex flex-col flex-1">
                        {confetti && <Confetti />}
                        <img src={img} alt="imagen del hero" className="my-2 w-[20rem] sm:w-[24rem] lg:w-auto 2xl:w-[24rem]" />
                        <SpinWheel confetti={openModal} />
                        <img src={imgLogo} alt="imagen del bingo" className="my-[2rem] mx-auto w-[16rem] sm:w-[20rem] lg:w-[12rem] 2xl:w-[20rem]" />
                    </div>

                )}
            </div>
            <Footer facebook={facebook} instagram={instagram} whatsapp={whatsapp} />
            {/* {modal && (
                < Modal isOpen={true} onClose={() => setModal(false)}>
                    <ModalMailSending email="alex.becci@bingopilar.com.ar" subTitle="Si no te llego verificar en tu asilla de spam o correo no deseado" title="Te hemos enviado el premio a la casiila de correo" onClose={() => { setModal(false), setConfetti(false) }} />
                </Modal>
            )} */}
            {modal && (
                < Modal isOpen={true} onClose={closeModal}>
                    <ModalPrize prize={prize} onCloseOk={changedTemplate} onClose={closeModal} />
                </Modal>
            )}
        </div >
    )
}