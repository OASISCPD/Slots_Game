import { ReactNode } from "react";
interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
}
//BOOLEANO Y NUMERO PARA DIFERENCIAR QUE TIPO DE ESTADO ES
export interface modalValuesDto {
    boolean: boolean
    number: number
}
//tipo de datos a printear
export interface dtoModal {
    title: string
    subTitle: string
}
export const ModalLogic = ({ isOpen, onClose, children }: ModalProps) => {
    return (
        <div style={{ zIndex: 100 }}
            className={`fixed inset-0 ${isOpen ? "block" : "hidden"} overflow-y-auto`}
        >
            <div className="flex items-center justify-center min-h-screen">
                <div
                    className="fixed inset-0 bg-black opacity-30"
                    onClick={onClose}
                ></div>
                <div className="relative z-10  p-4 max-w-sm mx-auto">
                    {children}
                </div>
            </div>
        </div>
    );
};