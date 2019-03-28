export class Cotizacion {
    constructor(
        public idFerrum: number,
        public numero: string,
        public nombre: string,
        public pdf: string,
        public productos: Array<any>,
        public subtotal: number,
        public iva: number,
        public total: number,
        public folio: string,
        public _id?: string
    ) {}
}
