export class Visor {
    constructor(
        public idFerrum: number,
        public nombre: string,
        public imei: string,
        public email: string,
        public lat?: number,
        public lng?: number,
        public rol?: string,
        public exactitud?: number,
        public velocidad?: number,
        public img?: string,
        public activo?: string,
        public _id?: string
    ) { }
}