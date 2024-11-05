import { useEffect, useState } from 'react';
const logoPath = `/images/${domain.toLowerCase()}/logoDominio.png`;
import { Footer } from '../Footer';
import { FullScreeeLoader } from '../loadings/FullScreenLoader';
import { domain, propDomain } from '../../content/content';

export function Terms({ domain }: propDomain) {

    //LOGICA DE CARGA DE IMAGENES
    const [imagesLoaded, setImagesLoaded] = useState<boolean>(false)
    const [minimumTimeElapsed, setMinimunTimeElapsed] = useState<boolean>(false)

    //Carga logica de imagenes para mostrar el template solo cuando las imagenes esten cargadas 
    useEffect(() => {
        const timer = setTimeout(() => {
            setMinimunTimeElapsed(true)
        }, 1500)
        const loadImage = (src: any) => {
            return new Promise((resolve) => {
                const img = new Image();
                img.onload = resolve;
                img.onerror = resolve;
                img.src = src
            })
        }
        Promise.all([loadImage(logoPath)]).then(() => {
            setImagesLoaded(true)
        })
        return () => clearTimeout(timer)
    })

    return (
        <div >
            {!imagesLoaded || !minimumTimeElapsed ? (
                <FullScreeeLoader />
            ) : (
                <section
                    className={`text-gray-600 w-full body-font min-h-[100dvh] relative`}
                >
                    <div className="relative   w-full max-w-sm sm:max-w-xl lg:max-w-3xl xl:max-w-5xl 2xl:max-w-7xl mx-auto">
                        <div className="relative z-20 text-justify py-16 text-white ">
                            {/* Contenido aquí */}
                            <h1 style={{ textShadow: '2px 4px 4px rgba(0, 0, 0, 0.5)' }} className='text-2xl mx-[3dvh]'>3 PARA GANAR <br /> BASES Y CONDICIONES</h1>
                            {/* CONDICIONES Y PAUTAS SEGUN DOMINIO */}
                            {domain === 'PILAR' && (
                                <ol className=' text-base'>
                                    <li className='my-2'>
                                        1. La presente promoción en adelante “3 Para Ganar”, es organizada por Bingo Pilar S.A. (Bingo Oasis) con domicilio en: CALLE RUTA PANAMERICANA, PILAR WALK, Nº: 50,400. Localidad: VILLA ROSA Partido: DEL PILAR CP: 1629. Provincia: BUENOS AIRES
                                    </li>
                                    <li className='my-2'>
                                        2. La sola participación en la acción promocional implica la total aceptación de las presentes “Bases y Condiciones Particulares”, de los “Términos y Condiciones Generales” y de la “Política de tratamiento de datos personales de Bingo Oasis S.A.” incluida en los Términos y Condiciones disponibles en el stand de atención al cliente, lo que implica la aceptación de que las decisiones que tome Bingo Oasis S.A. tendrá el carácter de definitivas e inapelables, toda vez que no resulten abusivas, ni infundadas y no perjudiquen dolosamente el derecho de los Usuarios.

                                    </li>
                                    <li className='my-2'>
                                        3. Reserva de Derechos. Bingo Oasis S.A. se reserva el derecho de cancelar, suspender o modificar las presentes “Bases y Condiciones Particulares” y de tener que establecer o pronunciarse sobre aquellas situaciones no previstas en estas Bases y Condiciones Particulares. La cancelación, suspensión y/o modificación de las presentes Bases y Condiciones no dará derecho a los participantes a reclamo ni indemnización alguna.

                                    </li>
                                    <li className='my-2'>
                                        4. La vigencia de la promoción será desde el 04 de Noviembre de 2024 a las 10:00 hs hasta el 30 de Noviembre de 2024 a las 23:59 hs.
                                    </li>
                                    <li className='my-2'>
                                        5. Solamente podrán participar de la promoción las personas físicas mayores de 18 años, que haya cumplido con los requisitos* solicitados de acuerdo al sorteo que se realice. No podrán participar aquellas personas que no reúnan dichos requisitos como así tampoco personas jurídicas, empleados de Bingo Pilar SA, directivos del organizador, personal del Instituto Provincial de Loterías y Casinos y grupos de contingentes.
                                    </li>
                                    <li className='my-2'>
                                        6. Mecánica de la promoción. El usuario accederá a marketing.bingopilar.com.ar donde encontrará el juego de “3 Para Ganar” con premios disponibles. Todas las jugadas tienen premios. Para poder hacerse beneficiario del premio el usuario debe de manera excluyente ingresar una dirección de correo electrónica válida, donde recibirá el código de su premio. Los premios deberán ser canjeados en el plazo de 4 días desde la generación del correo electrónico con el qr que le ha llegado y el dni del usuario. De lo contrario el beneficio quedará disponible para otro ganador.
                                    </li>
                                    <li className='my-2'>
                                        Para comenzar a hacer uso de su beneficio, deberá presentar el código recibido personalmente en el stand de Atención al Cliente del Bingo, donde se corroborará la validez del código y la identidad de la persona escaneando el DNI físico o desde Mi Argentina.
                                    </li>
                                    <li className='my-2'>
                                        Promoción válida solo para clientes que no hayan registrado el canje de algún premio en las ediciones de Raspá y Ganá o Girá y Ganá. Se limitará a un premio por DNI sin excepción.
                                        Los premios no incluyen viáticos ni desplazamiento hasta el establecimiento.
                                    </li>
                                    <li className='my-2 font-semibold'>
                                        JUGAR COMPULSIVAMENTE ES PERJUDICIAL PARA LA SALUD
                                    </li>
                                </ol>
                            )}
                            {domain === "ZARATE" && (
                                <ol className=' text-base'>
                                    <li className='my-2'>
                                        1. La presente promoción en adelante “3 Para Ganar”, es organizada por STARS GAME  S.A. (Bingo Zárate) con domicilio en: AVENIDA GRAL LAVALLE, Nº: 1420. Localidad: Zárate Partido: Zárate CP: 2800. Provincia: BUENOS AIRES
                                    </li>
                                    <li className='my-2'>
                                        2. La sola participación en la acción promocional implica la total aceptación de las presentes “Bases y Condiciones Particulares”, de los “Términos y Condiciones Generales” y de la “Política de tratamiento de datos personales de Stars Game S.A.” incluida en los Términos y Condiciones disponibles en el stand de atención al cliente, lo que implica la aceptación de que las decisiones que tome Stars Game S.A. tendrá el carácter de definitivas e inapelables, toda vez que no resulten abusivas, ni infundadas y no perjudiquen dolosamente el derecho de los Usuarios.

                                    </li>
                                    <li className='my-2'>
                                        3. Reserva de Derechos. Stars Game S.A. se reserva el derecho de cancelar, suspender o modificar las presentes “Bases y Condiciones Particulares” y de tener que establecer o pronunciarse sobre aquellas situaciones no previstas en estas Bases y Condiciones Particulares. La cancelación, suspensión y/o modificación de las presentes Bases y Condiciones no dará derecho a los participantes a reclamo ni indemnización alguna.

                                    </li>
                                    <li className='my-2'>
                                        4. La vigencia de la promoción será desde el 04 de Noviembre de 2024 16:00 hs hasta el 30 de Noviembre de 2024 a las 23:59 hs.
                                    </li>
                                    <li className='my-2'>
                                        5. Solamente podrán participar de la promoción las personas físicas mayores de 18 años, que haya cumplido con los requisitos* solicitados de acuerdo al sorteo que se realice. No podrán participar aquellas personas que no reúnan dichos requisitos como así tampoco personas jurídicas, empleados de Stars Game SA, directivos del organizador, personal del Instituto Provincial de Loterías y Casinos y grupos de contingentes.
                                    </li>
                                    <li className='my-2'>
                                        6. Mecánica de la promoción. El usuario accederà a promos.oasiszarate.com.ar donde encontrará el juego de “3 Para Ganar” con premios disponibles. Todas las jugadas tienen premios. Para poder hacerse beneficiario del premio el usuario debe de manera excluyente ingresar una dirección de correo electrónica válida, donde recibirá el código de su premio. Los premios deberán ser canjeados en el plazo de 4 días desde la generación del correo electrónico con el qr que le ha llegado y el dni del usuario. De lo contrario el beneficio quedará disponible para otro ganador.
                                    </li>
                                    <li className='my-2'>
                                        Para comenzar a hacer uso de su beneficio, deberá presentar el código recibido personalmente en el stand de Atención al Cliente del Bingo, donde se corroborará la validez del código y la identidad de la persona escaneando el DNI.
                                    </li>
                                    <li className='my-2'>
                                        Promoción válida solo para clientes que no hayan registrado el canje de algún premio en las ediciones de Raspá y Ganá o Girá y Ganá. Se limitará a un premio por DNI sin excepción.
                                        Los premios no incluyen viáticos ni desplazamiento hasta el establecimiento.

                                    </li>
                                    <li className='my-2 font-semibold'>
                                        JUGAR COMPULSIVAMENTE ES PERJUDICIAL PARA LA SALUD
                                    </li>
                                </ol>
                            )}
                            {domain === "SALTA" && (
                                <ol className=' text-base'>
                                    <li className='my-2'>
                                        1. La presente promoción en adelante “3 Para Ganar”, es organizada por NEWGAMING SRL o NUEVO CASINO ALBERDI - , CUIT 33-70826151-9, (en adelante, “ORGANIZADOR”), organiza el presente sorteo (conforme se define más adelante), el cual solo tendrá vigencia en la Ciudad de Salta, Provincia de Salta, República Argentina, sujeto a las siguientes bases y condiciones (“LAS BASES”).-
                                    </li>
                                    <li className='my-2'>
                                        2. La sola participación en la acción promocional implica la total aceptación de las presentes “Bases y Condiciones Particulares”, de los “Términos y Condiciones Generales” y de la “Política de tratamiento de datos personales de New Gaming S.R.L.” incluida en los Términos y Condiciones disponibles en el stand de atención al cliente, lo que implica la aceptación de que las decisiones que tome New Gaming S.R.L tendrá el carácter de definitivas e inapelables, toda vez que no resulten abusivas, ni infundadas y no perjudiquen dolosamente el derecho de los Usuarios.

                                    </li>
                                    <li className='my-2'>
                                        3. Reserva de Derechos. New Gaming S.R.L se reserva el derecho de cancelar, suspender o modificar las presentes “Bases y Condiciones Particulares” y de tener que establecer o pronunciarse sobre aquellas situaciones no previstas en estas Bases y Condiciones Particulares. La cancelación, suspensión y/o modificación de las presentes Bases y Condiciones no dará derecho a los participantes a reclamo ni indemnización alguna.

                                    </li>
                                    <li className='my-2'>
                                        4. La vigencia de la promoción será desde el 04 de Noviembre de 2024 a las 10:00 hs hasta el 30 de Noviembre de 2024 a las 23:59 hs.
                                    </li>
                                    <li className='my-2'>
                                        5. Solamente podrán participar de la promoción las personas físicas mayores de 18 años, que haya cumplido con los requisitos* solicitados de acuerdo al sorteo que se realice. No podrán participar aquellas personas que no reúnan dichos requisitos como así tampoco personas jurídicas, empleados de New Gaming S.R.L, directivos del organizador, personal del Instituto Provincial de Loterías y Casinos y grupos de contingentes.
                                    </li>
                                    <li className='my-2'>
                                        6. Mecánica de la promoción. El usuario accederá a promos.newgaming.com.ar donde encontrará el juego de “3 Para Ganar” con premios disponibles. Todas las jugadas tienen premios. Para poder hacerse beneficiario del premio el usuario debe de manera excluyente ingresar una dirección de correo electrónica válida, donde recibirá el código de su premio. Los premios deberán ser canjeados en el plazo de 4 días desde la generación del correo electrónico con el qr que le ha llegado y el dni del usuario. De lo contrario el beneficio quedará disponible para otro ganador.
                                    </li>
                                    <li className='my-2'>
                                        Para comenzar a hacer uso de su beneficio, deberá presentar el código recibido personalmente en el stand de Atención al Cliente del Casino, donde se corroborará la validez del código y la identidad de la persona escaneando el DNI.
                                    </li>
                                    <li className='my-2'>
                                        Promoción válida solo para clientes que no hayan registrado el canje de algún premio en las ediciones de Raspá y Ganá o Girá y Ganá. Se limitará a un premio por DNI sin excepción.
                                        Los premios no incluyen viáticos ni desplazamiento hasta el establecimiento.

                                    </li>
                                    <li className='my-2 font-semibold'>
                                        JUGAR COMPULSIVAMENTE ES PERJUDICIAL PARA LA SALUD
                                    </li>
                                </ol>
                            )}
                            {/* PREMIOS SEGUN DOMINIO */}
                            <h1 className='text-xl  py-2'>PREMIOS</h1>
                            {domain === 'PILAR' && (
                                <ol className=' text-base'>
                                    <li className='my-2'>
                                        <span className='font-bold'>1. 1 TICKET DE $50.000:</span> Se limitará el canje a 1 ticket válido por el día del canje. No transferible.  Ticket jugable no cobrable, disponible en las máquinas slots habilitadas para tal fin.
                                    </li>
                                    <li className='my-2'>
                                        <span className='font-bold'>2. 1 TICKET DE $30.000:</span> Se limitará el canje a 1 ticket válido por el día del canje. No transferible.  Ticket jugable no cobrable, disponible en las máquinas slots habilitadas para tal fin.
                                    </li>
                                    <li className='my-2'>
                                        <span className='font-bold'>3. 1 TICKET DE $20.000:</span> Se limitará el canje a 1 ticket válido por el día del canje. No transferible.  Ticket jugable no cobrable, disponible en las máquinas slots habilitadas para tal fin.
                                    </li>
                                    <li className='my-2'>
                                        <span className='font-bold'>4. 1 TICKET DE $15.000:</span> Se limitará el canje a 1 ticket válido por el día del canje. No transferible.  Ticket jugable no cobrable, disponible en las máquinas slots habilitadas para tal fin.
                                    </li>
                                    <li className='my-2'>
                                        <span className='font-bold'>5. 1 TICKET DE $10.000:</span> Se limitará el canje a 1 ticket válido por el día del canje. No transferible.  Ticket jugable no cobrable, disponible en las máquinas slots habilitadas para tal fin.
                                    </li>
                                </ol>
                            )}
                            {domain === "ZARATE" && (
                                <ol className=' text-base'>
                                    <li className='my-2'>
                                        <span className='font-bold'>1. 1 TICKET DE $30.000:</span> Se limitará el canje a 1 ticket válido por el día del canje. No transferible.  Ticket jugable no cobrable, disponible en las máquinas slots habilitadas para tal fin.
                                    </li>
                                    <li className='my-2'>
                                        <span className='font-bold'>2. 1 TICKET DE $20.000:</span> Se limitará el canje a 1 ticket válido por el día del canje. No transferible.  Ticket jugable no cobrable, disponible en las máquinas slots habilitadas para tal fin.
                                    </li>
                                    <li className='my-2'>
                                        <span className='font-bold'>3. 1 TICKET DE $15.000:</span> Se limitará el canje a 1 ticket válido por el día del canje. No transferible.  Ticket jugable no cobrable, disponible en las máquinas slots habilitadas para tal fin.
                                    </li>
                                    <li className='my-2'>
                                        <span className='font-bold'>4. 1 TICKET DE $10.000:</span> Se limitará el canje a 1 ticket válido por el día del canje. No transferible.  Ticket jugable no cobrable, disponible en las máquinas slots habilitadas para tal fin.
                                    </li>
                                </ol>
                            )}
                            {domain === 'SALTA' && (
                                <ol className=' text-base'>
                                    <li className='my-2'>
                                        <span className='font-bold'>1. 1 TICKET DE $20.000:</span> Se limitará el canje a 1 ticket válido por el día del canje. No transferible.  Ticket jugable no cobrable, disponible en las máquinas slots habilitadas para tal fin.
                                    </li>
                                    <li className='my-2'>
                                        <span className='font-bold'>2. 1 TICKET DE $15.000:</span> Se limitará el canje a 1 ticket válido por el día del canje. No transferible.  Ticket jugable no cobrable, disponible en las máquinas slots habilitadas para tal fin.
                                    </li>
                                    <li className='my-2'>
                                        <span className='font-bold'>3. 1 TICKET DE $10.000:</span> Se limitará el canje a 1 ticket válido por el día del canje. No transferible.  Ticket jugable no cobrable, disponible en las máquinas slots habilitadas para tal fin.
                                    </li>
                                    <li className='my-2'>
                                        <span className='font-bold'>4. 1 TICKET DE $7.500:</span> Se limitará el canje a 1 ticket válido por el día del canje. No transferible.  Ticket jugable no cobrable, disponible en las máquinas slots habilitadas para tal fin.
                                    </li>
                                    <li className='my-2'>
                                        <span className='font-bold'>6. 15 CUPONES PARA EL SORTEO DEL VIAJE A PASO DE LA PATRIA</span> No transferible.
                                    </li>
                                    <li className='my-2'>
                                        <span className='font-bold'>7. 15 CUPONES PARA EL SORTEO DE LA MOTO</span> No transferible.
                                    </li>
                                </ol>
                            )}
                            <div className='my-8 flex justify-center'>
                                <img src={logoPath} className={`${domain==='SALTA'?'w-[8rem] sm:w-[10rem]  2xl:w-[12rem]':'w-[12rem] sm:w-[14rem]  2xl:w-[16rem]'}`} alt="" />
                            </div>
                        </div>
                    </div>
                    <Footer domain={domain} />
                </section>
            )}
        </div>
    );

}

