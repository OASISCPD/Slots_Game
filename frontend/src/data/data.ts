export interface dto_prizes_get {
    id_premio: number;
    descripcion_premio: string
    estado: boolean
}
export const prizes: dto_prizes_get[] = [
    {
        "id_premio": 1,
        "descripcion_premio": "Ticket de $25.000",//cereza-30mil
        "estado": false
    },
    {
        "id_premio": 2,
        "descripcion_premio": "Ticket de $30.000",
        "estado": true
    },
    {
        "id_premio": 3,
        "descripcion_premio": "Logo Oasis Violeta",
        "estado": false
    },
    {
        "id_premio": 4,
        "descripcion_premio": "Ticket de $5.000",
        "estado": false
    },
    {
        "id_premio": 5,
        "descripcion_premio": "Ticket de $10.000",
        "estado": false
    },
    {
        "id_premio": 6,
        "descripcion_premio": "Logo Oasis naranja",
        "estado": false
    },
    {
        "id_premio": 7,
        "descripcion_premio": "Ticket de $15.000",
        "estado": false
    },
    {
        "id_premio": 8,
        "descripcion_premio": "Ticket de $20.000",
        "estado": false
    },
    {
        "id_premio": 9,
        "descripcion_premio": "Logo Oasis color",
        "estado": false
    }
];