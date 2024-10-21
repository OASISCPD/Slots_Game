import { FiAlertCircle } from "react-icons/fi";
import { Link } from "react-router-dom";

export function PageNotFound() {
    return (
        <div className="min-h-screen bg-gradient-to-b  flex flex-col items-center justify-center p-5 text-center">
            <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full space-y-6">
                <FiAlertCircle className="w-16 h-16 text-redMain mx-auto"/>
                <h1 className="text-4xl font-bold text-gray-800">Oops!</h1>
                <p className="text-xl text-gray-600">Página no encontrada</p>
                <p className="text-gray-500">
                    Lo sentimos, la página que estás buscando no existe o ha sido movida.
                </p>
                <Link
                    to={'/'}
                    className="inline-flex items-center justify-center bg-redMain text-white rounded-full px-6 py-3 font-semibold hover:red-600 transition duration-100 ease-in-out transform hover:scale-105"
                >
                    {/* <ArrowLeft className="w-5 h-5 mr-2" /> */}
                    Volver al inicio
                </Link>
            </div>
            <div className="mt-8 text-gray-400">
                <p>&copy; {new Date().getFullYear()} Tu Empresa. Todos los derechos reservados.</p>
            </div>
        </div>
    )
}