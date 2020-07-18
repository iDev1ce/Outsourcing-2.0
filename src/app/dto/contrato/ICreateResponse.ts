import Contrato from "@app/models/Contrato";

export default interface ICreateResponse {
    contrato: Contrato
    total: string
}