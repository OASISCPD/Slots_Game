import { FaSpinner } from 'react-icons/fa'; // Importa el spinner de react-icons
import { ImSpinner8 } from 'react-icons/im';

export function Spinner() {
    return (
        <div className="flex items-center justify-center">
            <div className="animate-spin">
                <ImSpinner8   className="text-backgroundRed" size={100} />
            </div>
        </div>
    );
};
