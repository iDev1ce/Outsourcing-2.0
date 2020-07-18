import Usuario from "@app/models/Usuario";

export default interface IAuthResponse {
    usuario: Usuario
    token: string
}