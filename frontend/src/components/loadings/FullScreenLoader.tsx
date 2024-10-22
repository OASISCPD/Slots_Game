import { BiLoaderAlt } from "react-icons/bi";

interface props {
    title: string
    color_border: string
    text_color: string
}

export function FullScreeeLoader({ color_border, title, text_color }: props) {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-100 flex items-center justify-center z-50">
            <div className="text-center">
                <div className="relative w-[6rem] h-[6rem] mx-auto mb-8">
                    <div className={`absolute inset-0 border-t-4 border-b-4 ${color_border} rounded-full animate-spin`}></div>
                    <div className={`absolute inset-2 border-t-4 border-b-4 ${color_border} -600 rounded-full animate-spin-reverse`}></div>
                    <BiLoaderAlt className="w-full h-full text-yellow-500 animate-spin" />
                </div>
                <h2 className={`text-3xl font-bold ${text_color} mb-4`}>Cargando</h2>
                <p className={`text-lg ${text_color}`}>{title}</p>
            </div>
        </div>
    )
}