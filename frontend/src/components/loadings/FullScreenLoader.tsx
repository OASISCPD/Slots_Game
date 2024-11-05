import { CgSpinner } from "react-icons/cg";
import { domain } from "../../content/content";
import { colorSpinLoader, getGradientByDomain } from "../../logic/logicColors";

export function FullScreeeLoader() {
    return (
        <div className={`fixed inset-0 ${getGradientByDomain('PILAR')} bg-opacity-100 flex items-center justify-center z-50`}>
            <div className="text-center">
                <div className="relative w-[6rem] h-[6rem] mx-auto my-[1rem]">
                    <CgSpinner className={`w-full h-full ${colorSpinLoader(domain)} animate-spin`} />
                </div>
                <h2 className={`text-2xl font-bold text-white`}>Cargando....</h2>
            </div>
        </div>
    )
}