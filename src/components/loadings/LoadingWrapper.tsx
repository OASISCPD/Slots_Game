import { ComponentType, useEffect, useState } from "react";
import { LoadingInit } from "./LoadingInit";

// Definir la interfaz para las props, donde "HomeComponent" es un prop que puede ser un componente
interface LoadingWrapperProps {
    delay?: number;//opcional y por def =3000
    HomeComponent: ComponentType;// definimos el HomeCompnente del tipo Component para que typescript lo tome

}

export function LoadingWrapper({ delay = 3000, HomeComponent }: LoadingWrapperProps) { // Puedes pasar el tiempo como prop
    const [boolean, setBoolean] = useState<boolean>(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setBoolean(true);
        }, delay);

        return () => clearTimeout(timer); // Limpiar el timer al desmontar el componente
    }, [delay]);

    return (
        <div >
            {boolean ? (
                <HomeComponent />
            ) : (
                <LoadingInit />
            )}
        </div>
    );
}
