export class VencidoHistorial {
    constructor(
        public clienteId: number,
        public folio: number,
        public comentario: string,
        public fecha: string,
        public hora: string,
        public _id?: string
    ) { }
}
