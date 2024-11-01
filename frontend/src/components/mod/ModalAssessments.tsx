import { useEffect, useState } from 'react';
import { FaRegStar, FaStar } from 'react-icons/fa';
import { domain } from '../../content/content';
const buttonSend = `/images/${domain.toLowerCase()}/buttonEnviar.png`;
const buttonSendDisabled = `/images/${domain.toLowerCase()}/buttonEnviarDisabled.png`;
interface Props {
    onClose: () => void;
    title: string | undefined;
    subTitle: string | undefined;
}

export function ModalAssessments({ onClose, title, subTitle }: Props) {
    const [showModal, setShowModal] = useState<boolean>(false);
    const [gameRating, setGameRating] = useState<number>(0);
    const [prizeRating, setPrizeRating] = useState<number>(0);

    useEffect(() => {
        const timeout = setTimeout(() => setShowModal(true), 10);
        return () => clearTimeout(timeout);
    }, []);

    const handleStarClick = (rating: number, type: 'game' | 'prize') => {
        if (type === 'game') {
            setGameRating(rating);
        } else {
            setPrizeRating(rating);
        }
        console.log(`Rating for ${type === 'game' ? 'game' : 'prize'}: ${rating}`);
    };

    const renderStars = (rating: number, type: 'game' | 'prize') => {
        return Array(5).fill(null).map((_, index) => (
            <div
                key={index}
                onClick={() => handleStarClick(index + 1, type)}
                className="cursor-pointer"
            >
                {index < rating ? <FaStar className='text-yellowMain' size={24} /> : <FaRegStar size={24} />}
            </div>
        ));
    };

    function sendValues() {
        console.log(`ENVIANDO AL FETCH ------> ${gameRating} y ${prizeRating}`)
    }
    useEffect(() => {
        console.log(`valores, juego: ${gameRating} premio: ${prizeRating}`)
    }, [gameRating, prizeRating])

    return (
        <div className="p-4 flex items-center justify-center h-screen text-white textGothamMedium">
            <div>
                <div
                    className={`fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-black bg-opacity-50 transition-opacity duration-300 ${showModal ? 'opacity-100' : 'opacity-0'}`}
                >
                    <div className="gradientBackground border-4 border-redMain rounded-2xl p-8 w-[20rem] sm:w-[24rem] xl:w-[26rem] py-8 shadow-2xl transform transition-all duration-300">
                        <div className="flex bisonBoldItallic flex-wrap justify-between items-center py-1">
                            <h2 style={{ textShadow: '4px 6px 6px rgba(0, 0, 0, 0.5)' }} className="text-2xl textGothamBlack text-center tracking-wide text-white bisonBoldItallic px-2 mx-auto uppercase">
                                {title}
                            </h2>
                            <h2 className="text-2xl textGothamBlack text-center tracking-wide gradientTextRevert bisonBoldItallic px-2 mx-auto uppercase">
                                <span style={{ textShadow: '4px 6px 6px rgba(0, 0, 0, .5)' }}>{subTitle}</span>
                            </h2>
                        </div>

                        {/* SOBRE EL JUEGO */}
                        <div className='flex flex-col justify-between my-[2dvh] items-center'>
                            <div className='border-2 rounded-lg w-full min-h-[12dvh]'>
                                <h1 style={{ textShadow: '4px 6px 6px rgba(0, 0, 0, 0.5)' }} className='text-center text-sm my-[1dvh]'>SOBRE EL JUEGO</h1>
                                <div className='flex justify-between mx-[4dvh] items-center'>
                                    {renderStars(gameRating, 'game')}
                                </div>
                            </div>
                        </div>

                        {/* SOBRE EL PREMIO */}
                        <div className='flex flex-col justify-between my-[2dvh] items-center'>
                            <div className='border-2 rounded-lg w-full min-h-[12dvh]'>
                                <h1 style={{ textShadow: '4px 6px 6px rgba(0, 0, 0, 0.5)' }} className='text-center text-sm my-[1dvh]'>SOBRE EL PREMIO</h1>
                                <div className='flex justify-between mx-[4dvh] items-center'>
                                    {renderStars(prizeRating, 'prize')}
                                </div>
                            </div>
                        </div>
                        {/* BUTTON ENVIAR */}
                        <button onClick={sendValues} className="flex items-center rounded-full mx-auto  shadow-2xl shadow-black ">
                            <img src={buttonSend} className="  w-[10dvh]" alt="" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
