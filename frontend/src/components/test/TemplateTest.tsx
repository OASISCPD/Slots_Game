import { ModalAssessments } from "../mod/ModalAssessments";
export function Test() {
    return (
        <div className="">
            {/* <EmailInput /> */}
            {/* <ModalAlreadyPlayed onClose={() => console.log('CERRANDO')} subTitle="RECORDÁ QUE SI YA PARTICIPASTE PREVIAMENTE DE RASPÁ Y GANÁ O GIRÁ Y GANÁ, NO PODÉS RECLAMAR UN NUEVO PREMIO." title="¡UPS!" /> */}
            <ModalAssessments onClose={() => console.log('cerrando modal')} subTitle="a ESTA  EXPERIENCIA?" title="¿Cuántas estrellas le das" />
            {/* <EmailInput /> */}
        </div>
    )
}