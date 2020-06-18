import { getCustomRepository } from "typeorm"
import { compare } from "bcrypt"
import { sign } from "jsonwebtoken"

import Funcionario from "../../models/Funcionarios";
import FuncionarioRepository from "../../repositories/FuncionarioRepository";
import authConfig from "../../../config/auth"
import AppError from "../../../errors/AppError"

interface Request {
    email: string
    senha: string
}

interface Response {
    funcionario: Funcionario
    token: string
}

class AuthFuncionario {
    public async execute({ email, senha }: Request): Promise<Response | null> {
        const funcionarioRepository = getCustomRepository(FuncionarioRepository)

        const existingFuncionario = await funcionarioRepository.findOne({
            where: { email }
        })

        if(!existingFuncionario)
            throw new AppError("Email/senha inválido", 401)

        if(!await compare(senha, existingFuncionario.senha))
            throw new AppError("Email/senha inválido", 401)

        const { secret, expiresIn } = authConfig

        const token = sign({}, secret, {
            subject: existingFuncionario.id,
            expiresIn: expiresIn
        })

        delete existingFuncionario.senha
        delete existingFuncionario.email

        const funcionario = existingFuncionario

        return {
            funcionario,
            token
        }
    }
}

export default new AuthFuncionario()