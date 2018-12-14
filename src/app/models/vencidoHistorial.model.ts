export class VencidoHistorial {
    constructor(
        public clienteId: number,
        public numero: number,
        public nombre: string,
        public comentario: string,
        public fecha: string,
        public hora: string,
        public _id?: string
    ) { }
}
