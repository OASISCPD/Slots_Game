/* import './assets/index.css'; // Si lo mueves a src/assets */

import { FaSpinner } from "react-icons/fa";



export function SlotLoading() {
    return (
        <div className="flex flex-col justify-center opacity-30 animate-pulse font-extrabold w-full items-center gap-4 ">
            <div className="w-5/6 gap-4 z-20 h-[30dvh] border-[3px] border-pink-500 rounded-md flex p-[23.7px] justify-between shadow-md bg-cover bg-center animate-pulse overflow-hidden" style={{ backgroundImage: 'url("/images/fondo_slot.webp")' }}>
                {/* Rollo 1 */}
                <div className="border-[2px] border-white bg-black rounded-md w-[79px] h-[100%] flex items-center justify-center">
                    <FaSpinner className="text-4xl animate-spin text-white" />
                </div>

                {/* Rollo 2 */}
                <div className="border-[2px] border-white bg-black rounded-md w-[79px] h-[100%] flex items-center justify-center">
                    <FaSpinner className="text-4xl animate-spin text-white" />
                </div>

                {/* Rollo 3 */}
                <div className="border-[2px] border-white bg-black rounded-md w-[79px] h-[100%] flex items-center justify-center">
                    <FaSpinner className="text-4xl animate-spin text-white" />
                </div>
            </div>
            <button className={`bg-black   text-white rounded-md border-zinc-500 border-2 shadow-xl p-1  max-w-xs w-full  neon-border `} >
                Cargando...
            </button>
        </div>
    )
}