import Funcionario from "@app/models/Funcionarios";

export default interface IAuthResponse {
    funcionario: Funcionario
    token: string
}