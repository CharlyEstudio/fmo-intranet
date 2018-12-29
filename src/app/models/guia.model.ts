export class Guia {
    constructor(
        public folio: string,
        public chofer: string,
        public verifico: string,
        public cantidad: number,
        public importe: number,
        public cajas: string,
        public fecha: string,
        public hora: string,
        public _id?: string
    ) { }
}
