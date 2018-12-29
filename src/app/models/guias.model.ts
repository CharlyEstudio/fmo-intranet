export class GuiasPartidas {
    constructor(
        public folio: string,
        public factura: number,
        public cliente: number,
        public nombre: string,
        public domicilio: string,
        public poblacion: string,
        public vendedor: string,
        public importe: number,
        public fecha: string,
        public hora: string,
        public _id?: string
    ) { }
}
