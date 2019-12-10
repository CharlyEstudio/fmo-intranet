export class Ruta {
    constructor(
        public clienteid: number,
        public lat: number,
        public lng: number,
        public numero: string,
        public nombre: string,
        public colonia: string,
        public domicilio: string,
        public poblacion: string,
        public vendedor: number,
        public diavis: string,
        public fecha: string,
        public fechaAsig: string,
        public hora: string,
        public facturas: Array<any>,
        public cerrado?: boolean,
        public entregado?: boolean,
        public horaentrega?: string,
        public comentarios?: string,
        public id?: string,
    ) { }
}