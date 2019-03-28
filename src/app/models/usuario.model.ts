export class Usuario {
    constructor(
        public nombre: string,
        public email: string,
        public password: string,
        public idFerrum?: string,
        public serie?: string,
        public cat_cli?: string,
        public img?: string,
        public rol?: string,
        public activo?: string,
        public imei?: string,
        public google?: boolean,
        public _id?: string
    ) { }
}
