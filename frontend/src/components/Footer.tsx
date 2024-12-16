import { useEffect, useState } from "react";
import { BsInstagram, BsFacebook, BsWhatsapp } from "react-icons/bs";
import { domain, facebookPilar, facebookSalta, facebookZarate, instagramPilar, instagramSalta, instagramZarate, propDomain, whatsappPilar, whatsappSalta, whatsappZarate } from "../content/content";
//importando logo del footer
const logoLoteria = `/images/${domain.toLowerCase()}/logoLoteria.png`

export function Footer({ domain }: propDomain) {
    const [iconSize, setIconSize] = useState<number>(24);
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 640 && window.innerWidth < 1023) {
                setIconSize(28); // Tamaño para tabletas
            } else if (window.innerWidth >= 1023) {
                setIconSize(24); // Tamaño para pantallas más grandes
            } else {
                setIconSize(24); // Tamaño para móviles
            }
        };
        window.addEventListener('resize', handleResize);
        handleResize(); // Set initial icon size
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    function openIcon(icon: string) {
        if (icon === 'WHATSAPP') {
            const url = domain === 'PILAR'
                ? whatsappPilar
                : domain === 'ZARATE'
                    ? whatsappZarate
                    : domain === 'SALTA'
                        ? whatsappSalta
                        : '#'; // Puedes definir un valor por defecto o un manejo de error aquí
            window.open(url, '_blank'); // Abrir en una nueva pestaña
            return
        }
        else if (icon === "FACEBOOK") {
            const url = domain === 'PILAR'
                ? facebookPilar
                : domain === 'ZARATE'
                    ? facebookZarate
                    : domain === 'SALTA'
                        ? facebookSalta
                        : '#'; // Puedes definir un valor por defecto o un manejo de error aquí
            window.open(url, '_blank'); // Abrir en una nueva pestaña
            return
        }
        else if (icon === "INSTAGRAM") {
            const url = domain === 'PILAR'
                ? instagramPilar
                : domain === 'ZARATE'
                    ? instagramZarate
                    : domain === 'SALTA'
                        ? instagramSalta
                        : '#'; // Puedes definir un valor por defecto o un manejo de error aquí
            window.open(url, '_blank'); // Abrir en una nueva pestaña
            return
        }
    }
    return (
        <div className="w-full textGothamBook tracking-wide">
            <div className="flex flex-col lg:flex lg:flex-row  w-full px-[1rem] justify-center items-center py-2">
                <img src={logoLoteria} className="w-[10rem] sm:w-[10rem] lg:w-[12rem] p-2 " alt="Logo Loteria" />
                <h1 className=" text-sm sm:text-lg lg:text-sm xl:text-base  text-gray-300 mx-8 lg:mx-auto text-center bebasNeueRegular">
                    El juego compulsivo es perjudicial para la salud.<br /> Sólo para mayores de 18 años
                </h1>
                <div className="flex justify-center gap-4 py-4 items-center text-gray-300">
                    {/*  <BsWhatsapp className="cursor-pointer hover:text-greenMain duration-300" onClick={() => window.open(`${whatsapp}`)} size={iconSize} />
                    <BsInstagram className="cursor-pointer hover:text-yellowMain duration-300" onClick={() => window.open(`${instagram}`)} size={iconSize} />
                    <BsFacebook className="cursor-pointer hover:text-blue-500 duration-300" onClick={() => window.open(`${facebook}`)} size={iconSize} /> */}
                    {domain !== 'ZARATE' && (
                        <BsWhatsapp className="cursor-pointer hover:text-greenMain duration-300" onClick={() => openIcon('WHATSAPP')} size={iconSize} />
                    )}
                    <BsInstagram className="cursor-pointer hover:text-yellowMain duration-300" onClick={() => openIcon('INSTAGRAM')} size={iconSize} />
                    <BsFacebook className="cursor-pointer hover:text-blue-500 duration-300" onClick={() => openIcon('FACEBOOK')} size={iconSize} />

                </div>
            </div>
        </div>
    );
}