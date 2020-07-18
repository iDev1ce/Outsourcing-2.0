import Contrato from "@app/models/Contrato";
import Usuario from "@app/models/Usuario";

export default interface ICreateContratoComputadorResponse {
    contrato: Contrato
    usuario: Usuario[]
}