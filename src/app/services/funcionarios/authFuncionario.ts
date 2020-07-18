import { getCustomRepository } from "typeorm"
import { compare } from "bcrypt"
import { sign } from "jsonwebtoken"

import FuncionarioRepository from "@app/repositories/FuncionarioRepository"
import authConfig from "@config/auth"
import IAuthRequest from "@app/dto/funcionario/IAuthRequest"
import IAuthResponse from "@app/dto/funcionario/IAuthResponse"

class AuthFuncionario {
    public async execute({ email, senha }: IAuthRequest): Promise<IAuthResponse | null> {
        const funcionarioRepository = getCustomRepository(FuncionarioRepository)

        const existingFuncionario = await funcionarioRepository.findOne({
            where: { email }
        })

        if(!existingFuncionario)
            return null

        if(!await compare(senha, existingFuncionario.senha))
            return null

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