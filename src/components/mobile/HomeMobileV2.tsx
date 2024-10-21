/* import { SpinWheel } from "../components/SpinWheel"; */
import img from '/images/heroMobile.png'
import imgLogo from '/images/logoPilar.png'
import { Footer } from "../Footer";
import Confetti from 'react-confetti';
import { useEffect, useRef, useState } from "react";
import { Modal } from "../mod/Modal";
import { ModalPrize } from "../mod/ModalPrize";
import { facebook, instagram, whatsapp } from "../../content/Variables";
import { TemplateMailMobile } from "../mobile/TemplateMailMobile";
import { SpinWheelV2 } from "../SpinWheelV2";
import { useNavigate } from "react-router-dom";
import { ModalAge } from "../mod/ModalAge";

const winSound = new Audio('/sounds/win.mp3')

export function HomeMobileV2() {
    //configuramos el sonido a salir 
    winSound.volume = 0.2; // 20% del volumen
    const navigate = useNavigate()
    //validacion de menor de edad agregando logica
    const [fetchPrize, setFetchPrize] = useState<boolean>(false);
    const [showAgeModal, setShowAgeModal] = useState<boolean>(false);
    //manejo de templates sobre la misma ruta
    const [templateMail, setTemplateMail] = useState<boolean>(false)
    //confetti boolean
    const [confetti, setConfetti] = useState<boolean>(false)
    //visibilidad del confetti
    const [visible, setVisible] = useState<boolean>(true)
    //mostrar modal
    const [modal, setModal] = useState<boolean>(false)
    //premio a mostrar en el modal
    const [prize, setPrize] = useState<string>('')
    //scrolling
    //audio
    const audioRef = useRef<HTMLAudioElement>(null);
    const firstDivRegex = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.src = '/sounds/win.mp3';
            audioRef.current.volume = 0.2;
        }
    }, []);

    function openModal(prize: string) {
        setPrize(prize)
        /* winSound.play() */
        // Reproducir el sonido desde el elemento de audio
        audioRef.current?.play().catch(error => {
            console.error('Error al reproducir el sonido:', error);
        });
        setConfetti(true)
        setTimeout(() => {
            setModal(true)
        }, 4000);
    }

    function closeModal() {
        setConfetti(false)
        setModal(false)
    }

    function changedTemplate() {
        if (firstDivRegex.current) {
            firstDivRegex.current.scrollIntoView({ behavior: 'smooth' })
        }
        /*  setConfetti(false) */
        setModal(false)
        setTemplateMail(true)
    }

    const handleAgeConfirmation = () => {
        localStorage.setItem('isAdult', 'true');
        setShowAgeModal(false);
        setFetchPrize(true)
    };

    const handleAgeRejection = () => {
        localStorage.removeItem('isAdult');
        setShowAgeModal(true);
        navigate('/minorAge');
    };

    //funcion que frena y oculta el conffeti
    function stopConfetti() {
        setVisible(false)
    }

    useEffect(() => {
        const isAdult = localStorage.getItem('isAdult');
        console.log(isAdult)
        if (isAdult !== 'true') {
            setShowAgeModal(true);
            return
        }
        setFetchPrize(true)
        /* else {
            setFetchPrize(true)
        } */
    }, []);

    return (
        <div ref={firstDivRegex} className=" flex flex-col  items-center justify-center flex-1 app-container min-h-[100dvh]">
            <audio ref={audioRef} />
            <div className='z-0' style={{ transition: 'opacity 1s', opacity: visible ? 1 : 0, zIndex: -1 }}>
                {confetti && <Confetti
                    width={window.innerWidth - 20}
                    height={window.innerHeight}
                    numberOfPieces={300} // Más confeti
                    gravity={0.1} // Más rápido
                    wind={0.01} // Ligera brisa
                    onConfettiComplete={() => console.log('Confetti completed!')}
                    style={{ zIndex: -1 }}
                />}
            </div>
            <div className="">
                {templateMail ? (
                    <div style={{ zIndex: 10 }} className="mx-[2rem] relative">
                        <TemplateMailMobile stopConfetti={stopConfetti} />
                    </div>
                ) : (
                    <div className="my-4 flex flex-col flex-1">
                        <img src={img} alt="imagen del hero" className="my-2 w-[20rem] sm:w-[24rem] lg:w-auto 2xl:w-[24rem]" />
                        <SpinWheelV2 fetchBoolean={fetchPrize} confetti={openModal} />
                        <img src={imgLogo} alt="imagen del bingo" className="my-[2rem] mx-auto w-[12rem] sm:w-[20rem] lg:w-[12rem] 2xl:w-[20rem]" />
                        {modal && (
                            < Modal isOpen={true} onClose={closeModal}>
                                <ModalPrize prize={prize} onCloseOk={changedTemplate} onClose={closeModal} />
                            </Modal>
                        )}
                        {showAgeModal && (
                            <Modal isOpen={true} onClose={closeModal}>
                                <ModalAge
                                    onClose={handleAgeRejection}
                                    onCloseOk={handleAgeConfirmation}
                                    title="¿SOS MAYOR DE 18 AÑOS?"
                                />
                            </Modal>
                        )}
                    </div>
                )}
            </div>
            <Footer facebook={facebook} instagram={instagram} whatsapp={whatsapp} />
        </div >
    )
}