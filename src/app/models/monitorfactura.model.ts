export class MonitorFactura {
    constructor(
        public docid: number,
        public origenid: number,
        public destinoid: number,
        public numero: number,
        public fecha: string,
        public fechaTrab: string,
        public horaTrab: string,
        public total: number,
        public ximpresion: number,
        public diacredito: number,
        public _id?: string
    ) { }
}
