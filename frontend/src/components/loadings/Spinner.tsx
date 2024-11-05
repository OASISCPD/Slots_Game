import { ImSpinner8 } from 'react-icons/im';

export function Spinner() {
    return (
        <div className="flex items-center justify-center">
            <div className="animate-spin">
                <ImSpinner8 className="text-backgroundRed" size={100} />
            </div>
        </div>
    );
};


export function SpinnerFetch() {
    return (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-35 z-50">
            <div className="flex items-center justify-center w-full h-full">
                <div className="animate-spin flex items-center justify-center w-full h-full">
                    <ImSpinner8 size={60} className="text-backgroundRed " />
                </div>
            </div>
        </div>

    )
}