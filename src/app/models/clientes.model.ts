export class Cliente {
    constructor(
        public nombre: string,
        public email: string,
        public password: string,
        public lat?: number,
        public lng?: number,
        public tel?: string,
        public numero?: string,
        public idFerrum?: number,
        public perid?: number,
        public dia_vis?: string,
        public cat_cli?: string,
        public img?: string,
        public rol?: string,
        public activo?: string,
        public factura?: string,
        public precio?: number,
        public _id?: string
    ) {
    }
}
